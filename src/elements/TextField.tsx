import "../styles/elements/textfield.scss";

interface TextFieldOptions {
  size?: string; // small, medium, large
  placeholder?: string;
  fullWidth?: boolean;
  rows?: number;
  value?: any;
  ref?: any;
  onChange?: any;
  name?: string;
  type?: string;
}

export function TextField({
  size = "small",
  fullWidth = false,
  rows = 4,
  value,
  ref,
  placeholder,
  onChange,
  name,
  type,
}: TextFieldOptions) {
  return (
    <textarea
      className={`textfield-${size} textfield-${fullWidth ? "fullWidth" : ""}`}
      value={value}
      ref={ref}
      rows={rows}
      placeholder={placeholder}
      onChange={onChange}
      name={name}
    />
  );
}
