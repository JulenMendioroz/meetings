import { getSP } from "../../../spConfig";

const getAll = async (): Promise<any[]> => {
  const sectors = await getSP()
    .web.lists.getByTitle("Sectors")
    .items.select("ID", "SectorName")();

  return sectors;
};

export const sectorRepository = {
  getAll,
};
