---
sidebar_position: 4
---

# 도형 애니메이션

## @remotion/shapes 패키지

`@remotion/shapes` 패키지는 원, 별, 사각형 등의 SVG 도형을 Remotion에서 쉽게 사용할 수 있게 해줍니다.

```bash
npm install @remotion/shapes
```

---

## 패턴 1: 그라디언트 배경 색상 전환

`interpolateColors()`를 사용하면 두 색상 사이를 부드럽게 전환할 수 있습니다.

### 코드

```tsx
import { useCurrentFrame, interpolate, interpolateColors, AbsoluteFill } from 'remotion';

export const GradientBackground = () => {
  const frame = useCurrentFrame();

  // 0~60프레임 동안 색상 전환
  const color1 = interpolateColors(
    frame,
    [0, 60],
    ['#1a1a2e', '#0066CC']
  );

  const color2 = interpolateColors(
    frame,
    [0, 60],
    ['#16213e', '#004499']
  );

  // 배경과 함께 텍스트 opacity
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        background: `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ opacity, color: 'white', fontSize: 64, fontWeight: 'bold' }}>
        TechFlow
      </div>
    </AbsoluteFill>
  );
};
```

### Codex 프롬프트

```
1920x1080, 30fps, 90프레임 영상.
배경이 135도 그라디언트.
0프레임: #1a1a2e → #16213e
60프레임: #0066CC → #004499
색상 전환에 interpolateColors() 사용.
중앙에 흰 텍스트 "TechFlow" (64px, bold)가 프레임 0~20 동안 페이드인.
named export MyComposition.
```

---

## 패턴 2: 원형 스케일 애니메이션

`spring()`을 사용한 원이 화면 중앙에서 확장되는 효과입니다.

### 코드

```tsx
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';
import { Circle } from '@remotion/shapes';

export const CirclePop = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,
    config: { damping: 10, stiffness: 100, mass: 1 },
    from: 0,
    to: 1,
  });

  // 원이 확장된 후 텍스트 등장
  const textOpacity = spring({
    frame: frame - 15,  // 15프레임 지연
    fps,
    config: { damping: 20 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#0f0f23', alignItems: 'center', justifyContent: 'center' }}
    >
      {/* 배경 원 */}
      <div style={{ position: 'absolute', transform: `scale(${scale})` }}>
        <Circle radius={200} fill="#0066CC" />
      </div>

      {/* 중앙 텍스트 */}
      <div
        style={{
          position: 'absolute',
          opacity: Math.max(0, textOpacity),
          color: 'white',
          fontSize: 48,
          fontWeight: 'bold',
          zIndex: 1,
        }}
      >
        시작하기
      </div>
    </AbsoluteFill>
  );
};
```

### Codex 프롬프트

```
1920x1080, 30fps, 90프레임 영상.
배경 #0f0f23.
@remotion/shapes의 Circle 컴포넌트 사용.
반지름 200px, 색상 #0066CC의 원이
spring(damping: 10, stiffness: 100)으로 프레임 0에서 스케일 0→1로 확장.
원 위에 흰 텍스트 "시작하기" (48px, bold)가 15프레임 지연 후 spring으로 나타남.
named export MyComposition.
```

---

## 패턴 3: 다중 요소 stagger 애니메이션

여러 요소가 시간차를 두고 등장하는 패턴입니다. 기능 목록이나 통계 수치 표시에 유용합니다.

### 코드

```tsx
import { useCurrentFrame, useVideoConfig, spring, AbsoluteFill } from 'remotion';

const ITEMS = [
  { icon: '⚡', label: '빠른 처리 속도', color: '#FFD700' },
  { icon: '🔒', label: '엔터프라이즈 보안', color: '#00CC88' },
  { icon: '🤖', label: 'AI 자동화', color: '#0066CC' },
];

export const FeatureList = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#1a1a2e',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 40,
      }}
    >
      {ITEMS.map((item, index) => {
        const delay = index * 20;  // 요소마다 20프레임씩 지연

        const translateX = spring({
          frame: frame - delay,
          fps,
          config: { damping: 15, stiffness: 120 },
          from: -80,
          to: 0,
        });

        const opacity = spring({
          frame: frame - delay,
          fps,
          config: { damping: 20 },
          from: 0,
          to: 1,
        });

        return (
          <div
            key={item.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 20,
              opacity: Math.max(0, opacity),
              transform: `translateX(${translateX}px)`,
            }}
          >
            <div style={{ fontSize: 48 }}>{item.icon}</div>
            <div style={{ color: item.color, fontSize: 36, fontWeight: 'bold' }}>
              {item.label}
            </div>
          </div>
        );
      })}
    </AbsoluteFill>
  );
};
```

`delay = index * 20`에서 20을 조정하면 요소 간 간격이 변합니다. 10이면 빠르게, 30이면 느리게 차례로 등장합니다.

### Codex 프롬프트

```
1920x1080, 30fps, 120프레임 영상.
배경 #1a1a2e.
세 가지 기능 항목을 세로로 나열:
1. ⚡ 빠른 처리 속도 (황금색 #FFD700)
2. 🔒 엔터프라이즈 보안 (초록색 #00CC88)
3. 🤖 AI 자동화 (파란색 #0066CC)
각 항목이 왼쪽에서 오른쪽으로 슬라이드하며 나타남.
20프레임씩 지연(stagger). spring(damping: 15, stiffness: 120) 사용.
opacity도 0→1로 함께 애니메이션.
named export MyComposition.
```

---

## @remotion/shapes 주요 컴포넌트

```tsx
import { Circle, Rect, Triangle, Star, Ellipse } from '@remotion/shapes';

// 원
<Circle radius={100} fill="#0066CC" />

// 사각형 (모서리 둥글게)
<Rect width={200} height={100} fill="#FF6B6B" rx={12} />

// 삼각형
<Triangle length={150} fill="#00CC88" direction="up" />

// 별
<Star innerRadius={40} outerRadius={80} numPoints={5} fill="#FFD700" />
```

---

[다음: 씬 전환 →](./transitions)
