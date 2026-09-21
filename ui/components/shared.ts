/**
 * 컴포넌트 공유 — Tone(구분용 색) 클래스 맵
 *
 * `variant`가 *의미*(primary/destructive/success…)를 고르는 축이라면, `tone`은
 * **의미 없이 갈래만 구분하는 색**을 고르는 축이다. ADS Secondary 16색이
 * 컴포넌트로 들어오는 경로이고, 부서·카테고리·태그처럼 "서로 다르다"만
 * 보여주면 되는 곳에 쓴다.
 *
 * 왜 정적 레코드인가: Tailwind v4의 JIT는 소스에 리터럴로 존재하는 클래스만
 * 생성하므로 `bg-[var(--color-tone-${tone}-bg)]` 같은 템플릿 문자열은 클래스가
 * 만들어지지 않는다. `layouts/shared.ts`의 `GAP_CLASS`와 같은 이유로 16개를
 * 전부 리터럴로 적는다.
 *
 * 왜 팔레트(`--color-green-100`)가 아니라 tone 토큰인가: 이 레포에는 `dark:`
 * 접두사를 쓰는 컴포넌트가 없고 테마 전환이 전부 `semantic.css` 재매핑으로만
 * 일어난다. 팔레트를 직접 참조하면 다크에서 색이 뒤집히지 않는다.
 * 스텝 배치와 대비 근거는 `primitives/semantic.css`의 Tone 절 참고.
 */

/** 고를 수 있는 tone 목록. ADS Secondary 팔레트와 1:1. */
export const TONES = [
  'red',
  'orange',
  'yellow',
  'lime',
  'green',
  'emerald',
  'teal',
  'cyan',
  'sky',
  'blue',
  'indigo',
  'violet',
  'purple',
  'fuchsia',
  'pink',
  'rose',
] as const;

export type Tone = (typeof TONES)[number];

/** 배경 + 텍스트만. Badge·Avatar처럼 hover가 없는 표시용 요소에 쓴다. */
export const TONE_CLASS: Record<Tone, string> = {
  red: 'bg-[var(--color-tone-red-bg)] text-[var(--color-tone-red-text)]',
  orange:
    'bg-[var(--color-tone-orange-bg)] text-[var(--color-tone-orange-text)]',
  yellow:
    'bg-[var(--color-tone-yellow-bg)] text-[var(--color-tone-yellow-text)]',
  lime: 'bg-[var(--color-tone-lime-bg)] text-[var(--color-tone-lime-text)]',
  green: 'bg-[var(--color-tone-green-bg)] text-[var(--color-tone-green-text)]',
  emerald:
    'bg-[var(--color-tone-emerald-bg)] text-[var(--color-tone-emerald-text)]',
  teal: 'bg-[var(--color-tone-teal-bg)] text-[var(--color-tone-teal-text)]',
  cyan: 'bg-[var(--color-tone-cyan-bg)] text-[var(--color-tone-cyan-text)]',
  sky: 'bg-[var(--color-tone-sky-bg)] text-[var(--color-tone-sky-text)]',
  blue: 'bg-[var(--color-tone-blue-bg)] text-[var(--color-tone-blue-text)]',
  indigo:
    'bg-[var(--color-tone-indigo-bg)] text-[var(--color-tone-indigo-text)]',
  violet:
    'bg-[var(--color-tone-violet-bg)] text-[var(--color-tone-violet-text)]',
  purple:
    'bg-[var(--color-tone-purple-bg)] text-[var(--color-tone-purple-text)]',
  fuchsia:
    'bg-[var(--color-tone-fuchsia-bg)] text-[var(--color-tone-fuchsia-text)]',
  pink: 'bg-[var(--color-tone-pink-bg)] text-[var(--color-tone-pink-text)]',
  rose: 'bg-[var(--color-tone-rose-bg)] text-[var(--color-tone-rose-text)]',
};

/** 배경 + 텍스트 + hover. Button처럼 상호작용하는 요소에 쓴다. */
export const TONE_INTERACTIVE_CLASS: Record<Tone, string> = {
  red: 'bg-[var(--color-tone-red-bg)] text-[var(--color-tone-red-text)] hover:bg-[var(--color-tone-red-bg-hover)]',
  orange:
    'bg-[var(--color-tone-orange-bg)] text-[var(--color-tone-orange-text)] hover:bg-[var(--color-tone-orange-bg-hover)]',
  yellow:
    'bg-[var(--color-tone-yellow-bg)] text-[var(--color-tone-yellow-text)] hover:bg-[var(--color-tone-yellow-bg-hover)]',
  lime: 'bg-[var(--color-tone-lime-bg)] text-[var(--color-tone-lime-text)] hover:bg-[var(--color-tone-lime-bg-hover)]',
  green:
    'bg-[var(--color-tone-green-bg)] text-[var(--color-tone-green-text)] hover:bg-[var(--color-tone-green-bg-hover)]',
  emerald:
    'bg-[var(--color-tone-emerald-bg)] text-[var(--color-tone-emerald-text)] hover:bg-[var(--color-tone-emerald-bg-hover)]',
  teal: 'bg-[var(--color-tone-teal-bg)] text-[var(--color-tone-teal-text)] hover:bg-[var(--color-tone-teal-bg-hover)]',
  cyan: 'bg-[var(--color-tone-cyan-bg)] text-[var(--color-tone-cyan-text)] hover:bg-[var(--color-tone-cyan-bg-hover)]',
  sky: 'bg-[var(--color-tone-sky-bg)] text-[var(--color-tone-sky-text)] hover:bg-[var(--color-tone-sky-bg-hover)]',
  blue: 'bg-[var(--color-tone-blue-bg)] text-[var(--color-tone-blue-text)] hover:bg-[var(--color-tone-blue-bg-hover)]',
  indigo:
    'bg-[var(--color-tone-indigo-bg)] text-[var(--color-tone-indigo-text)] hover:bg-[var(--color-tone-indigo-bg-hover)]',
  violet:
    'bg-[var(--color-tone-violet-bg)] text-[var(--color-tone-violet-text)] hover:bg-[var(--color-tone-violet-bg-hover)]',
  purple:
    'bg-[var(--color-tone-purple-bg)] text-[var(--color-tone-purple-text)] hover:bg-[var(--color-tone-purple-bg-hover)]',
  fuchsia:
    'bg-[var(--color-tone-fuchsia-bg)] text-[var(--color-tone-fuchsia-text)] hover:bg-[var(--color-tone-fuchsia-bg-hover)]',
  pink: 'bg-[var(--color-tone-pink-bg)] text-[var(--color-tone-pink-text)] hover:bg-[var(--color-tone-pink-bg-hover)]',
  rose: 'bg-[var(--color-tone-rose-bg)] text-[var(--color-tone-rose-text)] hover:bg-[var(--color-tone-rose-bg-hover)]',
};
