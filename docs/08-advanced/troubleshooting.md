---
sidebar_position: 2
---

# 자주 겪는 오류와 해결법

---

## 렌더링·설치 오류

### "Cannot find module 'remotion'"
```bash
npm install remotion @remotion/cli
# 또는
bun install
```

### FFmpeg 관련 오류: "spawn ffmpeg ENOENT"
FFmpeg가 설치되지 않았거나 PATH에 없는 경우입니다.
```bash
# macOS
brew install ffmpeg

# Ubuntu/Debian
sudo apt install ffmpeg

# Windows: https://ffmpeg.org/download.html 에서 설치 후 PATH 등록
ffmpeg -version  # 설치 확인
```

---

## 오디오 동기화 오류

### 음성이 영상보다 일찍/늦게 끝남
`getAudioDurationInSeconds()`로 실제 오디오 길이를 측정해 `durationInFrames`를 계산합니다.

```tsx
import { getAudioDurationInSeconds, staticFile } from 'remotion';

const durationInSeconds = await getAudioDurationInSeconds(staticFile('audio/narration.mp3'));
const durationInFrames = Math.ceil(durationInSeconds * 30);
```

### 오디오 샘플레이트 경고
ElevenLabs는 기본적으로 44100Hz를 출력합니다. Remotion은 대부분 자동 처리하지만, 문제가 생기면:
```bash
# FFmpeg로 샘플레이트 변환
ffmpeg -i input.mp3 -ar 44100 output.mp3
```

---

## Codex 코드 생성 오류

### Codex가 CSS 애니메이션을 생성함
CSS 애니메이션(`@keyframes`, `animation` 속성)은 Remotion에서 작동하지 않습니다. 프롬프트에 명시적으로 금지:
```
CSS animation, @keyframes, setTimeout, setInterval은 절대 사용하지 마.
모든 애니메이션은 useCurrentFrame()과 interpolate() 또는 spring()으로만 구현해줘.
```

### Codex가 useCurrentFrame을 잘못 사용함
```
Codex에게:
Remotion 규칙 다시 확인해줘:
- useCurrentFrame()은 반드시 컴포넌트 최상위에서 호출
- 조건문 안에서 호출하면 안 됨 (React hooks 규칙)
```

### spring() 값이 1을 넘어 진동함 (overshoot)
```tsx
// damping 값을 올리면 진동이 줄어듦
const scale = spring({
  frame, fps,
  config: { damping: 200, stiffness: 200 }  // damping을 높게 설정
});
```

---

## 화면 표시 오류

### 이미지가 렌더링 시 나타나지 않음
`staticFile()`을 사용했는지 확인합니다.
```tsx
// ❌ 잘못된 방식
<img src="/logo.png" />

// ✅ 올바른 방식
import { staticFile } from 'remotion';
<img src={staticFile('logo.png')} />
```

파일이 `public/` 폴더에 있는지 확인합니다.

### 화면이 검은색으로 나옴
컴포지션 컴포넌트가 올바르게 `MyComposition`으로 named export 되었는지 확인합니다.
```tsx
// Root.tsx에서 import하는 이름과 일치해야 함
export const MyComposition = () => { ... };
```

---

## 성능 오류

### 렌더링이 매우 느림
```bash
# concurrency를 CPU 코어 수에 맞게 설정
npx remotion render src/index.ts MyVideo output.mp4 --concurrency 8
```

### Remotion Studio가 느리게 반응함
프리뷰 해상도를 낮춥니다. Studio 우측 상단에서 `0.5x` 또는 `0.25x`로 변경.

---

**다음:** [Lambda 렌더링 →](./lambda)
