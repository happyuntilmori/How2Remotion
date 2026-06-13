---
sidebar_position: 3
---

# 왜 Codex인가

## Codex가 특별한 이유

AI 에이전트를 이미 사용하고 있다면 "왜 Codex여야 하는가? Claude Code로도 되지 않는가?"라는 의문이 생길 수 있습니다. 결론부터 말씀드리면, **Codex와 Claude Code 둘 다 Remotion 프로젝트에서 사용할 수 있습니다**. 이 블로그는 주로 Codex CLI를 기준으로 설명하지만, Claude Code를 선호하신다면 동일한 워크플로우가 적용됩니다.

그러나 Remotion 생태계는 특히 Codex에 최적화된 도구들을 제공하고 있으며, 그것이 Codex를 기준점으로 삼는 이유입니다.

## Remotion Agent Skills

Remotion 팀은 Codex를 위한 28개의 전용 스킬 모듈을 공개했습니다. 다음 명령어 하나로 설치됩니다.

```bash
npx skills add remotion-dev/skills
```

이 명령어를 실행하면 프로젝트의 `.claude/skills/` 디렉토리에 28개의 규칙 파일이 설치됩니다. 각 모듈은 Codex가 Remotion 코드를 생성할 때 지켜야 할 규칙과 패턴을 정의합니다.

스킬 모듈이 다루는 주요 영역은 다음과 같습니다.

| 스킬 모듈 | 역할 |
|-----------|------|
| `remotion-core-concepts` | `useCurrentFrame`, `interpolate`, `spring` 올바른 사용법 |
| `remotion-composition` | 컴포지션 등록 및 `Root.tsx` 구성 |
| `remotion-transitions` | `<TransitionSeries>` 사용 규칙 |
| `remotion-audio` | `<Audio>` 배치 규칙 (TransitionSeries 외부에 배치) |
| `remotion-elevenlabs-voiceover` | ElevenLabs TTS 파일 생성 자동화 |
| `remotion-captions` | `@remotion/captions` 자막 동기화 |
| `remotion-lambda` | AWS Lambda 렌더링 설정 |
| `remotion-shapes` | `@remotion/shapes` 도형 애니메이션 |

스킬이 없는 일반 AI는 Remotion 코드를 생성할 때 CSS 애니메이션(`@keyframes`)을 사용하거나, `<Audio>`를 `<TransitionSeries>` 내부에 잘못 배치하는 등의 오류를 범합니다. 스킬 모듈은 이러한 실수를 사전에 방지합니다.

## Remotion Documentation MCP

Codex에 Remotion 공식 문서를 직접 연결할 수 있습니다.

```bash
codex mcp add remotion-documentation -- npx @remotion/mcp@latest
```

이 MCP 서버는 Codex가 코드를 생성할 때마다 Remotion의 최신 API 문서를 실시간으로 참조하도록 합니다. 모델의 학습 데이터 컷오프 이후 업데이트된 API 변경사항도 반영되므로, 구버전 패턴을 생성하는 문제를 방지할 수 있습니다.

설치 확인:

```bash
codex mcp list
```

출력에 `remotion-documentation`이 보이면 정상입니다.

## "Vibe Coding"이란 무엇인가

"Vibe coding"은 코드의 세부 구현보다 원하는 결과물의 분위기(vibe)를 자연어로 설명하고, AI가 나머지를 처리하게 하는 방식입니다. 오픈소스 프로젝트 [Vibe Motion](https://github.com/GurYN/vibe-motion)이 이 접근법을 Remotion에 적용한 대표적인 예입니다.

실제 사례를 보면 이해하기 쉽습니다.

**전통적인 방식:**
1. Remotion API 문서를 읽는다
2. `interpolate()` 파라미터를 찾아본다
3. TypeScript 코드를 직접 작성한다
4. 오류를 수정한다
5. 결과를 확인한다

**Vibe coding 방식:**
1. Codex에게 원하는 것을 설명한다
2. 결과를 확인하고 수정 방향을 피드백한다

```
# 실제 Codex 프롬프트 예시
"1920x1080 영상에 흰 배경에서 파란색 제목 텍스트가
아래에서 올라오며 페이드인되는 씬을 만들어줘.
텍스트는 'TechFlow — 업무를 자동화하다'이고
폰트 크기는 72px, 애니메이션은 0.5초 동안."
```

이 한 문장으로 Codex는 올바른 TypeScript 컴포넌트를 생성합니다.

## Codex CLI vs Claude Code

실무에서는 둘 중 더 편한 도구를 선택하시면 됩니다. 주요 차이점은 다음과 같습니다.

| 항목 | Codex CLI | Claude Code |
|------|-----------|-------------|
| 설치 | `npm install -g @openai/codex` | `npm install -g @anthropic-ai/claude-code` |
| Remotion 스킬 | 공식 지원 (`npx skills add remotion-dev/skills`) | 동일한 스킬 파일 활용 가능 |
| MCP 연동 | `codex mcp add` | MCP 서버 연동 |
| 모델 | GPT-4o, o1, o3 | Claude 3.5 Sonnet, Opus |

이 블로그의 코드 예제는 Codex CLI를 기준으로 작성되어 있지만, Claude Code를 사용하는 경우 프롬프트 자체는 동일하게 사용할 수 있습니다.

## 이 블로그에서 배울 워크플로우

다음 챕터부터 실습할 워크플로우의 전체 흐름입니다.

```
1. 프로젝트 생성 (bun create video)
        ↓
2. Codex + Remotion 스킬 장착
        ↓
3. 자연어 프롬프트로 모션 그래픽 생성
        ↓
4. ElevenLabs로 AI 보이스오버 생성
        ↓
5. Codex로 오디오 동기화 자동화
        ↓
6. npx remotion render로 MP4 출력
```

각 단계에서 Codex가 코드를 생성하고, 여러분은 결과물을 검토하고 방향을 수정하는 역할을 합니다. Remotion 내부 코드를 모두 이해하지 않아도 실용적인 영상을 만들 수 있는 것이 이 접근법의 핵심입니다.

---

[2장. 환경 설정 →](../02-setup/)
