import prisma from "@/lib/prisma";
import { judgeRunTime, getLanguage, getPrice } from "./counterFuns";

type ShortCounter = {
  カウンターID: number;
  事業者名: string;
  事業者住所: {
    都道府県コード: number;
    市町村コード: number;
    大字丁目_番地等: string | null;
  };
  カウンター名称: string;
  カウンター住所: {
    都道府県コード: number;
    市町村コード: number;
    大字丁目_番地等: string | null;
    建物階層: string | null;
    施設類型:
      | "空港"
      | "駅"
      | "港"
      | "宿泊施設"
      | "観光案内所"
      | "商業施設"
      | "MICE施設"
      | "その他"
      | null;
    設置公共交通機関名又は最寄公共交通機関名: string | null;
    緯度: number;
    経度: number;
  };
  営業時間: {
    月曜日: string;
    火曜日: string;
    水曜日: string;
    木曜日: string;
    金曜日: string;
    土曜日: string;
    日曜日: string;
    その他: string | null;
  };
  対応可能言語: string;
  免税店フラグ: "該当なし" | "一般型" | "手続委託型";
  JNTO観光案内所フラグ:
    | "該当なし"
    | "JNTO認定観光案内所（カテゴリー３）"
    | "JNTO認定観光案内所（カテゴリー２）"
    | "JNTO認定観光案内所（カテゴリー１）"
    | "JNTO認定観光案内所（パートナー施設）";
  一時預かり対応: boolean;
  一時預かり詳細?: {
    料金: string;
    取り扱い可能品目: {
      スーツケース: boolean;
      クール品: boolean;
      土産品: boolean;
      "3辺長合計上限値(cm)": string | null;
      "最大重量上限値(kg)": string | null;
      "取扱金額上限値(円)": string | null;
      その他: string | null;
    };
    補償内容: {
      取扱金額上限値: string | null;
      その他: string | null;
    };
  };
  当日配送対応: boolean;
  当日配送詳細?: {
    料金: string;
    取り扱い可能品目: {
      スーツケース: boolean;
      クール品: boolean;
      土産品: boolean;
      "3辺長合計上限値(cm)": string | null;
      "最大重量上限値(kg)": string | null;
      "取扱金額上限値(円)": string | null;
      その他: string | null;
    };
    補償内容: {
      取扱金額上限値: string | null;
      その他: string | null;
    };
    受付時間締切: string | null;
    最終配送時間: string | null;
    配送先: string | null;
  };
  一般配送対応: boolean;
  一般配送詳細?: {
    料金: string;
    取り扱い可能品目: {
      スーツケース: boolean;
      クール品: boolean;
      土産品: boolean;
      "3辺長合計上限値(cm)": string | null;
      "最大重量上限値(kg)": string | null;
      "取扱金額上限値(円)": string | null;
      その他: string | null;
    };
    補償内容: {
      取扱金額上限値: string | null;
      その他: string | null;
    };
    全国各地発送対応: string;
    配送先: string | null;
  };
  海外配送対応: boolean;
  海外配送詳細?: {
    料金: string;
    取り扱い可能品目: {
      スーツケース: boolean;
      クール品: boolean;
      土産品: boolean;
      "3辺長合計上限値(cm)": string | null;
      "最大重量上限値(kg)": string | null;
      "取扱金額上限値(円)": string | null;
      その他: string | null;
    };
    補償内容: {
      取扱金額上限値: string | null;
      その他: string | null;
    };
  };
};

function getFacilityType(facility_type: string | null) {
  switch (facility_type) {
    case "1":
      return "空港";
    case "2":
      return "駅";
    case "3":
      return "港";
    case "4":
      return "宿泊施設";
    case "5":
      return "観光案内所";
    case "6":
      return "商業施設";
    case "7":
      return "MICE施設";
    case "8":
      return "その他";
    default:
      return null;
  }
}
function getDutyFree(duty_free: string | null) {
  switch (duty_free) {
    case "1":
      return "該当なし";
    case "2":
      return "一般型";
    case "3":
      return "手続委託型";
    default:
      return "該当なし";
  }
}
function getJNTO(jnto: string | null) {
  switch (jnto) {
    case "1":
      return "該当なし";
    case "2":
      return "JNTO認定観光案内所（カテゴリー３）";
    case "3":
      return "JNTO認定観光案内所（カテゴリー２）";
    case "4":
      return "JNTO認定観光案内所（カテゴリー１）";
    case "5":
      return "JNTO認定観光案内所（パートナー施設）";
    default:
      return "該当なし";
  }
}

function getNationWide(nation_wide: string | null) {
  switch (nation_wide) {
    case "0":
      return "未設定";
    case "1":
      return "全国各地発送取扱可能";
    case "3":
      return "別途その他に記載する";
    default:
      return "未設定";
  }
}

export async function shorteningCounterData(idArray: Array<number>) {
  try {
    const cFullDataArray = await prisma.counter.findMany({
      where: { id: { in: idArray } },
    });

    const cShortDataArray: Array<ShortCounter> = [];

    cFullDataArray.forEach((c) => {
      const cShortData: ShortCounter = {
        カウンターID: c.id,
        事業者名: c.company_name_ja,
        事業者住所: {
          都道府県コード: c.company_pref_code,
          市町村コード: c.company_city_code,
          大字丁目_番地等: c.company_address_ja,
        },
        カウンター名称: c.counter_name_ja,
        カウンター住所: {
          都道府県コード: c.pref_code,
          市町村コード: c.city_code,
          大字丁目_番地等: c.address_ja,
          建物階層: c.floor,
          施設類型: getFacilityType(c.facility_type),
          設置公共交通機関名又は最寄公共交通機関名: c.station_name_ja,
          緯度: c.latitude,
          経度: c.longitude,
        },
        営業時間: {
          月曜日: judgeRunTime({
            open: c.mon_open,
            close: c.mon_close,
            is_holiday: c.mon_is_holiday,
          }),
          火曜日: judgeRunTime({
            open: c.tue_open,
            close: c.tue_close,
            is_holiday: c.tue_is_holiday,
          }),
          水曜日: judgeRunTime({
            open: c.wed_open,
            close: c.wed_close,
            is_holiday: c.wed_is_holiday,
          }),
          木曜日: judgeRunTime({
            open: c.thu_open,
            close: c.thu_close,
            is_holiday: c.thu_is_holiday,
          }),
          金曜日: judgeRunTime({
            open: c.fri_open,
            close: c.fri_close,
            is_holiday: c.fri_is_holiday,
          }),
          土曜日: judgeRunTime({
            open: c.sat_open,
            close: c.sat_close,
            is_holiday: c.sat_is_holiday,
          }),
          日曜日: judgeRunTime({
            open: c.sun_open,
            close: c.sun_close,
            is_holiday: c.sun_is_holiday,
          }),
          その他: c.hours_notes_ja,
        },
        対応可能言語: getLanguage(c),
        免税店フラグ: getDutyFree(c.is_duty_free),
        JNTO観光案内所フラグ: getJNTO(c.is_jnto_office),
        一時預かり対応: c.has_storage === 1 ? true : false,
        当日配送対応: c.has_delivery_sameday === 1 ? true : false,
        一般配送対応: c.has_delivery_standard === 1 ? true : false,
        海外配送対応: c.has_delivery_overseas === 1 ? true : false,
      };

      //詳細追加
      if (cShortData["一時預かり対応"]) {
        cShortData["一時預かり詳細"] = {
          料金: getPrice({
            fixed: c.storage_fee_fixed,
            max: c.storage_fee_max,
            min: c.storage_fee_min,
          }),
          取り扱い可能品目: {
            スーツケース: c.storage_item_suitcase === "1" ? true : false,
            クール品: c.storage_item_chilled === "1" ? true : false,
            土産品: c.storage_item_souvenir === "1" ? true : false,
            "3辺長合計上限値(cm)": c.storage_max_dimensions,
            "最大重量上限値(kg)": c.storage_max_weight,
            "取扱金額上限値(円)": c.storage_max_value,
            その他: c.storage_notes_ja,
          },
          補償内容: {
            取扱金額上限値: c.storage_insurance_limit,
            その他: c.storage_insurance_notes_ja,
          },
        };
      }

      if (cShortData["当日配送対応"]) {
        cShortData["当日配送詳細"] = {
          料金: getPrice({
            fixed: c.delivery_sameday_fee_fixed,
            max: c.delivery_sameday_fee_max,
            min: c.delivery_sameday_fee_min,
          }),
          取り扱い可能品目: {
            スーツケース:
              c.delivery_sameday_item_suitcase === "1" ? true : false,
            クール品: c.delivery_sameday_item_chilled === "1" ? true : false,
            土産品: c.delivery_sameday_item_souvenir === "1" ? true : false,
            "3辺長合計上限値(cm)": c.delivery_sameday_max_dimensions,
            "最大重量上限値(kg)": c.delivery_sameday_max_weight,
            "取扱金額上限値(円)": c.delivery_sameday_max_value,
            その他: c.delivery_sameday_notes_ja,
          },
          補償内容: {
            取扱金額上限値: c.delivery_sameday_insurance_limit,
            その他: c.delivery_sameday_insurance_notes_ja,
          },
          受付時間締切: c.delivery_sameday_cutoff_time,
          最終配送時間: c.delivery_sameday_last_time,
          配送先: c.delivery_sameday_dest_ja,
        };
      }

      if (cShortData["一般配送対応"]) {
        cShortData["一般配送詳細"] = {
          料金: getPrice({
            fixed: c.delivery_standard_fee_fixed,
            max: c.delivery_standard_fee_max,
            min: c.delivery_standard_fee_min,
          }),
          取り扱い可能品目: {
            スーツケース:
              c.delivery_standard_item_suitcase === "1" ? true : false,
            クール品: c.delivery_standard_item_chilled === "1" ? true : false,
            土産品: c.delivery_standard_item_souvenir === "1" ? true : false,
            "3辺長合計上限値(cm)": c.delivery_standard_max_dimensions,
            "最大重量上限値(kg)": c.delivery_standard_max_weight,
            "取扱金額上限値(円)": c.delivery_standard_max_value,
            その他: c.delivery_standard_notes_ja,
          },
          補償内容: {
            取扱金額上限値: c.delivery_standard_insurance_limit,
            その他: c.delivery_standard_insurance_notes_ja,
          },
          全国各地発送対応: getNationWide(c.delivery_standard_is_nationwide),
          配送先: c.delivery_standard_dest_ja,
        };
      }

      if (cShortData["海外配送対応"]) {
        cShortData["海外配送詳細"] = {
          料金: getPrice({
            fixed: c.delivery_overseas_fee_fixed,
            max: c.delivery_overseas_fee_max,
            min: c.delivery_overseas_fee_min,
          }),
          取り扱い可能品目: {
            スーツケース:
              c.delivery_overseas_item_suitcase === "1" ? true : false,
            クール品: c.delivery_overseas_item_chilled === "1" ? true : false,
            土産品: c.delivery_overseas_item_souvenir === "1" ? true : false,
            "3辺長合計上限値(cm)": c.delivery_overseas_max_dimensions,
            "最大重量上限値(kg)": c.delivery_overseas_max_weight,
            "取扱金額上限値(円)": c.delivery_overseas_max_value,
            その他: c.delivery_overseas_notes_ja,
          },
          補償内容: {
            取扱金額上限値: c.delivery_overseas_insurance_limit,
            その他: c.delivery_overseas_insurance_notes_ja,
          },
        };
      }

      cShortDataArray.push(cShortData);
    });

    return cShortDataArray;
  } catch {
    return null;
  }
}
