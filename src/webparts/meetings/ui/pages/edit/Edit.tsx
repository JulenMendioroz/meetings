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

  const setIsNotNumericIDError = (): void =>
    setError(`Error: ID should be a number`);

  const setGroupIDDoesNotExistError = (): void =>
    setError(`Error: group with ID: ${id} does not exist`);

  React.useEffect(() => {
    const _id = Number(id);
    if (Number.isNaN(_id)) {
      setIsNotNumericIDError();
    }
    groupService
      .getById(_id)
      .then(setGroup)
      .catch(() => setGroupIDDoesNotExistError())
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;
  return <GroupForm isEditable={true} onSubmit={groupService.create} />;
}
