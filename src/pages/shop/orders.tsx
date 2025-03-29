import React from "react";
import Head from "next/head";
import Navbar from "../../components/Navbar";

const OrdersPage: React.FC = () => {
  return (
    <div>
      <Head>
        <title>Orders | Handcrafted Haven</title>
        <meta
          name="description"
          content="View and manage your orders on Handcrafted Haven."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Orders</h1>
        <p>
          This is the orders page where you can view and manage your purchases.
        </p>
        <div className="row mt-4">
          <div className="col-12">
            <div className="alert alert-info">
              This page will display your order history and allow you to track
              current orders.
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default OrdersPage;
