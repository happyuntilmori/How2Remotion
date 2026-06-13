---
sidebar_position: 3
---

# 자막 넣기

음성 나레이션에 맞춰 한국어 자막을 표시하는 방법입니다. `@remotion/captions` 패키지를 활용합니다.

---

## 패키지 설치

```bash
npm install @remotion/captions
```

---

## 가장 간단한 자막: 씬 단위 고정 텍스트

음성 타이밍에 맞춰 자막 텍스트를 Sequence로 나타냅니다.

```tsx
import { Sequence } from 'remotion';

const SUBTITLES = [
  { from: 0,   durationInFrames: 129, text: "안녕하세요. 오늘은 Remotion을 소개합니다." },
  { from: 147, durationInFrames: 144, text: "Remotion은 React 기반의 영상 프레임워크입니다." },
  { from: 309, durationInFrames: 126, text: "Codex와 함께라면 코드 없이도 가능합니다." },
];

const Caption: React.FC<{ text: string }> = ({ text }) => (
  <div
    style={{
      position: 'absolute',
      bottom: 80,
      left: 0, right: 0,
      display: 'flex', justifyContent: 'center',
    }}
  >
    <div
      style={{
        background: 'rgba(0,0,0,0.75)',
        color: 'white',
        padding: '12px 24px',
        borderRadius: 8,
        fontSize: 32,
        maxWidth: '80%',
        textAlign: 'center',
      }}
    >
      {text}
    </div>
  </div>
);

export const MyComposition = () => (
  <div style={{ width: '100%', height: '100%' }}>
    {/* 영상 콘텐츠 */}
    <VideoContent />

    {/* 자막 오버레이 */}
    {SUBTITLES.map((sub) => (
      <Sequence key={sub.from} from={sub.from} durationInFrames={sub.durationInFrames}>
        <Caption text={sub.text} />
      </Sequence>
    ))}
  </div>
);
```

---

## Codex 프롬프트로 자막 추가

```
현재 컴포지션에 자막을 추가해줘.

자막 데이터:
- 0~129프레임: "안녕하세요. 오늘은 Remotion을 소개합니다."
- 147~291프레임: "Remotion은 React 기반의 영상 프레임워크입니다."
- 309~435프레임: "Codex와 함께라면 코드 없이도 가능합니다."

스타일:
- 화면 하단 80px 위치
- 반투명 검정 배경(rgba(0,0,0,0.75))에 흰색 텍스트
- 폰트 크기 32px
- 부드러운 페이드인/아웃 효과 포함
```

---

## 자막 프레임 자동 계산

metadata.json에서 씬 정보를 읽어 자동 계산합니다.

```tsx
import metadata from '../public/audio/metadata.json';

const TRANSITION_FRAMES = 18;

const subtitles = metadata.scenes.reduce((acc, scene, index) => {
  const prevEnd = acc.length > 0 ? acc[acc.length - 1].from + acc[acc.length - 1].durationInFrames : 0;
  const from = index === 0 ? 0 : prevEnd + TRANSITION_FRAMES;

  return [...acc, { from, durationInFrames: scene.durationInFrames, text: scene.text }];
}, [] as Array<{ from: number; durationInFrames: number; text: string }>);
```

---

**다음:** [배경음악 추가 →](./bgm)
