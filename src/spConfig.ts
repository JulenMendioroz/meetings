import { WebPartContext } from "@microsoft/sp-webpart-base";
import { spfi, SPFI, SPFx } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";

let sp: SPFI;

export const setContext = (context: WebPartContext): void => {
  sp = spfi().using(SPFx(context));
};

export const getSP = (): SPFI => {
  return sp;
};
