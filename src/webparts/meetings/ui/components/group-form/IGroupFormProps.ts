import type { IDropdownOption } from "office-ui-fabric-react";
import type { IPickerTerms } from "@pnp/spfx-controls-react";

export interface IGroupFormState {
  code: string;
  sector?: IDropdownOption;
  name: string;
  description: string;
  createdAt: string;
  finishedAt: string;
  state: true;
  type?: IDropdownOption;
  theme?: IDropdownOption;
  ambit: IPickerTerms;
  country: IPickerTerms;
  city: IPickerTerms;
}

export interface IGroupFormProps {
  initialForm?: IGroupFormState;
  isEditable?: boolean;
  onSubmit?: (form: IGroupFormState) => void;
}
