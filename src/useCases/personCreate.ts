import { Response, UseCase, UseCaseDependencies } from "@core/useCase"
import { AuditLog } from "@domain/auditLog"
import { Person } from "@domain/person"
import { PersonRepository } from "@repos/person"

export type Input = {
  fullname: string
  email: string
}

export type Output = {
  person: Person
}

export enum Problem {
  EMAIL_IN_USE = "EMAIL_IN_USE"
}

export interface Dependencies extends UseCaseDependencies {
  Repo: { Person: PersonRepository }
}

export const useCase: UseCase<Input, Output, Problem, Dependencies> =
  UseCase.create({
    run: async ({ Repo, input, UseCase }) => {

      // Make sure email is not already taken
      if (await Repo.Person.existsWithEmail(input)) {
        return Response.failure({
          problem: Problem.EMAIL_IN_USE
        })
      }

      // Create a person
      const person = await Repo.Person.create(input)

      return Response.success({
        value: { person },
        auditLogs: [AuditLog.PERSON_CREATED]
      })
    }
  })