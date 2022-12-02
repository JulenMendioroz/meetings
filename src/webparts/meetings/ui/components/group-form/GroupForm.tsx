import * as React from "react";
import {
  Dropdown,
  IDropdownOption,
  IDropdownProps,
  PrimaryButton,
  TextField,
  Toggle,
} from "office-ui-fabric-react";
import { TaxonomyPicker } from "@pnp/spfx-controls-react";
import type { IPickerTerms } from "@pnp/spfx-controls-react";

import { buildTaxField } from "../../../utils/tax-fields/taxFields";
import { formatDateForInput } from "../../../utils/date/formatDateForInput";
import { groupService } from "../../../services/groupService";
import type { IGroup } from "../../../models/IGroup";
import type { IGroupFormProps, IGroupFormState } from "./IGroupFormProps";
import type { ISector } from "../../../models/ISector";
import { sectorService } from "../../../services/sectorService";
import { useSP } from "../../Meetings";

type HoC<T, P extends keyof T> = (
  Component: React.FC<T>
) => React.FC<Omit<T, P>>;
type DropdownWithOptions = HoC<IDropdownProps, "options">;

const withGroupSectors: DropdownWithOptions = (Component) => (props) => {
  const [sectors, setSectors] = React.useState<ISector[]>([]);
  React.useEffect(() => {
    sectorService.getAll().then(setSectors).catch(console.error);
  }, []);

  const options = sectors.map((s) => ({ key: s.id, text: s.name }));
  return <Component {...props} options={options} />;
};
const withGroupThemes: DropdownWithOptions = (Component) => (props) => {
  const [themes, setThemes] = React.useState<string[]>([]);
  React.useEffect(() => {
    groupService.getThemes().then(setThemes).catch(console.error);
  }, []);

  const options = themes.map((t) => ({ key: t, text: t }));
  return <Component {...props} options={options} />;
};
const withGroupTypes: DropdownWithOptions = (Component) => (props) => {
  const [types, setTypes] = React.useState<string[]>([]);
  React.useEffect(() => {
    groupService.getTypes().then(setTypes).catch(console.error);
  }, []);

  const options = types.map((t) => ({ key: t, text: t }));
  return <Component {...props} options={options} />;
};

const DropdownWithGroupSectors = withGroupSectors(Dropdown);
const DropdownWithGroupThemes = withGroupThemes(Dropdown);
const DropdownWithGroupTypes = withGroupTypes(Dropdown);

const defaultFormState: IGroupFormState = {
  id: null,
  code: "",
  sector: null,
  name: "",
  description: "",
  createdAt: formatDateForInput(new Date()),
  finishedAt: "",
  state: true,
  type: null,
  theme: null,
  country: [],
  city: [],
};

const toState = (group: IGroup): IGroupFormState => {
  return {
    id: group.id,
    code: group.code,
    sector: {
      key: group.sector.id,
      text: group.sector.name,
    },
    name: group.name,
    description: group.description,
    createdAt: formatDateForInput(group.createdAt),
    finishedAt: group.finishedAt && formatDateForInput(group.finishedAt),
    state: group.state,
    type: {
      key: group.type,
      text: group.type,
    },
    theme: {
      key: group.theme,
      text: group.theme,
    },
    country: [
      {
        key: group.country.TermGuid,
        name: group.country.Label,
        path: "",
        termSet: "",
      },
    ],
    city: [
      {
        key: group.city.TermGuid,
        name: group.city.Label,
        path: "",
        termSet: "",
      },
    ],
  };
};

const fromState = (form: IGroupFormState): IGroup => {
  return {
    id: form.id,
    code: form.code,
    name: form.name,
    sector: {
      id: Number(form.sector.key),
      name: form.sector.text,
    },
    description: form.description,
    createdAt: new Date(form.createdAt),
    finishedAt: new Date(form.finishedAt),
    state: form.state,
    type: form.type.text,
    theme: form.theme.text,
    country: buildTaxField(form.country),
    city: buildTaxField(form.city),
  };
};

export function GroupForm({
  isEditable = true,
  group,
  onSubmit = console.log,
}: IGroupFormProps): React.ReactElement {
  const [form, setForm] = React.useState(() =>
    group ? toState(group) : defaultFormState
  );
  const { context } = useSP();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    const group = fromState(form);
    onSubmit(group);
  };

  const handleTextFieldChange =
    (field: keyof typeof form): ((_: unknown, newValue?: string) => void) =>
    (_, newValue) => {
      setForm((prev) => ({ ...prev, [field]: newValue }));
    };

  const handleDropdownChange =
    (
      field: keyof typeof form
    ): ((_: unknown, newValue?: IDropdownOption) => void) =>
    (_, newValue) => {
      setForm((prev) => ({ ...prev, [field]: newValue }));
    };

  const handleToggleChange =
    (field: keyof typeof form): ((_: unknown, newValue?: boolean) => void) =>
    (_, newValue) => {
      setForm((prev) => ({ ...prev, [field]: newValue }));
    };

  const handleTaxPickerChange =
    (field: keyof typeof form): ((newValue?: IPickerTerms) => void) =>
    (newValue?: IPickerTerms) => {
      setForm((prev) => ({ ...prev, [field]: newValue }));
    };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Group code:"
        name="code"
        value={form.code}
        onChange={handleTextFieldChange("code")}
        disabled={!isEditable}
        required={true}
      />
      <DropdownWithGroupSectors
        label="Sector:"
        selectedKey={form.sector?.key}
        onChange={handleDropdownChange("sector")}
        disabled={!isEditable}
        required={true}
      />
      <TextField
        label="Group name:"
        name="name"
        value={form.name}
        onChange={handleTextFieldChange("name")}
        disabled={!isEditable}
        required={true}
      />
      <TextField
        label="Description:"
        name="description"
        multiline={true}
        value={form.description}
        onChange={handleTextFieldChange("description")}
        disabled={!isEditable}
      />
      <TextField
        type="date"
        label="Created at:"
        name="createdAt"
        value={form.createdAt}
        onChange={handleTextFieldChange("createdAt")}
        disabled={!isEditable}
        required={true}
      />
      <TextField
        type="date"
        label="Finished at:"
        name="finishedAt"
        value={form.finishedAt}
        onChange={handleTextFieldChange("finishedAt")}
        disabled={!isEditable}
      />
      <Toggle
        id="state"
        label="State:"
        checked={form.state}
        onChange={handleToggleChange("state")}
        disabled={!isEditable}
      />
      <DropdownWithGroupTypes
        label="Type:"
        selectedKey={form.type?.key}
        onChange={handleDropdownChange("type")}
        disabled={!isEditable}
        required={true}
      />
      <DropdownWithGroupThemes
        label="Theme:"
        selectedKey={form.theme?.key}
        onChange={handleDropdownChange("theme")}
        disabled={!isEditable}
        required={true}
      />
      <TaxonomyPicker
        label="Country"
        initialValues={form.country}
        onChange={handleTaxPickerChange("country")}
        context={context}
        panelTitle="Pick a country"
        termsetNameOrID="Countries"
        disabled={!isEditable}
        required={true}
      />
      <TaxonomyPicker
        label="City"
        initialValues={form.city}
        onChange={handleTaxPickerChange("city")}
        context={context}
        panelTitle="Pick a city"
        termsetNameOrID="Cities"
        disabled={!isEditable}
        required={true}
      />
      <PrimaryButton type="submit" disabled={!isEditable}>
        Submit
      </PrimaryButton>
    </form>
  );
}
