import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isModalOpen: false,
  modalData: null,
};

export const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    openModal: (state, action) => {
      state.isModalOpen = true;
      state.modalData = action.payload;
    },
    closeModal: (state) => {
      state.isModalOpen = false;
      state.modalData = null;
    },
  },
});

export const { openModal, closeModal } = modalSlice.actions;
export const selectIsModalOpen = (state) => state.modal.isModalOpen;
export const modalReducer = modalSlice.reducer;
