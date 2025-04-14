import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSession } from "next-auth/react";

const OrdersPage: React.FC = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const { success } = router.query;

  // Mock orders data - in a real app, you would fetch this from your database
  const mockOrders = [
    {
      id: "ORD-12345",
      date: "2025-04-10",
      total: 129.99,
      status: "Delivered",
      items: 3,
    },
    {
      id: "ORD-12346",
      date: "2025-04-05",
      total: 79.5,
      status: "Shipped",
      items: 2,
    },
    {
      id: "ORD-12347",
      date: "2025-03-28",
      total: 45.75,
      status: "Processing",
      items: 1,
    },
  ];

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  return (
    <div>
      <Head>
        <title>My Orders | Handcrafted Haven</title>
        <meta
          name="description"
          content="View your order history at Handcrafted Haven."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5 mb-5">
        <h1>My Orders</h1>

        {success && (
          <div className="alert alert-success mb-4">
            Your order has been placed successfully! You will receive a
            confirmation email shortly.
          </div>
        )}

        <div className="card">
          <div className="card-header">
            <h5 className="mb-0">Order History</h5>
          </div>
          <div className="card-body">
            {session ? (
              <div className="table-responsive">
                <table className="table table-hover">
                  <thead className="table-light">
                    <tr>
                      <th>Order ID</th>
                      <th>Date</th>
                      <th>Items</th>
                      <th>Total</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.date}</td>
                        <td>{order.items}</td>
                        <td>{formatPrice(order.total)}</td>
                        <td>
                          <span
                            className={`badge bg-${
                              order.status === "Delivered"
                                ? "success"
                                : order.status === "Shipped"
                                ? "info"
                                : "warning"
                            }`}
                          >
                            {order.status}
                          </span>
                        </td>
                        <td>
                          <button className="btn btn-sm btn-outline-primary">
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="text-center py-4">
                <p>Please log in to view your orders.</p>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default OrdersPage;
