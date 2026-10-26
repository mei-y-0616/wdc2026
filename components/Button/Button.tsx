import styles from "./Button.module.css";

export default function Button({
  onClick,
  children,
  type = "button",
  className,
}: {
  onClick?: () => void;
  children: React.ReactNode;
  type?: "button" | "submit";
  className?: string;
}) {
  return (
    <button
      type={type}
      onClick={onClick}
      className={className ? `${styles.button} ${className}` : styles.button}
    >
      {children}
    </button>
  );
}
