import * as React from "react";
import { DetailsList } from "office-ui-fabric-react";

import { groupService } from "../services/groupService";
import type { IGroup } from "../models/IGroup";
import type { IMeetingsProps } from "./IMeetingsProps";
// import styles from "./Meetings.module.scss"

export default function Meetings(props: IMeetingsProps): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroup[]>([]);

  React.useEffect(() => {
    groupService.getAll().then(setGroups).catch(console.error);
  }, []);

  return (
    <section>
      <pre>{JSON.stringify(groups, null, 2)}</pre>
      <DetailsList items={groups} />
    </section>
  );
}
