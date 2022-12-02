import type { IDropdownOption } from "office-ui-fabric-react";
import type { IPickerTerms } from "@pnp/spfx-controls-react";

import type { IGroup } from "../../../models/IGroup";

export interface IGroupFormState {
  id?: number;
  code: string;
  sector?: IDropdownOption;
  name: string;
  description: string;
  createdAt: string;
  finishedAt: string;
  state: boolean;
  type?: IDropdownOption;
  theme?: IDropdownOption;
  country: IPickerTerms;
  city: IPickerTerms;
}

export interface IGroupFormProps {
  group?: IGroup;
  isEditable?: boolean;
  onSubmit?: (form: IGroup) => void;
}
