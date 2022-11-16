import { ITaxField } from "../utils/taxFields"

export interface IGroup {
  code: string
  sector: string
  description?: string
  createdAt: Date
  finishedAt?: Date
  state: boolean
  type: string
  theme: string
  ambit: ITaxField[]
  country: ITaxField
  city: ITaxField
}
