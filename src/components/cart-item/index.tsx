import { AiOutlineClose, AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { decreaseQuantity, increaseQuantity, removeItem } from "../../redux/cart/actions";
import type { CartItem as CartItemType } from "../../redux/cart/reducer";
import { useAppDispatch } from "../../redux/hooks";
import * as Styles from "./styles";

interface CartItemProps {
  product: CartItemType;
}

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const CartItem = ({ product }: CartItemProps) => {
  const dispatch = useAppDispatch();

  return (
    <Styles.CartItemContainer>
      <Styles.CartItemImage $imageUrl={product.imageUrl} role="img" aria-label={product.name} />
      <Styles.CartItemInfo>
        <p>{product.name}</p>
        <p>{currency.format(product.price)}</p>
        <Styles.CartItemQuantity>
          <button type="button" onClick={() => dispatch(decreaseQuantity(product.id))} aria-label={`Diminuir quantidade de ${product.name}`}><AiOutlineMinus size={20} /></button>
          <p>{product.quantity}</p>
          <button type="button" onClick={() => dispatch(increaseQuantity(product.id))} aria-label={`Aumentar quantidade de ${product.name}`}><AiOutlinePlus size={20} /></button>
        </Styles.CartItemQuantity>
      </Styles.CartItemInfo>
      <Styles.RemoveButton type="button" onClick={() => dispatch(removeItem(product.id))} aria-label={`Remover ${product.name}`}><AiOutlineClose size={25} /></Styles.RemoveButton>
    </Styles.CartItemContainer>
  );
};

export default CartItem;
