# UseCase Template

New use cases should be generated via the CLI:

```bash
yarn gen:usecase personCreate
```

```ts
import { Response, UseCase, UseCaseDependencies } from "@core/useCase"

type Input = {

}

type Output = {

}

enum Problem {
  NOT_IMPLEMENTED = "NOT_IMPLEMENTED"
}

interface Dependencies extends UseCaseDependencies {

}

export const useCase: UseCase<Input, Output, Problem, Dependencies> =
  UseCase.create({
    run: ({ input, UseCase }) => {
      return Response.failure({
        problem: Problem.NOT_IMPLEMENTED
      })
    }
  })
```