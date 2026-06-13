---
sidebar_position: 3
---

# 다운로드 및 커스터마이징

## 예제를 내 프로젝트에 적용하는 4단계

---

## 1단계: 프롬프트 텍스트 복사

remotion.dev/prompts에서 원하는 예제를 클릭한 후, 프롬프트 텍스트 전체를 복사합니다.

예시 (실제 쇼케이스에서 발췌한 형태):

```
Create a product announcement video (1920x1080, 30fps, 150 frames).
Dark background (#1a1a2e). Company logo appears in the top-left corner.
Large headline text slides in from the left on frame 0-25.
Subtitle text fades in on frame 30-50.
A call-to-action button pulses using spring animation starting at frame 60.
```

---

## 2단계: 새 Remotion 프로젝트 생성

기존 프로젝트가 있다면 건너뛰어도 됩니다. 완전히 새로 시작하는 경우에만 실행합니다.

```bash
bun create video techflow-intro
cd techflow-intro
```

---

## 3단계: Codex로 커스터마이징

복사한 프롬프트를 기반으로 Codex에게 한국어 버전으로 만들어달라고 요청합니다.

```bash
codex "다음 프롬프트를 기반으로 Remotion 컴포지션을 만들어줘.
단, 아래 변경사항을 적용해줘:

원본 프롬프트:
Create a product announcement video (1920x1080, 30fps, 150 frames).
Dark background (#1a1a2e). Company logo appears in the top-left corner.
Large headline text slides in from the left on frame 0-25.
Subtitle text fades in on frame 30-50.
A call-to-action button pulses using spring animation starting at frame 60.

변경사항:
- 회사명을 'TechFlow'로 설정
- 헤드라인 텍스트: 'TechFlow — 업무를 자동화하다'
- 서브타이틀: 'AI 기반 업무 자동화 플랫폼'
- 색상 테마: 브랜드 색상 #0066CC 사용
- 모든 텍스트는 한국어
- 로고 파일: staticFile('logo.png')

named export MyComposition, CSS animation 사용 금지, interpolate에 extrapolateRight: clamp 포함"
```

---

## 4단계: 반복 수정

Codex가 생성한 코드를 Studio에서 확인하고, 원하는 방향으로 수정 요청을 합니다.

```bash
# 타이밍 조정
codex "헤드라인 텍스트가 너무 빠르게 나타난다. 0~40프레임으로 늦춰줘"

# 색상 조정
codex "버튼의 배경색을 #0066CC에서 #FF6B35 (오렌지)로 바꿔줘"

# 요소 추가
codex "화면 하단 중앙에 작은 회사 슬로건 텍스트 '더 스마트하게, 더 빠르게'를 
프레임 80에서 페이드인으로 추가해줘"
```

---

## 실전 예제: 한국어 제품 인트로 커스터마이징

텍스트 애니메이션 예제를 한국 SaaS 제품 인트로로 변환하는 완전한 실습입니다.

### 시나리오

쇼케이스에서 "깔끔한 제품 발표 영상" 예제를 발견했습니다. 영어로 되어 있고 색상이 맞지 않습니다. 이것을 TechFlow 브랜드에 맞게 수정합니다.

### Codex 프롬프트

```bash
codex "다음 영상 구조로 src/Composition.tsx를 완전히 새로 작성해줘.

[영상 사양]
크기: 1920x1080, fps: 30, 총 150프레임 (5초)

[씬 구성]
배경: 짙은 남색 #0d1b2a, 전체 화면

[씬 1 - 0~40프레임]
상단에 작은 태그 텍스트 '#AI자동화' (색상 #4FC3F7, 크기 24px)
프레임 0~15: 위에서 아래로 슬라이드하며 페이드인

[씬 2 - 15~90프레임]
대형 헤드라인 'TechFlow' (흰색, 80px, 자간 -3px)
프레임 15~40: 왼쪽에서 오른쪽으로 슬라이드하며 등장

[씬 3 - 50~120프레임]
서브타이틀 'AI 기반 업무 자동화 플랫폼' (색상 #B0BEC5, 40px)
프레임 50~70: 아래에서 위로 20px 이동하며 페이드인

[씬 4 - 100~150프레임]
CTA 버튼 모양의 div: '지금 시작하기 →' (흰색 텍스트, #0066CC 배경, 패딩 20px 48px, 둥근 모서리 8px)
spring(damping: 12, stiffness: 200)으로 프레임 100에서 scale 0→1 팝인

[규칙]
- CSS @keyframes 사용 금지
- 모든 interpolate에 extrapolateRight와 extrapolateLeft: 'clamp' 포함
- named export MyComposition
- useVideoConfig()로 fps 가져와서 spring에 전달"
```

### 예상 결과물 구조

Codex가 생성하는 코드는 대략 다음 구조를 가집니다.

```tsx
import {
  AbsoluteFill, useCurrentFrame, useVideoConfig,
  interpolate, spring
} from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  // 태그 텍스트 애니메이션
  const tagOpacity = interpolate(frame, [0, 15], [0, 1], { extrapolateRight: 'clamp' });
  const tagY = interpolate(frame, [0, 15], [-20, 0], { extrapolateRight: 'clamp' });

  // 헤드라인 애니메이션
  const headlineX = interpolate(frame, [15, 40], [-100, 0], {
    extrapolateLeft: 'clamp', extrapolateRight: 'clamp'
  });

  // CTA 버튼 스케일
  const ctaScale = spring({
    frame: frame - 100,
    fps,
    config: { damping: 12, stiffness: 200 },
    from: 0,
    to: 1,
  });

  return (
    <AbsoluteFill style={{ backgroundColor: '#0d1b2a', /* ... */ }}>
      {/* 각 요소 렌더링 */}
    </AbsoluteFill>
  );
};
```

### 최종 렌더링

```bash
npx remotion render src/index.ts MyComposition techflow-intro.mp4
```

---

## 팁: 쇼케이스 예제를 템플릿으로 관리

자주 사용하는 예제 구조는 로컬에 파일로 저장해두면 다음 프로젝트에서 빠르게 재사용할 수 있습니다.

```
templates/
├── product-intro-16x9.tsx
├── social-reel-9x16.tsx
└── data-chart-animation.tsx
```

각 템플릿 파일 상단에 원본 프롬프트를 주석으로 달아두면 나중에 어떤 프롬프트로 수정할 수 있는지 기억하기 쉽습니다.

---

[5장. AI 더빙 입히기 →](../05-dubbing/)
