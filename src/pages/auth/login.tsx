import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import { signIn, useSession } from "next-auth/react";
import { toast } from "react-hot-toast";

const LoginPage: React.FC = () => {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });
  const [activeTab, setActiveTab] = useState("login");
  const [error, setError] = useState("");

  // Get the callback URL from the query parameters or default to "/"
  const callbackUrl = (router.query.callbackUrl as string) || "/";

  // If user is already logged in, redirect to home page or callback URL
  useEffect(() => {
    if (status === "authenticated") {
      router.push(callbackUrl);
    }
  }, [status, router, callbackUrl]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email: formData.email,
        password: formData.password,
      });

      if (result?.error) {
        setError("Invalid email or password");
        toast.error("Login failed. Please check your credentials.");
      } else {
        toast.success("Login successful!");
        router.push(callbackUrl);
      }
    } catch (error) {
      setError("An error occurred during login");
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <Head>
        <title>Login | Handcrafted Haven</title>
        <meta
          name="description"
          content="Login to your Handcrafted Haven account."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header">
                <ul className="nav nav-tabs card-header-tabs">
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "login" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("login")}
                    >
                      Login
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className={`nav-link ${
                        activeTab === "register" ? "active" : ""
                      }`}
                      onClick={() => setActiveTab("register")}
                    >
                      Register
                    </button>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                {activeTab === "login" ? (
                  <>
                    <h5 className="card-title">Login to Your Account</h5>
                    {error && <div className="alert alert-danger">{error}</div>}
                    {router.query.callbackUrl && (
                      <div className="alert alert-info">
                        Please log in to continue to checkout.
                      </div>
                    )}
                    <form onSubmit={handleSubmit}>
                      <div className="mb-3">
                        <label htmlFor="email" className="form-label">
                          Email address
                        </label>
                        <input
                          type="email"
                          className="form-control"
                          id="email"
                          name="email"
                          value={formData.email}
                          onChange={handleInputChange}
                          placeholder="name@example.com"
                          required
                        />
                      </div>
                      <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                          Password
                        </label>
                        <input
                          type="password"
                          className="form-control"
                          id="password"
                          name="password"
                          value={formData.password}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="mb-3 form-check">
                        <input
                          type="checkbox"
                          className="form-check-input"
                          id="rememberMe"
                          name="rememberMe"
                          checked={formData.rememberMe}
                          onChange={handleInputChange}
                        />
                        <label
                          className="form-check-label"
                          htmlFor="rememberMe"
                        >
                          Remember me
                        </label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isLoading}
                      >
                        {isLoading ? "Logging in..." : "Login"}
                      </button>
                    </form>
                    <div className="mt-3">
                      <small>
                        <a href="#">Forgot your password?</a>
                      </small>
                    </div>
                  </>
                ) : (
                  <>
                    <h5 className="card-title">Create an Account</h5>
                    <p className="text-muted">
                      Registration functionality will be implemented soon.
                    </p>
                    <button
                      className="btn btn-secondary"
                      onClick={() => setActiveTab("login")}
                    >
                      Back to Login
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
