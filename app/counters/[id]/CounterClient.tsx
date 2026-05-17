"use client";
import styles from "./page.module.css";
import Link from "next/link";
import type { counter } from "@prisma/client";
import TagList from "@/components/counter/TagList/TagList";
import CounterMap from "@/components/CounterMap/CounterMap";
import PageTitle from "@/components/PageTitle/PageTitle";
import DetailItem from "@/components/counter/DetailItem/DetailItem";
import { getParsePhone, getLanguage } from "@/utils/counter/counterFuns";
import RunTime from "@/components/counter/RunTime/RunTime";
import { parseTime } from "@/utils/counter/counterFuns";
import LinkButton from "@/components/LinkButton/LinkButton";

export default function CounterClient({
  id,
  counter,
}: {
  id: string;
  counter: counter;
}) {
  function Price({
    fixed,
    max,
    min,
  }: {
    fixed: string | null;
    max: string | null;
    min: string | null;
  }) {
    if (fixed) {
      return <span className={styles.price}>{fixed}</span>;
    } else {
      return (
        <>
          <span className={styles.price}>{min ?? "---"}</span>～
          <span className={styles.price}>{max ?? "---"}</span>
        </>
      );
    }
  }
  const c = counter;

  return (
    <>
      <PageTitle
        titleEn="Search"
        titleJa={
          <span>
            手ぶら観光カウンター
            <span style={{ color: "var(--font)" }}>を探す - 詳細</span>
          </span>
        }
        pageName={c.counter_name_ja}
      ></PageTitle>
      <div className="container">
        <section>
          <div className={`inner ${styles.counterWrapper}`}>
            <div className={styles.counter}>
              <div className={styles.counterHead}>
                <h2 className={styles.counterName}>{c.counter_name_ja}</h2>
                <TagList counter={c} />
              </div>

              <div className={styles.counterData}>
                <div className={styles.counterDetail}>
                  <div className={styles.counterDetailLeft}>
                    <DetailItem
                      imageSrc="/images/icon_map_gray.svg"
                      explain={<p>{c.x_full_address_ja}</p>}
                    />
                    <DetailItem
                      imageSrc="/images/icon_phone_gray.svg"
                      explain={<p>{getParsePhone(c.phone)}</p>}
                    />
                    <DetailItem
                      imageSrc="/images/icon_time_gray.svg"
                      explain={<RunTime c={counter} />}
                    />
                  </div>
                  <div className={styles.counterDetailRight}>
                    <DetailItem
                      imageSrc="/images/icon_lang_gray.svg"
                      explain={<p>対応言語：{getLanguage(counter)}</p>}
                    />
                    {c.station_name_ja && (
                      <DetailItem
                        imageSrc="/images/icon_station_gray.svg"
                        explain={
                          <p>設置・最寄り公共交通機関：{c.station_name_ja}</p>
                        }
                      />
                    )}
                    {c.website_url && (
                      <DetailItem
                        imageSrc="/images/icon_url_gray.svg"
                        explain={
                          <p style={{ wordBreak: "break-all" }}>
                            関連サイトURL：
                            {/* <Link
                              href={c.website_url}
                              className="break-all"
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {c.website_url}
                            </Link> */}
                            <span>{c.website_url}</span>
                          </p>
                        }
                      />
                    )}
                  </div>
                </div>
                <div className={styles.counterMap}>
                  <CounterMap
                    counters={[c]}
                    link={false}
                    centerLat={c.latitude}
                    centerLon={c.longitude}
                  />
                </div>
              </div>

              <div className={styles.serviceArea}>
                <h3 className={styles.serviceAreaTitle}>対応サービス</h3>
                <div className={styles.serviceGrid}>
                  {/* 一時預かり */}
                  {c.has_storage === 1 && (
                    <div className={styles.serviceBlock}>
                      <div className={styles.serviceBlockHead}>
                        <h4 className={styles.serviceName}>一時預かり</h4>
                        <p className={styles.servicePrice}>
                          ￥
                          <Price
                            fixed={c.storage_fee_fixed}
                            max={c.storage_fee_max}
                            min={c.storage_fee_min}
                          />
                        </p>
                      </div>

                      <table className={styles.serviceTable}>
                        <tbody>
                          <tr>
                            <th>取扱品目</th>
                            <td>
                              <div className={styles.serviceItem}>
                                {c.storage_item_suitcase === "1" && (
                                  <span>スーツケース</span>
                                )}
                                {c.storage_item_chilled === "1" && (
                                  <span>クール</span>
                                )}
                                {c.storage_item_souvenir === "1" && (
                                  <span>お土産</span>
                                )}
                              </div>
                              {(c.storage_max_dimensions ||
                                c.storage_max_weight ||
                                c.storage_max_value) && (
                                <div className={styles.serviceDetail}>
                                  {c.storage_max_dimensions && (
                                    <p>
                                      3辺長合計の上限：
                                      {c.storage_max_dimensions}cm
                                    </p>
                                  )}
                                  {c.storage_max_weight && (
                                    <p>最大重量：{c.storage_max_weight}kg</p>
                                  )}
                                  {c.storage_max_value && (
                                    <p>
                                      取扱金額の上限：{c.storage_max_value}円
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.storage_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.storage_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>補償内容</th>
                            <td>
                              {c.storage_insurance_limit && (
                                <div className={styles.serviceDetail}>
                                  {c.storage_insurance_limit && (
                                    <p>
                                      補償金額：{c.storage_insurance_limit}
                                      円まで
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.storage_insurance_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.storage_insurance_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 当日配送 */}
                  {c.has_delivery_sameday === 1 && (
                    <div className={styles.serviceBlock}>
                      <div className={styles.serviceBlockHead}>
                        <h4 className={styles.serviceName}>当日配送</h4>
                        <p className={styles.servicePrice}>
                          ￥
                          <Price
                            fixed={c.delivery_sameday_fee_fixed}
                            max={c.delivery_sameday_fee_max}
                            min={c.delivery_sameday_fee_min}
                          />
                        </p>
                      </div>

                      <table className={styles.serviceTable}>
                        <tbody>
                          <tr>
                            <th>取扱品目</th>
                            <td>
                              <div className={styles.serviceItem}>
                                {c.delivery_sameday_item_suitcase === "1" && (
                                  <span>スーツケース</span>
                                )}
                                {c.delivery_sameday_item_chilled === "1" && (
                                  <span>クール</span>
                                )}
                                {c.delivery_sameday_item_souvenir === "1" && (
                                  <span>お土産</span>
                                )}
                              </div>
                              {(c.delivery_sameday_max_dimensions ||
                                c.delivery_sameday_max_weight ||
                                c.delivery_sameday_max_value) && (
                                <div className={styles.serviceDetail}>
                                  {c.delivery_sameday_max_dimensions && (
                                    <p>
                                      3辺長合計の上限：
                                      {c.delivery_sameday_max_dimensions}cm
                                    </p>
                                  )}
                                  {c.delivery_sameday_max_weight && (
                                    <p>
                                      最大重量：{c.delivery_sameday_max_weight}
                                      kg
                                    </p>
                                  )}
                                  {c.delivery_sameday_max_value && (
                                    <p>
                                      取扱金額の上限：
                                      {c.delivery_sameday_max_value}円
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.delivery_sameday_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_sameday_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>補償内容</th>
                            <td>
                              {c.delivery_sameday_insurance_limit && (
                                <div className={styles.serviceDetail}>
                                  {c.delivery_sameday_insurance_limit && (
                                    <p>
                                      補償金額：
                                      {c.delivery_sameday_insurance_limit}
                                      円まで
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.delivery_sameday_insurance_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_sameday_insurance_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                          {(c.delivery_sameday_cutoff_time ||
                            c.delivery_sameday_last_time) && (
                            <tr>
                              <th>締切時間</th>
                              <td>
                                <div className={styles.serviceDetail}>
                                  {c.delivery_sameday_cutoff_time && (
                                    <p>
                                      受付締切：
                                      {parseTime(
                                        c.delivery_sameday_cutoff_time,
                                      )}
                                    </p>
                                  )}
                                  {c.delivery_sameday_last_time && (
                                    <p>
                                      最終配送時間：
                                      {parseTime(c.delivery_sameday_last_time)}
                                    </p>
                                  )}
                                </div>
                              </td>
                            </tr>
                          )}

                          {c.delivery_sameday_dest_ja && (
                            <tr>
                              <th>配送先</th>
                              <td>
                                <div className={styles.serviceDetail}>
                                  <p>{c.delivery_sameday_dest_ja}</p>
                                </div>
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 一般配送 */}
                  {c.has_delivery_standard === 1 && (
                    <div className={styles.serviceBlock}>
                      <div className={styles.serviceBlockHead}>
                        <h4 className={styles.serviceName}>一般配送</h4>
                        <p className={styles.servicePrice}>
                          ￥
                          <Price
                            fixed={c.delivery_standard_fee_fixed}
                            max={c.delivery_standard_fee_max}
                            min={c.delivery_standard_fee_min}
                          />
                        </p>
                      </div>

                      <table className={styles.serviceTable}>
                        <tbody>
                          <tr>
                            <th>取扱品目</th>
                            <td>
                              <div className={styles.serviceItem}>
                                {c.delivery_standard_item_suitcase === "1" && (
                                  <span>スーツケース</span>
                                )}
                                {c.delivery_standard_item_chilled === "1" && (
                                  <span>クール</span>
                                )}
                                {c.delivery_standard_item_souvenir === "1" && (
                                  <span>お土産</span>
                                )}
                              </div>
                              {(c.delivery_standard_max_dimensions ||
                                c.delivery_standard_max_weight ||
                                c.delivery_standard_max_value) && (
                                <div className={styles.serviceDetail}>
                                  {c.delivery_standard_max_dimensions && (
                                    <p>
                                      3辺長合計の上限：
                                      {c.delivery_standard_max_dimensions}cm
                                    </p>
                                  )}
                                  {c.delivery_standard_max_weight && (
                                    <p>
                                      最大重量：{c.delivery_standard_max_weight}
                                      kg
                                    </p>
                                  )}
                                  {c.delivery_standard_max_value && (
                                    <p>
                                      取扱金額の上限：
                                      {c.delivery_standard_max_value}円
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.delivery_standard_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_standard_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>補償内容</th>
                            <td>
                              {c.delivery_standard_insurance_limit && (
                                <div className={styles.serviceDetail}>
                                  {c.delivery_sameday_insurance_limit && (
                                    <p>
                                      補償金額：
                                      {c.delivery_standard_insurance_limit}
                                      円まで
                                    </p>
                                  )}
                                </div>
                              )}
                              {c.delivery_standard_insurance_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_standard_insurance_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>

                          {c.delivery_standard_is_nationwide && (
                            <tr>
                              <th>配送先</th>
                              <td>
                                {c.delivery_standard_is_nationwide === "1" && (
                                  <>
                                    <div className={styles.serviceDetail}>
                                      <p>全国各地発送可能</p>
                                    </div>
                                    {c.delivery_standard_dest_ja && (
                                      <p className={styles.serviceNote}>
                                        {c.delivery_standard_dest_ja}
                                      </p>
                                    )}
                                  </>
                                )}
                                {c.delivery_standard_is_nationwide === "2" && (
                                  <div className={styles.serviceDetail}>
                                    <p>{c.delivery_standard_dest_ja}</p>
                                  </div>
                                )}
                              </td>
                            </tr>
                          )}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* 海外配送 */}
                  {c.has_delivery_overseas === 1 && (
                    <div className={styles.serviceBlock}>
                      <div className={styles.serviceBlockHead}>
                        <h4 className={styles.serviceName}>海外配送</h4>
                        <p className={styles.servicePrice}>
                          ￥
                          <Price
                            fixed={c.delivery_overseas_fee_fixed}
                            max={c.delivery_overseas_fee_max}
                            min={c.delivery_overseas_fee_min}
                          />
                        </p>
                      </div>

                      <table className={styles.serviceTable}>
                        <tbody>
                          <tr>
                            <th>取扱品目</th>
                            <td>
                              <div className={styles.serviceItem}>
                                {c.delivery_overseas_item_suitcase === "1" && (
                                  <span>スーツケース</span>
                                )}
                                {c.delivery_overseas_item_chilled === "1" && (
                                  <span>クール</span>
                                )}
                                {c.delivery_overseas_item_souvenir === "1" && (
                                  <span>お土産</span>
                                )}
                              </div>
                              <div className={styles.serviceDetail}>
                                {c.delivery_overseas_max_dimensions && (
                                  <p>
                                    3辺長合計の上限：
                                    {c.delivery_overseas_max_dimensions}cm
                                  </p>
                                )}
                                {c.delivery_overseas_max_weight && (
                                  <p>
                                    最大重量：{c.delivery_overseas_max_weight}kg
                                  </p>
                                )}
                                {c.delivery_overseas_max_value && (
                                  <p>
                                    取扱金額の上限：
                                    {c.delivery_overseas_max_value}円
                                  </p>
                                )}
                              </div>
                              {c.delivery_overseas_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_overseas_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                          <tr>
                            <th>補償内容</th>
                            <td>
                              <div className={styles.serviceDetail}>
                                {c.delivery_sameday_insurance_limit && (
                                  <p>
                                    補償金額：
                                    {c.delivery_overseas_insurance_limit}
                                    円まで
                                  </p>
                                )}
                              </div>
                              {c.delivery_overseas_insurance_notes_ja && (
                                <p className={styles.serviceNote}>
                                  {c.delivery_overseas_insurance_notes_ja}
                                </p>
                              )}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              </div>

              <div className={styles.linkButtonArea}>
                <LinkButton path="/counters" msg="カウンター一覧に戻る" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
