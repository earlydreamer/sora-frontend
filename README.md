# sora-frontend

**Sora** — "지금 출발하면 지각할까?"를 즉시 계산하고, 실제 지각 여부를 기록해 습관을 개선하는 모바일 PWA의 프론트엔드입니다.

> 연관 저장소: [earlydreamer/sora-backend](https://github.com/earlydreamer/sora-backend)

---

## 기술 스택

| 항목 | 선택 |
|---|---|
| 프레임워크 | Next.js 16 (App Router, 순수 CSR) |
| 스타일 | Tailwind CSS |
| 언어 | TypeScript |
| 배포 | Cloudflare Pages (정적 export) |
| 앱 배포 | PWA (추후 Capacitor 검토) |

## 핵심 제약

- **API Routes 없음** — `app/api/` 디렉터리 생성 금지. 모든 데이터 요청은 `lib/api.ts`를 통해 백엔드로.
- **순수 정적 export** — `next.config.ts`의 `output: "export"` 유지. 서버사이드 코드 작성 금지.
- **모든 상호작용 컴포넌트** — 파일 상단에 `"use client"` 선언 필수.

## 로컬 개발 환경

```bash
# 의존성 설치
npm install

# 환경변수 설정
cp .env.local.example .env.local
# .env.local의 NEXT_PUBLIC_API_BASE_URL 값 채우기 (기본: http://localhost:3000)

# 개발 서버 시작 (백엔드 서버도 함께 실행 필요)
npm run dev
```

## 화면 구조

| 경로 | 화면 | 주요 API |
|---|---|---|
| `/` | 홈 — "지금 출발하면 지각?" 버튼 | `GET /transit/eta` |
| `/result` | 결과 — 지각/정시 + 출발 기록 | `POST /departures` |
| `/routes` | 경로 설정 (최대 2개) | `GET/POST/PATCH/DELETE /routes` |
| `/history` | 기록 + 최근 7회 인사이트 | `GET /departures` |
| `/auth/login` | 로그인 | `POST /auth/login` |
| `/auth/register` | 회원가입 | `POST /auth/register` |

## 에이전트 작업 가이드

Claude와 Codex의 역할 분리, 디자인 원칙, gstack 운영 원칙은 [AGENTS.md](./AGENTS.md)를 참고합니다.

gstack 전역 설치·업그레이드 절차는 [docs/operations/gstack-global-setup.md](./docs/operations/gstack-global-setup.md)를 참고합니다.

---

## 개발 정책

- 커밋 메시지와 문서는 **한국어 우선**
- 인증 토큰은 `localStorage`의 `access_token` 키로 관리
- API 직접 호출 금지 — `lib/api.ts`의 함수만 사용
