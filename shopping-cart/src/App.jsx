import { useEffect, useState } from "react";
import Products from "./components/Products";
import { useFilters } from "./hooks/";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Cart from "./components/Cart";
import { CartProvider } from "./context/cart";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "./store/products.slice";

function App() {
  const [skip, setSkip] = useState(0);
  const { isError, isLoading, isSuccess } = useSelector(
    (state) => state.products
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProducts(skip));
  }, [skip]);

  /*   useEffect(() => {
    if (!data) return;
    setProducts(data.products);
    setFilters((prevState) => ({
      ...prevState,
      minPrice: Math.min(...data.products.map((d) => d.price)),
      maxPrice: Math.max(...data.products.map((d) => d.price)),
      maxValue: Math.max(...data.products.map((d) => d.price)),
    }));
  }, [data]); */

  return (
    <>
      {isLoading && <h5>Loading...</h5>}
      {isError && <h5>Error</h5>}
      {isSuccess && (
        <CartProvider>
          <Header />
          <Cart />
          <Products setSkip={setSkip} />
          {/* <Footer /> */}
        </CartProvider>
      )}
    </>
  );
}

export default App;
