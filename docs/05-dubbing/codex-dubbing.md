---
sidebar_position: 5
---

# Codex로 더빙까지 한 번에

scenes.json과 생성된 MP3 파일이 있다면, Codex에게 오디오 배치까지 맡길 수 있습니다.

---

## 프롬프트 한 번으로 완성하기

```
public/audio/ 폴더에 scene-1.mp3, scene-2.mp3, scene-3.mp3 파일이 있고
public/audio/metadata.json에 각 씬의 durationInFrames 정보가 있어.

이 음성 파일들을 각 씬에 맞춰 Remotion Sequence로 배치하는 컴포지션을 만들어줘.

조건:
- <Audio>는 반드시 <TransitionSeries> 밖에 배치
- 씬 2부터는 18프레임 전환 딜레이 적용
- 전체 durationInFrames는 metadata.json의 totalFrames 값 사용
- 30fps 기준
```

---

## Codex가 생성하는 코드 패턴

```tsx
import { Sequence, Audio, staticFile } from 'remotion';
import metadata from '../public/audio/metadata.json';

export const MyComposition = () => {
  const TRANSITION_FRAMES = 18;

  // 각 씬의 시작 프레임 계산
  const scene1Start = 0;
  const scene2Start = metadata.scenes[0].durationInFrames + TRANSITION_FRAMES;
  const scene3Start = scene2Start + metadata.scenes[1].durationInFrames + TRANSITION_FRAMES;

  return (
    <>
      {/* 오디오 트랙 — TransitionSeries 바깥에 배치 */}
      <Sequence from={scene1Start} durationInFrames={metadata.scenes[0].durationInFrames}>
        <Audio src={staticFile('audio/scene-1.mp3')} />
      </Sequence>

      <Sequence from={scene2Start} durationInFrames={metadata.scenes[1].durationInFrames}>
        <Audio src={staticFile('audio/scene-2.mp3')} />
      </Sequence>

      <Sequence from={scene3Start} durationInFrames={metadata.scenes[2].durationInFrames}>
        <Audio src={staticFile('audio/scene-3.mp3')} />
      </Sequence>

      {/* 영상 트랙 */}
      <TransitionSeries>
        <TransitionSeries.Sequence durationInFrames={metadata.scenes[0].durationInFrames}>
          <Scene1 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming()} />

        <TransitionSeries.Sequence durationInFrames={metadata.scenes[1].durationInFrames}>
          <Scene2 />
        </TransitionSeries.Sequence>
        <TransitionSeries.Transition presentation={fade()} timing={springTiming()} />

        <TransitionSeries.Sequence durationInFrames={metadata.scenes[2].durationInFrames}>
          <Scene3 />
        </TransitionSeries.Sequence>
      </TransitionSeries>
    </>
  );
};
```

---

## 전체 파이프라인 요약

```bash
# 1. 씬 스크립트 작성
vi remotion/scenes.json

# 2. ElevenLabs로 음성 생성
node .claude/skills/remotion-elevenlabs-voiceover/generate.js \
  --scenes remotion/scenes.json \
  --character narrator \
  --output-dir public/audio/

# 3. Codex로 컴포지션 생성
codex "metadata.json 기반으로 씬별 Audio + TransitionSeries 컴포지션 만들어줘"

# 4. 렌더링
npx remotion render src/index.ts MyVideo output.mp4
```

이 네 단계가 AI 더빙 영상 제작의 전체 흐름입니다.

---

**다음:** [6장. 영상 편집하기 →](../06-video-editing/)
