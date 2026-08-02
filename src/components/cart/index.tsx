import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai";
import { useAppSelector } from "../../redux/hooks";
import CartItem from "../cart-item";
import * as Styles from "./styles";

interface CartProps {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
}

const currency = new Intl.NumberFormat("pt-BR", { style: "currency", currency: "BRL" });

const Cart = ({ isVisible, setIsVisible }: CartProps) => {
  const items = useAppSelector((state) => state.cart.items);
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  useEffect(() => {
    if (!isVisible) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setIsVisible(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [isVisible, setIsVisible]);

  return (
    <Styles.CartContainer $isVisible={isVisible} aria-hidden={!isVisible}>
      <Styles.CartEscapeArea onClick={() => setIsVisible(false)} aria-label="Fechar carrinho" />
      <Styles.CartContent role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <Styles.CartHeader>
          <Styles.CartTitle id="cart-title">Seu Carrinho</Styles.CartTitle>
          <Styles.CloseButton type="button" onClick={() => setIsVisible(false)} aria-label="Fechar carrinho"><AiOutlineClose size={24} /></Styles.CloseButton>
        </Styles.CartHeader>
        {items.length === 0 ? <Styles.EmptyCart>Seu carrinho está vazio.</Styles.EmptyCart> : items.map((item) => <CartItem key={item.id} product={item} />)}
        <Styles.CartTotal>Total: {currency.format(total)}</Styles.CartTotal>
      </Styles.CartContent>
    </Styles.CartContainer>
  );
};

export default Cart;
