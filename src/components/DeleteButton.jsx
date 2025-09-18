import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { friendsApi, useDeleteFriendMutation } from "../store/api/friendsApi";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import { selectId } from "../store";

function DeleteButton({ friendId }) {
  const [deleteFriend] = useDeleteFriendMutation();
  const dispatch = useDispatch();
  const id = useSelector(selectId); // userId iz auth

  async function handleDelete() {
    try {
      await deleteFriend(friendId).unwrap();

      dispatch(
        friendsApi.util.updateQueryData("getFriends", id, (draft) => {
          return draft.filter((friend) => friend.id !== friendId);
        })
      );

      toast.success("Friend deleted successfully!");
    } catch (error) {
      toast.error("Failed to delete friend.");
    }
  }

  return (
    <button onClick={handleDelete}>
      <FontAwesomeIcon icon={faTrash} />
    </button>
  );
}

export default DeleteButton;
