import { Response, UseCase, UseCaseRunner } from "@core/useCase"

export type TestSuite<input, output, problem, deps> =
  Test<input, output, problem, deps>[]

type Test<input, output, problem, deps = {}> = {
  when: string
  it: string,
  given: input
  expect: Response<output, problem>
  deps?: deps
}

export const TestSuite = {
  run: async <i, o, p, d>(args: {
    useCase: UseCase<i, o, p, d>,
    suite: TestSuite<i, o, p, d>,
    deps: d
  }) => {
    for (const test_ of args.suite) {
      test(`When ${test_.when}, it ${test_.it}.`, async () => {
        const dependencies = test_.deps || args.deps
        const result = await UseCaseRunner.run(args.useCase, test_.given, dependencies)
        expect(result).toEqual(await test_.expect)
      })
    }
  }
}
