import type { ISector } from "../models/ISector";
import { sectorRepository } from "../repositories/sectorRepository";

const getAll = async (): Promise<ISector[]> => {
  const sectors = await sectorRepository.getAll();
  return sectors.map((sector) => ({
    id: sector.ID,
    name: sector.SectorName,
  }));
};

export const sectorService = {
  getAll,
};
