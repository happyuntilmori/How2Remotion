---
sidebar_position: 5
---

# 최종 렌더링

완성된 컴포지션을 MP4로 내보내는 방법입니다.

---

## 기본 렌더링 명령어

```bash
npx remotion render src/index.ts MyVideo output.mp4
```

- `src/index.ts` — 프로젝트 진입 파일
- `MyVideo` — 렌더링할 컴포지션 ID (Root.tsx에 등록된 id)
- `output.mp4` — 출력 파일 경로

---

## 용도별 렌더링 프리셋

### YouTube (1080p, H.264)
```bash
npx remotion render src/index.ts MyVideo youtube-output.mp4 \
  --codec h264 \
  --crf 18 \
  --scale 1
```

### Instagram Reels (9:16 세로, 1080x1920)
Root.tsx에서 컴포지션 크기를 변경하거나, 세로형 컴포지션을 별도로 등록합니다.
```bash
npx remotion render src/index.ts MyVideoVertical instagram.mp4 \
  --codec h264 \
  --crf 23
```

### 고품질 마스터본
```bash
npx remotion render src/index.ts MyVideo master.mp4 \
  --codec h264 \
  --crf 12        # 낮을수록 고품질 (파일 크기 증가)
  --scale 2       # 2배 해상도 (4K)
```

### GIF (소셜 미디어용 짧은 루프)
```bash
npx remotion render src/index.ts MyVideo output.gif \
  --codec gif \
  --scale 0.5     # 파일 크기 축소
```

---

## CRF 값 가이드

| CRF | 품질 | 용도 |
|-----|------|------|
| 12~15 | 최고 품질 | 마스터본 보관 |
| 18~20 | 높은 품질 | YouTube, Vimeo |
| 23~25 | 중간 품질 | 웹 임베딩, 소셜 |
| 28~30 | 낮은 품질 | 미리보기, 초안 |

---

## 렌더링 속도 높이기

```bash
# CPU 코어 최대 활용
npx remotion render src/index.ts MyVideo output.mp4 \
  --concurrency 8   # 병렬 렌더링 스레드 수 (코어 수와 동일하게)
```

---

## Codex 프롬프트

```
현재 프로젝트를 YouTube용과 Instagram Reels용 두 가지로
렌더링하는 package.json 스크립트를 추가해줘.

YouTube: 1920x1080, h264, crf 18
Instagram: 1080x1920 세로 컴포지션 별도 등록, h264, crf 23
```

---

**다음:** [7장. 실전 프로젝트 →](../07-project/)
