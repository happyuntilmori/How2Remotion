---
sidebar_position: 5
---

# 씬 전환

## @remotion/transitions 패키지

여러 씬을 연결할 때 부드러운 전환 효과를 추가하려면 `@remotion/transitions` 패키지를 사용합니다.

```bash
npm install @remotion/transitions
```

---

## 사용 가능한 전환 효과

| 효과 | 함수 | 설명 |
|------|------|------|
| 페이드 | `fade()` | 밝기가 서서히 변하며 전환 |
| 슬라이드 | `slide()` | 화면이 좌우/상하로 밀리며 전환 |
| 와이프 | `wipe()` | 경계선이 이동하며 다음 씬이 드러남 |
| 플립 | `flip()` | 3D 회전 효과로 전환 |
| 클럭 와이프 | `clockWipe()` | 시계 방향으로 다음 씬이 드러남 |

---

## TransitionSeries 기본 구조

```tsx
import { AbsoluteFill } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { slide } from '@remotion/transitions/slide';

import { Scene1 } from './Scene1';
import { Scene2 } from './Scene2';
import { Scene3 } from './Scene3';

export const MyComposition = () => {
  return (
    <TransitionSeries>
      {/* 씬 1: 60프레임 */}
      <TransitionSeries.Sequence durationInFrames={60}>
        <Scene1 />
      </TransitionSeries.Sequence>

      {/* 씬 1→2 전환: 15프레임 동안 fade */}
      <TransitionSeries.Transition
        presentation={fade()}
        timing={linearTiming({ durationInFrames: 15 })}
      />

      {/* 씬 2: 90프레임 */}
      <TransitionSeries.Sequence durationInFrames={90}>
        <Scene2 />
      </TransitionSeries.Sequence>

      {/* 씬 2→3 전환: 20프레임 동안 오른쪽에서 슬라이드 */}
      <TransitionSeries.Transition
        presentation={slide({ direction: 'from-right' })}
        timing={linearTiming({ durationInFrames: 20 })}
      />

      {/* 씬 3: 60프레임 */}
      <TransitionSeries.Sequence durationInFrames={60}>
        <Scene3 />
      </TransitionSeries.Sequence>
    </TransitionSeries>
  );
};
```

---

## 3씬 영상 완전한 예제

실제로 동작하는 3씬 영상 예제입니다. 각 씬을 별도 파일로 분리하는 것이 관리하기 쉽습니다.

### src/Scene1.tsx

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene1 = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ opacity, color: 'white', fontSize: 72, fontWeight: 'bold' }}>
        TechFlow
      </div>
    </AbsoluteFill>
  );
};
```

### src/Scene2.tsx

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene2 = () => {
  const frame = useCurrentFrame();

  const translateY = interpolate(frame, [0, 25], [40, 0], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0066CC', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `translateY(${translateY}px)`, color: 'white', fontSize: 56 }}>
        업무 자동화의 새로운 기준
      </div>
    </AbsoluteFill>
  );
};
```

### src/Scene3.tsx

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const Scene3 = () => {
  const frame = useCurrentFrame();

  const scale = interpolate(frame, [0, 30], [0.8, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#004499', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ transform: `scale(${scale})`, color: 'white', fontSize: 48 }}>
        지금 시작하세요 →
      </div>
    </AbsoluteFill>
  );
};
```

### src/Root.tsx 설정

```tsx
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot = () => (
  <>
    <Composition
      id="MyComposition"
      component={MyComposition}
      durationInFrames={255}  // 60 + 15 + 90 + 20 + 60 + 10 (여유)
      fps={30}
      width={1920}
      height={1080}
    />
  </>
);
```

---

## 중요: 오디오는 TransitionSeries 밖에 배치

**이것은 가장 흔한 실수입니다.** `<Audio>` 컴포넌트를 `<TransitionSeries>` 안에 넣으면 전환 시 오디오가 잘리거나 중복 재생됩니다.

```tsx
// 잘못된 코드
export const MyComposition = () => (
  <TransitionSeries>
    <Audio src={staticFile('narration.mp3')} />  {/* 오류! */}
    <TransitionSeries.Sequence>...</TransitionSeries.Sequence>
  </TransitionSeries>
);

// 올바른 코드
export const MyComposition = () => (
  <>
    {/* 오디오는 항상 TransitionSeries 밖, 루트 레벨에 배치 */}
    <Audio src={staticFile('narration.mp3')} />
    <TransitionSeries>
      <TransitionSeries.Sequence>...</TransitionSeries.Sequence>
    </TransitionSeries>
  </>
);
```

---

## Codex 프롬프트

```
src/Scene1.tsx, Scene2.tsx, Scene3.tsx가 이미 존재합니다.
이 세 씬을 연결하는 MyComposition 컴포넌트를 @remotion/transitions 패키지를 사용해 만들어줘.

씬 구성:
- Scene1: 60프레임 → fade 전환 (15프레임)
- Scene2: 90프레임 → slide(from-right) 전환 (20프레임)
- Scene3: 60프레임

TransitionSeries를 사용하고 Audio 컴포넌트가 있다면 반드시 TransitionSeries 밖에 배치해줘.
linearTiming으로 전환 타이밍 설정.
named export MyComposition.
```

---

[다음: 에셋 사용 →](./assets)
