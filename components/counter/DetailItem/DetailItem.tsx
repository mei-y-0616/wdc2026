import styles from "./DetailItem.module.css";
import Image from "next/image";
import { ReactNode } from "react";

export default function DetailItem({
  imageSrc,
  explain,
}: {
  imageSrc: string;
  explain: ReactNode;
}) {
  return (
    <div className={styles.counterDetailItem}>
      <div className={styles.img}>
        <Image
          src={imageSrc}
          width={0}
          height={0}
          sizes="100%"
          alt=""
          style={{ width: "100%", height: "100%" }}
        ></Image>
      </div>

      {explain}
    </div>
  );
}
