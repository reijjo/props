import "./Button.css";
import { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonProps = {
  children: ReactNode;
  type?: "button" | "submit" | "reset";
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({
  children,
  type = "button",
  ...props
}: ButtonProps) {
  return (
    <button type={type} {...props}>
      {children}
    </button>
  );
}
