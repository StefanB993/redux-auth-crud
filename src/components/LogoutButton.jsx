import { useDispatch } from "react-redux";
import { logout } from "../store";
import toast from "react-hot-toast";

function LogoutButton() {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logout());
    toast.success("Successful logout!");
  }
  return <button onClick={handleLogout}>Logout</button>;
}

export default LogoutButton;
