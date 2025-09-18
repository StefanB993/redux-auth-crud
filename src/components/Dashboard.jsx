import { useSelector } from "react-redux";
import LogoutButton from "./LogoutButton";
import { selectId } from "../store";
import { useGetFriendsQuery } from "../store/api/friendsApi";
import DeleteButton from "./DeleteButton";
import AddFriendButton from "./AddFriendButton";
import EditButton from "./EditButton";

function Dashboard() {
  return (
    <div>
      <h1>Welcome to the Dashboard!</h1>
      <LogoutButton />
      <AddFriendButton />
      <FriendsList />
    </div>
  );
}

export default Dashboard;

function FriendsList() {
  const id = useSelector(selectId);
  const { data, error, isFetching } = useGetFriendsQuery(id);

  if (isFetching) return <div>Loading...</div>;
  if (error) return <div>Error loading friends.</div>;

  if (data.length === 0) return <div>No friends found. Add some!</div>;

  return (
    <ul>
      {data.map((friend) => (
        <li key={friend.id}>
          {friend.name} <DeleteButton friendId={friend.id} />{" "}
          <EditButton friend={friend} />
        </li>
      ))}
    </ul>
  );
}
