import { FC, createContext, useContext, ReactNode, useState, useEffect } from "react";
import { CategoryType } from "../lib/types";
import toast from "react-hot-toast";
import { CATEGORIES_DB } from "../lib/db";

interface CategoryContextPropsType {
  categories: CategoryType[] | [];
  addCategory: (category: CategoryType) => void;
}

const CategoryContext = createContext<CategoryContextPropsType | undefined>(undefined);

const CategoryProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [categories, setCategories] = useState<CategoryType[] | []>([]);

  const getCategories = () => {
    const data = CATEGORIES_DB.getAll();
    setCategories(data);
  };

  const addCategory = (category: CategoryType) => {
    if (category.name === "") {
      toast.error("Le nom de la categorie ne peut pas etre vide.");
      return;
    }

    const add = CATEGORIES_DB.add(category);
    if (add?.success) toast.success("Categorie ajouter.");
    getCategories();
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <CategoryContext.Provider value={{ categories, addCategory }}>
      {children}
    </CategoryContext.Provider>
  );
};

const useCategory = (): CategoryContextPropsType => {
  const context = useContext(CategoryContext);
  if (!context) {
    throw new Error("useCategory doit être utilisé à l'intérieur de CategoryProvider");
  }
  return context;
};

export { CategoryProvider, useCategory };
