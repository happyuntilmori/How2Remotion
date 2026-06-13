---
sidebar_position: 4
---

# 배경음악 추가

BGM을 추가하고 나레이션 중에 자동으로 볼륨을 낮추는(덕킹) 방법입니다.

---

## 기본 BGM 추가

```tsx
import { Audio, staticFile } from 'remotion';

export const MyComposition = () => (
  <div style={{ width: '100%', height: '100%' }}>
    {/* BGM: 전체 영상 동안 낮은 볼륨으로 재생 */}
    <Audio
      src={staticFile('audio/bgm.mp3')}
      volume={0.15}       // 0~1 사이. 나레이션과 겹치므로 0.1~0.2 권장
      loop                // 영상 길이보다 BGM이 짧으면 반복
    />

    {/* 나레이션 */}
    <Audio src={staticFile('audio/narration.mp3')} volume={1.0} />

    <VideoContent />
  </div>
);
```

---

## 볼륨 덕킹 (나레이션 구간에서 BGM 낮추기)

나레이션이 재생되는 구간에서 BGM 볼륨을 자동으로 낮춥니다.

```tsx
import { Audio, staticFile, useCurrentFrame, interpolate } from 'remotion';

const NARRATION_START = 30;   // 나레이션 시작 프레임
const NARRATION_END = 399;    // 나레이션 종료 프레임
const FADE_FRAMES = 20;       // 볼륨 전환에 걸리는 프레임 수

export const MyComposition = () => {
  const frame = useCurrentFrame();

  // 나레이션 구간에서 BGM 볼륨을 0.15 → 0.05로 낮춤
  const bgmVolume = interpolate(
    frame,
    [
      NARRATION_START - FADE_FRAMES, NARRATION_START,
      NARRATION_END, NARRATION_END + FADE_FRAMES
    ],
    [0.15, 0.05, 0.05, 0.15],
    { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' }
  );

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <Audio src={staticFile('audio/bgm.mp3')} volume={bgmVolume} loop />
      <Audio src={staticFile('audio/narration.mp3')} volume={1.0} />
      <VideoContent />
    </div>
  );
};
```

---

## Codex 프롬프트

```
public/audio/bgm.mp3를 전체 영상에 배경음악으로 추가해줘.

조건:
- 기본 볼륨: 0.15
- 나레이션 구간(30~399프레임)에서는 0.05로 자동 덕킹
- 전환은 20프레임에 걸쳐 부드럽게
- BGM은 영상 길이보다 짧을 경우 loop 처리
```

---

## BGM 저작권 무료 소스

| 사이트 | 특징 |
|--------|------|
| [Pixabay Music](https://pixabay.com/music/) | 무료, 상업용 허용 |
| [Free Music Archive](https://freemusicarchive.org) | Creative Commons |
| [YouTube Audio Library](https://studio.youtube.com) | YouTube 업로드용 무료 |

---

**다음:** [최종 렌더링 →](./rendering)
