import { Outlet } from "react-router-dom";
import EditModal from "../components/EditModal";

function Layout() {
  return (
    <>
      <main className="layout grid place-items-center">
        <Outlet />
      </main>
      <EditModal />
    </>
  );
}

export default Layout;
