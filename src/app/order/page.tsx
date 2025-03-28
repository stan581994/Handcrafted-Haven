import React from "react";
import MainLayout from "@/components/layout/MainLayout";

export default function Order() {
  return (
    <MainLayout>
      <div className="container-custom py-12">
        <h1 className="text-3xl font-serif font-bold mb-6">Orders</h1>
        <p className="text-lg text-gray-600 mb-8">
          Manage your orders and track shipments.
        </p>
        {/* Order management will go here */}
        <div className="bg-gray-100 p-12 rounded-lg text-center">
          <p className="text-gray-500">Order management coming soon</p>
        </div>
      </div>
    </MainLayout>
  );
}
