import { faEdit } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { closeModal, openModal } from "../store/api/modalSlice/modalSlice";

function EditButton({ friend }) {
  const dispatch = useDispatch();
  function openEditModal() {
    dispatch(openModal(friend));
  }

  return (
    <button onClick={openEditModal}>
      <FontAwesomeIcon icon={faEdit} />
    </button>
  );
}

export default EditButton;
