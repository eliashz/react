import React, { createContext, useState } from "react";

export const CartContext = createContext();

export function CartProvider({ children }) {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);
  //   console.log(cart, total);

  const addToCart = (product) => {
    const productInCart = cart.findIndex((item) => item.id === product.id);

    if (productInCart >= 0) {
      const newCart = structuredClone(cart);
      newCart[productInCart].quantity += 1;
      setTotal((prevState) => prevState + product.price);
      return setCart(newCart);
    }

    setCart((prevState) => [
      ...prevState,
      {
        ...product,
        quantity: 1,
      },
    ]);
    console.log(product);
    setTotal((prevState) => prevState + product.price);
  };

  const removeFromCart = (product) => {
    setCart((prevState) => prevState.filter((item) => item.id !== product.id));
    setTotal((prevState) => prevState - product.price * product?.quantity);
  };
  const clearCart = () => {
    setCart([]);
    setTotal(0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, clearCart, total }}
    >
      {children}
    </CartContext.Provider>
  );
}
