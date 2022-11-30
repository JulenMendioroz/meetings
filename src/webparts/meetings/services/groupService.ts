import type { IGroup } from "../models/IGroup";

import { buildTaxField } from "../utils/taxFields";
import { groupRepository } from "../repositories/groupRepository";
import { IGroupFormState } from "../ui/components/group-form/IGroupFormProps";

const toIGroup = (group: any): IGroup => ({
  id: group.ID,
  code: group.GroupCode,
  name: group.GroupName,
  sector: group.GroupSector?.SectorName,
  description: group.GroupDescription,
  createdAt: new Date(group.GroupCreatedAt),
  finishedAt: new Date(group.GroupFinishedAt),
  state: group.GroupState,
  type: group.GroupType,
  theme: group.GroupTheme,
  // ambit: getMultiTaxField(group, "GroupAmbit"),
  // country: getTaxField(group, "GroupCountry"),
  // city: getTaxField(group, "GroupCity"),
});

const getById = async (id: number): Promise<IGroup> => {
  const group = await groupRepository.getById(id);
  return toIGroup(group);
};

const getAll = async (): Promise<IGroup[]> => {
  const groups = await groupRepository.getAll();
  return groups.map(toIGroup);
};

const getTypes = async (): Promise<string[]> => {
  const types = await groupRepository.getTypes();
  return types.Choices;
};

const getThemes = async (): Promise<string[]> => {
  const themes = await groupRepository.getThemes();
  return themes.Choices;
};

const create = async (group: IGroupFormState): Promise<void> => {
  await groupRepository.create({
    Title: null,
    GroupCode: group.code,
    GroupName: group.name,
    GroupSectorId: group.sector.id,
    GroupDescription: group.description,
    GroupCreatedAt: new Date(group.createdAt),
    GroupFinishedAt: group.finishedAt ? new Date(group.finishedAt) : null,
    GroupState: group.state,
    GroupType: group.type.key,
    GroupTheme: group.theme.key,
    // GroupAmbit: buildMultiTaxField(group.ambit),
    GroupCountry: buildTaxField(group.country),
    GroupCity: buildTaxField(group.city),
  });
};

const update = async (id: number, group: IGroupFormState): Promise<void> => {
  await groupRepository.update(id, {
    Title: null,
    GroupCode: group.code,
    GroupName: group.name,
    GroupSectorId: 5,
    GroupDescription: group.description,
    GroupCreatedAt: new Date(group.createdAt),
    GroupFinishedAt: group.finishedAt ? new Date(group.finishedAt) : null,
    GroupState: group.state,
    GroupType: group.type.key,
    GroupTheme: group.theme.key,
    // GroupAmbit: buildMultiTaxField(group.ambit),
    GroupCountry: buildTaxField(group.country),
    GroupCity: buildTaxField(group.city),
  });
};

export const groupService = {
  getById,
  getAll,
  getTypes,
  getThemes,
  create,
  update,
};
