---
sidebar_position: 2
---

# 실전: TechFlow 소개 영상 만들기

총 소요 시간: 약 90분 (환경 설정 완료 기준)

---

## 영상 구성 설계

| 씬 | 내용 | 길이 |
|----|------|------|
| 씬 1: 오프닝 | 로고 + 회사명 등장 | ~10초 |
| 씬 2: 문제 제기 | "영상 제작, 이렇게 복잡했나요?" | ~15초 |
| 씬 3: 솔루션 | TechFlow 기능 3가지 소개 | ~25초 |
| 씬 4: 클로징 | CTA + 웹사이트 주소 | ~10초 |

---

## Phase 1: 프로젝트 생성 (5분)

```bash
bun create video techflow-video
cd techflow-video
npx skills add remotion-dev/skills
```

`public/` 폴더에 준비:
- `logo.png` — TechFlow 로고
- `audio/bgm.mp3` — 배경음악

---

## Phase 2: 나레이션 스크립트 작성 (10분)

`remotion/scenes.json` 생성:

```json
[
  {
    "id": "scene-1",
    "text": "TechFlow. 영상 제작의 새로운 기준입니다.",
    "character": "narrator",
    "estimatedDuration": 4.0
  },
  {
    "id": "scene-2",
    "text": "지금까지 영상 하나를 만들려면 전문 장비, 편집 소프트웨어, 그리고 수십 시간의 작업이 필요했습니다. TechFlow는 이 모든 과정을 바꿉니다.",
    "character": "narrator",
    "estimatedDuration": 12.0
  },
  {
    "id": "scene-3",
    "text": "AI가 스크립트를 작성하고, 목소리를 생성하며, 모션 그래픽까지 자동으로 만들어냅니다. 여러분은 방향만 제시하면 됩니다. 빠르고, 정확하고, 아름답게.",
    "character": "narrator",
    "estimatedDuration": 16.0
  },
  {
    "id": "scene-4",
    "text": "지금 바로 시작해 보세요. techflow.io",
    "character": "narrator",
    "estimatedDuration": 4.0
  }
]
```

---

## Phase 3: AI 음성 생성 (5분)

```bash
node .claude/skills/remotion-elevenlabs-voiceover/generate.js \
  --scenes remotion/scenes.json \
  --character narrator \
  --output-dir public/audio/
```

`public/audio/metadata.json` 확인:
```json
{
  "scenes": [
    { "id": "scene-1", "durationInSeconds": 3.8, "durationInFrames": 114 },
    { "id": "scene-2", "durationInSeconds": 11.5, "durationInFrames": 345 },
    { "id": "scene-3", "durationInSeconds": 15.7, "durationInFrames": 471 },
    { "id": "scene-4", "durationInSeconds": 3.9, "durationInFrames": 117 }
  ],
  "totalFrames": 1083
}
```

---

## Phase 4: 씬별 모션 그래픽 (45분)

각 씬에 대해 Codex에 지시합니다. 터미널에서 Codex 실행 후:

**씬 1 — 오프닝:**
```
src/compositions/Scene1.tsx 파일을 만들어줘.

- 배경: 어두운 그라디언트(#0a0f1e → #1a2744)
- public/logo.png 이미지가 중앙에서 spring 스케일업(0.5 → 1)으로 등장
- 0.5초 후 "TechFlow" 텍스트가 로고 아래에 슬라이드업으로 등장 (흰색, 72px)
- durationInFrames: 114
```

**씬 2 — 문제 제기:**
```
src/compositions/Scene2.tsx 파일을 만들어줘.

- 배경: 어두운 회색(#111827)
- 아이콘 3개(카메라, 컴퓨터, 시계)가 화면 상단에 순서대로 등장
- 각 아이콘 아래 텍스트: "전문 장비", "편집 소프트웨어", "수십 시간"
- 빨간 X 표시가 각 아이콘 위에 나타나는 애니메이션
- durationInFrames: 345
```

**씬 3 — 솔루션:**
```
src/compositions/Scene3.tsx 파일을 만들어줘.

- 배경: 밝은 파란색 그라디언트(#1e40af → #3b82f6)
- 3개의 기능 카드가 좌→우 순서로 슬라이드인:
  카드 1: 아이콘 + "AI 스크립트 작성"
  카드 2: 아이콘 + "AI 음성 생성"
  카드 3: 아이콘 + "자동 모션 그래픽"
- 각 카드는 30프레임 간격으로 등장
- durationInFrames: 471
```

**씬 4 — 클로징:**
```
src/compositions/Scene4.tsx 파일을 만들어줘.

- 배경: 씬1과 동일한 어두운 그라디언트
- 중앙에 "지금 시작하기" 버튼 (파란색 #3b82f6, pulse 애니메이션)
- 버튼 아래 "techflow.io" (흰색, 28px)
- 배경에 미세한 particle 효과
- durationInFrames: 117
```

---

## Phase 5: 전체 조립 (15분)

```
src/MyVideo.tsx 파일을 만들어줘.

public/audio/metadata.json에서 각 씬 길이를 읽어서:
1. Scene1, Scene2, Scene3, Scene4를 TransitionSeries로 연결
2. 씬 사이 전환: fade 효과, 18프레임
3. 각 씬 오디오(scene-1.mp3 ~ scene-4.mp3)를 TransitionSeries 바깥 Sequence로 배치
4. public/audio/bgm.mp3를 배경음악으로 추가 (볼륨 0.1, loop)
5. Root.tsx에 이 컴포지션 등록 (id: "TechFlowVideo", 30fps)
```

---

## Phase 6: 최종 렌더링 (5분)

```bash
# Remotion Studio에서 미리보기 확인
npx remotion studio

# 최종 렌더링
npx remotion render src/index.ts TechFlowVideo output/techflow-final.mp4 \
  --codec h264 \
  --crf 18 \
  --concurrency 4
```

---

## 완성!

렌더링이 완료되면 `output/techflow-final.mp4`가 생성됩니다. 약 60초짜리 영상이며 파일 크기는 설정에 따라 30~80MB 사이입니다.

---

**다음:** [8장. 더 나아가기 →](../08-advanced/)
