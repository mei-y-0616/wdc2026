import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import styles from "./PageTitle.module.css";

export default function PageTitle({
  titleEn,
  titleJa,
}: {
  titleEn: string;
  titleJa: React.ReactNode;
}) {

  return (
    <div className={styles.pageTitle}>
      <p className={styles.titleEn}><span className={styles.titleEnMark}>・</span>{titleEn}</p>
      <h2 className={styles.titleJa}>{titleJa}</h2>
      <BreadCrumb></BreadCrumb>
    </div>
  );
}
