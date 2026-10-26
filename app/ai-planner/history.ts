export type HistoryEntry = {
  id: string;
  createdAt: number;
  prompt: string;
  response: string;
  countersId: number[];
};

export const MAX_HISTORY = 10;

// 履歴一覧（localStorage：ブラウザに残る）
const HISTORY_KEY = "ai-planner-history";
// 今表示している履歴のID（sessionStorage：タブを閉じるまで。別ページから戻ったときの復元用）
const CURRENT_KEY = "ai-planner-current";

function isEntry(value: unknown): value is HistoryEntry {
  if (typeof value !== "object" || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.id === "string" &&
    typeof v.createdAt === "number" &&
    typeof v.prompt === "string" &&
    typeof v.response === "string" &&
    Array.isArray(v.countersId) &&
    v.countersId.every((id) => typeof id === "number")
  );
}

export function loadHistory(): HistoryEntry[] {
  try {
    const raw = localStorage.getItem(HISTORY_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter(isEntry).slice(0, MAX_HISTORY)
      : [];
  } catch {
    return [];
  }
}

export function saveHistory(history: HistoryEntry[]) {
  try {
    localStorage.setItem(
      HISTORY_KEY,
      JSON.stringify(history.slice(0, MAX_HISTORY)),
    );
  } catch {
    // 容量超過・プライベートモードなどで保存できなくても動作は続ける
  }
}

export function loadCurrentId(): string | null {
  try {
    return sessionStorage.getItem(CURRENT_KEY);
  } catch {
    return null;
  }
}

export function saveCurrentId(id: string | null) {
  try {
    if (id === null) {
      sessionStorage.removeItem(CURRENT_KEY);
    } else {
      sessionStorage.setItem(CURRENT_KEY, id);
    }
  } catch {
    // 保存できなくても動作は続ける
  }
}

// 履歴一覧に出す回答文の抜粋（Markdownの記号を除いて1行にする）
export function toExcerpt(markdown: string, maxLength = 120): string {
  const text = markdown
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[#*_`>~\-]+/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > maxLength ? text.slice(0, maxLength) : text;
}
