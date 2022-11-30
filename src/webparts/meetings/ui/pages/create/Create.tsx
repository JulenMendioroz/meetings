import * as React from "react";
import { groupService } from "../../../services/groupService";
import { GroupForm } from "../../components/group-form";

export function Create(): React.ReactElement {
  return <GroupForm isEditable={true} onSubmit={groupService.create} />;
}
