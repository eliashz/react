import "./Cart.css";
import React, { useId } from "react";
import { CartIcon, ClearCartIcon } from "./Icons";
import { useCart } from "../hooks";
import CartItem from "./CartItem";
import formatCurrency from "../helpers/formatCurrency";

const Cart = () => {
  const cartCheckboxId = useId();
  const { cart, clearCart, addToCart, removeOneFromCart } = useCart();
  // console.log(cart);
  return (
    <>
      <label className="cart-button" htmlFor={cartCheckboxId}>
        <CartIcon />
      </label>
      <input id={cartCheckboxId} type="checkbox" hidden />
      <aside className="cart">
        <ul>
          {cart.products.map((product) => (
            <CartItem
              key={product.id}
              addToCart={() => addToCart(product)}
              removeOneFromCart={() => removeOneFromCart(product)}
              {...product}
            />
          ))}
        </ul>
        <div>
          {cart.total > 0 && (
            <strong>TOTAL: {formatCurrency(cart.total)}</strong>
          )}
        </div>
        {cart.products.length === 0 ? (
          <h6>Cart Empty</h6>
        ) : (
          <button onClick={clearCart}>
            <ClearCartIcon />
          </button>
        )}
      </aside>
    </>
  );
};

export default Cart;
