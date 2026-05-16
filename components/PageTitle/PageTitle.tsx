import BreadCrumb from "@/components/BreadCrumb/BreadCrumb";
import styles from "./PageTitle.module.css";
import Image from "next/image";

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
      <Image src="/images/img_tree.svg" alt="" width={109} height={142} className={styles.deco}/>
 
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
