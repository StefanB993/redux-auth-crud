import { useDispatch, useSelector } from "react-redux";
import { friendsApi, useAddFriendMutation } from "../store/api/friendsApi";
import { selectId } from "../store";
import toast from "react-hot-toast";

function AddFriendButton() {
  const [addFriend] = useAddFriendMutation();
  const dispatch = useDispatch();
  const id = useSelector(selectId);

  async function handleAddFriend() {
    try {
      const newFriend = await addFriend(id).unwrap();
      dispatch(
        friendsApi.util.updateQueryData("getFriends", id, (draft) => {
          draft.push(newFriend);
        })
      );
      toast.success("Friend added successfully!");
    } catch (error) {
      toast.error("Failed to add friend.");
    }
  }
  return <button onClick={handleAddFriend}>Add Friend</button>;
}

export default AddFriendButton;
