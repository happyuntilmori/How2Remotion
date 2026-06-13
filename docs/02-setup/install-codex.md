---
sidebar_position: 4
---

# Codex 설치 및 Remotion 연동

## 1. Codex CLI 설치

아직 설치하지 않았다면 다음 명령어로 글로벌 설치합니다.

```bash
npm install -g @openai/codex
```

설치 확인:

```bash
codex --version
```

---

## 2. Remotion Documentation MCP 연동

Codex가 Remotion의 최신 API 문서를 실시간으로 참조하도록 MCP 서버를 연결합니다. 이 단계를 빠뜨리면 Codex가 구버전 패턴이나 존재하지 않는 API를 생성할 수 있습니다.

**Remotion 프로젝트 디렉토리에서** 실행합니다.

```bash
codex mcp add remotion-documentation -- npx @remotion/mcp@latest
```

명령어 실행 후 확인:

```bash
codex mcp list
```

출력 예시:

```
Configured MCP servers:
  remotion-documentation  npx @remotion/mcp@latest
```

`remotion-documentation`이 목록에 보이면 정상입니다.

---

## 3. Remotion Agent Skills 설치

Remotion 팀이 제공하는 28개의 에이전트 스킬 모듈을 설치합니다. 이 스킬들은 Codex가 Remotion 코드를 정확하게 생성하도록 안내하는 규칙 파일들입니다.

```bash
npx skills add remotion-dev/skills
```

설치 후 `.claude/skills/` 디렉토리가 생성됩니다.

```
.claude/
└── skills/
    ├── remotion-core-concepts/
    ├── remotion-composition/
    ├── remotion-transitions/
    ├── remotion-audio/
    ├── remotion-elevenlabs-voiceover/
    ├── remotion-captions/
    ├── remotion-lambda/
    ├── remotion-shapes/
    └── ... (총 28개)
```

---

## 4. 28개 스킬 모듈 소개

각 스킬 모듈이 방지하는 실수와 제공하는 패턴은 다음과 같습니다.

| 스킬 모듈 | 역할 | 방지하는 실수 |
|-----------|------|---------------|
| `remotion-core-concepts` | `useCurrentFrame`, `interpolate`, `spring` 사용법 | CSS 애니메이션 대신 Remotion API 사용 강제 |
| `remotion-composition` | 컴포지션 등록, Root.tsx 구성 | `registerRoot` 누락 방지 |
| `remotion-transitions` | `<TransitionSeries>` 사용법 | 잘못된 scene 연결 방지 |
| `remotion-audio` | `<Audio>` 컴포넌트 배치 규칙 | `<TransitionSeries>` 내부 오디오 배치 방지 |
| `remotion-elevenlabs-voiceover` | ElevenLabs TTS 자동화 | API 호출 오류 방지 |
| `remotion-captions` | `@remotion/captions` 자막 | 타이밍 오류 방지 |
| `remotion-shapes` | `@remotion/shapes` 도형 | 잘못된 SVG 패턴 방지 |
| `remotion-lambda` | AWS Lambda 렌더링 | IAM 권한 설정 안내 |
| `remotion-static-file` | `staticFile()` 사용법 | 절대경로 사용 방지 |
| `remotion-series` | `<Series>` 다중 씬 | 프레임 오프셋 계산 오류 방지 |

특히 중요한 두 가지 규칙은 다음과 같습니다.

**규칙 1: CSS 애니메이션 금지**

스킬 없는 AI는 종종 다음과 같은 코드를 생성합니다.

```tsx
// 잘못된 코드 — Remotion에서 동작하지 않음
const style = {
  animation: 'fadeIn 1s ease-in-out',
};
```

Remotion은 `@keyframes` CSS 애니메이션을 지원하지 않습니다. 스킬이 있는 Codex는 항상 `interpolate()`를 사용합니다.

**규칙 2: Audio는 TransitionSeries 밖에 배치**

```tsx
// 잘못된 코드
<TransitionSeries>
  <Audio src={staticFile('audio.mp3')} />  {/* 여기 넣으면 안 됩니다 */}
  <TransitionSeries.Sequence>...</TransitionSeries.Sequence>
</TransitionSeries>

// 올바른 코드
<>
  <Audio src={staticFile('audio.mp3')} />  {/* 바깥에 배치 */}
  <TransitionSeries>
    <TransitionSeries.Sequence>...</TransitionSeries.Sequence>
  </TransitionSeries>
</>
```

---

## 5. 설치 완료 확인

모든 설치가 완료되면 다음 명령어로 Codex와 Remotion이 제대로 연동되는지 확인합니다.

```bash
codex "현재 프로젝트의 Remotion 버전을 알려줘"
```

Codex가 `package.json`을 확인해 버전을 응답하면 정상입니다.

---

[다음: 첫 번째 영상 렌더링 →](./hello-remotion)
