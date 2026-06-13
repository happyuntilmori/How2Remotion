---
sidebar_position: 3
---

# Remotion 프로젝트 생성

## bun create video

Remotion 공식 프로젝트 생성 명령어입니다. 빈 디렉토리에서 실행합니다.

```bash
bun create video
```

실행하면 대화형 프롬프트가 나타납니다.

```
? What would you like to name your Remotion project?
> my-video

? Choose a template:
  Hello World (TypeScript)
  Blank (TypeScript)
  Hello World (JavaScript)
❯ Hello World (TypeScript)  ← 이것을 선택합니다

? Install dependencies now? (Y/n)
> Y
```

"Hello World (TypeScript)" 템플릿을 선택하면 Remotion의 기본 구조를 모두 갖춘 프로젝트가 생성됩니다.

---

## 생성된 폴더 구조

```
my-video/
├── src/
│   ├── index.ts          # 엔트리포인트 — 컴포지션을 등록하는 곳
│   ├── Root.tsx          # 모든 컴포지션을 정의하는 루트 컴포넌트
│   └── Composition.tsx   # 실제 영상 내용이 담긴 컴포넌트
├── public/               # 이미지, 오디오 등 정적 파일 보관
├── package.json
└── tsconfig.json
```

### src/index.ts

Remotion의 엔트리포인트입니다. `registerRoot()`로 루트 컴포넌트를 등록합니다.

```tsx
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

이 파일은 대부분 수정할 필요가 없습니다.

### src/Root.tsx

사용 가능한 컴포지션을 정의합니다. 각 컴포지션은 영상 하나에 해당합니다.

```tsx
import { Composition } from 'remotion';
import { MyComposition } from './Composition';

export const RemotionRoot = () => {
  return (
    <>
      <Composition
        id="MyComposition"        // 렌더링할 때 사용하는 ID
        component={MyComposition}
        durationInFrames={150}    // 총 프레임 수 (30fps × 5초 = 150)
        fps={30}                  // 초당 프레임
        width={1920}              // 영상 너비
        height={1080}             // 영상 높이
      />
    </>
  );
};
```

### src/Composition.tsx

실제 영상 내용이 담기는 컴포넌트입니다. 이 파일을 주로 편집하게 됩니다.

```tsx
import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(frame, [0, 20], [0, 1], {
    extrapolateRight: 'clamp',
  });

  return (
    <AbsoluteFill
      style={{ backgroundColor: '#1a1a2e', alignItems: 'center', justifyContent: 'center' }}
    >
      <div style={{ opacity, color: 'white', fontSize: 72, fontWeight: 'bold' }}>
        Hello, Remotion!
      </div>
    </AbsoluteFill>
  );
};
```

`<AbsoluteFill>`은 `position: absolute; top: 0; left: 0; width: 100%; height: 100%;`를 적용하는 편의 컴포넌트입니다. 배경이나 전체 화면을 채우는 요소에 사용합니다.

---

## Remotion Studio 실행

프로젝트 디렉토리에서 다음 명령어를 실행합니다.

```bash
cd my-video
npx remotion studio
```

브라우저에서 `http://localhost:3000`이 자동으로 열립니다.

Remotion Studio에서 할 수 있는 것:

- 타임라인 슬라이더로 프레임별 미리보기
- 컴포지션 목록 확인
- 렌더링 실행 (Studio 내에서도 가능)
- 실시간 코드 변경 반영 (Hot Reload)

---

## 코드를 수정하면 즉시 반영됩니다

`src/Composition.tsx`의 배경색을 바꿔보십시오.

```tsx
// 변경 전
backgroundColor: '#1a1a2e'

// 변경 후
backgroundColor: '#0066CC'
```

파일을 저장하는 순간 브라우저의 Remotion Studio가 즉시 업데이트됩니다. 이 실시간 미리보기 기능이 Remotion 개발의 핵심 장점 중 하나입니다.

---

[다음: Codex 설치 및 연동 →](./install-codex)
