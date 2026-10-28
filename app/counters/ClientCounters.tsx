"use client";
import styles from "./page.module.css";
import Link from "next/link";
import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { counter } from "@prisma/client";
import { areaObj } from "@/data/pref_code";
import { Prisma } from "@prisma/client";
import CounterMap from "@/components/CounterMap/CounterMap";
import PageTitle from "@/components/PageTitle/PageTitle";
import LinkButton from "@/components/LinkButton/LinkButton";
import Button from "@/components/Button/Button";
import { getParsePhone, getLanguage } from "@/utils/counter/counterFuns";
import TagList from "@/components/counter/TagList/TagList";
import RunTime from "@/components/counter/RunTime/RunTime";
import DetailItem from "@/components/counter/DetailItem/DetailItem";

const serviceObj: Record<string, string> = {
  has_storage: "一時預かり",
  has_delivery_sameday: "当日配送",
  has_delivery_standard: "一般配送",
  has_delivery_overseas: "海外配送",
};

const languageObj: Record<string, string> = {
  lang_en: "英語",
  lang_zh_cn: "中国語(簡体字)",
  lang_zh_tw: "中国語(繁体字)",
  lang_ko: "韓国語",
  lang_th: "タイ語",
};

function SearchTag({
  areas,
  services,
  languages,
  onAreasChange,
  onServicesChange,
  onLanguagesChange,
  onClear,
}: {
  areas: Array<keyof typeof areaObj>;
  services: Array<string>;
  languages: Array<string>;
  onAreasChange: (areas: Array<keyof typeof areaObj>) => void;
  onServicesChange: (services: Array<string>) => void;
  onLanguagesChange: (languages: Array<string>) => void;
  onClear: () => void;
}) {
  const [isOpen, setIsOpen] = useState(false);

  function FromArea() {
    function handleClick(id: keyof typeof areaObj) {
      if (areas.includes(id)) {
        const nextAreas = areas.filter((area) => area !== id);
        onAreasChange(nextAreas);
      } else {
        const nextAreas = [...areas, id];
        onAreasChange(nextAreas);
      }
    }

    const allAreaKeys = Object.keys(areaObj) as Array<keyof typeof areaObj>;
    return (
      <ul className={`${styles.buttonList} ${styles.fromArea}`}>
        {allAreaKeys.map((id) => {
          return (
            <li key={id}>
              <button
                className={areas.includes(id) ? styles.isSelectedTag : ""}
                onClick={() => handleClick(id)}
              >
                {areaObj[id].name}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
  function FromService() {
    function handleClick(currentService: string) {
      if (services.includes(currentService)) {
        const nextServices = services.filter(
          (service) => service !== currentService,
        );
        onServicesChange(nextServices);
      } else {
        const nextServices = [...services, currentService];
        onServicesChange(nextServices);
      }
    }

    return (
      <ul className={`${styles.buttonList} ${styles.fromService}`}>
        {Object.entries(serviceObj).map(([key, value]) => {
          return (
            <li key={key}>
              <button
                className={services.includes(key) ? styles.isSelectedTag : ""}
                onClick={() => handleClick(key)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }
  function FromLanguage() {
    function handleClick(currentLanguage: string) {
      if (languages.includes(currentLanguage)) {
        const nextLanguages = languages.filter(
          (language) => language !== currentLanguage,
        );
        onLanguagesChange(nextLanguages);
      } else {
        const nextLanguages = [...languages, currentLanguage];
        onLanguagesChange(nextLanguages);
      }
    }

    return (
      <ul className={`${styles.buttonList} ${styles.fromLanguage}`}>
        {Object.entries(languageObj).map(([key, value]) => {
          return (
            <li key={key}>
              <button
                className={languages.includes(key) ? styles.isSelectedTag : ""}
                onClick={() => handleClick(key)}
              >
                {value}
              </button>
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <div
      className={
        isOpen
          ? `${styles.searchTagWrapper} ${styles.searchTagIsOpen}`
          : styles.searchTagWrapper
      }
    >
      <button
        className={styles.searchTagSpBtn}
        onClick={() => setIsOpen(!isOpen)}
      >
        <div className={styles.searchSortImg}>
          <Image src="/images/icon_sort_black.svg" fill alt="hoge"></Image>
        </div>
      </button>

      <div className={styles.searchTag}>
        <h3 className={styles.searchTagTitle}>検索フィルター</h3>
        <div className={styles.searchTagFilters}>
          <div className={styles.searchTagTitleSub}>
            <Image
              src="/images/icon_area_green.svg"
              width={18}
              height={18}
              alt="アイコン"
            ></Image>
            <h4>エリアで絞り込み</h4>
          </div>
          <FromArea></FromArea>
          <div className={styles.searchTagTitleSub}>
            <Image
              src="/images/icon_service_green.svg"
              width={18}
              height={18}
              alt="アイコン"
            ></Image>
            <h4>対応サービスで絞り込み</h4>
          </div>
          <FromService></FromService>
          <div className={styles.searchTagTitleSub}>
            <Image
              src="/images/icon_lang_green.svg"
              width={18}
              height={18}
              alt="アイコン"
            ></Image>
            <h4>対応言語で絞り込み</h4>
          </div>
          <FromLanguage></FromLanguage>
        </div>
        <Button className={styles.clearButton} onClick={onClear}>
          検索をクリア
        </Button>
      </div>
    </div>
  );
}

function Pager({
  count,
  limit,
  page,
  onPageChange,
}: {
  count: number;
  limit: any;
  page: number;
  onPageChange: (page: number) => void;
}) {
  // const { count, currentPage, limit } = props;
  const pages = Math.ceil(count / limit);

  const linkAry = [];

  function handleClick(num: number) {
    onPageChange(num);
  }
  for (let i = 0; i < pages; i++) {
    let ele;
    if (i + 1 === page) {
      ele = (
        <li key={i + 1} className={styles.isSelectedPage}>
          {i + 1}
        </li>
      );
    } else {
      ele = (
        <li key={i + 1}>
          <button onClick={() => handleClick(i + 1)}>{i + 1}</button>
        </li>
      );
    }
    linkAry.push(ele);
  }

  function ActivePrevBtn() {
    return (
      <li>
        <button onClick={() => onPageChange(page - 1)}>&lt;</button>
      </li>
    );
  }
  function InactivePrevBtn() {
    return <li className={styles.pagerInactive}>&lt;</li>;
  }
  function ActiveNextBtn() {
    return (
      <li>
        <button onClick={() => onPageChange(page + 1)}>&gt;</button>
      </li>
    );
  }
  function InactiveNextBtn() {
    return <li className={styles.pagerInactive}>&gt;</li>;
  }

  return (
    <ul className={styles.pager}>
      {page === 1 ? <InactivePrevBtn /> : <ActivePrevBtn />}

      {linkAry.map((link) => {
        return link;
      })}

      {page === linkAry.length ? <InactiveNextBtn /> : <ActiveNextBtn />}
    </ul>
  );
}

function SearchText({
  searchTextTmp,
  setSearchTextTmp,
  setSearchText,
}: {
  searchTextTmp: string;
  setSearchTextTmp: (searchTextTmp: string) => void;
  setSearchText: (searchText: Array<string>) => void;
}) {
  function handleInputChange(e: any) {
    setSearchTextTmp(e.target.value);
  }
  function handleClick() {
    if (searchTextTmp?.match(/.+/)) {
      const searchAry = searchTextTmp.split(/\s+/);
      setSearchText(searchAry);
    } else {
      setSearchText([]);
    }
  }

  return (
    <>
      <div className={styles.searchText}>
        <h3>フリーワード検索</h3>
        <div className={styles.searchBoxArea}>
          <input
            type="text"
            onChange={handleInputChange}
            value={searchTextTmp}
            placeholder="カウンター名、地名などで検索"
          />
          <button type="submit" onClick={handleClick}>
            <Image
              src="/images/icon_search.svg"
              width="18"
              height="18"
              alt="検索アイコン"
            ></Image>
            <span>検索</span>
          </button>
        </div>
      </div>
    </>
  );
}

function SwitchDisplay({
  display,
  setDisplay,
}: {
  display: "list" | "map";
  setDisplay: (display: "list" | "map") => void;
}) {
  return (
    <>
      <ul className={styles.switchDisplay}>
        <li>
          <button
            className={display === "list" ? styles.activeDisplay : ""}
            onClick={() => setDisplay("list")}
          >
            リストで表示
          </button>
        </li>
        <li>
          <button
            className={display === "map" ? styles.activeDisplay : ""}
            onClick={() => setDisplay("map")}
          >
            マップで表示
          </button>
        </li>
      </ul>
    </>
  );
}

function SearchResult({
  searchText,
  areas,
  services,
  languages,
  count,
  start,
  limit,
  display,
}: {
  searchText: Array<string>;
  areas: Array<keyof typeof areaObj>;
  services: Array<string>;
  languages: Array<string>;
  count: number;
  start: number;
  limit: number;
  display: "list" | "map";
}) {
  let searchAry: string[] = [];
  if (searchText.length > 0) {
    searchAry = [...searchAry, ...searchText];
  }
  if (areas.length > 0) {
    areas.forEach((child) => {
      searchAry.push(areaObj[child].name);
    });
  }
  if (services.length > 0) {
    services.forEach((child) => {
      searchAry.push(serviceObj[child]);
    });
  }
  if (languages.length > 0) {
    languages.forEach((child) => {
      searchAry.push(languageObj[child]);
    });
  }

  return (
    <p className={styles.searchResult}>
      {(areas.length > 0 ||
        services.length > 0 ||
        languages.length > 0 ||
        searchText.length > 0) && (
        <>
          {searchAry.map((word, index) => (
            <span key={index}>
              {index !== 0 && "、"}
              {word}
            </span>
          ))}
          の検索結果　
        </>
      )}
      {display === "list" && (
        <>
          <span className={styles.searchResultStrong}>
            {start + Math.min(1, count)}～{Math.min(start + limit, count)}
          </span>
          <span>件を表示 /</span>
        </>
      )}
      全 <span className={styles.searchResultStrong}>{count}</span> 件
    </p>
  );
}

// 1ページあたりの最大表示件数
const limit = 20;

function createWhere(
  areas: Array<keyof typeof areaObj>,
  services: Array<string>,
  languages: Array<string>,
  searchText: Array<string>,
) {
  const where: Prisma.counterWhereInput = {};
  where.AND = [];
  //地域絞り込み
  if (areas.length !== 0) {
    const prefAry: number[] = [];
    for (let id of areas) {
      prefAry.push(...areaObj[id]?.prefs);
    }
    where.AND.push({ pref_code: { in: prefAry } });
  }

  // サービス絞り込み
  if (services.length !== 0) {
    const OR: Prisma.counterWhereInput[] = [];
    services.map((service) => {
      OR.push({ [service]: 1 });
    });
    where.AND.push({ OR: OR });
  }

  // 対応言語絞り込み
  if (languages.length !== 0) {
    const OR: Prisma.counterWhereInput[] = [];
    languages.forEach((language) => {
      OR.push({ [language]: 1 });
    });
    where.AND.push({ OR: OR });
  }

  //検索ワードで絞り込み
  if (searchText.length >= 1) {
    const AND: Prisma.counterWhereInput[] = [];
    const targetColumns = [
      "company_name_ja",
      "company_name_en",
      "counter_name_ja",
      "counter_name_en",
      "x_full_address_ja",
      "address_en",
      "station_name_ja",
      "station_name_en",
    ];

    searchText.forEach((text) => {
      const OR: Prisma.counterWhereInput[] = [];
      targetColumns.forEach((column) => {
        OR.push({
          [column]: {
            contains: text,
          },
        });
      });
      AND.push({ OR: OR });
    });
    where.AND.push({ AND: AND });
  }

  return where;
}

async function postJson(path: string, body: unknown) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_URL}${path}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
  return res.json();
}

export default function ClientCounters() {
  const [countersData, setCountersData] = useState<Array<counter>>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [areas, setAreas] = useState<Array<keyof typeof areaObj>>([]);
  const [services, setServices] = useState<Array<string>>([]);
  const [languages, setLanguages] = useState<Array<string>>([]);
  const [searchTextTmp, setSearchTextTmp] = useState<string>("");
  const [searchText, setSearchText] = useState<Array<string>>([]);
  const [display, setDisplay] = useState<"list" | "map">("list");

  const searchBarRef = useRef<HTMLDivElement>(null);
  const skip = (page - 1) * limit;
  const where = useMemo(
    () => createWhere(areas, services, languages, searchText),
    [areas, services, languages, searchText],
  );

  // 検索バーが画面上部に来る位置までスクロールする
  function scrollToSearchBar() {
    searchBarRef.current?.scrollIntoView({ block: "start" });
  }

  // 検索条件を変えるときは1ページ目に戻し、スクロール位置も検索バーに戻す
  function handleAreasChange(nextAreas: Array<keyof typeof areaObj>) {
    setAreas(nextAreas);
    setPage(1);
    scrollToSearchBar();
  }
  function handleServicesChange(nextServices: Array<string>) {
    setServices(nextServices);
    setPage(1);
    scrollToSearchBar();
  }
  function handleLanguagesChange(nextLanguages: Array<string>) {
    setLanguages(nextLanguages);
    setPage(1);
    scrollToSearchBar();
  }
  // 全ての検索条件（絞り込み・フリーワード）をクリアする
  function handleClearAll() {
    setAreas([]);
    setServices([]);
    setLanguages([]);
    setSearchTextTmp("");
    setSearchText([]);
    setPage(1);
    scrollToSearchBar();
  }
  function handleSearchTextChange(nextSearchText: Array<string>) {
    setSearchText(nextSearchText);
    setPage(1);
    scrollToSearchBar();
  }
  function handlePageChange(nextPage: number) {
    setPage(nextPage);
    scrollToSearchBar();
  }
  function handleDisplayChange(nextDisplay: "list" | "map") {
    setDisplay(nextDisplay);
    setPage(1);
  }

  // 検索結果の総件数（ページには依存しない）
  useEffect(() => {
    let ignore = false;
    postJson("/api/prisma/search-counter-num", { where }).then((data) => {
      if (!ignore) setCount(data.count);
    });
    return () => {
      ignore = true;
    };
  }, [where]);

  // 表示するカウンター一覧
  useEffect(() => {
    let ignore = false;
    postJson("/api/prisma/search-counter-data", {
      skip: display === "list" ? skip : undefined,
      take: display === "list" ? limit : undefined,
      where,
    }).then((data) => {
      if (!ignore && Array.isArray(data.res)) setCountersData(data.res);
    });
    return () => {
      ignore = true;
    };
  }, [where, display, skip]);

  // console.log(countersData);
  return (
    <>
      <PageTitle
        titleEn="Search"
        titleJa={
          <span>
            手ぶら観光カウンター
            <span style={{ color: "var(--font)" }}>を探す</span>
          </span>
        }
      ></PageTitle>
      <div className="inner">
        <section>
          <div ref={searchBarRef} className={styles.searchBarAnchor}>
            <SearchText
              searchTextTmp={searchTextTmp}
              setSearchTextTmp={setSearchTextTmp}
              setSearchText={handleSearchTextChange}
            ></SearchText>
          </div>

          <SearchResult
            searchText={searchText}
            areas={areas}
            services={services}
            languages={languages}
            count={count}
            start={skip}
            limit={limit}
            display={display}
          ></SearchResult>

          <SwitchDisplay
            display={display}
            setDisplay={handleDisplayChange}
          ></SwitchDisplay>

          <div className={styles.searchTagAndCounters}>
            <SearchTag
              areas={areas}
              services={services}
              languages={languages}
              onAreasChange={handleAreasChange}
              onServicesChange={handleServicesChange}
              onLanguagesChange={handleLanguagesChange}
              onClear={handleClearAll}
            ></SearchTag>

            {display === "list" && (
              <div className={styles.countersAndPager}>
                <ul className={styles.counterList}>
                  {countersData &&
                    countersData.map((counter) => (
                      <li key={counter.id} className={styles.counter}>
                        <article>
                          <div className={styles.counterHead}>
                            <div className={styles.counterHeadLeft}>
                              <h3 className={styles.counterName}>
                                {counter.counter_name_ja}
                              </h3>
                              <TagList counter={counter} />
                            </div>
                            <div className={styles.counterHeadRight}>
                              <Link
                                href={`https://maps.google.com/maps?ll=${counter.latitude},${counter.longitude}&z=17&q=${counter.latitude},${counter.longitude}`}
                                className={styles.counterMapLink}
                              >
                                <div className={styles.counterMapLinkIcon}>
                                  <Image
                                    src="/images/icon_maplink_white.svg"
                                    width={0}
                                    height={0}
                                    sizes="100%"
                                    style={{ width: "auto", height: "45px" }}
                                    alt=""
                                  ></Image>
                                </div>
                              </Link>

                              <LinkButton
                                path={`/counters/${counter.id}`}
                                msg="カウンターの詳細へ"
                              ></LinkButton>
                            </div>
                          </div>
                          <div className={styles.counterBottom}>
                            <DetailItem
                              imageSrc="/images/icon_map_gray.svg"
                              explain={<p>{counter.x_full_address_ja}</p>}
                            />

                            <DetailItem
                              imageSrc="/images/icon_phone_gray.svg"
                              explain={<p>{getParsePhone(counter.phone)}</p>}
                            />

                            <DetailItem
                              imageSrc="/images/icon_time_gray.svg"
                              explain={<RunTime c={counter} />}
                            />

                            <DetailItem
                              imageSrc="/images/icon_lang_gray.svg"
                              explain={<p>対応言語：{getLanguage(counter)}</p>}
                            />
                          </div>

                          <div className={styles.counterHeadRightSp}>
                            <Link
                              href={`https://maps.google.com/maps?ll=${counter.latitude},${counter.longitude}&z=17&q=${counter.latitude},${counter.longitude}`}
                              className={styles.counterMapLink}
                            >
                              <div className={styles.counterMapLinkIcon}>
                                <Image
                                  src="/images/icon_maplink_white.svg"
                                  width={0}
                                  height={0}
                                  sizes="100%"
                                  style={{ width: "auto", height: "45px" }}
                                  alt=""
                                ></Image>
                              </div>
                            </Link>

                            <LinkButton
                              path={`/counters/${counter.id}`}
                              msg="カウンターの詳細へ"
                            ></LinkButton>
                          </div>
                        </article>
                      </li>
                    ))}
                </ul>

                {count > 0 && (
                  <Pager
                    count={count}
                    limit={limit}
                    page={page}
                    onPageChange={handlePageChange}
                  ></Pager>
                )}
              </div>
            )}

            {display === "map" && countersData && (
              <div className={styles.counterMap}>
                <CounterMap counters={countersData} link={true}></CounterMap>
              </div>
            )}
          </div>
        </section>
      </div>
    </>
  );
}
