import React from "react";
import Head from "next/head";
import Link from "next/link";
import Navbar from "../../components/Navbar";

const LoginPage: React.FC = () => {
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
                    <a className="nav-link active" href="#">
                      Login
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="#">
                      Register
                    </a>
                  </li>
                </ul>
              </div>
              <div className="card-body">
                <h5 className="card-title">Login to Your Account</h5>
                <form>
                  <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                      Email address
                    </label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="name@example.com"
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
                    />
                  </div>
                  <div className="mb-3 form-check">
                    <input
                      type="checkbox"
                      className="form-check-input"
                      id="rememberMe"
                    />
                    <label className="form-check-label" htmlFor="rememberMe">
                      Remember me
                    </label>
                  </div>
                  <button type="submit" className="btn btn-primary">
                    Login
                  </button>
                </form>
                <div className="mt-3">
                  <small>
                    <a href="#">Forgot your password?</a>
                  </small>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default LoginPage;
