"use client";
import styles from "./page.module.css";
import Link from "next/link";
import { useEffect, useState } from "react";
import type { counter } from "@/app/generated/prisma/client";
import { areaObj } from "@/data/pref_code";
import { Prisma } from "@/app/generated/prisma/client";
import { array } from "zod/mini";
import { setServers } from "dns";

//ページネーション変わるたびにリロード入ってる
export default function Counters() {
  const [countersData, setCountersData] = useState<Array<counter>>([]);
  const [count, setCount] = useState<number>(0);
  const [page, setPage] = useState<number>(1);
  const [areas, setAreas] = useState<Array<keyof typeof areaObj>>([]);
  const [services, setServices] = useState<Array<string>>([]);

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

    return where;
  }

  async function fetchDataCounter() {
    console.log("fetchDataCounter")
    const res = await fetch("/api/prisma/search-counter-data", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        skip: skip,
        take: limit,
        where: prismaCreateWhere(),
      }),
    });
    const data = await res.json();
    setCountersData(data.res);
  }

  useEffect(() => {
    console.log("page:"+page)
    console.log("use effect areas,services")
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
    if (page === 1) {
      fetchDataCounter();
    } else {
      setPage(1);
    }
  }, [areas, services]);

  useEffect(() => {
    console.log("use effect page")
    fetchDataCounter();
  }, [page]);

  function Search() {
    function FromArea() {
      function handleClick(id: keyof typeof areaObj) {
        if (areas.includes(id)) {
          const nextAreas = areas.filter((area) => area !== id);
          setAreas(nextAreas);
        } else {
          const nextAreas = [...areas, id];
          setAreas(nextAreas);
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
          setServices(nextServices);
        } else {
          const nextServices = [...services, currentService];
          setServices(nextServices);
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

  function Pager() {
    // const { count, currentPage, limit } = props;
    const pages = Math.ceil(count / limit);

    const linkAry = [];

    function handleClick(num: number) {
      setPage(num);
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

  return (
    <>
      <div className="container">
        <ul>
          {countersData.map((counter) => (
            <li key={counter.id} className={styles.link}>
              <Link href={`/counters/${counter.id}`}>
                {counter.counter_name_ja}
              </Link>
            </li>
          ))}
        </ul>

        <Pager></Pager>
        <Search></Search>
      </div>
    </>
  );
}
