"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { counter } from "@/app/generated/prisma/client";
import { areaObj } from "@/data/pref_code";
import { Prisma } from "@/app/generated/prisma/client";
import CounterMap from "@/components/CounterMap/CounterMap";

function SearchTag({
  areas,
  services,
  onAreasChange,
  onServicesChange,
}: {
  areas: Array<keyof typeof areaObj>;
  services: Array<string>;
  onAreasChange: (areas: Array<keyof typeof areaObj>) => void;
  onServicesChange: (services: Array<string>) => void;
}) {
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
      <ul className={styles.buttonList}>
        {allAreaKeys.map((id) => {
          return (
            <li key={id}>
              <button
                className={areas.includes(id) ? styles.isSelected : ""}
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
    const serviceObj = {
      has_storage: "一時預かり",
      has_delivery_sameday: "当日配送",
      has_delivery_standard: "一般配送",
      has_delivery_overseas: "海外配送",
    };
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
      <ul className={styles.buttonList}>
        {Object.entries(serviceObj).map(([key, value]) => {
          return (
            <li key={key}>
              <button
                className={services.includes(key) ? styles.isSelected : ""}
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
    <>
      <FromArea></FromArea>
      <FromService></FromService>
    </>
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
        <li key={i + 1} className={styles.isSelected}>
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

  return (
    <ul className={styles.buttonList}>
      {linkAry.map((link) => {
        return link;
      })}
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
      <div>
        <input type="text" onChange={handleInputChange} value={searchTextTmp} />
        <button type="submit" onClick={handleClick}>
          検索
        </button>
      </div>
    </>
  );
}

function SwitchDisplay({setDisplay}:{setDisplay:(display:"list" | "map")=>void}) {
  return (
    <>
      <ul className={styles.switchDisplay}>
        <li>
          <button onClick={()=>setDisplay("list")}>リストで表示</button>
        </li>
        <li>
          <button onClick={()=>setDisplay("map")}>マップで表示</button>
        </li>
      </ul>
    </>
  );
}

//ページネーション変わるたびにリロード入ってる
export default function Counters() {
  const [countersData, setCountersData] = useState<Array<counter>>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [areas, setAreas] = useState<Array<keyof typeof areaObj>>([]);
  const [services, setServices] = useState<Array<string>>([]);
  const [searchTextTmp, setSearchTextTmp] = useState<string>("");
  const [searchText, setSearchText] = useState<Array<string>>([]);
  const [display, setDisplay] = useState<"list" | "map">("list");

  // 初期設定
  // 1ページあたりの最大表示件数
  const limit = 20;
  // const areasAry=areas.split(",");
  // const servicesAry=services.split(",")
  const skip = (page - 1) * limit;

  function prismaCreateWhere() {
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

    //検索ワードで絞り込み
    if (searchText.length >= 1) {
      const AND: Prisma.counterWhereInput[] = [];
      const targetColumns = [
        "company_name_ja",
        "company_name_en",
        "counter_name_ja",
        "counter_name_en",
        "address_ja",
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

  async function fetchDataCounter() {
    console.log("fetchDataCounter");
    const res = await fetch("/api/prisma/search-counter-data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip: display==="list"?skip:undefined,
        take: display==="list"?limit:undefined,
        where: prismaCreateWhere(),
      }),
    });
    const data = await res.json();
    setCountersData(data.res);
  }

  useEffect(() => {
    console.log("use effect areas,services");
    async function fetchDataNum() {
      const res = await fetch("/api/prisma/search-counter-num", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          where: prismaCreateWhere(),
        }),
      });
      const data = await res.json();
      setCount(data.count);
    }
    fetchDataNum();
    // if (page === 1) {
    //   fetchDataCounter();
    // } else {
    //   setPage(1);
    // }
    fetchDataCounter();
    setPage(1);
  }, [areas, services, searchText,display]);

  useEffect(() => {
    if (page === 1) return;
    console.log("use effect page");
    fetchDataCounter();
  }, [page]);

  return (
    <>
      <div className="container">
        <SearchText
          searchTextTmp={searchTextTmp}
          setSearchTextTmp={setSearchTextTmp}
          setSearchText={setSearchText}
        ></SearchText>

        <SwitchDisplay setDisplay={setDisplay}></SwitchDisplay>

        {display==="list"&&<ul>
          {countersData.map((counter) => (
            <li key={counter.id} className={styles.counter}>
              <Link href={`/counters/${counter.id}`}  className={styles.link}>
                {counter.counter_name_ja}
              </Link>
              <Link href={`https://maps.google.com/maps?ll=${counter.latitude},${counter.longitude}&z=17&q=${counter.latitude},${counter.longitude}`}>MAP</Link>
            </li>
          ))}
        </ul>}

        {display==="map"&&<CounterMap counters={countersData}></CounterMap>}

        {display==="list"&&<Pager
          count={count}
          limit={limit}
          page={page}
          onPageChange={setPage}
        ></Pager>}
        <SearchTag
          areas={areas}
          services={services}
          onAreasChange={setAreas}
          onServicesChange={setServices}
        ></SearchTag>
      </div>
    </>
  );
}
