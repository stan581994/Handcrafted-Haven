import React, { useState, useEffect } from "react";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import {
  getCartItems,
  updateCartItemQuantity,
  removeFromCart,
  clearCart,
  getCartTotal,
  CartItem,
} from "../../utils/cart";
import { toast } from "react-hot-toast";

const CartPage: React.FC = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isClient, setIsClient] = useState(false);

  // Initialize cart items from local storage
  useEffect(() => {
    setIsClient(true);
    setCartItems(getCartItems());
  }, []);

  // Update cart items when changes are made
  const refreshCart = () => {
    setCartItems(getCartItems());
  };

  // Handle quantity change
  const handleQuantityChange = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;

    updateCartItemQuantity(itemId, newQuantity);
    refreshCart();
    toast.success("Cart updated");
  };

  // Handle item removal
  const handleRemoveItem = (itemId: number, itemName: string) => {
    removeFromCart(itemId);
    refreshCart();
    toast.success(`${itemName} removed from cart`);
  };

  // Handle cart clearing
  const handleClearCart = () => {
    if (window.confirm("Are you sure you want to clear your cart?")) {
      clearCart();
      refreshCart();
      toast.success("Cart cleared");
    }
  };

  // Format price
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(price);
  };

  // Calculate item total
  const calculateItemTotal = (price: number, quantity: number) => {
    return price * quantity;
  };

  // Proceed to checkout
  const handleCheckout = () => {
    // This would typically redirect to a checkout page or process
    toast.success("Proceeding to checkout...");
    // For now, just show a success message
    alert("Checkout functionality would be implemented here!");
  };

  return (
    <div>
      <Head>
        <title>My Cart | Handcrafted Haven</title>
        <meta
          name="description"
          content="View and manage your shopping cart."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <main className="container mt-5 mb-5">
        <h1>My Cart</h1>

        {isClient && cartItems.length === 0 ? (
          <div className="text-center my-5">
            <div className="alert alert-info">
              <p className="mb-0">Your cart is empty.</p>
            </div>
            <Link href="/shop/products" className="btn btn-primary mt-3">
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div className="table-responsive">
              <table className="table table-hover">
                <thead className="table-light">
                  <tr>
                    <th>Product</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Total</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {isClient &&
                    cartItems.map((item) => (
                      <tr key={item.id}>
                        <td>
                          <div className="d-flex align-items-center">
                            <div
                              className="me-3"
                              style={{
                                width: "60px",
                                height: "60px",
                                overflow: "hidden",
                              }}
                            >
                              {item.image_url ? (
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                  className="img-fluid"
                                  style={{
                                    objectFit: "cover",
                                    width: "100%",
                                    height: "100%",
                                  }}
                                />
                              ) : (
                                <div className="bg-light d-flex align-items-center justify-content-center h-100">
                                  <span className="text-muted small">
                                    No image
                                  </span>
                                </div>
                              )}
                            </div>
                            <div>
                              <h6 className="mb-0">{item.name}</h6>
                              <small className="text-muted">
                                by {item.artisan_name}
                              </small>
                            </div>
                          </div>
                        </td>
                        <td>{formatPrice(item.price)}</td>
                        <td>
                          <div
                            className="input-group"
                            style={{ width: "120px" }}
                          >
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              type="button"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity - 1)
                              }
                              disabled={item.quantity <= 1}
                            >
                              -
                            </button>
                            <input
                              type="number"
                              className="form-control form-control-sm text-center"
                              value={item.quantity}
                              min="1"
                              onChange={(e) =>
                                handleQuantityChange(
                                  item.id,
                                  parseInt(e.target.value) || 1
                                )
                              }
                            />
                            <button
                              className="btn btn-outline-secondary btn-sm"
                              type="button"
                              onClick={() =>
                                handleQuantityChange(item.id, item.quantity + 1)
                              }
                            >
                              +
                            </button>
                          </div>
                        </td>
                        <td>
                          {formatPrice(
                            calculateItemTotal(item.price, item.quantity)
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-outline-danger btn-sm"
                            onClick={() => handleRemoveItem(item.id, item.name)}
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
                <tfoot className="table-light">
                  <tr>
                    <td colSpan={3} className="text-end fw-bold">
                      Total:
                    </td>
                    <td className="fw-bold">
                      {isClient && formatPrice(getCartTotal())}
                    </td>
                    <td></td>
                  </tr>
                </tfoot>
              </table>
            </div>

            <div className="d-flex justify-content-between mt-4">
              <div>
                <button
                  className="btn btn-outline-danger me-2"
                  onClick={handleClearCart}
                >
                  Clear Cart
                </button>
                <Link href="/shop/products" className="btn btn-outline-primary">
                  Continue Shopping
                </Link>
              </div>
              <button
                className="btn btn-success"
                onClick={handleCheckout}
                disabled={cartItems.length === 0}
              >
                Proceed to Checkout
              </button>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
};

export default CartPage;
