import * as React from "react";
import { DetailsList } from "office-ui-fabric-react";

import { groupService } from "../services/groupService";
import type { IGroup } from "../models/IGroup";
import type { IMeetingsProps } from "./IMeetingsProps";
// import styles from "./Meetings.module.scss"

const SPContext = React.createContext(null);

export default function Meetings(props: IMeetingsProps): React.ReactElement {
  const { context } = props;
  // const [groups, setGroups] = React.useState<IGroup[]>([]);

  // React.useEffect(() => {
  //   groupService.getAll().then(setGroups).catch(console.error);
  // }, []);

  return <SPContext.Provider value={context}></SPContext.Provider>;

  // return (
  //   <section>
  //     <pre>{JSON.stringify(groups, null, 2)}</pre>
  //     <DetailsList items={groups} />
  //   </section>
  // );
}
