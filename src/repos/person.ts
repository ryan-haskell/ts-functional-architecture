import { Person } from "@domain/person"
import { Id } from "@domain/id"

export type PersonRepository = {
  existsWithEmail: (input: { email: string }) => Promise<boolean>
  create: (input: { fullname: string, email: string }) => Promise<Person>
}

// TODO: Use prisma
const actual: PersonRepository = {
  existsWithEmail: async ({ email }) => {
    return false
  },
  create: async ({ fullname, email }) => ({
    id: Id.create(),
    fullname,
    email
  })
}

const mocked: PersonRepository = {
  existsWithEmail: async ({ email }) => {
    return email === 'ryan@blissfully.com'
  },
  create: async ({ fullname, email }) => ({
    id: Id.create(),
    fullname,
    email
  })
}

export const PersonRepository = {
  actual,
  mocked
}