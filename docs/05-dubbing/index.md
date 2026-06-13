---
sidebar_position: 1
---

# 5장. AI 더빙 입히기

## 이 챕터의 목표

3장에서 만든 모션 그래픽 영상에 AI 목소리를 추가합니다. 텍스트 스크립트를 작성하면 ElevenLabs가 자연스러운 한국어 음성을 생성하고, 이를 Remotion 영상과 정확히 동기화합니다.

---

## 전체 더빙 워크플로우

```
1. 씬별 스크립트 작성 (scenes.json)
        ↓
2. ElevenLabs로 MP3 파일 자동 생성
        ↓
3. 오디오 길이 측정
        ↓
4. Remotion에서 씬 길이를 오디오에 맞게 조정
        ↓
5. <Audio> 컴포넌트로 영상에 삽입
```

---

## 이 챕터의 구성

| 페이지 | 내용 |
|--------|------|
| [TTS 기초](./tts-basics) | TTS가 Remotion과 연동되는 방식 이해 |
| [ElevenLabs 설정](./elevenlabs-setup) | API 키 설정, scenes.json 작성, 파일 생성 |
| [오디오 동기화](./audio-sync) | `<Audio>` 배치, 프레임 계산, 지연 처리 |
| [Codex로 더빙 자동화](./codex-dubbing) | Codex 한 프롬프트로 전체 더빙 통합 |

---

## 이 챕터를 마치면

- scenes.json 형식으로 씬별 스크립트를 작성할 수 있습니다
- ElevenLabs 스킬로 MP3 파일을 자동 생성할 수 있습니다
- Remotion에서 오디오와 영상을 프레임 단위로 동기화할 수 있습니다
- Codex 프롬프트 하나로 더빙 통합을 자동화할 수 있습니다
