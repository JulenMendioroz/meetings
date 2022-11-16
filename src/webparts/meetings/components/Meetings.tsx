import * as React from "react"
// import { escape } from "@microsoft/sp-lodash-subset"

import { IMeetingsProps } from "./IMeetingsProps"
// import styles from "./Meetings.module.scss"
import { groupService } from "../services/groupService"
import { IGroup } from "../models/IGroup"

export default function Meetings(props: IMeetingsProps): React.ReactElement {
  const [groups, setGroups] = React.useState<IGroup[]>([])

  React.useEffect(() => {
    groupService.getAll().then(setGroups).catch(console.error)
  }, [])

  return (
    <section>
      <pre>{JSON.stringify(groups, null, 2)}</pre>
    </section>
  )
}
