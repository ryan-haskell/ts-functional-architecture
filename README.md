# TypeScript Functional Architecture


A backend architecture loosely based off of the "Clean" Architecture, but without using classes because inheritance is bad and the behavior of the `this` keyword is inconsistent and spooky in the TS/JS ecosystem.

## Layers

This project is broken up into layers so that each piece of our codebase is:
1. Focused on one thing
1. Easier to test (and those tests run faster!)


```bash
src/
  - core/...
  - domain/...
  - graphql/...
  - repos/...
  - useCases/...
```

Here's a breakdown of the layers you will find in this project, and their individual purposes:

### Core

The "core" folder is not actually a layer. It provides some functions and types for making this architecture framework possible.

Let's move onto our first _real_ layer!

### Domain

Files in the __domain layer__ are simple data structures that can only be composed of built-in values, data structures, or other domain items.

This domain model __does not__ come from an ORM or any value tied into your persistence model.

For developer convenience, this is also a good place to define simple utility operations for transforming that one domain data structure into values.

An example of this might be getting the `Person.firstName`

```ts
import { Id } from '@domain/id'

export type Person = {
  id: Id,
  fullname: string
  email: string
}

export const Person = {
  firstName: (person: Person) => string,
  lastName: (person: Person) => string
}
```

### GraphQL

Our API users can send us garbage over the wire. GraphQL helps with this, but we'll still need to transform data as it enters and exits our API.

It's up to the __graphql layer__ to translate the user input into _domain values_, call _use cases_ that run the operation we want, and transform the domain values returned by that use case to match our GraphQL schema.

### Repo

The __repo layer__ is the only layer that creates side-effects in your application. A side-effect might be saving a person to a database, sending an audit log, or interacting with a 3rd party API.

If we were crazy extremists, `Repo.Console` would be the only way to make a `console.log`- but we aren't.

Each repo defines it's interface as a `type` and two versions of itself:
- The actual implementation that persists things to a database, sends a log, works with an API
- The _default_* mock implementation of this repository. I've emphasized "default" here because (when we get to the testing section of the guide) we'll reveal ways for a test to provide alternate behavior for mocking repo behavior.

### Use cases

The __use case layer__ is where our actual business logic lives. Each use case defines:

- the input it expects
- the dependencies it needs (repos, current user, etc)
- the success value it should return
- the problems it might run into.

Because use cases have their dependencies passed in with their input, they become incredibly efficient to test, and relatively easy to scan. It's important that use cases do not worry about:

- User input / output (that's the `graphql` layer's job!)
- Saving to databases or calling APIs (that's the `repo` layer's job!)

#### __Testing__

For every use-case in the `useCases` directory, there is an associated `.test.ts` file. Each one of these files define a test suite that describes the expected output for a given input.

Each test also allows you to override it's dependencies- so you can mock different edge cases easily.

Check out the example at [useCases/personCreate.test.ts](./src/useCases/personCreate.test.ts), or run it from the console with `npx jest`:

```
$ npx jest

 PASS  src/useCases/personCreate.test.ts
  ✓ When email address is already taken, it returns a problem. (2 ms)
  ✓ When all input is valid, it creates a new user.

Test Suites: 1 passed, 1 total
Tests:       2 passed, 2 total
Snapshots:   0 total
Time:        0.613 s, estimated 1 s
Ran all test suites.
```
