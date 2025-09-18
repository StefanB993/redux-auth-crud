import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch, useSelector } from "react-redux";
import {
  closeModal,
  selectIsModalOpen,
} from "../store/api/modalSlice/modalSlice";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { friendsApi, useEditFriendMutation } from "../store/api/friendsApi";
import toast from "react-hot-toast";

function EditModal() {
  const isOpen = useSelector(selectIsModalOpen);
  const friend = useSelector((state) => state.modal.modalData);
  const dispatch = useDispatch();

  const handleClose = useCallback(() => {
    dispatch(closeModal());
  }, [dispatch]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape") {
        handleClose();
      }
    }

    window.addEventListener("keydown", handleEscape);
    return () => {
      window.removeEventListener("keydown", handleEscape);
    };
  }, [handleClose]);

  if (!isOpen) return null;

  return (
    <div className="edit-modal">
      <h2>Edit Friend</h2>
      {friend && <EditForm friend={friend} />}
      <button onClick={handleClose}>
        <FontAwesomeIcon icon={faClose} />
      </button>
    </div>
  );
}

export default EditModal;

function EditForm({ friend }) {
  const [editFriend] = useEditFriendMutation();
  const id = useSelector((state) => state.auth.user.id);
  const dispatch = useDispatch();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    defaultValues: { name: friend.name },
  });

  async function onSubmit({ name }) {
    try {
      const response = await editFriend({
        friendId: friend.id,
        name,
        userId: id,
      }).unwrap();
      dispatch(
        friendsApi.util.updateQueryData("getFriends", id, (draft) => {
          const index = draft.findIndex((f) => f.id === friend.id);
          if (index !== -1) {
            draft[index] = response;
          }
        })
      );
      toast.success("Friend edited successfully");
    } catch {
      toast.error("Failed to edit friend");
    }
  }

  return (
    <form className="edit-form" onSubmit={handleSubmit(onSubmit)}>
      <input {...register("name", { required: "Name is required" })} />
      {errors.name && <span>{errors.name.message}</span>}
      <button type="submit">Save</button>
    </form>
  );
}
