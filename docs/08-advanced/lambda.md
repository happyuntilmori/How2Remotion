---
sidebar_position: 3
---

# Lambda로 클라우드 렌더링

로컬 환경에서 긴 영상을 렌더링하면 시간이 오래 걸립니다. AWS Lambda를 이용하면 병렬로 빠르게 처리할 수 있습니다.

---

## 언제 Lambda를 써야 하나

| 상황 | 권장 방식 |
|------|-----------|
| 5분 미만 영상, 개발·테스트 | 로컬 렌더링 |
| 5분 이상 영상 | Lambda |
| CI/CD 파이프라인에서 자동 렌더링 | Lambda |
| 여러 영상을 동시에 렌더링 | Lambda |

---

## 설치

```bash
npm install @remotion/lambda
```

---

## AWS 설정 (최초 1회)

### 1. IAM 사용자 생성 및 권한 부여
AWS Console → IAM → 사용자 생성 → `AdministratorAccess` 권한 부여 (테스트용)

`.env.local`에 추가:
```bash
AWS_ACCESS_KEY_ID=your_access_key
AWS_SECRET_ACCESS_KEY=your_secret_key
AWS_REGION=ap-northeast-2  # 서울 리전
```

### 2. Lambda 함수 배포
```bash
npx remotion lambda functions deploy \
  --memory 3008 \
  --disk 10240 \
  --timeout 240
```

### 3. S3 사이트 배포
```bash
npx remotion lambda sites create \
  --site-name techflow-video \
  src/index.ts
```

---

## Lambda로 렌더링

```bash
npx remotion lambda render \
  --site-name techflow-video \
  --composition MyVideo \
  --output-bucket my-render-output
```

로컬 렌더링 대비 5~10배 빠릅니다.

---

## Codex로 Lambda 렌더링 스크립트 자동화

```
Lambda 렌더링을 Node.js 스크립트로 만들어줘.

조건:
- @remotion/lambda의 renderMediaOnLambda() 함수 사용
- 환경변수에서 AWS 자격증명, 버킷명, 사이트명 읽기
- 렌더링 완료 후 S3 URL 출력
- 오류 발생 시 재시도 1회
```

---

:::tip 비용 참고
Lambda 렌더링은 실행 시간(초)에 따라 요금이 부과됩니다. 30초짜리 1080p 영상 렌더링은 약 $0.05~$0.15 수준입니다.
:::

---

이것으로 **How2Remotion** 블로그의 모든 챕터를 마칩니다.

[처음으로 →](/)
