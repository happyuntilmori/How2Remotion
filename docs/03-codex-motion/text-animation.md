---
sidebar_position: 3
---

# 텍스트 애니메이션

## 세 가지 핵심 패턴

텍스트 애니메이션의 90%는 다음 세 가지 패턴으로 구현됩니다. 각 패턴의 코드와 Codex 프롬프트를 함께 제공합니다.

---

## 패턴 1: 페이드인 (Fade In)

가장 기본적인 패턴입니다. 투명한 상태에서 불투명한 상태로 전환합니다.

### 코드

```tsx
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

export const FadeInTitle = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 25],   // 0~25프레임 (약 0.8초)
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          opacity,
          color: 'white',
          fontSize: 72,
          fontWeight: 'bold',
          fontFamily: 'sans-serif',
        }}
      >
        TechFlow
      </div>
    </AbsoluteFill>
  );
};
```

### Codex 프롬프트

```
1920x1080, 30fps, 90프레임 영상.
배경색 #1a1a2e. 중앙에 흰색 bold 텍스트 "TechFlow" (72px).
텍스트가 프레임 0에서 완전 투명, 프레임 25에서 완전 불투명하게 페이드인.
interpolate()와 extrapolateRight: 'clamp' 사용.
named export MyComposition으로 내보내줘.
```

---

## 패턴 2: 슬라이드업 + 페이드인

아래에서 올라오면서 동시에 페이드인되는 패턴입니다. 프레젠테이션과 제품 소개 영상에 자주 사용됩니다.

### 코드

```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring, AbsoluteFill } from 'remotion';

export const SlideUpTitle = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // spring을 사용한 자연스러운 슬라이드
  const translateY = spring({
    frame,
    fps,
    config: { damping: 15, stiffness: 150, mass: 0.8 },
    from: 60,   // 60px 아래에서 시작
    to: 0,
  });

  const opacity = interpolate(
    frame,
    [0, 20],
    [0, 1],
    { extrapolateRight: 'clamp' }
  );

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#0f0f23', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          opacity,
          transform: `translateY(${translateY}px)`,
          color: 'white',
          fontSize: 68,
          fontWeight: '800',
          letterSpacing: '-2px',
        }}
      >
        업무를 자동화하다
      </div>
    </AbsoluteFill>
  );
};
```

`spring()`의 `damping` 값을 조정하면 탄성이 변합니다.
- `damping: 8` → 많이 튕기는 효과
- `damping: 20` → 부드럽게 멈추는 효과

### Codex 프롬프트

```
1920x1080, 30fps, 120프레임 영상.
배경색 #0f0f23. 중앙에 흰색 텍스트 "업무를 자동화하다" (68px, font-weight 800).
spring()을 사용해 텍스트가 60px 아래에서 제자리로 올라오는 애니메이션.
동시에 opacity가 0에서 1로 페이드인 (프레임 0~20).
damping: 15, stiffness: 150으로 설정.
named export MyComposition으로 내보내줘.
```

---

## 패턴 3: 타이프라이터 효과

텍스트가 한 글자씩 타이핑되는 것처럼 나타나는 패턴입니다. 기술 관련 영상이나 코드 데모에 효과적입니다.

### 코드

```tsx
import { useCurrentFrame, AbsoluteFill } from 'remotion';

const FULL_TEXT = 'AI가 코드를 작성합니다.';
const CHARS_PER_FRAME = 0.4;  // 프레임당 글자 수 (느릴수록 타이핑 속도 감소)

export const Typewriter = () => {
  const frame = useCurrentFrame();

  // 현재 프레임에서 표시할 글자 수
  const visibleChars = Math.min(
    Math.floor(frame * CHARS_PER_FRAME),
    FULL_TEXT.length
  );

  const displayText = FULL_TEXT.slice(0, visibleChars);

  // 커서 깜빡임 (15프레임마다)
  const showCursor = Math.floor(frame / 15) % 2 === 0;

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#0d1117', alignItems: 'center', justifyContent: 'center' }}
    >
      <div
        style={{
          color: '#58a6ff',
          fontSize: 56,
          fontFamily: '"Courier New", monospace',
          fontWeight: 'bold',
        }}
      >
        {displayText}
        {showCursor && (
          <span style={{ color: '#58a6ff' }}>|</span>
        )}
      </div>
    </AbsoluteFill>
  );
};
```

### Codex 프롬프트

```
1920x1080, 30fps, 150프레임 영상.
배경색 #0d1117 (어두운 GitHub 스타일).
텍스트 "AI가 코드를 작성합니다."가 한 글자씩 타이핑되는 효과.
글자 색상 #58a6ff, 폰트 monospace, 크기 56px.
타이핑 속도는 초당 약 12글자.
커서(|)가 15프레임마다 깜빡이는 효과 추가.
string.slice()로 구현하고 CSS animation 사용 금지.
named export MyComposition으로 내보내줘.
```

---

## 여러 텍스트 요소 순서대로 등장시키기

실제 영상에서는 제목, 부제목, 설명이 차례로 나타나는 경우가 많습니다.

```tsx
import { useCurrentFrame, interpolate, AbsoluteFill } from 'remotion';

const makeEntrance = (frame: number, delay: number) => ({
  opacity: interpolate(frame, [delay, delay + 20], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  }),
  transform: `translateY(${interpolate(frame, [delay, delay + 20], [30, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  })}px)`,
});

export const StaggeredText = () => {
  const frame = useCurrentFrame();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      <div style={{ ...makeEntrance(frame, 0), color: 'white', fontSize: 72, fontWeight: 'bold' }}>
        TechFlow
      </div>
      <div style={{ ...makeEntrance(frame, 15), color: '#88aaff', fontSize: 36 }}>
        스마트한 업무 자동화 플랫폼
      </div>
      <div style={{ ...makeEntrance(frame, 30), color: '#aaaaaa', fontSize: 24 }}>
        지금 바로 시작하세요
      </div>
    </AbsoluteFill>
  );
};
```

`delay` 값을 바꿔 각 요소가 등장하는 타이밍을 조정합니다.

---

[다음: 도형 애니메이션 →](./shape-animation)
