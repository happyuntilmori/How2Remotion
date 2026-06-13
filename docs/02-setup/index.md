---
sidebar_position: 1
---

# 2장. 환경 설정

## 총 소요 시간: 약 30분

이 챕터에서는 Remotion과 Codex를 실제로 사용하기 위한 모든 도구를 설치합니다. 각 단계를 순서대로 따라하면 챕터 끝에서 첫 번째 Remotion 영상을 렌더링할 수 있습니다.

이미 Node.js와 Codex CLI가 설치된 환경이라면 [3단계: Remotion 프로젝트 생성](./install-remotion)부터 시작하셔도 됩니다.

---

## 이 챕터의 구성

| 단계 | 내용 | 소요 시간 |
|------|------|-----------|
| [1. 사전 준비 사항](./prerequisites) | Node.js, Bun, FFmpeg, API 키 | 10분 |
| [2. Remotion 프로젝트 생성](./install-remotion) | `bun create video`로 프로젝트 시작 | 5분 |
| [3. Codex 설치 및 연동](./install-codex) | Codex CLI + Remotion 스킬 28개 | 10분 |
| [4. 첫 번째 영상 렌더링](./hello-remotion) | Codex로 코드 수정 → MP4 출력 | 5분 |

---

## 이 챕터를 마치면

- Node.js 24+, Bun, FFmpeg가 정상 동작하는 환경
- OpenAI API 키가 Codex CLI에 연결된 상태
- Remotion 프로젝트가 생성되고 Studio가 브라우저에서 열리는 상태
- Codex에 Remotion 문서 MCP와 28개 스킬이 설치된 상태
- 첫 번째 MP4 파일이 로컬에 렌더링된 상태

모든 준비가 완료되면 3장에서 본격적으로 Codex 프롬프트로 모션 그래픽을 만들기 시작합니다.
