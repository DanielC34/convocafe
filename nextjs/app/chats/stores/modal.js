import { create } from "zustand";
import AddGroupUserModel from "@/app/chats/components/models/addGroupModel";
import AddUserModal from "@/app/chats/components/models/addUserModel";

export const useModalStore = create((set) => ({
  isOpen: false,
  modal: null,
  openAddGroupModal: () =>
    set({
      isOpen: true,
      modal: <AddGroupUserModel onClose={() => set({ isOpen: false })} />,
    }),
  openAddUserModal: () =>
    set({
      isOpen: true,
      modal: <AddUserModal onClose={() => set({ isOpen: false })} />,
    }),
  close: () => set({ isOpen: false, modal: null }),
}));
