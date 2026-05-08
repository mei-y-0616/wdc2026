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
          src="/images/icon_arrow_black.svg"
          width={12}
          height={4}
          sizes="100%"
          alt=""
        ></Image>
      </span>
    </Link>
  );
}
