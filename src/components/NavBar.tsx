import { Link, Outlet } from "react-router-dom";

export default function Navbar() {
  return (
    <>
      <nav>
        <Link to="/"></Link>
        <Link to="#"></Link>
        <Link to="#"></Link>
      </nav>

      <main>
        <Outlet />
      </main>
    </>
  );
}
