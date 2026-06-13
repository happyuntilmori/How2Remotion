# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Purpose

Remotion과 AI 에이전트(Codex, Hermes)를 함께 사용해 더빙·영상 편집·모션 그래픽스 효과를 적용하는 방법을 단계별로 설명하는 한국어 튜토리얼 블로그입니다.

## Intended Stack

- **블로그 플랫폼:** Docusaurus 3 (아직 미설치 — `package.json` 없음)
- **언어:** 한국어 (문서), TypeScript (Remotion 예제 코드)
- **핵심 라이브러리:** Remotion, OpenAI Codex API, Hermes

Docusaurus 초기화 후 주요 명령어:

```bash
npm run start      # 개발 서버 (localhost:3000)
npm run build      # 정적 빌드
npm run serve      # 빌드 결과 미리보기
```

## Repository Structure

```
docs/          # 블로그 콘텐츠 (Docusaurus sidebar 자동 매핑)
  01-intro/    # 1장: Remotion 및 AI 에이전트 소개
  02-setup/    # 2장: 환경 설정 (Remotion, Codex, Hermes 설치)
  03-ai-agents/# 3장: AI 에이전트 워크플로우 및 프롬프트 엔지니어링
  04-dubbing/  # 4장: TTS, 오디오 동기화, 다국어·AI 음성 복제
  05-video-editing/ # 5장: 컴포지션, 시퀀스, 트랜지션, 렌더링
  06-motion-graphics/ # 6장: 스프링 애니메이션, 텍스트·SVG 효과
  07-advanced/ # 7장: 전체 파이프라인, 자동화, 문제 해결
src/
  compositions/ # 완성된 Remotion 컴포지션 예제
  components/   # 재사용 가능한 React 컴포넌트
  hooks/        # 커스텀 React 훅
examples/       # 챕터별 실행 가능한 독립 예제 프로젝트
static/img/     # 블로그에 삽입되는 이미지
```

## Content Conventions

**사이드바 순서:** 폴더명 앞의 숫자 prefix(`01-`, `02-` 등)로 Docusaurus가 자동 정렬합니다. 새 챕터 추가 시 이 규칙을 유지하세요.

**챕터 간 링크:** 상대 경로 사용:
```markdown
[오디오 동기화](../04-dubbing/audio-sync)
```

**각 챕터 폴더의 `index.md`** 는 챕터 랜딩 페이지이며, 해당 챕터의 모든 페이지로 가는 링크 목록을 포함해야 합니다.

**코드 예제:** `src/` 또는 `examples/` 의 실제 파일을 문서에서 참조할 때 상대 경로가 아닌 GitHub 링크 또는 코드 블록으로 포함합니다.

## Key Concepts for Content

- **Remotion 컴포지션:** React 컴포넌트 기반으로 영상을 프로그래밍 방식으로 생성
- **`useCurrentFrame()`:** Remotion에서 현재 프레임 번호를 가져오는 핵심 훅
- **`interpolate()` / `spring()`:** 애니메이션 값 계산 유틸리티
- **AI 에이전트 역할:** 스크립트 생성 → TTS 더빙 → Remotion 컴포지션 자동 생성의 파이프라인을 오케스트레이션
