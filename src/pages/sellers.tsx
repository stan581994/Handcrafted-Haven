import React, { useState, useEffect } from "react";
import Head from "next/head";
import Navbar from "../components/Navbar";
import Link from "next/link";

// Define the Artisan type
interface Artisan {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image_url: string | null;
}

const SellersPage: React.FC = () => {
  const [artisans, setArtisans] = useState<Artisan[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [setupStatus, setSetupStatus] = useState<string | null>(null);

  // Function to set up the artisans table and data
  const setupArtisansTable = async () => {
    try {
      setSetupStatus("Setting up artisans table...");
      const response = await fetch("/api/setup-artisans");
      const data = await response.json();

      if (data.success) {
        setSetupStatus(data.message);
        // After setup, fetch the artisans data
        fetchArtisans();
      } else {
        setSetupStatus(`Setup failed: ${data.message}`);
        setError(data.error || "Unknown error");
      }
    } catch (err) {
      setSetupStatus("Setup failed");
      setError(
        err instanceof Error ? err.message : "An error occurred during setup"
      );
      setLoading(false);
    }
  };

  // Function to fetch artisans data
  const fetchArtisans = async () => {
    try {
      setLoading(true);
      const response = await fetch("/api/artisans");
      const data = await response.json();

      if (data.success) {
        setArtisans(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Effect to run on component mount
  useEffect(() => {
    setupArtisansTable();
  }, []);
  return (
    <div>
      <Head>
        <title>Artisans | Handcrafted Haven</title>
        <meta
          name="description"
          content="Meet the talented artisans behind our handcrafted products."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <h1>Our Artisans</h1>
        <p>
          Discover the talented creators behind our unique handcrafted products.
        </p>

        {/* Error message */}
        {error && (
          <div className="alert alert-danger mb-4">
            <strong>Error:</strong> {error}
          </div>
        )}

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading artisans data...</p>
          </div>
        ) : (
          <div className="row mt-4">
            {artisans.length > 0 ? (
              artisans.map((artisan) => (
                <div className="col-md-4 mb-4" key={artisan.id}>
                  <div className="card h-100">
                    {artisan.image_url && (
                      <div
                        className="card-img-top position-relative"
                        style={{ height: "250px" }}
                      >
                        <img
                          src={artisan.image_url}
                          alt={`${artisan.name} - ${artisan.specialty}`}
                          className="card-img-top"
                          style={{
                            height: "250px",
                            objectFit: "cover",
                            width: "100%",
                          }}
                        />
                      </div>
                    )}
                    <div className="card-body">
                      <h5 className="card-title">{artisan.name}</h5>
                      <h6 className="card-subtitle mb-2 text-muted">
                        {artisan.specialty}
                      </h6>
                      <p className="card-text">{artisan.description}</p>
                      <Link
                        href={`/artisans/${artisan.id}`}
                        className="card-link"
                      >
                        View Profile
                      </Link>
                      <Link
                        href={`/shop/products?artisan=${artisan.id}`}
                        className="card-link"
                      >
                        View Products
                      </Link>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="col-12 text-center">
                <p>No artisans found. Please check the database connection.</p>
                <button
                  className="btn btn-primary"
                  onClick={setupArtisansTable}
                  disabled={loading}
                >
                  Retry Setup
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default SellersPage;
