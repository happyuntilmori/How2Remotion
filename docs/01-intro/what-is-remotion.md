---
sidebar_position: 2
---

# Remotion이란 무엇인가

## React로 영상을 만든다는 것

Remotion은 React 컴포넌트를 사용해 동영상을 프로그래밍 방식으로 제작하는 프레임워크입니다. HTML, CSS, TypeScript만 알고 있다면 After Effects나 Premiere Pro 없이도 모션 그래픽과 영상을 코드로 만들 수 있습니다.

이것이 가능한 이유는 Remotion이 각 프레임을 React 컴포넌트로 렌더링하기 때문입니다. 30fps 영상에서 1초는 30번의 React 렌더링입니다. 각 렌더링마다 현재 프레임 번호를 받아 애니메이션 값을 계산합니다.

## After Effects와 무엇이 다른가

| 구분 | After Effects / Premiere | Remotion |
|------|--------------------------|----------|
| 편집 방식 | 타임라인 GUI 드래그 | TypeScript 코드 |
| 반복 제작 | 수동 복사·붙여넣기 | 루프·컴포넌트 재사용 |
| 데이터 연동 | 플러그인 필요 | JSON 직접 import |
| 버전 관리 | 불가 (바이너리 파일) | Git 완전 지원 |
| AI 에이전트 연동 | 불가 | Codex, Claude Code 직접 작성 |
| 라이선스 비용 | 월 구독 | 오픈소스 무료 |

GUI 타임라인 방식은 직관적이지만, 100개 씬을 반복 제작하거나 데이터 기반으로 자동 생성하는 용도로는 코드 방식이 압도적으로 효율적입니다.

## 세 가지 핵심 개념

Remotion을 이해하려면 세 가지만 익히면 됩니다.

### 1. 프레임 (Frame)

`useCurrentFrame()`은 현재 렌더링 중인 프레임 번호를 반환합니다. 30fps 영상에서 1초 시점은 프레임 30입니다.

```tsx
import { useCurrentFrame } from 'remotion';

export const MyComposition = () => {
  const frame = useCurrentFrame();

  return (
    <div style={{
      width: '100%',
      height: '100%',
      background: '#1a1a2e',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontSize: 48
    }}>
      현재 프레임: {frame}
    </div>
  );
};
```

이 컴포넌트를 렌더링하면 영상이 재생될 때 화면에 표시되는 숫자가 0, 1, 2, 3... 으로 증가합니다. Remotion Studio에서 타임라인을 드래그하면 실시간으로 숫자가 바뀌는 것을 확인할 수 있습니다.

### 2. interpolate()

`interpolate()`는 프레임 범위를 원하는 값 범위로 매핑합니다. 예를 들어 프레임 0~30을 불투명도 0~1로 변환하면 1초 페이드인이 됩니다.

```tsx
import { useCurrentFrame, interpolate } from 'remotion';

export const FadeInText = () => {
  const frame = useCurrentFrame();

  const opacity = interpolate(
    frame,
    [0, 30],          // 입력 범위: 프레임 0~30
    [0, 1],           // 출력 범위: 불투명도 0~1
    { extrapolateRight: 'clamp' }  // 30 이후에도 1 유지
  );

  const translateY = interpolate(
    frame,
    [0, 30],
    [40, 0],          // 40px 아래에서 시작해 제자리로
    { extrapolateRight: 'clamp' }
  );

  return (
    <div style={{
      opacity,
      transform: `translateY(${translateY}px)`,
      color: 'white',
      fontSize: 64,
      fontWeight: 'bold'
    }}>
      안녕하세요
    </div>
  );
};
```

`extrapolateRight: 'clamp'`는 반드시 기억해야 합니다. 이 옵션을 빠뜨리면 프레임 31 이후에 불투명도가 1을 초과해 예상치 못한 동작이 발생합니다.

### 3. spring()

`spring()`은 물리 기반의 자연스러운 애니메이션을 만듭니다. 단순한 선형 보간과 달리 탄성(bounce)과 감쇠(damping)를 적용해 생동감 있는 움직임을 표현합니다.

```tsx
import { useCurrentFrame, useVideoConfig, spring } from 'remotion';

export const SpringCard = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();

  const scale = spring({
    frame,
    fps,           // 반드시 전달 — 초 단위 물리 계산에 필요
    config: {
      damping: 12,    // 낮을수록 더 많이 튕김 (권장 10~20)
      stiffness: 200, // 높을수록 빠르게 수렴
      mass: 0.5,
    },
    from: 0,
    to: 1,
  });

  return (
    <div
      style={{
        transform: `scale(${scale})`,
        backgroundColor: '#0066CC',
        width: 300,
        height: 300,
        borderRadius: 24,
      }}
    />
  );
};
```

`useVideoConfig()`는 현재 컴포지션의 `fps`, `width`, `height`, `durationInFrames`를 반환합니다. `spring` 계산에 반드시 `fps`를 전달해야 타이밍이 정확해집니다.

## Remotion이 특히 강한 시나리오

- **데이터 기반 영상**: JSON 데이터를 받아 자동으로 차트 애니메이션 생성
- **반복 생산**: 브랜드 템플릿 하나로 수십 개의 제품 소개 영상을 변수만 바꿔 일괄 생성
- **AI 파이프라인**: 스크립트 생성 → TTS 더빙 → 영상 렌더링을 코드로 완전 자동화
- **소셜 미디어 콘텐츠**: 1:1, 9:16, 16:9 비율을 컴포지션 설정 변경만으로 전환

## 왜 Codex가 Remotion을 실용적으로 만드는가

Remotion의 개념은 단순하지만, 처음 작성하는 코드는 낯설게 느껴집니다. `interpolate()`의 clamp 옵션, `spring()`의 damping 값, `<TransitionSeries>`에서의 오디오 배치 규칙 등 처음 접하면 헷갈리는 부분이 있습니다.

Codex는 Remotion 전용 문서 MCP와 28개의 에이전트 스킬 모듈을 장착하면 이 모든 패턴을 정확히 알고 있습니다. 자연어로 "텍스트가 아래에서 올라오면서 페이드인되는 씬을 만들어줘"라고 말하면 올바른 TypeScript 코드를 즉시 생성합니다.

이 블로그의 목적은 Remotion의 핵심 개념을 이해한 뒤, Codex와 협력해 실제 영상 프로젝트를 빠르게 완성하는 워크플로우를 익히는 것입니다.

---

[2장. 환경 설정 →](../02-setup/)
