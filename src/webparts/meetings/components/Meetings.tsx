import * as React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import type { WebPartContext } from "@microsoft/sp-webpart-base";

import type { IMeetingsProps } from "./IMeetingsProps";

const SPContext = React.createContext(null);
export const useSPContext = (): WebPartContext => React.useContext(SPContext);

export default function Meetings({
  context,
}: IMeetingsProps): React.ReactElement {
  return (
    <SPContext.Provider value={context}>
      <Router>
        <Routes>
          <Route path="/" element={<>root</>} />
        </Routes>
      </Router>
    </SPContext.Provider>
  );
}
