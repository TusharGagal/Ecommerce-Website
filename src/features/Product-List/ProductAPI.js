// A mock function to mimic making an async request for data
export function fetchAllProducts() {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllProductById(id) {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/" + id);
    const data = await response.json();
    resolve({ data });
  });
}
export function creatProduct(product) {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/products/", {
      method: "POST",
      body: JSON.stringify(product),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllBrands() {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/brands");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchAllCategories() {
  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/categories");
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchProductsByFilter(filter, sort, pagination) {
  // filter={"category":"[smartphone","laptops"]}
  //sort={_sort:"price",_order:"desc"};
  //Pagination={_page:1,_limit=10}
  // TODO: on server we will support multiple value in filter.
  //TODO: server will filter deleted products in case of non-admin users.

  let queryString = "";
  for (let key in filter) {
    const categoryValues = filter[key];
    if (categoryValues.length > 0) {
      const lastCategoryValue = categoryValues[categoryValues.length - 1];
      queryString += `${key}=${lastCategoryValue}&`;
    }
  }
  //sort
  for (let key in sort) {
    queryString += `${key}=${sort[key]}&`;
  }
  //pagination
  for (let key in pagination) {
    queryString += `${key}=${pagination[key]}&`;
  }

  // TODO: we will not hard-code server URL here
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products?" + queryString
    );
    const data = await response.json();
    const totalItems = await response.headers.get("X-Total-Count");
    resolve({ data: { products: data, totalItems: totalItems } });
  });
}

export function updateProduct(update) {
  return new Promise(async (resolve) => {
    const response = await fetch(
      "http://localhost:8080/products/" + update.id,
      {
        method: "PATCH",
        body: JSON.stringify(update),
        headers: { "content-type": "application/json" },
      }
    );
    const data = await response.json();
    resolve({ data });
  });
}
