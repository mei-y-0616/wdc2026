import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import styles from "./PageTitle.module.css";

export default function PageTitle({
  titleEn,
  titleJa,
  pageName,
}: {
  titleEn: string;
  titleJa: React.ReactNode;
  pageName?: string;
}) {
  return (
    <div className={`${styles.pageTitle} container`}>
      <div className={`inner ${styles.inner}`}>
        <p className={styles.titleEn}>
          <span className={styles.titleEnMark}>・</span>
          {titleEn}
        </p>
        <h2 className={styles.titleJa}>{titleJa}</h2>
        <BreadCrumb pageName={pageName}></BreadCrumb>
      </div>
    </div>
  );
}
