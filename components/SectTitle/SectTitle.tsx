import { ReactNode } from "react";
import styles from "./SectTitle.module.css";

export default function SectTitle({
  titleEn,
  titleJa,
}: {
  titleEn: string;
  titleJa: ReactNode;
}) {
  return (
    <div className={styles.sectTitle}>
      <span className={styles.en}>{titleEn}</span>
      <h3 className={styles.ja}>
        {titleJa}
      </h3>
    </div>
  );
}
