import {
  Person_Filter,
  Person_Sort,
  Pagination,
  Person,
  Nullable
} from "@graphql/types"

type Input = {
  filter?: Nullable<Person_Filter>,
  sort?: Nullable<Person_Sort>,
  pagination?: Nullable<Pagination>
}

export const handle = async (input: Input): Promise<Person[]> => {
  // TODO: Transform input to match use-case
  // TODO: Call "useCase.personGet"
  // TODO: Transform use-case output to match GQL type
  return Promise.reject("Unimplemented")
}