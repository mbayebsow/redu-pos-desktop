import {
  ProductType,
  CustomerType,
  SaleItemsType,
  StockReplenishmentType,
  StockReplenishmentItemsType,
  SalesType,
  CategoryType,
  DataBaseResponse,
  ProductOptionType,
  SupplierType,
  PriceHistoryType,
} from "./types";

interface DBType<T> {
  idLength: 0;
  data: T[];
}

interface DataWithId {
  id?: number;
  [key: string]: any;
}

/**
 * A generic class for handling CRUD operations on data stored in localStorage.
 * This class is designed to work with types that extend the DataWithId interface,
 * allowing for operations such as adding, updating, deleting, and fetching records by ID.
 *
 * @template T - The type of data this DB instance will handle. Must extend DataWithId.
 */
export default class DB<T extends DataWithId> {
  #tableName: string;

  /**
   * Constructs a new DB instance associated with a specific table name.
   *
   * @param {string} tableName - The name of the table this instance will manage in localStorage.
   */
  constructor(tableName: string) {
    this.#tableName = tableName;
    this.#init(tableName);
  }

  /**
   * Initializes the table in localStorage if it does not already exist.
   * This method checks if a table with the given name exists in localStorage.
   * If not, it creates a new table with an initial structure containing an idLength of 0 and an empty data array.
   *
   * @param {string} table - The name of the table to initialize.
   */
  #init(table: string) {
    if (!localStorage.getItem(table)) {
      localStorage.setItem(table, JSON.stringify({ idLength: 0, data: [] }));
    }
  }

  /**
   * Adds a new record to the table associated with this instance.
   * The new record is assigned a unique ID automatically.
   *
   * @param {T} data - The data to be added to the table.
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation, including the added data on success.
   */
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

  /**
   * Adds a batch of data to the table associated with this instance.
   * Each item in the batch is assigned a unique ID sequentially.
   *
   * @param {T[]} data - An array of data items to be added to the table.
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation.
   */
  addBatch(data: T[]): DataBaseResponse<T> {
    console.log("addBatch");

    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      try {
        const existData: DBType<T> = JSON.parse(existingData);

        // Assign a unique ID to each item in the batch, starting from the last ID used + 1
        const newData = data.map((item, i) => ({ ...item, id: existData.idLength + 1 + i }));
        // Update the ID length to accommodate the new items
        const newIdLength = existData.idLength + data.length;
        // Combine the existing data with the new data
        const fullData = { idLength: newIdLength, data: existData.data.concat(newData) };

        // Save the updated data back to localStorage
        localStorage.setItem(this.#tableName, JSON.stringify(fullData));
        return { success: true };
      } catch (error: any) {
        // Return an error response in case of failure
        return { success: false, message: error };
      }
    }
    // Return a failure response if the table does not exist
    return { success: false, message: "No tableName founded" };
  }

  /**
   * Retrieves all records from the table associated with this instance.
   *
   * @returns {T[]} An array of all records in the table. Returns an empty array if no records are found.
   */
  getAll(): T[] {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const newData: DBType<T> = JSON.parse(data);
      return newData.data;
    }
    return [];
  }

  /**
   * Retrieves a record by its ID from the table associated with this instance.
   *
   * @param {number} id - The ID of the record to retrieve.
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation, and the data if successful.
   */
  getById(id: number): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const existData: DBType<T> = JSON.parse(data);

      const filterData: T | undefined = existData.data.find((v) => v.id === id);
      return { success: true, data: filterData };
    }
    return { success: false, message: "No tableName founded" };
  }

  /**
   * Updates an existing record by its ID with new data or adds it if it doesn't exist.
   *
   * @param {number} id - The ID of the record to update.
   * @param {T} newData - The new data to update the record with.
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation.
   */
  update(id: number, newData: Partial<T>): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DBType<T> = JSON.parse(data);

      if (existingData) {
        const index = existingData.data.findIndex((d) => d.id === id);

        if (index !== -1) {
          // Correctly merge newData into the existing data object
          existingData.data[index] = { ...existingData.data[index], ...newData };
        } else {
          return { success: false, message: "No data found" };
          // existingData.data.push({ ...newData, id: existingData.idLength + 1 }); // Ensure new data has an ID
          // existingData.idLength += 1; // Increment idLength to account for the new entry
        }
        localStorage.setItem(this.#tableName, JSON.stringify(existingData));
        return { success: true };
      }
    }
    return { success: false, message: "No tableName founded" };
  }

  /**
   * Deletes a record by its ID from the table associated with this instance.
   *
   * @param {number} id - The ID of the record to delete.
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation.
   */
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

  /**
   * Deletes all records from the table associated with this instance.
   *
   * @returns {DataBaseResponse<T>} An object indicating the success or failure of the operation.
   */
  deleteAll(): DataBaseResponse<T> {
    const data = localStorage.getItem(this.#tableName);

    if (data) {
      const existingData: DBType<T> = JSON.parse(data);

      if (existingData) {
        localStorage.setItem(this.#tableName, JSON.stringify({ ...existingData, data: [] }));
        return { success: true };
      }
    }
    return { success: false, message: "No tableName founded" };
  }
}

export const SALES_DB = new DB<SalesType>("SALES");
export const PRODUCT_DB = new DB<ProductType>("PRODUCTS");
export const SUPPLIERS_DB = new DB<SupplierType>("SUPPLIERS");
export const CUSTOMERS_DB = new DB<CustomerType>("CUSTOMERS");
export const SALEITEMS_DB = new DB<SaleItemsType>("SALEITEMS");
export const CATEGORIES_DB = new DB<CategoryType>("CATEGORIES");
export const PRICEHISTORY_DB = new DB<PriceHistoryType>("PRICEHISTORY");
export const PRODUCTOPTIONS_DB = new DB<ProductOptionType>("PRODUCTOPTIONS");
export const STOCKITEMS_DB = new DB<StockReplenishmentItemsType>("STOCKITEMSS");
export const STOCK_DB = new DB<StockReplenishmentType>("STOCKS");
