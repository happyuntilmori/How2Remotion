---
sidebar_position: 2
---

# 장면 연결하기

여러 개의 씬을 하나의 영상으로 이어 붙이는 방법입니다. `<Series>`를 사용하면 프레임 오프셋을 수동 계산할 필요가 없습니다.

---

## Sequence vs Series

| 컴포넌트 | 역할 | 언제 쓰나 |
|----------|------|-----------|
| `<Sequence>` | 특정 프레임에서 시작하도록 지연 | 정밀한 타이밍 제어 |
| `<Series>` | 씬들을 순서대로 자동 연결 | 여러 씬 순차 배치 |

---

## Series로 씬 이어 붙이기

```tsx
import { Series } from 'remotion';

export const MyComposition = () => (
  <Series>
    {/* 각 씬의 durationInFrames만 지정하면 자동으로 이어집니다 */}
    <Series.Sequence durationInFrames={90}>
      <IntroScene />       {/* 0~89 프레임 */}
    </Series.Sequence>

    <Series.Sequence durationInFrames={120}>
      <MainScene />        {/* 90~209 프레임 */}
    </Series.Sequence>

    <Series.Sequence durationInFrames={60}>
      <OutroScene />       {/* 210~269 프레임 */}
    </Series.Sequence>
  </Series>
);
```

**Root.tsx에서 전체 길이 설정:**
```tsx
<Composition
  id="MyVideo"
  component={MyComposition}
  durationInFrames={90 + 120 + 60}  // 270프레임 = 9초
  fps={30}
  width={1920}
  height={1080}
/>
```

---

## 씬 순서 변경

**Codex 프롬프트:**
```
MainScene과 IntroScene의 순서를 바꿔줘.
전체 durationInFrames도 자동으로 재계산해줘.
```

---

## 씬 사이에 간격 추가

```tsx
<Series>
  <Series.Sequence durationInFrames={90}>
    <Scene1 />
  </Series.Sequence>

  {/* 30프레임(1초) 빈 간격 */}
  <Series.Sequence durationInFrames={30}>
    <BlackScreen />
  </Series.Sequence>

  <Series.Sequence durationInFrames={90}>
    <Scene2 />
  </Series.Sequence>
</Series>
```

---

## 트랜지션과 함께 사용할 때

`@remotion/transitions`의 `<TransitionSeries>`와 오디오를 함께 쓸 때는 반드시 **오디오를 TransitionSeries 바깥에 배치**해야 합니다. 상세 내용은 [오디오 동기화](../05-dubbing/audio-sync) 참조.

---

**다음:** [자막 넣기 →](./captions)
