import { useEffect, useRef, useState } from 'react';

const MONO_FONT =
  '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace';

/**
 * `rgb()`/`rgba()`/`color-mix()`를 거쳐 계산된 색을 브라우저가 어떤 문자열로
 * 직렬화하는지는 브라우저·값마다 다르다(콤마 구분 레거시 `rgba(255, 255,
 * 255, 0.6)`, CSS Color 4의 공백+슬래시 `rgb(255 255 255 / 0.6)`, 알파가
 * `%`로 오는 경우 등). 문자열을 정규식으로 파싱하는 대신, 1x1 캔버스에
 * `fillStyle`로 그 문자열을 그대로 먹여서 실제 픽셀의 RGBA를 읽는다 —
 * 캔버스는 어떤 직렬화 문법이든 동일하게 해석하므로 파싱 방식에 좌우되지
 * 않는다. 알파를 버리면 `--color-text-on-solid`(불투명 흰색)와
 * `--color-text-on-solid-muted`(반투명 흰색)가 똑같이 `#ffffff`로 보여
 * 구분이 안 되므로, hex와 별개로 불투명도(%)도 함께 반환한다.
 */
let probeCtx: CanvasRenderingContext2D | null | undefined;

function resolveCssColor(
  cssColor: string,
): { hex: string; alphaPercent: number } | null {
  if (probeCtx === undefined) {
    const canvas = document.createElement('canvas');
    canvas.width = 1;
    canvas.height = 1;
    probeCtx = canvas.getContext('2d');
  }
  if (!probeCtx) return null;

  probeCtx.clearRect(0, 0, 1, 1);
  probeCtx.fillStyle = cssColor;
  probeCtx.fillRect(0, 0, 1, 1);
  const [r, g, b, a] = probeCtx.getImageData(0, 0, 1, 1).data;

  const hex = `#${[r, g, b]
    .map((channel) => channel.toString(16).padStart(2, '0'))
    .join('')}`;
  const alphaPercent = Math.round((a / 255) * 100);

  return { hex, alphaPercent };
}

/**
 * 스와치 배경은 CSS 변수(`var(--color-x)`)라 실제 값은 브랜드/테마에 따라
 * 달라진다. 정적으로 알 수 없으므로 렌더된 엘리먼트의 계산된 스타일에서
 * 읽고, `data-theme`/`data-brand` 토글 시 다시 계산한다.
 */
function useResolvedColor(ref: React.RefObject<HTMLDivElement | null>) {
  const [color, setColor] = useState<{
    hex: string;
    alphaPercent: number;
  } | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const resolve = () =>
      setColor(resolveCssColor(getComputedStyle(el).backgroundColor));
    resolve();

    const observer = new MutationObserver(resolve);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['data-theme', 'data-brand'],
    });

    return () => observer.disconnect();
  }, [ref]);

  return color;
}

function renderInlineCode(text: string) {
  return text.split(/`([^`]+)`/g).map((part, i) =>
    i % 2 === 1 ? (
      <code
        key={i}
        style={{
          fontFamily: MONO_FONT,
          fontSize: '0.9em',
          background: 'var(--color-bg-muted)',
          color: 'var(--color-text-secondary)',
          padding: '1px 5px',
          borderRadius: 4,
        }}
      >
        {part}
      </code>
    ) : (
      part
    ),
  );
}

export function ColorSwatch({
  name,
  value,
  backdrop,
}: {
  name: string;
  value: string;
  /**
   * `text-on-solid`류처럼 반투명 색이라 자체 배경만으로는 알아보기 어려운
   * 토큰을 위한 것. 지정하면 스와치 뒤에 이 색을 먼저 깔아, 실제 쓰이는
   * 맥락(브랜드색 배경 위)과 같은 방식으로 반투명도가 드러나게 한다.
   */
  backdrop?: string;
}) {
  const [copied, setCopied] = useState(false);
  const swatchRef = useRef<HTMLDivElement>(null);
  const color = useResolvedColor(swatchRef);

  const handleCopy = () => {
    navigator.clipboard.writeText(`var(--color-${name})`);
    setCopied(true);
    setTimeout(() => setCopied(false), 1200);
  };

  return (
    <button
      onClick={handleCopy}
      title={`var(--color-${name})`}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 0,
        width: 96,
        border: 'none',
        background: 'none',
        padding: 0,
        cursor: 'pointer',
        fontFamily: 'inherit',
        textAlign: 'left',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          height: 64,
          borderRadius: 'var(--radius-lg)',
          overflow: 'hidden',
          boxShadow: 'inset 0 0 0 1px var(--color-border-default)',
          background: backdrop ?? 'transparent',
          transition: 'transform 120ms ease, box-shadow 120ms ease',
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.transform = 'translateY(-2px)';
          e.currentTarget.style.boxShadow =
            'inset 0 0 0 1px var(--color-border-strong), var(--shadow-md)';
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.transform = 'translateY(0)';
          e.currentTarget.style.boxShadow =
            'inset 0 0 0 1px var(--color-border-default)';
        }}
      >
        <div
          ref={swatchRef}
          style={{ position: 'absolute', inset: 0, background: value }}
        />
        {copied && (
          <span
            style={{
              position: 'absolute',
              inset: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: 11,
              fontFamily: MONO_FONT,
              color: 'var(--color-white)',
              background: 'rgba(0, 0, 0, 0.55)',
            }}
          >
            Copied
          </span>
        )}
      </div>
      <code
        style={{
          marginTop: 8,
          fontSize: 11,
          fontFamily: MONO_FONT,
          color: 'var(--color-text-secondary)',
        }}
      >
        {name}
      </code>
      <code
        style={{
          fontSize: 10,
          fontFamily: MONO_FONT,
          color: 'var(--color-text-tertiary)',
        }}
      >
        {color
          ? color.alphaPercent < 100
            ? `${color.hex} · ${color.alphaPercent}%`
            : color.hex
          : ' '}
      </code>
    </button>
  );
}

/**
 * 문서 상단에서 "지금 이 테마/브랜드의 메인 컬러가 뭔지"를 한눈에 보여주는
 * 넓은 배너. 개별 토큰 하나를 작은 정사각형으로 보여주는 ColorSwatch와 달리,
 * 페이지 최상단에서 바로 눈에 띄어야 해서 전체 폭 + 큰 높이로 만든다.
 */
export function MainColorBanner({
  name,
  value,
  label,
}: {
  name: string;
  value: string;
  label: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const color = useResolvedColor(ref);

  return (
    <div
      ref={ref}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        width: '100%',
        minHeight: 88,
        padding: '20px 28px',
        marginBottom: 32,
        borderRadius: 'var(--radius-xl)',
        background: value,
        color: 'var(--color-text-on-solid)',
      }}
    >
      <div>
        <p
          style={{
            margin: 0,
            fontSize: 13,
            fontWeight: 700,
            color: 'var(--color-text-on-solid)',
            opacity: 0.85,
          }}
        >
          {label}
        </p>
        <code
          style={{
            fontFamily: MONO_FONT,
            fontSize: 15,
            fontWeight: 800,
            color: 'var(--color-text-on-solid)',
          }}
        >
          var(--color-{name})
        </code>
      </div>
      <code
        style={{
          fontFamily: MONO_FONT,
          fontSize: 15,
          fontWeight: 800,
          color: 'var(--color-text-on-solid)',
          opacity: 0.9,
        }}
      >
        {color ? color.hex : ' '}
      </code>
    </div>
  );
}

export function SizeSwatch({ label, size }: { label: string; size: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
      <div
        style={{
          width: size,
          height: 16,
          background: 'var(--color-blue-500)',
          borderRadius: 2,
          flexShrink: 0,
        }}
      />
      <code
        style={{
          fontSize: 12,
          fontFamily: MONO_FONT,
          color: 'var(--color-text-secondary)',
        }}
      >
        {label}
      </code>
    </div>
  );
}

export function TokenSection({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      style={{
        marginBottom: 40,
        paddingBottom: 32,
        borderBottom: '1px solid var(--color-border-default)',
      }}
    >
      <h3
        style={{
          margin: 0,
          marginBottom: description ? 4 : 16,
          fontSize: 24,
          fontWeight: 600,
          letterSpacing: '-0.01em',
          color: 'var(--color-text-accent)',
        }}
      >
        {title}
      </h3>
      {description && (
        <p
          style={{
            margin: 0,
            marginBottom: 16,
            fontSize: 13,
            lineHeight: 1.5,
            color: 'var(--color-text-tertiary)',
            whiteSpace: 'pre-line',
          }}
        >
          {renderInlineCode(description)}
        </p>
      )}
      {children}
    </section>
  );
}
