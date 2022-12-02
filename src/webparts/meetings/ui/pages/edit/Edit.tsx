import { MessageBar, MessageBarType } from "office-ui-fabric-react";
import * as React from "react";
import { useParams } from "react-router-dom";
import { IGroup } from "../../../models/IGroup";
import { groupService } from "../../../services/groupService";
import { GroupForm } from "../../components/group-form";

export function Edit(): React.ReactElement {
  const { id } = useParams();
  const [group, setGroup] = React.useState<IGroup>(null);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<string>("");

  React.useEffect(() => {
    const _id = Number(id);
    if (Number.isNaN(_id)) {
      setError(`Error: ID should be a number`);
      setLoading(false);
      return;
    }
    groupService
      .getById(_id)
      .then(setGroup)
      .catch(() => setError(`Error: group with ID: ${id} does not exist`))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error)
    return (
      <MessageBar messageBarType={MessageBarType.error}>{error}</MessageBar>
    );
  return (
    <GroupForm isEditable={true} onSubmit={groupService.update} group={group} />
  );
}
