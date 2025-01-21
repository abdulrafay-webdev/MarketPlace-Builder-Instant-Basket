'use client';

import { toast, ToastContainer } from "react-toastify";
import { client } from "../../../../sanity/lib/client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

export interface PageProps {
  params: Promise<{
    block: string;
  }>;
}

async function fetchOrders(block: string) {
  try {
    const orders = await client.fetch(
      `*[_type == "order" && Area->block == $block]{
        orderId,
        customerName,
        customerContact,
        customerAddress,
        deliveryNote,
        paymentId,
        status,
        "assignedRider": assignedRider->name,
        "products": product[]->{
          _id,
          name,
          price,
          "imageUrl": image.asset->url
        }
      }`,
      { block }
    );
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to fetch orders.");
    return [];
  }
}

async function updateOrderStatus(orderId: string, newStatus: string) {
  try {
    const document = await client.fetch(
      `*[_type == "order" && orderId == $orderId][0]{_id}`,
      { orderId }
    );

    if (!document?._id) {
      console.error('Order not found');
      toast.error('Order not found');
      return;
    }

    const updatedDocument = await client
      .patch(document._id)
      .set({ status: newStatus })
      .commit();

    console.log('Document after update:', updatedDocument);
    toast.success(`Order  ${newStatus}`);
    // Reload the page after update
    window.location.reload();
  } catch (error) {
    console.error('Error while updating order status:', error);
    toast.error('Failed to update order status. Please try again.');
  }
}

const Page = ({ params }: PageProps) => {
  const [orders, setOrders] = useState<any[]>([]);
  const [block, setBlock] = useState<string>("");

  useEffect(() => {
    const getParams = async () => {
      const resolvedParams = await params;
      setBlock(resolvedParams.block);
    };
    getParams();
  }, [params]);

  useEffect(() => {
    if (block) {
      fetchOrders(block).then(setOrders);
    }
  }, [block]);

  return (
    <div className="min-h-screen p-5">
      <h1 className="text-3xl font-bold text-cyan-500 mb-5 uppercase">Orders for Block: {block}</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {orders.length > 0 ? (
          orders.map((item: any, i: number) => (
            <div
              key={i}
              className="bg-white rounded-lg shadow-2xl p-5 flex flex-col justify-between"
            >
              <h2 className="text-xl font-bold text-gray-800">{item.customerName}</h2>
              <p className="text-gray-700"><b> Order ID: </b>{item.orderId}</p>
              <p className="text-gray-700"><b>Address:</b> {item.customerAddress}</p>
              <p className="text-gray-700"><b>Contact:</b> {item.customerContact}</p>
              <p className="text-gray-700"><b>Delivery Note:</b> {item.deliveryNote}</p>
              <p className="text-gray-700"><b>Assigned Rider:</b> {item.assignedRider}</p>
              <p className="text-gray-700"><b>Status: </b>{item.status}</p>

              <div className="mt-3">
                <h3 className="font-semibold text-gray-800">Products:</h3>
                <ul className="list-disc pl-5">
                  {item.products.map((product: any) => (
                    <div key={product._id} className="flex items-center gap-5">
                      <Image  
                        src={product.imageUrl} 
                        alt={product.name} 
                        width={100} 
                        height={100} 
                        className="rounded-lg"/>
                    <li className="text-black font-semibold">
                      {product.name} - PKR {product.price}/-
                    </li>
                    </div>
                  ))}
                </ul>
              </div>

              <div className="mt-5 flex gap-3">
                <button
                  className="bg-green-500 hover:bg-green-600 text-white py-2 px-4 rounded"
                  onClick={() => updateOrderStatus(item.orderId, 'Delivered')}
                >
                  Mark as Delivered
                </button>
                <button
                  className="bg-yellow-500 hover:bg-yellow-600 text-white py-2 px-4 rounded"
                  onClick={() => updateOrderStatus(item.orderId, 'Pending')}
                >
                  Mark as Pending
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-white">No orders available for this block.</p>
        )}
      </div>

      <ToastContainer />
    </div>
  );
}

export default Page;
