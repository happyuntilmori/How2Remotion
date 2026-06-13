---
sidebar_position: 2
---

# 사전 준비 사항

## 필요한 도구 목록

| 도구 | 버전 | 용도 |
|------|------|------|
| Node.js | 24 이상 | Remotion, Codex CLI 실행 환경 |
| Bun | 최신 | 빠른 패키지 설치 및 프로젝트 생성 |
| FFmpeg | 6 이상 | 영상 렌더링 인코딩 |
| Codex CLI | 최신 | AI 에이전트 |
| OpenAI API 키 | — | Codex 동작에 필요 |
| ElevenLabs API 키 | — | AI 더빙 (5장에서 사용, 지금은 선택사항) |

---

## 1. Node.js 24+ 설치

### macOS

```bash
# nvm을 사용하는 경우 (권장)
nvm install 24
nvm use 24

# Homebrew를 사용하는 경우
brew install node@24
```

### Windows

[nodejs.org](https://nodejs.org)에서 LTS 버전이 아닌 **Current** 버전(24.x)을 다운로드하여 설치합니다.

### 확인

```bash
node --version
# v24.x.x 이상이어야 합니다
```

---

## 2. Bun 설치

Bun은 Node.js보다 패키지 설치가 빠른 JavaScript 런타임입니다. Remotion 프로젝트 생성 명령어 `bun create video`에 필요합니다.

### macOS / Linux

```bash
curl -fsSL https://bun.sh/install | bash
```

설치 후 터미널을 재시작하거나 다음 명령어로 PATH를 갱신합니다.

```bash
source ~/.bashrc   # bash
source ~/.zshrc    # zsh
```

### Windows

```powershell
powershell -c "irm bun.sh/install.ps1 | iex"
```

### 확인

```bash
bun --version
# 1.x.x 이상이어야 합니다
```

---

## 3. FFmpeg 설치

FFmpeg는 Remotion이 영상을 렌더링할 때 인코딩에 사용합니다. 없으면 렌더링이 완료되지 않습니다.

### macOS

```bash
brew install ffmpeg
```

### Windows

1. [ffmpeg.org](https://ffmpeg.org/download.html)에서 Windows 빌드를 다운로드합니다.
2. 압축을 해제하고 `ffmpeg/bin` 폴더를 시스템 PATH에 추가합니다.

또는 winget을 사용합니다.

```powershell
winget install ffmpeg
```

### 확인

```bash
ffmpeg -version
# ffmpeg version 6.x 이상이어야 합니다
```

---

## 4. Codex CLI 설치

```bash
npm install -g @openai/codex
```

### 확인

```bash
codex --version
```

---

## 5. OpenAI API 키 설정

[platform.openai.com](https://platform.openai.com/api-keys)에서 API 키를 발급합니다.

### macOS / Linux

```bash
export OPENAI_API_KEY="sk-..."
```

영구 적용을 원하시면 `~/.bashrc` 또는 `~/.zshrc`에 위 줄을 추가합니다.

### Windows (PowerShell)

```powershell
[System.Environment]::SetEnvironmentVariable("OPENAI_API_KEY", "sk-...", "User")
```

### 확인

```bash
codex "안녕하세요, 간단히 인사해 주세요"
# Codex가 응답하면 API 키가 정상입니다
```

---

## 6. ElevenLabs API 키 설정 (선택사항)

ElevenLabs는 5장 AI 더빙에서 사용합니다. 지금 설정해 두면 나중에 편리합니다.

[elevenlabs.io](https://elevenlabs.io)에서 무료 계정을 만들고 API 키를 발급합니다.

```bash
export ELEVENLABS_API_KEY="el_..."
```

---

## 전체 확인 명령어

모든 도구가 정상 설치되었는지 한 번에 확인합니다.

```bash
node --version && bun --version && ffmpeg -version | head -1 && codex --version
```

정상 출력 예시:

```
v24.2.0
1.1.29
ffmpeg version 6.1.2 Copyright (c) 2000-2024 the FFmpeg developers
0.x.x
```

하나라도 오류가 발생하면 해당 도구의 설치 단계로 돌아가 재설치합니다.

---

[다음: Remotion 프로젝트 생성 →](./install-remotion)
