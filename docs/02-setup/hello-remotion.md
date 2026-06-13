---
sidebar_position: 5
---

# 첫 번째 영상 렌더링

## 목표

이 페이지를 마치면 Codex가 코드를 수정하고, 그 결과를 MP4 파일로 렌더링하는 전체 흐름을 경험하게 됩니다.

---

## 1. Remotion Studio 열기

프로젝트 디렉토리에서 Studio를 실행합니다.

```bash
cd my-video
npx remotion studio
```

브라우저에서 `http://localhost:3000`이 열립니다. 기본 "Hello World" 씬이 보이면 준비가 된 것입니다.

---

## 2. Codex로 코드 수정하기

Studio는 그대로 열어 두고, **새 터미널 탭**을 열어 프로젝트 디렉토리에서 Codex를 실행합니다.

```bash
codex "MyComposition 컴포넌트에서 텍스트를 흰색으로 바꾸고 배경을 파란색(#0066CC)으로 만들어줘"
```

Codex가 `src/Composition.tsx`를 읽고 수정할 것입니다. 수정 전 코드와 수정 후 코드의 차이(diff)를 보여주고 적용할지 묻습니다. `y`를 입력해 승인합니다.

```
  Apply changes to src/Composition.tsx? (y/N) y
  ✓ Changes applied
```

Studio 브라우저 탭으로 전환하면 배경색이 파란색으로 바뀐 것을 확인할 수 있습니다.

---

## 3. 추가 수정: 텍스트 내용 바꾸기

한 단계 더 나아가 텍스트 내용도 바꿔봅니다.

```bash
codex "텍스트를 'TechFlow — 업무를 자동화하다'로 바꾸고 폰트 크기를 64px로 설정해줘"
```

수정이 적용되면 Studio에서 새 텍스트가 표시됩니다.

---

## 4. 렌더링 실행

Studio를 닫고 (또는 Studio를 유지한 채) 터미널에서 렌더링 명령어를 실행합니다.

```bash
npx remotion render src/index.ts MyComposition output.mp4
```

명령어 구조:
- `src/index.ts`: 엔트리포인트
- `MyComposition`: `Root.tsx`에 등록한 컴포지션 ID
- `output.mp4`: 출력 파일명

렌더링 중 진행상황이 표시됩니다.

```
Rendering MyComposition...
█████████████████████░░░░░░░░░  70% (105/150 frames)
```

완료되면 다음 메시지가 나타납니다.

```
✓ Rendering done!
  Output: output.mp4
  Duration: 00:00:05
  Size: 1.2 MB
```

---

## 5. 결과 확인

`output.mp4` 파일을 열어 확인합니다. 파란 배경에 흰 텍스트가 페이드인되는 5초짜리 영상이 나타나야 합니다.

---

## 문제 해결

### FFmpeg를 찾을 수 없다는 오류

```
Error: FFmpeg was not found
```

FFmpeg가 설치되지 않았거나 PATH에 등록되지 않은 경우입니다.

```bash
# macOS
brew install ffmpeg

# Windows
winget install ffmpeg
# 이후 터미널 재시작
```

### 렌더링이 시작되지 않는 경우

`src/index.ts`에서 `registerRoot()`가 올바르게 호출되는지 확인합니다.

```tsx
import { registerRoot } from 'remotion';
import { RemotionRoot } from './Root';

registerRoot(RemotionRoot);
```

### Codex가 파일을 수정하지 않는 경우

API 키가 설정되지 않았거나 만료된 경우입니다. 다음으로 확인합니다.

```bash
echo $OPENAI_API_KEY  # 값이 출력되어야 합니다
codex "1 + 1은?"      # 응답이 오는지 확인
```

---

## 완료

첫 번째 영상 렌더링을 마쳤습니다. 이제 Codex + Remotion 워크플로우의 기본 사이클을 경험했습니다.

- Codex에게 자연어로 요청
- 코드가 자동 수정됨
- Studio에서 실시간 미리보기
- `npx remotion render`로 MP4 출력

다음 챕터에서는 이 흐름을 기반으로 본격적인 모션 그래픽을 만들겠습니다.

---

[3장. Codex로 모션 그래픽 만들기 →](../03-codex-motion/)
