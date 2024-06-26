// A mock function to mimic making an async request for data
export function addToCart(item) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart", {
      method: "POST",
      body: JSON.stringify(item),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function updateItem(update) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + update.id, {
      method: "PATCH",
      body: JSON.stringify(update),
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data });
  });
}
export function fetchItemsByUserId() {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart");
    const data = await response.json();
    resolve({ data });
  });
}

export function removeItem(itemId) {
  return new Promise(async (resolve) => {
    const response = await fetch("/cart/" + itemId, {
      method: "DELETE",
      headers: { "content-type": "application/json" },
    });
    const data = await response.json();
    resolve({ data: { id: itemId } });
  });
}

export function resetCart() {
  // get all the items of user cart and then delete all the items.
  return new Promise(async (resolve) => {
    const response = await fetchItemsByUserId();
    const items = await response.data;
    for (let item of items) {
      await removeItem(item.id);
    }
    resolve({ status: "success" });
  });
}
