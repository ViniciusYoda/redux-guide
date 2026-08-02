import { useState } from "react";
import { loginUser, logoutUser } from "../../redux/user/actions";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import Cart from "../cart";
import * as Styles from "./styles";

function Header() {
  const [cartIsVisible, setCartIsVisible] = useState(false);
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.user.currentUser);
  const itemCount = useAppSelector((state) => state.cart.items.reduce((total, item) => total + item.quantity, 0));

  return (
    <Styles.Container>
      <Styles.Logo>Redux Shopping</Styles.Logo>
      <Styles.Buttons>
        {currentUser ? (
          <button type="button" onClick={() => dispatch(logoutUser())}>Sair</button>
        ) : (
          <button type="button" onClick={() => dispatch(loginUser({ name: "Usuário", email: "usuario@example.com" }))}>Login</button>
        )}
        <button type="button" onClick={() => setCartIsVisible(true)}>Carrinho ({itemCount})</button>
      </Styles.Buttons>
      <Cart isVisible={cartIsVisible} setIsVisible={setCartIsVisible} />
    </Styles.Container>
  );
}

export default Header;
