import styles from "./Button.module.css";

type Props = {
  id: string;
  onClick: (event: React.MouseEvent<HTMLButtonElement>) => void;
  disabled: boolean;
  children: React.ReactNode;
};

export const Button = ({ id, onClick, disabled, children }: Props) => {
  return (
    <button
      type="button"
      id={id}
      className={disabled ? styles.disabled_button : styles.able_button}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
