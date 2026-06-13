---
sidebar_position: 6
---

# 에셋 사용 (이미지, 로고)

## staticFile() 함수

Remotion에서 이미지, 오디오, 폰트 등 정적 파일을 사용할 때는 반드시 `staticFile()` 함수를 사용합니다. 절대 경로나 상대 경로를 직접 사용하면 렌더링 시 파일을 찾지 못합니다.

```tsx
import { Img, staticFile } from 'remotion';

// 잘못된 방법
<img src="/public/logo.png" />
<img src="./logo.png" />

// 올바른 방법
<Img src={staticFile('logo.png')} />
```

---

## public 폴더 구조

모든 정적 파일은 프로젝트 루트의 `public/` 폴더에 저장합니다.

```
my-video/
├── public/
│   ├── logo.png          → staticFile('logo.png')
│   ├── images/
│   │   └── hero.jpg      → staticFile('images/hero.jpg')
│   └── audio/
│       └── narration.mp3 → staticFile('audio/narration.mp3')
└── src/
```

---

## Img 컴포넌트

Remotion의 `<Img>` 컴포넌트는 일반 `<img>` 태그와 동일하게 사용하지만, 렌더링 중 이미지 로딩을 보장하는 추가 로직을 포함합니다.

```tsx
import { Img, staticFile, AbsoluteFill } from 'remotion';

export const HeroScene = () => {
  return (
    <AbsoluteFill style={{ backgroundColor: '#1a1a2e' }}>
      <Img
        src={staticFile('images/hero.jpg')}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          opacity: 0.6,
        }}
      />
    </AbsoluteFill>
  );
};
```

---

## 로고 애니메이션: 스케일 + 불투명도

로고가 중앙에서 팝업되며 페이드인되는 효과입니다. 인트로 씬에 자주 사용됩니다.

### 코드

```tsx
import { useCurrentFrame, useVideoConfig, spring, interpolate, Img, staticFile, AbsoluteFill } from 'remotion';

export const LogoIntro = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 로고 등장 애니메이션
  const scale = spring({
    frame,
    fps,
    config: { damping: 12, stiffness: 180, mass: 0.7 },
    from: 0.6,
    to: 1,
  });

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  // 로고 아래 텍스트는 10프레임 지연
  const textOpacity = interpolate(frame, [10, 30], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  const textY = interpolate(frame, [10, 30], [20, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{
        backgroundColor: '#ffffff',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 24,
      }}
    >
      {/* 로고 이미지 */}
      <div style={{ transform: `scale(${scale})`, opacity }}>
        <Img
          src={staticFile('logo.png')}
          style={{ width: 200, height: 200, objectFit: 'contain' }}
        />
      </div>

      {/* 회사명 텍스트 */}
      <div
        style={{
          opacity: textOpacity,
          transform: `translateY(${textY}px)`,
          color: '#0066CC',
          fontSize: 48,
          fontWeight: 'bold',
          letterSpacing: '-1px',
        }}
      >
        TechFlow
      </div>
    </AbsoluteFill>
  );
};
```

---

## 지원 파일 형식

| 파일 유형 | 지원 형식 | 비고 |
|-----------|-----------|------|
| 이미지 | PNG, JPG, WebP, GIF, SVG | SVG는 `<Img>` 대신 직접 import 권장 |
| 오디오 | MP3, WAV, AAC, OGG | MP3 권장 |
| 영상 | MP4, WebM | `<Video>` 컴포넌트 사용 |
| 폰트 | TTF, OTF, WOFF2 | CSS `@font-face`로 로드 |

SVG 파일은 React 컴포넌트로 직접 import하는 것이 더 유연합니다.

```tsx
import LogoSvg from '../public/logo.svg';

// Img 컴포넌트로도 사용 가능
<Img src={staticFile('logo.svg')} />
```

---

## Codex 프롬프트: 로고 추가

```
src/Composition.tsx에 로고를 추가해줘.
public/logo.png 파일을 사용하고 staticFile()로 경로 설정.
로고를 오른쪽 상단 모서리 (top: 40px, right: 60px)에 배치.
너비 120px, objectFit: contain.
spring(damping: 15, stiffness: 200)으로 프레임 0에서 scale 0.8→1로 팝인.
opacity는 프레임 0~15 동안 0→1 페이드인.
기존 내용은 그대로 유지.
```

---

## 배경 이미지 위에 텍스트 오버레이

```tsx
import { Img, staticFile, AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const HeroWithOverlay = () => {
  const frame = useCurrentFrame();

  const textOpacity = interpolate(frame, [15, 40], [0, 1], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill>
      {/* 배경 이미지 */}
      <Img
        src={staticFile('images/hero.jpg')}
        style={{ width: '100%', height: '100%', objectFit: 'cover' }}
      />

      {/* 어두운 오버레이 */}
      <AbsoluteFill style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }} />

      {/* 텍스트 */}
      <AbsoluteFill style={{ alignItems: 'center', justifyContent: 'center' }}>
        <div
          style={{
            opacity: textOpacity,
            color: 'white',
            fontSize: 72,
            fontWeight: 'bold',
            textAlign: 'center',
          }}
        >
          새로운 가능성을
          <br />
          열어드립니다
        </div>
      </AbsoluteFill>
    </AbsoluteFill>
  );
};
```

---

[4장. 프롬프트 쇼케이스 →](../04-prompt-showcase/)
