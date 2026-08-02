import { BsCartPlus } from "react-icons/bs";
import type { Product } from "../../data/products";
import { addItem } from "../../redux/cart/actions";
import { useAppDispatch } from "../../redux/hooks";
import CustomButton from "../custom-button";
import * as Styles from "./styles";

interface ProductItemProps {
  product: Product;
}

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const ProductItem = ({ product }: ProductItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Styles.ProductContainer>
      <Styles.ProductImage $imageUrl={product.imageUrl} role="img" aria-label={product.name}>
        <CustomButton startIcon={<BsCartPlus />} onClick={() => dispatch(addItem(product))}>
          Adicionar ao carrinho
        </CustomButton>
      </Styles.ProductImage>
      <Styles.ProductInfo>
        <p>{product.name}</p>
        <p>{currency.format(product.price)}</p>
      </Styles.ProductInfo>
    </Styles.ProductContainer>
  );
};

export default ProductItem;
