import { TestSuite } from "@core/testSuite"
import { Response } from "@core/useCase"
import { AuditLog } from "@domain/auditLog"
import { Id } from "@domain/id"
import { PersonRepository } from "@repos/person"
import { Dependencies, Input, Output, Problem, useCase } from "@useCases/personCreate"

const suite: TestSuite<Input, Output, Problem, Dependencies> = [
  {
    when: 'email address is already taken',
    it: 'returns a problem',
    given: {
      fullname: 'Ryan Haskell-Glatz',
      email: 'ryan@blissfully.com'
    },
    expect: Response.failure({
      problem: Problem.EMAIL_IN_USE
    })
  },
  {
    when: 'all input is valid',
    it: 'creates a new user',
    given: {
      fullname: 'Ryan Haskell-Glatz',
      email: 'rhg@blissfully.com'
    },
    expect: Response.success({
      value: {
        person: {
          id: Id.create(),
          fullname: 'Ryan Haskell-Glatz',
          email: 'rhg@blissfully.com'
        }
      },
      auditLogs: [AuditLog.PERSON_CREATED]
    })
  },
]

// Run the test suite
TestSuite.run({
  useCase,
  suite,
  deps: {
    Repo: {
      Person: PersonRepository.mocked
    }
  }
})