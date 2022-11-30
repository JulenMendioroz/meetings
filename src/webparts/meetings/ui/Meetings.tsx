import * as React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import type { WebPartContext } from "@microsoft/sp-webpart-base";

import { Create } from "./pages/create";
import { Edit } from "./pages/edit";
import { Groups } from "./pages/groups";
import type { IMeetingsProps } from "./IMeetingsProps";
import { Layout } from "./components/layout";

interface IUseSP {
  context: WebPartContext;
}
const SPContext = React.createContext(null);

export const useSP = (): IUseSP => React.useContext(SPContext);

export default function Meetings({
  context,
}: IMeetingsProps): React.ReactElement {
  return (
    <SPContext.Provider value={{ context }}>
      <Router>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Groups />} />
            <Route path="/create" element={<Create />} />
            <Route path="/edit/:id" element={<Edit />} />
          </Route>
        </Routes>
      </Router>
    </SPContext.Provider>
  );
}
