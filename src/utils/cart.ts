// Cart utility functions for managing cart items in local storage

export interface CartItem {
  id: number;
  name: string;
  price: number;
  image_url: string;
  quantity: number;
  artisan_name: string;
}

// Get cart items from local storage
export const getCartItems = (): CartItem[] => {
  if (typeof window === 'undefined') return [];
  
  const cartItems = localStorage.getItem('cartItems');
  return cartItems ? JSON.parse(cartItems) : [];
};

// Add item to cart
export const addToCart = (item: Omit<CartItem, 'quantity'>): void => {
  if (typeof window === 'undefined') return;
  
  const cartItems = getCartItems();
  const existingItemIndex = cartItems.findIndex(cartItem => cartItem.id === item.id);
  
  if (existingItemIndex >= 0) {
    // Item already exists in cart, increment quantity
    cartItems[existingItemIndex].quantity += 1;
  } else {
    // Add new item to cart with quantity 1
    cartItems.push({ ...item, quantity: 1 });
  }
  
  localStorage.setItem('cartItems', JSON.stringify(cartItems));
};

// Remove item from cart
export const removeFromCart = (itemId: number): void => {
  if (typeof window === 'undefined') return;
  
  const cartItems = getCartItems();
  const updatedCartItems = cartItems.filter(item => item.id !== itemId);
  
  localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
};

// Update item quantity in cart
export const updateCartItemQuantity = (itemId: number, quantity: number): void => {
  if (typeof window === 'undefined') return;
  
  const cartItems = getCartItems();
  const itemIndex = cartItems.findIndex(item => item.id === itemId);
  
  if (itemIndex >= 0) {
    if (quantity <= 0) {
      // Remove item if quantity is 0 or negative
      removeFromCart(itemId);
    } else {
      // Update quantity
      cartItems[itemIndex].quantity = quantity;
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
    }
  }
};

// Clear cart
export const clearCart = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.removeItem('cartItems');
};

// Get total number of items in cart
export const getCartItemCount = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + item.quantity, 0);
};

// Get total price of items in cart
export const getCartTotal = (): number => {
  const cartItems = getCartItems();
  return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
};
