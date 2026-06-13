---
sidebar_position: 3
---

# ElevenLabs 설정

## 1. ElevenLabs 계정 및 API 키

[elevenlabs.io](https://elevenlabs.io)에서 계정을 만들고 API 키를 발급합니다.

1. 로그인 후 우측 상단 프로필 → **API Keys** 메뉴 클릭
2. **Create new API key** 클릭
3. 생성된 키를 복사

환경 변수로 설정합니다.

```bash
# macOS / Linux
export ELEVENLABS_API_KEY="el_..."

# 영구 설정
echo 'export ELEVENLABS_API_KEY="el_..."' >> ~/.zshrc
source ~/.zshrc
```

---

## 2. Remotion ElevenLabs 스킬 설치

Remotion Agent Skills가 설치되어 있다면 (`npx skills add remotion-dev/skills`) ElevenLabs 스킬도 이미 설치된 상태입니다. 다음 경로에 스크립트가 있는지 확인합니다.

```bash
ls .claude/skills/remotion-elevenlabs-voiceover/
# generate.js 파일이 있어야 합니다
```

---

## 3. scenes.json 작성

나레이션 스크립트를 JSON 형식으로 작성합니다. 각 씬에 하나의 나레이션이 대응합니다.

```json
{
  "scenes": [
    {
      "id": "scene1",
      "character": "narrator",
      "text": "안녕하세요. TechFlow는 AI 기반 업무 자동화 플랫폼입니다."
    },
    {
      "id": "scene2",
      "character": "narrator",
      "text": "복잡한 반복 업무를 자동화하고 팀의 생산성을 두 배로 높이세요."
    },
    {
      "id": "scene3",
      "character": "narrator",
      "text": "지금 바로 무료로 시작하세요. 설치 없이 브라우저에서 즉시 사용 가능합니다."
    }
  ]
}
```

파일을 `scenes.json`으로 저장합니다 (프로젝트 루트 디렉토리).

---

## 4. 오디오 파일 생성 실행

```bash
node .claude/skills/remotion-elevenlabs-voiceover/generate.js \
  --scenes scenes.json \
  --character narrator \
  --output-dir public/audio/
```

실행 후 `public/audio/` 폴더에 MP3 파일이 생성됩니다.

```
public/audio/
├── scene1.mp3
├── scene2.mp3
└── scene3.mp3
```

---

## 5. ElevenLabs 캐릭터 프리셋

Remotion 스킬이 지원하는 캐릭터 프리셋입니다. `--character` 옵션에 사용합니다.

| 프리셋 | 특징 | 적합한 용도 |
|--------|------|-------------|
| `narrator` | 차분하고 신뢰감 있는 목소리 | 제품 소개, 튜토리얼 |
| `salesperson` | 에너지 있고 설득력 있는 목소리 | 광고, 프로모션 |
| `expert` | 권위 있고 전문적인 목소리 | 기술 설명, 교육 |
| `conversational` | 자연스럽고 친근한 목소리 | 일반 소통, 브리핑 |
| `dramatic` | 강렬하고 감정적인 목소리 | 브랜드 영상, 감성 콘텐츠 |
| `calm` | 부드럽고 안정적인 목소리 | 명상, 교육 콘텐츠 |
| `literal` | 중립적이고 명확한 목소리 | 기술 문서, 뉴스 |

대부분의 제품 소개 영상에는 `narrator`가 가장 적합합니다.

---

## 6. 생성된 파일 확인

생성된 MP3 파일을 직접 재생해 품질을 확인합니다.

```bash
# macOS
afplay public/audio/scene1.mp3

# Linux (mpv 설치 필요)
mpv public/audio/scene1.mp3
```

텍스트가 자연스럽게 발화되지 않는 경우:

- 문장 중간에 쉼표나 마침표를 추가해 발화 속도를 조절합니다
- 특수 문자나 약어는 한글로 풀어 씁니다 (예: `AI` → `에이아이`)
- 전문 용어는 영문과 한글을 함께 기재합니다 (예: `SaaS, 서비스형 소프트웨어`)

---

## 7. 오디오 길이 확인

각 씬의 오디오 길이를 확인합니다. 이 값이 Remotion 씬의 길이를 결정합니다.

```bash
# ffprobe로 오디오 길이 확인
ffprobe -i public/audio/scene1.mp3 -show_entries format=duration -v quiet -of csv="p=0"
# 출력 예: 3.456 (초)
```

또는 Node.js 스크립트로 모든 씬의 길이를 한 번에 확인할 수 있습니다.

```js
// check-durations.mjs
import { execSync } from 'child_process';
import fs from 'fs';

const audioDir = 'public/audio';
const files = fs.readdirSync(audioDir).filter(f => f.endsWith('.mp3'));

for (const file of files) {
  const duration = execSync(
    `ffprobe -i ${audioDir}/${file} -show_entries format=duration -v quiet -of csv="p=0"`
  ).toString().trim();
  console.log(`${file}: ${duration}초 = ${Math.ceil(parseFloat(duration) * 30)}프레임`);
}
```

```bash
node check-durations.mjs
# scene1.mp3: 3.456초 = 104프레임
# scene2.mp3: 4.123초 = 124프레임
# scene3.mp3: 3.789초 = 114프레임
```

---

[다음: 오디오 동기화 →](./audio-sync)
