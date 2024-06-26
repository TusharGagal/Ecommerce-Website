import React, { useState, Fragment } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  cartItems,
  removeItemAsync,
  updateItemsAsync,
  cartstatus,
  selectCartLoaded,
} from "./CartSlice";

import { Link, Navigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";
import Modals from "../CommonComponents/Modals";

export default function Cart() {
  const [open, setOpen] = useState(true);
  const [openModal, setOpenModal] = useState(null);
  const dispatch = useDispatch();
  const products = useSelector(cartItems);
  const cartStatus = useSelector(cartstatus);
  const cartLoaded = useSelector(selectCartLoaded);

  const totalAmount = products.reduce(
    (amount, item) => item.product.discountedPrice * item.quantity + amount,
    0
  );
  const totalItems = products.reduce((total, item) => item.quantity + total, 0);
  const handleQuantity = (e, item) => {
    if (e.target.value > item.product.stock) {
      toast.warning(
        `Sorry we have only ${item.product.stock} quantity of this item.`
      );
      e.target.value = item.product.stock;
    } else {
      dispatch(updateItemsAsync({ id: item.id, quantity: +e.target.value }));
    }
  };
  const handleRemove = (e, itemId) => {
    toast.info("item removed from cart");
    dispatch(removeItemAsync(itemId));
  };
  return (
    <>
      {!products.length && cartLoaded && (
        <Navigate to="/" replace={true}></Navigate>
      )}

      <div>
        <div className="mx-auto mt-14 bg-white rounded-2xl max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl p-5 font-bold tracking-tight text-gray-900">
            Cart
          </h2>
          <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
            <div className="flow-root">
              <ul role="list" className="-my-6 divide-y divide-gray-200">
                {products.length === 0 && (
                  <h3 className="text-2xl p-5 font-bold tracking-tight text-gray-900">
                    Your Cart is empty
                  </h3>
                )}
                {cartStatus === "loading" && (
                  <div className="w-full h-full flex justify-center items-center ">
                    <ThreeDots
                      visible={true}
                      height="80"
                      width="80"
                      color="#4f46e5"
                      radius="9"
                      ariaLabel="three-dots-loading"
                      wrapperStyle={{ "text-align": "center" }}
                      wrapperClass=""
                    />
                  </div>
                )}
                {products.map((product) => (
                  <li key={product.id} className="flex py-6">
                    <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                      <img
                        src={product.product.thumbnail}
                        alt={product.product.title}
                        className="h-full w-full object-cover object-center"
                      />
                    </div>

                    <div className="ml-4 flex flex-1 flex-col">
                      <div>
                        <div className="flex justify-between text-base font-medium text-gray-900">
                          <h3>
                            <a href={product.product.id}>
                              {product.product.title}
                            </a>
                          </h3>
                          <p className="ml-4">
                            Rs.
                            {product.product.discountedPrice * product.quantity}
                          </p>
                        </div>
                        <p className="mt-1 text-sm text-gray-500">
                          {product.product.brand}
                        </p>
                      </div>
                      <div className="flex flex-1 items-end justify-between text-sm">
                        <div className="text-gray-500">
                          <label
                            htmlFor="quantity"
                            className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                          >
                            Qty
                          </label>
                          <input
                            className="rounded-lg py-1 text-center"
                            onChange={(e) => handleQuantity(e, product)}
                            defaultValue="1"
                            size="1"
                          />
                        </div>

                        <div className="flex">
                          <Modals
                            title={`Remove ${product.product.title}`}
                            message="Are you sure you want to remove this item from your cart"
                            dangerOption="Remove"
                            cancelOption="Cancel"
                            cancelAction={() => setOpenModal(null)}
                            dangerAction={(e) => handleRemove(e, product.id)}
                            showModal={openModal === product.id}
                          ></Modals>
                          <button
                            type="button"
                            className="font-medium text-indigo-600 hover:text-indigo-500"
                            onClick={() => setOpenModal(product.id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          {products.length > 0 && (
            <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
              <div className="flex justify-between my-3 text-base font-medium text-gray-900">
                <p>Subtotal</p>
                <p>Rs. {totalAmount}</p>
              </div>
              <div className="flex justify-between my-3 text-base font-medium text-gray-900">
                <p>Total Items in Cart</p>
                <p>{totalItems} items</p>
              </div>
              <p className="mt-0.5 text-sm text-gray-500">
                Shipping and taxes calculated at checkout.
              </p>
              <div className="mt-6">
                <Link
                  to="/checkout"
                  className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                >
                  Checkout
                </Link>
              </div>
              <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                <p>
                  or{" "}
                  <Link to="/">
                    <button
                      type="button"
                      className="font-medium text-indigo-600 hover:text-indigo-500"
                      onClick={() => setOpen(false)}
                    >
                      Continue Shopping
                      <span aria-hidden="true"> &rarr;</span>
                    </button>
                  </Link>
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
