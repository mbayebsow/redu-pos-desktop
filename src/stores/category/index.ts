import toast from "react-hot-toast";
import { CategoryType } from "../../utils/types";
import { CATEGORIES_DB } from "../../db/db";
import { create } from "zustand";

interface CategoryContextPropsType {
  categories: CategoryType[] | [];
  fetchCategories: () => void;
  addCategory: (category: CategoryType) => void;
}

export const getCategoriesAction = () => {
  const data = CATEGORIES_DB.getAll();
  return data;
  //   setCategories(data);
};

export const addCategoryAction = (category: CategoryType) => {
  if (category.name === "") {
    toast.error("Le nom de la categorie ne peut pas etre vide.");
    return;
  }

  const newEntry = CATEGORIES_DB.add(category);
  if (newEntry?.success) toast.success("Categorie ajouter.");
  //   getCategories()
};

const useCategoryStore = create<CategoryContextPropsType>((set) => ({
  categories: getCategoriesAction(),
  fetchCategories: () => set({ categories: getCategoriesAction() }),
  addCategory: (category: CategoryType) => addCategoryAction(category),
}));

export default useCategoryStore;
