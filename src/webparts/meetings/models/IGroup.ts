// import { ITaxField } from "../utils/taxFields"

export interface IGroup {
  id: number,
  code: string
  name: string
  sector: string
  description?: string
  createdAt: Date
  finishedAt?: Date
  state: boolean
  type: string
  theme: string
  // ambit: ITaxField[]
  // country: ITaxField
  // city: ITaxField
}
