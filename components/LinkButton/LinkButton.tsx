import Link from "next/link";
import Image from "next/image";
import styles from "./LinkButton.module.css";

export default function LinkButton({
  path,
  msg,
}: {
  path: string;
  msg: string;
}) {
  return (
    <Link href={path} className={styles.LinkButton}>
      <p>{msg}</p>
      <span>
        <Image
          src="images/icon_arrow_black.svg"
          width={0}
          height={0}
          sizes="100%"
          style={{ width: "12px", height: "auto" }}
          alt=""
        ></Image>
      </span>
    </Link>
  );
}
