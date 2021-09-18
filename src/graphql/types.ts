// 🤖 (Generated for us) 🤖
export type ID = string

export type Nullable<value> = value | null

export type Person = {
  id: ID
  fullname: string
  email: string
  createdAt: Date
  updatedAt: Date
  apps: App[]
}

export type Person_Filter = {
  name?: Nullable<String_Filter>
  email?: Nullable<String_Filter>
  createdAt?: Nullable<Date_Filter>
  updatedAt?: Nullable<Date_Filter>
  apps?: Nullable<Edge_Filter>

  or?: Nullable<Person_Filter[]>
  not?: Nullable<Person_Filter>
}

export type Person_Sort = {
  direction: SortDirection
  field: Person_SortField
}

export enum Person_SortField {
  NAME = "NAME",
  EMAIL = "EMAIL",
  CREATED_AT = "CREATED_AT",
  UPDATED_AT = "UPDATED_AT"
}

// APP

export type App = {
  id: ID
  name: string
}

export type String_Filter = {
  equals?: Nullable<string>
  contains?: Nullable<string>
  startsWith?: Nullable<string>
  endsWith?: Nullable<string>
}

export type Date_Filter = {
  equals?: Nullable<Date>
  before?: Nullable<Date>
  after?: Nullable<Date>
}

export type Edge_Filter = {
  includes?: Nullable<ID[]>
}

// Pagination and sorting

export enum SortDirection {
  ASC = "ASC",
  DESC = "DESC"
}

export type Pagination = {
  limit?: Nullable<number>
  skip?: Nullable<number>
}

//  TODO

export type Person_Create = {}
export type Person_Update = {}
export type Person_Result = {}