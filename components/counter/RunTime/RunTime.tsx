import styles from "./RunTime.module.css"
import { judgeRunTime } from "@/utils/counter/counterFuns";
import type { counter } from "@prisma/client";

export default function RunTime({ c }: { c: counter }) {
  return (
    <dl className={styles.counterRunTime}>
      <div>
        <div className={styles.counterRunTimeItem}>
          <dt>月：</dt>
          <dd>
            {judgeRunTime({
              open: c.mon_open,
              close: c.mon_close,
              is_holiday: c.mon_is_holiday,
            })}
          </dd>
        </div>

        <div className={styles.counterRunTimeItem}>
          <dt>火：</dt>
          <dd>
            {judgeRunTime({
              open: c.tue_open,
              close: c.tue_close,
              is_holiday: c.tue_is_holiday,
            })}
          </dd>
        </div>

        <div className={styles.counterRunTimeItem}>
          <dt>水：</dt>
          <dd>
            {judgeRunTime({
              open: c.wed_open,
              close: c.wed_close,
              is_holiday: c.wed_is_holiday,
            })}
          </dd>
        </div>

        <div className={styles.counterRunTimeItem}>
          <dt>木：</dt>
          <dd>
            {judgeRunTime({
              open: c.thu_open,
              close: c.thu_close,
              is_holiday: c.thu_is_holiday,
            })}
          </dd>
        </div>
      </div>

      <div>
        <div className={styles.counterRunTimeItem}>
          <dt>金：</dt>
          <dd>
            {judgeRunTime({
              open: c.fri_open,
              close: c.fri_close,
              is_holiday: c.fri_is_holiday,
            })}
          </dd>
        </div>

        <div className={styles.counterRunTimeItem}>
          <dt>土：</dt>
          <dd>
            {judgeRunTime({
              open: c.sat_open,
              close: c.sat_close,
              is_holiday: c.sat_is_holiday,
            })}
          </dd>
        </div>

        <div className={styles.counterRunTimeItem}>
          <dt>日：</dt>
          <dd>
            {judgeRunTime({
              open: c.sun_open,
              close: c.sun_close,
              is_holiday: c.sun_is_holiday,
            })}
          </dd>
        </div>
        <div className={`note`}>{c.hours_notes_ja}</div>
      </div>
    </dl>
  );
}
