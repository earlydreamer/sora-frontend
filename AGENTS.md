<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 에이전트 작업 가이드 (sora-frontend)

## 역할 분리

- 큰 방향 결정, 범위 조정, 구조 검토는 Claude가 맡는다.
- 구현, 반복 수정, 테스트, 디버깅은 Codex가 맡는다.

## 핵심 제약

- **순수 CSR** — API Routes 없음. `app/api/` 디렉터리 생성 금지.
- **정적 export** — `next.config.ts`의 `output: "export"` 유지. 동적 라우트에는 `generateStaticParams` 필요.
- **Cloudflare Pages 배포** — Node.js API 미지원. 서버 사이드 코드 작성 금지.
- **`"use client"` 필수** — 모든 상호작용 컴포넌트에 선언.
- **인증** — `localStorage`의 `access_token` Bearer 토큰. `lib/api.ts`의 `request()` 함수 사용.

## 화면 구조

| 경로 | 화면 |
|---|---|
| `/` | 홈 — "지금 출발하면 지각?" 버튼 |
| `/result` | 결과 — 지각/정시 + 출발 기록 |
| `/routes` | 경로 설정 (최대 2개) |
| `/history` | 히스토리 + 7회 인사이트 |
| `/auth/login` | 로그인 |
| `/auth/register` | 회원가입 |

## API 연동

`lib/api.ts`의 함수만 사용. 직접 `fetch` 호출 금지.

## 디자인 원칙 (ADHD 타겟)

- 탭 후 200ms 내 버튼 상태 변화
- 화면당 Primary CTA 1개
- 결과 화면: 지각/정시 대형 텍스트 최상단
- 텍스트 최소화, 시각적 단서 우선

## gstack 운영

- 전역 gstack 기준 경로: `~/.claude/skills/gstack`
- 커밋 메시지와 문서는 한국어 우선
