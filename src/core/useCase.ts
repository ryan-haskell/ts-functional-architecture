import { Result } from "@core/result"
import { AuditLog } from "@domain/auditLog"
import { PersonRepository } from "@repos/person"

// UseCase - A unit of business logic

// Using a Symbol as a key means that only this module
// can run a UseCase, because the symbol is not exported! ✨ 
const run = Symbol()

export type UseCase<input, output, problem = never, deps extends UseCaseDependencies = {}> = {
  [run]: (req: deps & { UseCase: UseCaseDependency, input: input }) => Response<output, problem>
}

export const UseCase = {
  create: <input, output, problem = never, deps extends Partial<Dependencies> = {}>(
    args: {
      run: (req: { UseCase: UseCaseDependency, input: input } & deps) => Response<output, problem>
    }
  ): UseCase<input, output, problem, deps> => ({
    [run]: args.run
  })
}

// Dependencies - to ensure that naming conventions are followed
// across all use cases, we define the possible dependencies
// that a usecase can request.
// 
// This even protects us from typos like: "{ Repo: Perso }"
export type UseCaseDependencies = Partial<Dependencies>

type Dependencies = {
  Repo: {
    Person: PersonRepository
  }
  UseCase: UseCaseDependency
}


type UseCaseDependency = {
  run: <i, o, p>(useCase: UseCase<i, o, p>, input: i) => o | p
  runWithDeps: <i, o, p, d>(useCase: UseCase<i, o, p, d>, input: i, deps: d) => o | p
}

// UseCaseRunner - the only way to actually execute a use case!
export const UseCaseRunner = {
  run: <input, output, problem = never, dependencies extends UseCaseDependencies = {}>(
    useCase: UseCase<input, output, problem, dependencies>,
    input: input,
    deps: dependencies
  ): Response<output, problem> => {
    let auditLogs: AuditLog[] = []

    const runUseCase = <i, o, p>(useCase: UseCase<i, o, p>, input: i) =>
      runUseCaseWithDeps(useCase, input, {})

    const runUseCaseWithDeps = <i, o, p, d extends UseCaseDependencies>(
      useCase: UseCase<i, o, p, d>,
      input: i,
      deps: d
    ): o | p => {
      const response = useCase[run]({
        input,
        UseCase: {
          run: runUseCase,
          runWithDeps: runUseCaseWithDeps
        },
        ...deps
      })
      auditLogs = auditLogs.concat(response.auditLogs)
      return Result.toUnion(response.result)
    }

    return useCase[run]({
      ...deps,
      input,
      UseCase: {
        run: runUseCase,
        runWithDeps: runUseCaseWithDeps
      }
    })
  }
}



// Response - the value returned by a UseCase
export type Response<output, problem = never> = Promise<{
  result: Result<output, problem>
  auditLogs: AuditLog[]
}>


export const Response = {
  success: <output>({ value, auditLogs }: { value: output, auditLogs: AuditLog[] }): Response<output, never> =>
    Promise.resolve({
      result: { kind: 'success', value },
      auditLogs
    }),
  failure: <problem>({ problem }: { problem: problem }): Response<never, problem> =>
    Promise.resolve({
      result: { kind: 'failure', problem },
      auditLogs: []
    })
}


