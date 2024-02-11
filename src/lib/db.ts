import {
  ProductType,
  CustomerType,
  SaleItemsType,
  StockTransactionsType,
  SalesType,
  CategoryType,
  DataBaseResponse,
  ProductOptionType,
} from "./types";

interface DBType<T> {
  idLength: 0;
  data: T[];
}

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
      localStorage.setItem(table, JSON.stringify({ idLength: 0, data: [] }));
    }
  }

  add(data: T): DataBaseResponse<T> {
    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      const existData: DBType<T> = JSON.parse(existingData);

      const newData = { ...data, id: existData.idLength + 1 };
      existData.data.push(newData);
      existData.idLength += 1;

      localStorage.setItem(this.#tableName, JSON.stringify(existData));
      return { success: true, data: newData };
    }
    return { success: false, message: "No tableName founded" };
  }

  addBatch(data: T[]): DataBaseResponse<T> {
    console.log("addBatch");

    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      try {
        const existData: DBType<T> = JSON.parse(existingData);

        const newData = data.map((item, i) => ({ ...item, id: existData.idLength + 1 + i }));
        const newIdLength = existData.idLength + data.length;
        const fullData = { idLength: newIdLength, data: existData.data.concat(newData) };

        localStorage.setItem(this.#tableName, JSON.stringify(fullData));
        return { success: true };
      } catch (error: any) {
        return { success: false, message: error };
      }
    }
    return { success: false, message: "No tableName founded" };
  }

  getAll() {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const newData: DBType<T> = JSON.parse(data);
      return newData.data;
    }
    return [];
  }

  getById(id: number): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const existData: DBType<T> = JSON.parse(data);

      const filterData: T | undefined = existData.data.find((v) => v.id === id);
      return { success: true, data: filterData };
    }
    return { success: false, message: "No tableName founded" };
  }

  update(id: number, newData: T): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DBType<T> = JSON.parse(data);

      if (existingData) {
        const index = existingData.data.findIndex((d) => d.id === id);

        if (index !== -1) {
          existingData.data[index] = { ...existingData.data[index], newData };
        } else {
          existingData.data.push(newData);
        }
        localStorage.setItem(this.#tableName, JSON.stringify(existingData));
        return { success: true };
      }
    }
    return { success: false, message: "No tableName founded" };
  }

  delete(id: number): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DBType<T> = JSON.parse(data);

      if (existingData) {
        const filteredData = existingData.data.filter((d) => d.id !== id);
        localStorage.setItem(
          this.#tableName,
          JSON.stringify({ ...existingData, data: filteredData })
        );
        return { success: true };
      }
    }
    return { success: false, message: "No tableName founded" };
  }
}

export const PRODUCT_DB = new DB<ProductType>("PRODUCTS");
export const PRODUCTOPTIONS_DB = new DB<ProductOptionType>("PRODUCTOPTIONS");
export const CUSTOMERS_DB = new DB<CustomerType>("CUSTOMERS");
export const SALES_DB = new DB<SalesType>("SALES");
export const CATEGORIES_DB = new DB<CategoryType>("CATEGORIES");
export const SALEITEMS_DB = new DB<SaleItemsType>("SALEITEMS");
export const STOCKTRANSACTIONS_DB = new DB<StockTransactionsType>("STOCKTRANSACTIONS");
