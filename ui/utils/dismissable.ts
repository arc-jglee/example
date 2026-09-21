/**
 * Radix Dialog/Sheet의 DismissableLayer는 pointerdown 대상이 자기 자신의
 * React 트리 안에 있는지만 확인한다. Toast는 별도의 Portal(보통 body 최상단
 * 형제)에 렌더되기 때문에, 열린 Sheet/Dialog 위에 뜬 Toast를 클릭하면 그
 * pointerdown이 "바깥 클릭"으로 오인되어 Toast가 아니라 Sheet/Dialog가
 * 먼저 닫혀버린다. ToastViewport에 심어둔 이 마커로 그 클릭을 구분해
 * onPointerDownOutside에서 무시할 수 있게 한다.
 */
export const TOAST_VIEWPORT_ATTRIBUTE = 'data-toast-viewport';
export const TOAST_VIEWPORT_SELECTOR = `[${TOAST_VIEWPORT_ATTRIBUTE}]`;

export function isEventTargetInToastViewport(target: EventTarget | null) {
  return (
    target instanceof Element &&
    Boolean(target.closest(TOAST_VIEWPORT_SELECTOR))
  );
}
