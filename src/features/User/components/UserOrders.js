import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchLoggedInUserOrdersAsync,
  selectUserOrders,
  OrderStatus,
  selectUserInfo,
} from "../userSlice";
import { ThreeDots } from "react-loader-spinner";

export default function UserOrders() {
  const dispatch = useDispatch();
  const orders = useSelector(selectUserOrders);
  const status = useSelector(OrderStatus);

  useEffect(() => {
    dispatch(fetchLoggedInUserOrdersAsync());
  }, []);
  return (
    <div>
      <div className="mx-auto mt-14 bg-white rounded-2xl max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl font-bold tracking-tight text-gray-900">
          My Orders
        </h2>
        {orders.length === 0 && (
          <h2 className="text-2xl p-5 font-bold tracking-tight text-gray-900">
            There are no orders available.
          </h2>
        )}
        {status === "loading" && (
          <div className="w-full h-full flex justify-center items-center my-10">
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
        {orders &&
          orders?.map((order) => (
            <div>
              <div className="mx-auto mt-10 bg-white rounded-2xl max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-3xl p-2 font-bold tracking-tight text-gray-900">
                  Order number #{order.id}
                </h2>
                <h2 className="text-xl p-2 font-bold tracking-tight text-red-400">
                  Order Status: {order.status}
                </h2>
                <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                  <div className="flow-root">
                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                      {order.products.map((item) => (
                        <li key={item.product.id} className="flex py-6">
                          <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                            <img
                              src={item.product.thumbnail}
                              alt={item.product.title}
                              className="h-full w-full object-cover object-center"
                            />
                          </div>

                          <div className="ml-4 flex flex-1 flex-col">
                            <div>
                              <div className="flex justify-between text-base font-medium text-gray-900">
                                <h3>
                                  <a href={item.product.id}>
                                    {item.product.title}
                                  </a>
                                </h3>
                                <p className="ml-4">
                                  Rs.
                                  {item.product.discountedPrice * item.quantity}
                                </p>
                              </div>
                              <p className="mt-1 text-sm text-gray-500">
                                {item.product.brand}
                              </p>
                            </div>
                            <div className="flex flex-1 items-end justify-between text-sm">
                              <div className="text-gray-500">
                                <label
                                  htmlFor="quantity"
                                  className="inline mr-3 text-sm font-medium leading-6 text-gray-900"
                                >
                                  Qty: {item.quantity}
                                </label>
                              </div>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
                {orders.length > 0 && (
                  <div className="border-t border-gray-200 px-4 py-6 sm:px-6">
                    <div className="flex justify-between my-3 text-base font-medium text-gray-900">
                      <p>Subtotal</p>
                      <p>Rs. {order.totalAmount}</p>
                    </div>
                    <div className="flex justify-between my-3 text-base font-medium text-gray-900">
                      <p>Total Items in Cart</p>
                      <p>{order.totalItems} items</p>
                    </div>
                    <p className="mt-0.5 text-md text-gray-500">
                      Shipping Address:
                    </p>

                    <div className="flex justify-between gap-x-6 my-3 py-5 border-solid border-2 border-gray px-5 rounded-3xl hover:bg-gray-300">
                      <div className="flex min-w-0 gap-x-4">
                        <label htmlFor="address">
                          <div className="min-w-0 flex-auto">
                            <p className="text-sm font-semibold leading-6 text-gray-900">
                              {order.selectedAddress.name}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.street}
                            </p>
                            <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                              {order.selectedAddress.city},
                              {order.selectedAddress.pincode}
                            </p>
                          </div>
                        </label>
                      </div>
                      <div className="hidden sm:flex sm:flex-col sm:items-end">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.phone}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.state}
                        </p>
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {order.selectedAddress.email}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
      </div>
    </div>
  );
}
