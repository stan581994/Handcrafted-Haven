import React, { useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSession } from "next-auth/react";

const AdminDashboard: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();

  // Redirect if not logged in or not an admin
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/auth/login?callbackUrl=/admin/dashboard");
    } else if (
      status === "authenticated" &&
      (session.user as any).role !== "admin"
    ) {
      router.push("/");
    }
  }, [session, status, router]);

  if (status === "loading") {
    return <div className="container mt-5 text-center">Loading...</div>;
  }

  if (status === "authenticated" && (session.user as any).role === "admin") {
    return (
      <div>
        <Head>
          <title>Admin Dashboard | Handcrafted Haven</title>
          <meta
            name="description"
            content="Admin dashboard for Handcrafted Haven."
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Navbar />
        <main className="container mt-5 mb-5">
          <div className="row">
            <div className="col-md-3">
              <div className="card mb-4">
                <div className="card-header">
                  <h5 className="mb-0">Admin Menu</h5>
                </div>
                <div className="list-group list-group-flush">
                  <a
                    href="#"
                    className="list-group-item list-group-item-action active"
                  >
                    Dashboard
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Products
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Artisans
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Orders
                  </a>
                  <a
                    href="#"
                    className="list-group-item list-group-item-action"
                  >
                    Manage Users
                  </a>
                </div>
              </div>
            </div>
            <div className="col-md-9">
              <div className="card">
                <div className="card-header">
                  <h5 className="mb-0">Welcome, Admin!</h5>
                </div>
                <div className="card-body">
                  <div className="alert alert-info">
                    <p className="mb-0">
                      <strong>You are logged in as an admin.</strong> From here,
                      you can manage products, artisans, orders, and users.
                    </p>
                  </div>

                  <div className="row mt-4">
                    <div className="col-md-4 mb-4">
                      <div className="card bg-primary text-white">
                        <div className="card-body">
                          <h5 className="card-title">Products</h5>
                          <p className="card-text display-4">25</p>
                          <a href="#" className="btn btn-light btn-sm">
                            Manage Products
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card bg-success text-white">
                        <div className="card-body">
                          <h5 className="card-title">Artisans</h5>
                          <p className="card-text display-4">10</p>
                          <a href="#" className="btn btn-light btn-sm">
                            Manage Artisans
                          </a>
                        </div>
                      </div>
                    </div>
                    <div className="col-md-4 mb-4">
                      <div className="card bg-warning text-dark">
                        <div className="card-body">
                          <h5 className="card-title">Orders</h5>
                          <p className="card-text display-4">8</p>
                          <a href="#" className="btn btn-light btn-sm">
                            Manage Orders
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>

                  <h5 className="mt-4">Recent Activity</h5>
                  <table className="table table-striped">
                    <thead>
                      <tr>
                        <th>Date</th>
                        <th>Action</th>
                        <th>Details</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>2025-04-14</td>
                        <td>New Order</td>
                        <td>Order #12348 placed by customer</td>
                      </tr>
                      <tr>
                        <td>2025-04-13</td>
                        <td>Product Added</td>
                        <td>New product "Handcrafted Vase" added</td>
                      </tr>
                      <tr>
                        <td>2025-04-12</td>
                        <td>Artisan Updated</td>
                        <td>Artisan profile for "John Smith" updated</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return null;
};

export default AdminDashboard;
