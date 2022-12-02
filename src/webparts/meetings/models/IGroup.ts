import type { ISector } from "./ISector";
import type { ITaxField } from "../utils/tax-fields/taxFields";

export interface IGroup {
  id: number;
  code: string;
  name: string;
  sector: ISector;
  description?: string;
  createdAt: Date;
  finishedAt?: Date;
  state: boolean;
  type: string;
  theme: string;
  country: ITaxField;
  city: ITaxField;
}
