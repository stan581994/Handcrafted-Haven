import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";
import "bootstrap/dist/css/bootstrap.min.css";

// Define the Artisan type
interface Artisan {
  id: number;
  name: string;
  specialty: string;
  description: string;
  image_url: string | null;
  created_at: string;
  updated_at: string;
}

const ArtisanProfile: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  const [artisan, setArtisan] = useState<Artisan | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Function to fetch artisan data
  const fetchArtisan = async (artisanId: string) => {
    try {
      setLoading(true);
      const response = await fetch(`/api/artisan/${artisanId}`);
      const data = await response.json();

      if (data.success) {
        setArtisan(data.data);
      } else {
        setError(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  // Effect to run when the ID is available
  useEffect(() => {
    if (id && typeof id === "string") {
      fetchArtisan(id);
    }
  }, [id]);

  return (
    <div>
      <Head>
        <title>
          {artisan
            ? `${artisan.name} | Handcrafted Haven`
            : "Artisan Profile | Handcrafted Haven"}
        </title>
        <meta
          name="description"
          content={
            artisan
              ? `Learn more about ${artisan.name}, a talented ${artisan.specialty} at Handcrafted Haven.`
              : "Discover the talented artisans behind our handcrafted products."
          }
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        {/* Error message */}
        {error && (
          <div className="alert alert-danger mb-4">
            <strong>Error:</strong> {error}
            <div className="mt-3">
              <Link href="/sellers" className="btn btn-primary">
                Back to Artisans
              </Link>
            </div>
          </div>
        )}

        {/* Loading indicator */}
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
            <p className="mt-3">Loading artisan profile...</p>
          </div>
        ) : artisan ? (
          <div className="row">
            <div className="col-md-4 mb-4">
              {artisan.image_url ? (
                <img
                  src={artisan.image_url}
                  alt={`${artisan.name} - ${artisan.specialty}`}
                  className="img-fluid rounded shadow"
                  style={{
                    maxHeight: "400px",
                    width: "100%",
                    objectFit: "cover",
                  }}
                />
              ) : (
                <div className="bg-light p-5 text-center rounded">
                  <p className="mb-0">No image available</p>
                </div>
              )}
            </div>
            <div className="col-md-8">
              <h1 className="mb-2">{artisan.name}</h1>
              <h5 className="text-muted mb-4">{artisan.specialty}</h5>

              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="mb-0">About the Artisan</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">{artisan.description}</p>
                </div>
              </div>

              <div className="card mb-4">
                <div className="card-header">
                  <h4 className="mb-0">Contact & Shop</h4>
                </div>
                <div className="card-body">
                  <p className="card-text">
                    Interested in {artisan.name}'s work? Browse their products
                    or get in touch.
                  </p>
                  <Link
                    href={`/shop/products?artisan=${artisan.id}`}
                    className="btn btn-primary me-2"
                  >
                    View Products
                  </Link>
                  <button className="btn btn-outline-secondary">
                    Contact Artisan
                  </button>
                </div>
              </div>

              <Link href="/sellers" className="btn btn-outline-primary">
                Back to All Artisans
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center my-5">
            <h2>Artisan Not Found</h2>
            <p>
              The artisan you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/sellers" className="btn btn-primary">
              View All Artisans
            </Link>
          </div>
        )}
      </main>
    </div>
  );
};

export default ArtisanProfile;
