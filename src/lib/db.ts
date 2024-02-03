import {
  ProductType,
  CustomerType,
  SaleItemsType,
  StockTransactionsType,
  SalesType,
  CategoryType,
} from "./types";

interface DataWithId {
  id?: number;
  [key: string]: any;
}

export default class DB<T extends DataWithId> {
  #tableName: string;

  constructor(tableName: string) {
    this.#tableName = tableName;
    this.#init(tableName);
  }

  #init(table: string) {
    if (!localStorage.getItem(table)) {
      localStorage.setItem(table, JSON.stringify([]));
    }
  }

  add(data: T) {
    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      const existData = JSON.parse(existingData);

      const newData = { ...data, id: data.id || existData.length + 1 };
      existData.push(newData);

      localStorage.setItem(this.#tableName, JSON.stringify(existData));
      return { success: true };
    }
    // return { success: false, message: "No tableName founded" };
  }

  addBatch(data: T[]) {
    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      const existData: T[] = JSON.parse(existingData);

      const newData = data.map((item, i) => ({ ...item, id: existData.length + 1 + i }));
      localStorage.setItem(this.#tableName, JSON.stringify(existData.concat(newData)));
      return { success: true };
    }
    // return { success: false, message: "No tableName founded" };
  }

  getAll() {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const newData: T[] = JSON.parse(data);
      return newData;
    }
    return [];
  }

  getById(id: number) {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const existData: T[] = JSON.parse(data);

      const filterData: T | undefined = existData.find((v) => v.id === id);
      return filterData;
      // return { success: false, message: "No data founded" };
    }
    // return { success: false, message: "No tableName founded" };
  }

  update(id: number, newData: T) {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DataWithId[] = JSON.parse(data);

      if (existingData) {
        const index = existingData.findIndex((d) => d.id === id);

        if (index !== -1) {
          existingData[index] = { ...existingData[index], newData };
        } else {
          existingData.push(newData);
        }
        localStorage.setItem(this.#tableName, JSON.stringify(existingData));
        return { success: true };
      }
    }
    // return { success: false, message: "No tableName founded" };
  }

  delete(id: number) {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DataWithId[] = JSON.parse(data);

      if (existingData) {
        const filteredData = existingData.filter((d) => d.id !== id);
        localStorage.setItem(this.#tableName, JSON.stringify(filteredData));
        return { success: true };
      }
    }
    // return { success: false, message: "No tableName founded" };
  }
}

export const PRODUCT_DB = new DB<ProductType>("PRODUCTS");
export const CUSTOMERS_DB = new DB<CustomerType>("CUSTOMERS");
export const SALES_DB = new DB<SalesType>("SALES");
export const CATEGORIES_DB = new DB<CategoryType>("CATEGORIES");
export const SALEITEMS_DB = new DB<SaleItemsType>("SALEITEMS");
export const STOCKTRANSACTIONS_DB = new DB<StockTransactionsType>("STOCKTRANSACTIONS");
