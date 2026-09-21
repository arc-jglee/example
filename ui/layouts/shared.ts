/**
 * 레이아웃 컴포넌트 공유 스케일 & 클래스 맵
 *
 * Stack / Flex / Grid / Container 등 여러 레이아웃 컴포넌트가 동일한
 * spacing·정렬 스케일을 공유하므로, 매핑을 이곳에 단일 소스로 둔다.
 *
 * Tailwind v4의 JIT는 소스에 리터럴로 존재하는 클래스만 생성하므로
 * `gap-${n}` 같은 동적 클래스는 사용할 수 없다. 따라서 모든 값을
 * 정적 리터럴 레코드로 선언해 스캔 대상이 되도록 한다.
 */

/** spacing 스케일 (Tailwind 기본 배수, 단위 4px). Spacing.stories 기준. */
export const SPACE_SCALE = [
  0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32, 40, 48, 64,
] as const;

export type SpaceToken = (typeof SPACE_SCALE)[number];

/** gap prop → gap-* 유틸리티 클래스 */
export const GAP_CLASS: Record<SpaceToken, string> = {
  0: 'gap-0',
  0.5: 'gap-0.5',
  1: 'gap-1',
  1.5: 'gap-1.5',
  2: 'gap-2',
  3: 'gap-3',
  4: 'gap-4',
  5: 'gap-5',
  6: 'gap-6',
  8: 'gap-8',
  10: 'gap-10',
  12: 'gap-12',
  16: 'gap-16',
  20: 'gap-20',
  24: 'gap-24',
  32: 'gap-32',
  40: 'gap-40',
  48: 'gap-48',
  64: 'gap-64',
};

export type Align = 'start' | 'center' | 'end' | 'stretch' | 'baseline';

/** align prop → align-items(items-*) 클래스. flex/grid 공통. */
export const ALIGN_CLASS: Record<Align, string> = {
  start: 'items-start',
  center: 'items-center',
  end: 'items-end',
  stretch: 'items-stretch',
  baseline: 'items-baseline',
};

export type Justify =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly';

/** justify prop → justify-content(justify-*) 클래스. flex 주축 정렬. */
export const JUSTIFY_CLASS: Record<Justify, string> = {
  start: 'justify-start',
  center: 'justify-center',
  end: 'justify-end',
  between: 'justify-between',
  around: 'justify-around',
  evenly: 'justify-evenly',
};

export type GridColumns = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

/** columns prop → grid-template-columns(grid-cols-*) 클래스 */
export const GRID_COLS_CLASS: Record<GridColumns, string> = {
  1: 'grid-cols-1',
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  11: 'grid-cols-11',
  12: 'grid-cols-12',
};
