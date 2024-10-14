// indexeddb.js

// Function to open or create IndexedDB
function openDatabase() {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open("ProductDB", 1);

    request.onerror = function (event) {
      console.error("Database error: ", event.target.errorCode);
      reject("Error opening database");
    };

    request.onsuccess = function (event) {
      console.log("Database opened successfully");
      resolve(event.target.result);
    };

    request.onupgradeneeded = function (event) {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("products")) {
        const objectStore = db.createObjectStore("products", { keyPath: "id" });
        objectStore.createIndex("name", "name", { unique: false });
        objectStore.createIndex("price", "price", { unique: false });
        objectStore.createIndex("description", "description", {
          unique: false,
        });
      }
    };
  });
}

// Function to add a product to IndexedDB
async function addProduct(product) {
  const db = await openDatabase();
  const transaction = db.transaction(["products"], "readwrite");
  const objectStore = transaction.objectStore("products");

  const request = objectStore.add(product);

  request.onsuccess = function () {
    console.log("Product added successfully:", product);
  };

  request.onerror = function (event) {
    console.error("Error adding product: ", event.target.error);
  };
}

// Function to get all products from IndexedDB
async function getAllProducts() {
  const db = await openDatabase();
  const transaction = db.transaction(["products"], "readonly");
  const objectStore = transaction.objectStore("products");

  const request = objectStore.openCursor();

  request.onsuccess = function (event) {
    const cursor = event.target.result;
    if (cursor) {
      console.log("Product:", cursor.value);
      cursor.continue();
    } else {
      console.log("All products fetched");
    }
  };

  request.onerror = function (event) {
    console.error("Error fetching products: ", event.target.error);
  };
}

// Function to update a product in IndexedDB
async function updateProduct(product) {
  const db = await openDatabase();
  const transaction = db.transaction(["products"], "readwrite");
  const objectStore = transaction.objectStore("products");

  const request = objectStore.put(product);

  request.onsuccess = function () {
    console.log("Product updated successfully:", product);
  };

  request.onerror = function (event) {
    console.error("Error updating product: ", event.target.error);
  };
}

// Function to delete a product from IndexedDB
async function deleteProduct(productId) {
  const db = await openDatabase();
  const transaction = db.transaction(["products"], "readwrite");
  const objectStore = transaction.objectStore("products");

  const request = objectStore.delete(productId);

  request.onsuccess = function () {
    console.log("Product deleted successfully with ID:", productId);
  };

  request.onerror = function (event) {
    console.error("Error deleting product: ", event.target.error);
  };
}
