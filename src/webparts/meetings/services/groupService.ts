import type { IGroup } from "../models/IGroup";

import { getTaxField } from "../utils/tax-fields/taxFields";
import { groupRepository } from "../repositories/groupRepository";

const toIGroup = (group: any): IGroup => ({
  id: group.ID,
  code: group.GroupCode,
  name: group.GroupName,
  sector: {
    id: group.GroupSector.ID,
    name: group.GroupSector.SectorName,
  },
  description: group.GroupDescription,
  createdAt: new Date(group.GroupCreatedAt),
  finishedAt: group.GroupFinishedAt && new Date(group.GroupFinishedAt),
  state: group.GroupState,
  type: group.GroupType,
  theme: group.GroupTheme,
  country: getTaxField(group, "GroupCountry"),
  city: getTaxField(group, "GroupCity"),
});

const getById = async (id: number): Promise<IGroup> => {
  const group = await groupRepository.getById(id);
  return toIGroup(group);
};

const getByName = async (name: string): Promise<IGroup[]> => {
  const groups = await groupRepository.getByName(name);
  return groups.map(toIGroup);
};

const getAll = async (): Promise<IGroup[]> => {
  const groups = await groupRepository.getAll();
  return groups.map(toIGroup);
};

const add = async (group: IGroup): Promise<void> => {
  await groupRepository.add({
    Title: null,
    GroupCode: group.code,
    GroupName: group.name,
    GroupSectorId: group.sector.id,
    GroupDescription: group.description,
    GroupCreatedAt: group.createdAt,
    GroupFinishedAt: group.finishedAt,
    GroupState: group.state,
    GroupType: group.type,
    GroupTheme: group.theme,
    GroupCountry: group.country,
    GroupCity: group.city,
  });
};

const update = async (group: IGroup): Promise<void> => {
  await groupRepository.update(group.id, {
    Title: null,
    GroupCode: group.code,
    GroupName: group.name,
    GroupSectorId: group.sector.id,
    GroupDescription: group.description,
    GroupCreatedAt: group.createdAt,
    GroupFinishedAt: group.finishedAt,
    GroupState: group.state,
    GroupType: group.type,
    GroupTheme: group.theme,
    GroupCountry: group.country,
    GroupCity: group.city,
  });
};

const getTypes = async (): Promise<string[]> => {
  const types = await groupRepository.getTypes();
  return types.Choices;
};

const getThemes = async (): Promise<string[]> => {
  const themes = await groupRepository.getThemes();
  return themes.Choices;
};

export const groupService = {
  getById,
  getByName,
  getAll,
  add,
  update,
  getTypes,
  getThemes,
};
