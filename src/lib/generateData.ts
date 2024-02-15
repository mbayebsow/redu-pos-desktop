import { genererUIDProduit } from ".";
import { CATEGORIES_DB, CUSTOMERS_DB, PRODUCTOPTIONS_DB, PRODUCT_DB } from "./db";
import { CategoryType, CustomerType, ProductOptionType, ProductType } from "./types";

function generateCategories(numItems: number) {
  const colors = [
    "#917a97",
    "#9299b1",
    "#ae3ce5",
    "#d8fe9f",
    "#27216c",
    "#3d22fb",
    "#72241f",
    "#1e8275",
    "#634747",
    "#6cd7e8",
    "#5aacc8",
    "#e41351",
    "#90d19c",
    "#937591",
    "#18d420",
    "#0a7b75",
    "#dc27f4",
    "#4e5421",
    "#a57ef3",
    "#dbfcff",
    "#312345",
    "#144dc8",
    "#759338",
    "#c9d265",
    "#ee9f50",
    "#b2c12a",
    "#5612fe",
    "#cd973b",
    "#5225da",
    "#770112",
    "#ad8401",
    "#52223f",
    "#3f4df8",
    "#6754ab",
    "#97dcb7",
    "#78a4bc",
    "#a57d3f",
    "#a19b47",
    "#625511",
    "#ba005a",
  ];

  const categories: CategoryType[] = [];

  for (let i = 0; i < numItems; i++) {
    const name = "Cat " + (i + 1);
    const color = colors[Math.floor(Math.random() * colors.length)];
    const isActive = Math.random() > 0.5;

    const item: CategoryType = {
      id: 0,
      name,
      color,
      isActive
    };
    categories.push(item);
  }
  return categories;
}

function generateProducts(numItems: number, categories: CategoryType[]) {
  const types = ["standard", "variable"];
  const units = ["Piece", "Cartons", "Paquets", "Packs", "Bouteilles", "Sacs", "Kg"]

  const products: ProductType[] = [];

  for (let i = 0; i < numItems; i++) {
    const identifier = genererUIDProduit();
    const name = "Product " + (i + 1);
    const type = types[Math.floor(Math.random() * types.length)];
    const priceCost = type === "variable" ? 0 : Math.random() > 0.5 ? Math.floor(Math.random() * 10000) : 0;
    const price = type === "variable" ? 0 : priceCost + Math.floor(Math.random() * 1000);
    const stockQuantity = Math.floor(Math.random() * 100);
    const supplier = "Fournisseur " + (i + 1);
    const category = Math.random() > 0.5 ? categories[Math.floor(Math.random() * categories.length)].id : null;
    const isActive = Math.random() > 0.5;
    const unit = units[Math.floor(Math.random() * units.length)];
    const image = "https://dummyimage.com/100x100/999999/000000.png";

    const item: ProductType = {
      id: 0,
      identifier,
      name,
      priceCost,
      price,
      stockQuantity,
      supplier,
      category,
      isActive,
      unit,
      type: type as "standard" | "variable",
      image,
    };
    products.push(item);
  }
  return products;
}

function generateProductOptions(numItems: number, ProductID: number, identifier: string,) {
  const productOptions: ProductOptionType[] = [];

  for (let i = 0; i < numItems; i++) {
    // const identifier = identifier;
    const name = "Option " + (i + 1);
    const priceCost = Math.random() > 0.5 ? Math.floor(Math.random() * 10000) : 0;
    const priceSale = priceCost > 0 ? priceCost + Math.floor(Math.random() * 1000) : Math.floor(Math.random() * 10000);
    const stockQuantity = Math.floor(Math.random() * 100);

    const option: ProductOptionType = {
      id: 0,
      identifier: `${identifier}-${i + 1}`,
      ProductID,
      name,
      priceCost,
      priceSale,
      stockQuantity,
    };
    productOptions.push(option);
  }
  return productOptions;
}

function generateCustomers(numItems: number) {
  const firstNames = ["John", "Jane", "Michael", "Emily", "David", "Sarah"];
  const lastNames = ["Doe", "Smith", "Johnson", "Brown", "Wilson", "Taylor"];
  const addresses = ["123 Main St", "456 Elm St", "789 Oak St", "101 Pine St", "202 Maple St"];
  const phones = [773900000, 760760000, 780780000, 700707070, 750757575, 777444444];
  const mails = ["john@example.com", "jane@example.com", "michael@example.com", "emily@example.com", "david@example.com"];

  const customers: CustomerType[] = [];

  for (let i = 0; i < numItems; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    const address = addresses[Math.floor(Math.random() * addresses.length)];
    const phone = phones[Math.floor(Math.random() * phones.length)];
    const mail = mails[Math.floor(Math.random() * mails.length)];
    const isActive = Math.random() > 0.5;

    const item: CustomerType = {
      id: 0,
      firstName,
      lastName,
      address,
      phone,
      mail,
      isActive,
    };

    customers.push(item);
  }

  return customers;
}

function generateData() {
  if (CATEGORIES_DB.getAll().length > 0) CATEGORIES_DB.deleteAll()
  if (CUSTOMERS_DB.getAll().length > 0) CUSTOMERS_DB.deleteAll()
  if (PRODUCT_DB.getAll().length > 0) PRODUCT_DB.deleteAll()
  if (PRODUCTOPTIONS_DB.getAll().length > 0) PRODUCTOPTIONS_DB.deleteAll()

  const categories = generateCategories(10)
  CATEGORIES_DB.addBatch(categories)
  const customers = generateCustomers(20)
  CUSTOMERS_DB.addBatch(customers)
  const categoriesdb = CATEGORIES_DB.getAll()
  const products = generateProducts(50, categoriesdb)
  PRODUCT_DB.addBatch(products)
  const productsdb = PRODUCT_DB.getAll()
  productsdb.filter((product) => product.type === "variable").map((product) => {
    const randomNumber = Math.floor(Math.random() * 5) + 2
    const productOptions = generateProductOptions(randomNumber, product.id, product.identifier)
    PRODUCTOPTIONS_DB.addBatch(productOptions)
  })
}
export default generateData;
