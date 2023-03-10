import "./Products.css";
import {
  AddToCartIcon,
  LikesIcon,
  RemoveFromCartIcon,
  UserIcon,
} from "./Icons.jsx";
import { useCart, useFilters } from "../hooks";
import formatCurrency from "../helpers/formatCurrency";
import { useSelector } from "react-redux";

const Products = ({ setSkip }) => {
  const { addToCart, removeFromCart, cart } = useCart();
  const { data } = useSelector((state) => state.products);
  console.log(data);
  const { filterProducts, setFilters } = useFilters();

  const products = filterProducts(data);

  const checkProductInCart = (product) =>
    cart.products.some((item) => item.id === product.id);

  return (
    <>
      <main className="products">
        <ul>
          {products /* .slice(0, 9) */
            .map((product) => {
              const isProductInCart = checkProductInCart(product);
              return (
                <li key={product.id}>
                  <img src={product.thumbnail} alt={product.title} />
                  <div>
                    <strong>{product.title}</strong> -{" "}
                    {formatCurrency(product.price)}
                  </div>
                  <div>
                    <button
                      style={{
                        backgroundColor: isProductInCart ? "red" : "#09f",
                      }}
                      onClick={() =>
                        isProductInCart
                          ? removeFromCart(product)
                          : addToCart(product)
                      }
                    >
                      {isProductInCart ? (
                        <RemoveFromCartIcon />
                      ) : (
                        <AddToCartIcon />
                      )}
                    </button>
                    <button
                      style={{
                        backgroundColor: "#09f",
                      }}
                    >
                      <LikesIcon fill="none" />
                    </button>
                  </div>
                </li>
              );
            })}
        </ul>
      </main>
      <button
        className="loadMore-btn"
        onClick={() => setSkip((prevState) => prevState + 9)}
      >
        Load More
      </button>
    </>
  );
};

export default Products;
