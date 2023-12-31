class DB {
  // Function to generate a unique ID
  static generateID() {
    return Math.floor(Math.random() * Date.now());
  }

  // Function to store data in localStorage
  static storeData(table, data) {
    const existingData = localStorage.getItem(table);

    let parsedData = JSON.parse(existingData);
    parsedData.push(data);

    data = parsedData.map((item) => ({
      ...item,
      id: item.id || DB.generateID(),
    }));

    localStorage.setItem(table, JSON.stringify(data));
  }

  // Function to retrieve data from localStorage
  static retrieveData(table) {
    const data = localStorage.getItem(table);
    return data ? JSON.parse(data) : [];
  }

  // Function to update data in localStorage
  static updateData(table, id, newData) {
    const existingData = DB.retrieveData(table);

    if (existingData) {
      // Update or add the new data
      const index = existingData.findIndex((d) => d.id === id);

      if (index !== -1) {
        // Update the existing data
        existingData[index] = { ...existingData[index], newData };
      } else {
        // Add new data
        existingData.push(newData);
      }

      // Store the updated data
      // DB.storeData(table, existingData);
      localStorage.setItem(table, JSON.stringify(existingData));
    }
  }

  // Function to delete data from localStorage
  static deleteData(table, id) {
    const existingData = DB.retrieveData(table);

    if (existingData) {
      // Filter data to exclude the one with the specified ID
      const filteredData = existingData.filter((d) => d.id !== id);

      // Store the updated data
      DB.storeData(table, filteredData);
    }
  }

  // Function to initialize tables if they don't exist
  static initializeTables(table) {
    const tables = ["products", "sales", "clients"];

    if (!localStorage.getItem(table)) {
      localStorage.setItem(table, "[]");
    }
  }
}

// DB.initializeTables("products");
// Store data in localStorage
// DB.storeData("products", { id: 9, amount: 100 });

// // Example of updating data
// DB.updateData("products", { id: 9, amount: "New Product 9" });

// // Example of deleting data
// DB.deleteData("sales", 1);

// // Example of retrieving data
// const storedProducts = DB.retrieveData("products");
// console.log(storedProducts);
