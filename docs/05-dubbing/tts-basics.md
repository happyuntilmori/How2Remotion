---
sidebar_position: 2
---

# TTS 기초

## TTS와 Remotion의 핵심 과제

TTS(Text-to-Speech)를 Remotion 영상에 삽입할 때 가장 중요한 도전은 **오디오 길이와 영상 길이의 동기화**입니다.

Remotion에서 영상의 총 길이는 `durationInFrames`로 결정됩니다. 오디오 파일의 길이가 영상보다 짧으면 나레이션이 영상 중간에 끊기고, 반대로 오디오가 영상보다 길면 오디오가 잘립니다.

---

## 올바른 더빙 워크플로우

순서가 중요합니다. 많은 초보자가 영상 길이를 먼저 정하고 오디오를 맞추려 하지만, 올바른 순서는 반대입니다.

```
1. 스크립트 작성
        ↓
2. TTS로 오디오 파일 생성
        ↓
3. 오디오 파일의 실제 길이 측정
        ↓
4. durationInFrames = Math.ceil(audioDuration * fps)
        ↓
5. 영상 길이를 오디오에 맞게 설정
```

코드로 표현하면 다음과 같습니다.

```tsx
import { getAudioDurationInSeconds, useVideoConfig } from 'remotion';
import { staticFile } from 'remotion';

// Root.tsx에서 동적으로 durationInFrames 계산
const audioDuration = await getAudioDurationInSeconds(
  staticFile('audio/scene1.mp3')
);

const fps = 30;
const durationInFrames = Math.ceil(audioDuration * fps);
```

또는 `calculateMetadata`를 사용해 컴포지션 길이를 동적으로 설정할 수 있습니다.

```tsx
import { Composition } from 'remotion';
import { getAudioDurationInSeconds, staticFile } from 'remotion';

export const RemotionRoot = () => (
  <Composition
    id="MyComposition"
    component={MyComposition}
    fps={30}
    width={1920}
    height={1080}
    calculateMetadata={async () => {
      const duration = await getAudioDurationInSeconds(
        staticFile('audio/narration.mp3')
      );
      return { durationInFrames: Math.ceil(duration * 30) };
    }}
  />
);
```

---

## ElevenLabs vs OpenAI TTS 비교

| 항목 | ElevenLabs | OpenAI TTS |
|------|------------|------------|
| 한국어 품질 | 매우 자연스러움 | 양호 |
| 목소리 종류 | 100+ 종류 + 캐릭터 프리셋 | 6종 (Alloy, Echo, Fable 등) |
| 감정 표현 | 우수 | 제한적 |
| 가격 | 월 22달러 (크리에이터 플랜) | 1000자당 $0.015 |
| API 속도 | 빠름 | 빠름 |
| Remotion 스킬 지원 | 공식 지원 | 직접 구현 필요 |

**한국어 콘텐츠에는 ElevenLabs를 권장합니다.** 특히 나레이션 스타일의 발화는 ElevenLabs의 `narrator` 캐릭터 프리셋이 매우 자연스럽습니다.

---

## 오디오 파일 포맷

Remotion에서 지원하는 오디오 파일 형식입니다.

| 형식 | 지원 여부 | 권장 |
|------|-----------|------|
| MP3 | 지원 | 권장 (범용 호환) |
| WAV | 지원 | 품질 우선 시 |
| AAC | 지원 | — |
| OGG | 지원 | — |

ElevenLabs는 기본적으로 MP3 형식으로 출력합니다. 추가 변환 없이 그대로 사용하면 됩니다.

---

## 중요: 오디오 파일은 public 폴더에

오디오 파일은 반드시 `public/` 폴더 안에 위치해야 합니다.

```
my-video/
└── public/
    └── audio/
        ├── scene1.mp3
        ├── scene2.mp3
        └── scene3.mp3
```

컴포넌트에서 참조할 때는 `staticFile()` 사용:

```tsx
import { Audio, staticFile } from 'remotion';

<Audio src={staticFile('audio/scene1.mp3')} />
```

---

[다음: ElevenLabs 설정 →](./elevenlabs-setup)
