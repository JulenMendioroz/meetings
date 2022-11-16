import { getSP } from "../../../spConfig"
import { IGroup } from "../models/IGroup"
import { getTaxField, getMultiTaxField } from "../utils/taxFields"

const getAll = async (): Promise<IGroup[]> => {

  const groups = await getSP()
    .web.lists.getByTitle("Groups")
    .items.select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")()

  return groups.map((group) => ({
    code: group.GroupCode,
    sector: group.GroupSector,
    description: group.GroupDescription,
    createdAt: group.GroupCreatedAt,
    finishedAt: group.GroupFinishedAt,
    state: group.GroupState,
    type: group.GroupType,
    theme: group.GroupTheme,
    ambit: getMultiTaxField(group, "GroupAmbit"),
    country: getTaxField(group, "GroupCountry"),
    city: getTaxField(group, "GroupCity"),
  }))
}

export const groupService = {
  getAll,
}
