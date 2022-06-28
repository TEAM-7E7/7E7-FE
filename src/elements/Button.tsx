import "../styles/elements/button.scss";

interface ButtonOptions {
  color: string; // primary, error,
  variant: string; // outlined, variant
  onClick: () => void;
}

export const Button = ({ color, variant, onClick }: ButtonOptions) => {
  return <button className={`${color} ${variant}`} onClick={onClick} />;
};
