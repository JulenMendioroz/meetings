import * as React from "react";
import { escape } from "@microsoft/sp-lodash-subset";

import { IMeetingsProps } from "./IMeetingsProps";
import styles from "./Meetings.module.scss";
import { getSP } from "../../../spConfig";

// const getSectors = async (): Promise<unknown[]> =>{
//   const sectors = await getSP().web.lists.getByTitle("Sectors").items.select("*")();
//   return sectors
// }
const getSectors = async (): Promise<unknown[]> => {
  const sectors = await getSP()
    .web.lists.getByTitle("Groups")
    .items.select("*", "TaxCatchAll/Term", "TaxCatchAll/ID")
    .expand("TaxCatchAll")();
  return sectors;
};

export default function Meetings(props: IMeetingsProps): React.ReactElement {
  const [sectors, setSectors] = React.useState<unknown[]>([]);

  React.useEffect(() => {
    getSectors().then(console.log).catch(console.error);
  }, []);

  return (
    <section>
      <p>Meetings web part</p>
    </section>
  );
}
