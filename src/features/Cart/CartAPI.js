// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: on server it will return some info of user(not password).
    resolve({ data });
  });
}
export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: on server it will return some info of user(not password).
    resolve({ data });
  });
}
export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart?user=" + userId);
    const data = await response.json();
    //TODO: on server it will return some info of user(not password).
    resolve({ data });
  });
}

export function removeItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("http://localhost:8080/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    //TODO: on server it will return some info of user(not password).
    resolve({ data: { id: itemId } });
  });
}

export function resetCart(userId) {
  // get all the items of user cart and then delete all the items.
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId(userId);
    const items = await response.data;
    for (let item of items) {
      await removeItem(item.id);
    }
    resolve({ status: "success" });
  });
}
