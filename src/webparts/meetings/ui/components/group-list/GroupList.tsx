import * as React from "react";
import { groupService } from "../../../services/groupService";
import type { IGroup } from "../../../models/IGroup";
import { Link } from "react-router-dom";

export function GroupList(): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroup[]>([]);

  React.useEffect(() => {
    groupService.getAll().then(setGroups).catch(console.error);
  }, []);

  // return <pre>{JSON.stringify(groups, null, 2)}</pre>;
  // console.log(groups)
  return (
    <ul>
      {groups.map(({ id, name }) => (
        <li key={id}>
          <Link to={`/edit/${id}`}>{name}</Link>
        </li>
      ))}
    </ul>
  );
}
