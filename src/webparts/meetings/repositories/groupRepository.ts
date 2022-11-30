import type { IFieldInfo } from "@pnp/sp/fields";
import type { IList } from "@pnp/sp/lists";

import { getSP } from "../../../spConfig";

const getList = (): IList => getSP().web.lists.getByTitle("Groups");

const getById = async (id: number): Promise<any> => {
  const group = await getList()
    .items.getById(id)
    .select("*", "TaxCatchAll/Term", "TaxCatchAll/ID", "GroupSector/SectorName")
    .expand("TaxCatchAll", "GroupSector")();
  return group;
};

const getAll = async (): Promise<any[]> => {
  const groups = await getList()
    .items.select(
      "*",
      "TaxCatchAll/Term",
      "TaxCatchAll/ID",
      "GroupSector/SectorName"
    )
    .expand("TaxCatchAll", "GroupSector")();
  return groups;
};

const getInfoFromField =
  (fieldName: string): (() => Promise<IFieldInfo>) =>
  () =>
    getList().fields.getByInternalNameOrTitle(fieldName)();

const getTypes = getInfoFromField("GroupType");

const getThemes = getInfoFromField("GroupTheme");

const create = async (group: any): Promise<void> => {
  await getList().items.add(group);
};

const update = async (id: number, group: any): Promise<void> => {
  await getList().items.getById(id).update(group);
};

export const groupRepository = {
  getById,
  getAll,
  getTypes,
  getThemes,
  create,
  update,
};
