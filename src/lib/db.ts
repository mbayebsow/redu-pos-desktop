interface DataWithId {
  id?: number;
  [key: string]: any;
}

export default class DB {
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

  add(data: DataWithId) {
    const existingData = localStorage.getItem(this.#tableName);

    if (existingData) {
      const parsedData = JSON.parse(existingData);

      const newData = { ...data, id: data.id || parsedData.length + 1 };
      parsedData.push(newData);

      localStorage.setItem(this.#tableName, JSON.stringify(parsedData));
    }
  }

  getAll(): DataWithId[] | undefined {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const newData: DataWithId[] = JSON.parse(data);
      return newData;
    }
  }

  getById(id: number): DataWithId | undefined {
    const data = localStorage.getItem(this.#tableName);
    if (data) {
      const parsedData: DataWithId[] = JSON.parse(data);

      const filterData: DataWithId | undefined = parsedData.find((v) => v.id === id);
      return filterData;
    }
  }

  update(id: number, newData: DataWithId) {
    const existingData = this.getAll();

    if (existingData) {
      const index = existingData.findIndex((d) => d.id === id);

      if (index !== -1) {
        existingData[index] = { ...existingData[index], newData };
      } else {
        existingData.push(newData);
      }
      localStorage.setItem(this.#tableName, JSON.stringify(existingData));
    }
  }

  delete(id: number) {
    const existingData = this.getAll();

    if (existingData) {
      const filteredData = existingData.filter((d) => d.id !== id);
      localStorage.setItem(this.#tableName, JSON.stringify(filteredData));
      // this.add(filteredData);
    }
  }
}
