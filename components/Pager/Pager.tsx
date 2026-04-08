import styles from "./Pager.module.css";
import Link from "next/link";

export default function Pager(props: {
  count: number;
  currentPage: number;
  limit: number;
}) {
  const { count, currentPage, limit } = props;
  const pages = Math.ceil(count / limit);

  const linkAry = [];
  for (let i = 0; i < pages; i++) {
    let ele;
    if (i + 1 === currentPage) {
      ele = (
        <li key={i + 1} className={styles.currentPage}>
          {i + 1}
        </li>
      );
    } else {
      ele = (
        <li key={i + 1}>
          <Link href={`/counters?page=${i + 1}`}>{i + 1}</Link>
        </li>
      );
    }
    linkAry.push(ele);
  }

  return (
    <ul className={styles.pager}>
      {linkAry.map((link) => {
        return link;
      })}
    </ul>
  );
}
