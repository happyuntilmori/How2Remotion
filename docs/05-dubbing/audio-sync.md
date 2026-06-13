---
sidebar_position: 4
---

# 오디오 동기화

## Audio 컴포넌트 기본 사용법

```tsx
import { Audio, staticFile } from 'remotion';

// 영상 시작과 동시에 오디오 재생
<Audio src={staticFile('audio/narration.mp3')} />
```

`src`에는 반드시 `staticFile()`을 사용합니다. 절대 경로나 URL을 직접 사용하면 렌더링 시 파일을 찾지 못합니다.

---

## Sequence로 오디오 시작 시점 제어

씬 2, 씬 3의 오디오는 영상 처음부터 재생하지 않습니다. `<Sequence from={startFrame}>`으로 특정 프레임부터 시작합니다.

```tsx
import { Audio, Sequence, staticFile } from 'remotion';

export const MyComposition = () => {
  return (
    <>
      {/* 씬 1 오디오: 프레임 0부터 */}
      <Sequence from={0}>
        <Audio src={staticFile('audio/scene1.mp3')} />
      </Sequence>

      {/* 씬 2 오디오: 프레임 120부터 */}
      <Sequence from={120}>
        <Audio src={staticFile('audio/scene2.mp3')} />
      </Sequence>

      {/* 씬 3 오디오: 프레임 240부터 */}
      <Sequence from={240}>
        <Audio src={staticFile('audio/scene3.mp3')} />
      </Sequence>

      {/* 시각적 씬은 별도로 렌더링 */}
      {/* ... */}
    </>
  );
};
```

---

## 18프레임 전환 지연 규칙

`@remotion/transitions`의 `TransitionSeries`를 사용하면 씬 전환 시 두 씬이 겹치는 구간이 발생합니다. 기본 전환 시간이 15~20프레임인 경우, 씬 2 이후의 오디오는 **전환 프레임의 절반만큼** 지연시켜야 합니다.

예를 들어 씬 1이 90프레임이고 전환이 18프레임인 경우:

```
씬 1: 프레임 0~90
전환: 프레임 81~99 (씬 1 끝 9프레임 전부터 시작)
씬 2: 프레임 81~180 (TransitionSeries 기준)
씬 2 오디오: 프레임 99부터 시작 (전환이 끝나는 시점)
```

```tsx
const SCENE1_FRAMES = 90;
const TRANSITION_FRAMES = 18;
const SCENE2_START = SCENE1_FRAMES; // TransitionSeries 내부 기준

// 오디오 시작은 전환이 완전히 끝난 후
const SCENE2_AUDIO_START = SCENE1_FRAMES + Math.floor(TRANSITION_FRAMES / 2);
```

실제 코드에서는 다음과 같이 구현합니다.

```tsx
import { Audio, Sequence, staticFile } from 'remotion';
import { TransitionSeries, linearTiming } from '@remotion/transitions';
import { fade } from '@remotion/transitions/fade';
import { Scene1, Scene2, Scene3 } from './scenes';

const TRANSITION_FRAMES = 18;
const SCENE1_FRAMES = 90;
const SCENE2_FRAMES = 120;
const SCENE3_FRAMES = 90;

export const MyComposition = () => {
  // 각 씬의 오디오 시작 프레임 계산
  const scene1AudioStart = 0;
  const scene2AudioStart = SCENE1_FRAMES + Math.floor(TRANSITION_FRAMES / 2);
  const scene3AudioStart = scene2AudioStart + SCENE2_FRAMES + Math.floor(TRANSITION_FRAMES / 2);

  return (
    <>
      {/* 오디오: TransitionSeries 밖에 배치 */}
      <Sequence from={scene1AudioStart}>
        <Audio src={staticFile('audio/scene1.mp3')} />
      </Sequence>

      <Sequence from={scene2AudioStart}>
        <Audio src={staticFile('audio/scene2.mp3')} />
      </Sequence>

      <Sequence from={scene3AudioStart}>
        <Audio src={staticFile('audio/scene3.mp3')} />
      </Sequence>

      {/* 시각적 씬: TransitionSeries */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={SCENE1_FRAMES}>
          <Scene1 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE2_FRAMES}>
          <Scene2 />
        </TransitionSeries.Sequence>

        <TransitionSeries.Transition
          presentation={fade()}
          timing={linearTiming({ durationInFrames: TRANSITION_FRAMES })}
        />

        <TransitionSeries.Sequence durationInFrames={SCENE3_FRAMES}>
          <Scene3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
```

---

## getAudioDurationInSeconds로 동적 길이 계산

오디오 파일 길이가 확정된 후, 씬 길이를 동적으로 계산하고 싶을 때 사용합니다.

```tsx
import { getAudioDurationInSeconds, Composition } from 'remotion';
import { staticFile } from 'remotion';

export const RemotionRoot = () => (
  <Composition
    id="MyComposition"
    component={MyComposition}
    fps={30}
    width={1920}
    height={1080}
    calculateMetadata={async () => {
      const [d1, d2, d3] = await Promise.all([
        getAudioDurationInSeconds(staticFile('audio/scene1.mp3')),
        getAudioDurationInSeconds(staticFile('audio/scene2.mp3')),
        getAudioDurationInSeconds(staticFile('audio/scene3.mp3')),
      ]);

      const TRANSITION_FRAMES = 18;
      const fps = 30;

      const totalFrames =
        Math.ceil(d1 * fps) +
        Math.ceil(d2 * fps) +
        Math.ceil(d3 * fps) +
        TRANSITION_FRAMES * 2;  // 2번의 전환

      return { durationInFrames: totalFrames };
    }}
  />
);
```

---

## 흔한 동기화 문제와 해결법

### 오디오가 영상보다 일찍 끝나는 경우

`durationInFrames`가 오디오 길이보다 큰 경우입니다. `calculateMetadata`를 사용해 오디오 길이 기준으로 영상 길이를 결정하면 해결됩니다.

### 씬 전환 중 오디오가 끊기는 경우

`<Audio>`를 `<TransitionSeries>` 내부에 배치한 경우입니다. 반드시 외부로 이동합니다.

### 씬 2 오디오가 너무 일찍 시작하는 경우

전환 지연 프레임을 고려하지 않은 경우입니다. `scene2AudioStart` 계산에 `TRANSITION_FRAMES / 2`를 더합니다.

### 오디오와 비주얼이 조금씩 어긋나는 경우

`fps` 설정이 맞지 않는 경우입니다. `Root.tsx`의 컴포지션 `fps`와 `calculateMetadata`에서 사용하는 `fps`가 동일한지 확인합니다.

---

[다음: Codex로 더빙 자동화 →](./codex-dubbing)
