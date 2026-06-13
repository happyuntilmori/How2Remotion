---
sidebar_position: 2
---

# Remotion이란 무엇인가

## React로 영상을 만든다는 것

Remotion은 React 컴포넌트로 동영상을 프로그래밍 방식으로 제작하는 프레임워크입니다. 웹 개발자라면 이미 알고 있는 JSX, TypeScript, CSS를 그대로 사용하면서 MP4, GIF, WebM 형식의 영상을 출력할 수 있습니다.

Adobe After Effects나 Premiere Pro와의 가장 큰 차이점은 **타임라인 기반이 아니라 프레임 기반**이라는 점입니다. After Effects에서는 레이어를 드래그해서 타이밍을 맞추지만, Remotion에서는 코드로 "30프레임에 이 요소가 이 위치에 있어야 한다"고 선언합니다.

```tsx
// After Effects 방식: GUI에서 키프레임을 드래그
// Remotion 방식: 코드로 선언
const frame = useCurrentFrame(); // 현재 프레임 번호 (0, 1, 2, ...)
const opacity = interpolate(frame, [0, 30], [0, 1]); // 0→30프레임 동안 투명→불투명
```

이 방식의 장점은 명확합니다. **버전 관리가 가능하고**, **AI 에이전트가 코드를 직접 생성할 수 있으며**, **조건문과 반복문으로 동적인 영상**을 만들 수 있습니다.

## 세 가지 핵심 개념

Remotion을 이해하려면 세 가지 개념만 파악하면 됩니다.

### 1. 프레임 (Frame)

모든 Remotion 컴포넌트는 `useCurrentFrame()` 훅으로 현재 프레임 번호를 받습니다. Remotion은 각 프레임을 개별적으로 렌더링합니다. 30fps 영상에서 1초는 30프레임입니다.

```tsx
import { useCurrentFrame } from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{ fontSize: 60, color: 'white', background: '#1a1a2e',
                  width: '100%', height: '100%', display: 'flex',
                  alignItems: 'center', justifyContent: 'center' }}>
      현재 프레임: {frame}
    </div>
  );
};
```

Remotion Studio에서 타임라인을 드래그하면 `frame` 값이 바뀌고 화면이 즉시 업데이트됩니다.

### 2. interpolate()

`interpolate()`는 입력값(프레임)을 출력값(CSS 속성 등)으로 변환하는 함수입니다. After Effects의 키프레임 보간과 동일한 개념입니다.

```tsx
import { useCurrentFrame, interpolate } from 'remotion';

export const FadeIn = () => {
  const frame = useCurrentFrame();

  // 0프레임에서 opacity 0, 20프레임에서 opacity 1
  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp', // 20프레임 이후 1에서 고정
  });

  // 0프레임에서 translateY 50px, 20프레임에서 0px (아래에서 위로 이동)
  const translateY = interpolate(frame, [0, 20], [50, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <div
      style={{
        opacity,
        transform: `translateY(${translateY}px)`,
        fontSize: 48,
        color: 'white',
      }}
    >
      안녕하세요, Remotion!
    </div>
  );
};
```

**`extrapolateRight: 'clamp'`는 반드시 기억하세요.** 이 옵션 없이는 애니메이션이 끝난 후에도 값이 계속 변하여 예상치 못한 결과가 발생합니다.

### 3. spring()

`spring()`은 물리 기반의 탄성 애니메이션을 만듭니다. 버튼이 튀어 오르거나, 요소가 자연스럽게 착지하는 효과를 구현할 때 사용합니다. `interpolate()`가 선형적이라면 `spring()`은 자연스러운 가속과 감속을 자동으로 계산합니다.

```tsx
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const SpringAnimation = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // fps를 반드시 전달해야 합니다 — 초 단위 물리 계산에 필요
  const scale = spring({
    frame,
    fps,
    config: {
      damping: 12,    // 감쇠값: 낮을수록 더 많이 튀어 오름 (권장: 10-20)
      stiffness: 100, // 강성: 높을수록 빠르게 목표값에 도달
      mass: 1,        // 질량: 높을수록 느리게 움직임
    },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        width: 200,
        height: 200,
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        borderRadius: 20,
      }}
    />
  );
};
```

### 보너스: useVideoConfig()

컴포지션의 메타데이터(너비, 높이, fps, 전체 프레임 수)를 가져오는 훅입니다. 반응형 레이아웃과 동적 타이밍 계산에 필수입니다.

```tsx
import { useVideoConfig } from 'remotion';

export const ResponsiveLayout = () => {
  const { width, height, fps, durationInFrames } = useVideoConfig();

  const totalSeconds = durationInFrames / fps;

  return (
    <div style={{ width, height, background: '#0f0f23',
                  display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <p style={{ color: 'white', fontSize: 24 }}>
        {width}×{height} | {fps}fps | 총 {totalSeconds}초
      </p>
    </div>
  );
};
```

## After Effects / Premiere와 비교

| 항목 | After Effects | Remotion |
|------|--------------|---------|
| 편집 방식 | GUI 타임라인 | 코드 (TypeScript) |
| 버전 관리 | 어려움 (바이너리 파일) | 쉬움 (Git) |
| 동적 데이터 연동 | 제한적 (표현식) | 완전 지원 (JS 로직) |
| AI 에이전트 생성 | 불가 | 가능 (코드이므로) |
| 러닝 커브 | 중간 (GUI 학습 필요) | 낮음 (React 경험 활용) |
| 비용 | 월 구독 | 무료 오픈소스 |
| 협업 | 파일 공유 | Pull Request |

## Remotion이 특히 강한 시나리오

- **데이터 기반 영상**: CSV나 API 데이터를 받아 자동으로 차트 애니메이션 생성
- **반복 생산**: 브랜드 템플릿 하나로 수십 개의 제품 소개 영상을 변수만 바꿔 일괄 생성
- **AI 파이프라인**: 스크립트 생성 → TTS 더빙 → 영상 렌더링을 코드로 완전 자동화
- **소셜 미디어 콘텐츠**: 1:1, 9:16, 16:9 비율을 컴포지션 설정 변경만으로 전환

---

[2장. 환경 설정 →](../02-setup/)
