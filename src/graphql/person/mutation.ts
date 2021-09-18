import {
  Person_Create,
  Person_Update,
  Person_Result,
  ID
} from "@graphql/types"

type Input = {
  create?: Person_Create[],
  update?: Person_Update[],
  delete?: ID[]
}

export const handle = async (input: Input): Promise<Person_Result> => {
  // TODO: Transform input to match use-case
  // TODO: Call "useCase.personCreate", "useCase.personUpdate", and "useCase.personDelete",
  // TODO: Transform use-case output to match GQL type
  return Promise.reject("Unimplemented")
}