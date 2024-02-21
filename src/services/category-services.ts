import { CATEGORIES_DB } from "../lib/db";

export const getCategories = () => {
  const data = CATEGORIES_DB.getAll();
  return data;
};
