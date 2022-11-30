import * as React from "react";
import { Outlet, Link } from "react-router-dom";

export function Layout(): React.ReactElement {
  return (
    <>
      <header style={{display: "flex", gap: "1rem"}}>
        <Link to="/">Groups</Link>
        <Link to="/create">Create</Link>
      </header>
      <main>
        <Outlet />
      </main>
      <footer style={{textAlign: "center"}}>Taller 4</footer>
    </>
  );
}
