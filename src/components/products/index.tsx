import products from "../../data/products";
import ProductItem from "../product-item";
import * as Styles from "./styles";

const Products = () => (
  <Styles.Container aria-label="Produtos">
    {products.map((product) => <ProductItem product={product} key={product.id} />)}
  </Styles.Container>
);

export default Products;
