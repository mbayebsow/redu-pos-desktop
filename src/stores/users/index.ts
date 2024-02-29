import { create } from "zustand";
import { CustomerType } from "../../utils/types";
import { CUSTOMERS_DB } from "../../db/db";
import toast from "react-hot-toast";

interface DataContextProps {
  users: CustomerType[] | [];
  addUser: (user: CustomerType) => void;
  getUserById: (userId: number) => { success: boolean; message?: string; data?: CustomerType | undefined };
}

export const getUsersAction = () => {
  const data = CUSTOMERS_DB.getAll();
  return data;
};

export const getUserByIdAction = (id: number) => {
  const user = CUSTOMERS_DB.getById(id);
  return user;
};

export const addUserAction = (user: CustomerType) => {
  const saveUser = CUSTOMERS_DB.add(user);
  if (saveUser?.success) toast.success("User ajouter avec succes");
  // getUsers();
};

const useUserStore = create<DataContextProps>(() => ({
  users: getUsersAction(),
  addUser: addUserAction,
  getUserById: getUserByIdAction,
}));

export default useUserStore;
