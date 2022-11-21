import { getSP } from "../../../spConfig";
import { IGroup } from "../models/IGroup";
import { getTaxField, getMultiTaxField } from "../utils/taxFields";

const getAll = async (): Promise<IGroup[]> => {
  const groups = await getSP()
    .web.lists.getByTitle("Groups")
    .items.select(
      "*",
      "TaxCatchAll/Term",
      "TaxCatchAll/ID",
      "GroupSector/SectorName"
    )
    .expand("TaxCatchAll", "GroupSector")();

  return groups.map((group) => ({
    code: group.GroupCode,
    name: group.GroupName,
    sector: group.GroupSector.SectorName,
    description: group.GroupDescription,
    createdAt: new Date(group.GroupCreatedAt),
    finishedAt: new Date(group.GroupFinishedAt),
    state: group.GroupState,
    type: group.GroupType,
    theme: group.GroupTheme,
    ambit: getMultiTaxField(group, "GroupAmbit"),
    country: getTaxField(group, "GroupCountry"),
    city: getTaxField(group, "GroupCity"),
  }));
};

export const groupService = {
  getAll,
};
