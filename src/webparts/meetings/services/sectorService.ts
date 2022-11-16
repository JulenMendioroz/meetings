import { getSP } from "../../../spConfig"

const getAll = async (): Promise<unknown[]> => {
  const sectors = await getSP()
    .web.lists.getByTitle("Sectors")
    .items.select("*")()
    
  return sectors
}

export const sectorService = {
  getAll,
}
