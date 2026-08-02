import type { ButtonHTMLAttributes, ReactNode } from "react";
import * as Styles from "./styles";

interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  startIcon?: ReactNode;
}

const CustomButton = ({ children, startIcon, type = "button", ...rest }: CustomButtonProps) => (
  <Styles.CustomButtonContainer type={type} {...rest}>
    {startIcon && <Styles.IconContainer>{startIcon}</Styles.IconContainer>}
    {children}
  </Styles.CustomButtonContainer>
);

export default CustomButton;
