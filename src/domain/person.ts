import { Id } from "@domain/id"

export type Person = {
  id: Id,
  fullname: string,
  email: string
}

const firstName = (person: Person): string =>
  person.fullname.split(' ')[0]

const lastName = (person: Person): string =>
  person.fullname.split(' ').slice(-1)[0]

export const Person = {
  firstName,
  lastName
}