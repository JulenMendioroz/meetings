import * as React from "react";
import {
  Dropdown,
  IDropdownProps,
  PrimaryButton,
  TextField,
  Toggle,
} from "office-ui-fabric-react";
import { IPickerTerms, TaxonomyPicker } from "@pnp/spfx-controls-react";

import { groupService } from "../../../services/groupService";
import type { IGroupFormState, IGroupFormProps } from "./IGroupFormProps";
import { sectorService } from "../../../services/sectorService";
import { useSP } from "../../Meetings";

const withGroupSectors =
  (
    Component: React.FC<IDropdownProps>
  ): React.FC<Omit<IDropdownProps, "options">> =>
  (props) => {
    const [sectors, setSectors] = React.useState<any[]>([]);
    React.useEffect(() => {
      sectorService.getAll().then(setSectors).catch(console.error);
    }, []);

    const options = sectors.map((s) => ({ key: s.ID, text: s.SectorName }));
    return <Component {...props} options={options} />;
  };

const withGroupThemes =
  (
    Component: React.FC<IDropdownProps>
  ): React.FC<Omit<IDropdownProps, "options">> =>
  (props) => {
    const [themes, setThemes] = React.useState<string[]>([]);
    React.useEffect(() => {
      groupService.getThemes().then(setThemes).catch(console.error);
    }, []);

    const options = themes.map((t) => ({ key: t, text: t }));
    return <Component {...props} options={options} />;
  };

const withGroupTypes =
  (
    Component: React.FC<IDropdownProps>
  ): React.FC<Omit<IDropdownProps, "options">> =>
  (props) => {
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

const defaultForm: IGroupFormState = {
  code: "",
  sector: null,
  name: "",
  description: "",
  createdAt: "",
  finishedAt: "",
  state: true,
  type: null,
  theme: null,
  ambit: [],
  country: [],
  city: [],
};

export function GroupForm({
  isEditable = true,
  initialForm = defaultForm,
  onSubmit,
}: IGroupFormProps): React.ReactElement {
  const [form, setForm] = React.useState(initialForm);
  const { context } = useSP();

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    console.log(form);
    onSubmit?.(form);
  };

  const handleFieldChange =
    (field: keyof typeof form): ((_: unknown, newValue?: any) => void) =>
    (_, newValue) => {
      setForm((prev) => ({ ...prev, [field]: newValue }));
    };
  const handleTaxFieldChange =
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
        onChange={handleFieldChange("code")}
        disabled={!isEditable}
      />
      <DropdownWithGroupSectors
        label="Sector:"
        selectedKey={form.sector?.key}
        onChange={handleFieldChange("sector")}
        disabled={!isEditable}
      />
      <TextField
        label="Group name:"
        name="name"
        value={form.name}
        onChange={handleFieldChange("name")}
        disabled={!isEditable}
      />
      <TextField
        label="Description:"
        name="description"
        multiline={true}
        value={form.description}
        onChange={handleFieldChange("description")}
        disabled={!isEditable}
      />
      <TextField
        type="date"
        label="Created at:"
        name="createdAt"
        value={form.createdAt}
        onChange={handleFieldChange("createdAt")}
        disabled={!isEditable}
      />
      <TextField
        type="date"
        label="Finished at:"
        name="finishedAt"
        value={form.finishedAt}
        onChange={handleFieldChange("finishedAt")}
        disabled={!isEditable}
      />
      <Toggle
        id="state"
        label="State:"
        checked={form.state}
        onChange={handleFieldChange("state")}
        disabled={!isEditable}
      />
      <DropdownWithGroupTypes
        label="Type:"
        selectedKey={form.type?.key}
        onChange={handleFieldChange("type")}
        disabled={!isEditable}
      />
      <DropdownWithGroupThemes
        label="Theme:"
        selectedKey={form.theme?.key}
        onChange={handleFieldChange("theme")}
        disabled={!isEditable}
      />
      {/* <TaxonomyPicker
        label="Ambit"
        initialValues={form.ambit}
        onChange={handleTaxFieldChange("ambit")}
        context={context}
        panelTitle="Pick an ambit"
        termsetNameOrID="Department"
        allowMultipleSelections={true}
        disabled={!isEditable}
      /> */}
      <TaxonomyPicker
        label="Country"
        initialValues={form.country}
        onChange={handleTaxFieldChange("country")}
        context={context}
        panelTitle="Pick a country"
        termsetNameOrID="Countries"
        disabled={!isEditable}
      />
      <TaxonomyPicker
        label="City"
        initialValues={form.city}
        onChange={handleTaxFieldChange("city")}
        context={context}
        panelTitle="Pick a city"
        termsetNameOrID="Cities"
        disabled={!isEditable}
      />
      <PrimaryButton type="submit" disabled={!isEditable}>
        Submit
      </PrimaryButton>
    </form>
  );
}
