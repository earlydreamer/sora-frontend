# 현재 작업 컨텍스트

최종 업데이트: 2026-03-30
업데이트 주체: Claude

## 프로젝트 상태

프론트엔드 scaffold 완료. 백엔드 서버 기동 후 각 화면 구현 시작 가능.

## 활성 컨텍스트

- **스택**: Next.js 16 App Router, 순수 CSR, Tailwind CSS, Cloudflare Pages 정적 export
- **제약**: `app/api/` 금지, `output: "export"` 유지, `"use client"` 필수
- **인증**: `localStorage`의 `access_token` Bearer. `lib/api.ts`의 `request()` 경유.
- **API 클라이언트**: `lib/api.ts`에 Auth/Routes/Transit/Departures 전부 작성됨.
- **화면 골격**: 6개 라우트 모두 생성됨 (/, /result, /routes, /history, /auth/login, /auth/register). 내용은 TODO.
- **백엔드 URL**: `.env.local`의 `NEXT_PUBLIC_API_BASE_URL`. 기본값 `http://localhost:3000`.
- **PWA**: manifest.json 작성 완료. 아이콘(icon-192.png, icon-512.png) 미생성.

## 작업 체크리스트

### 진행 중
- [ ] 백엔드 로컬 서버 기동 확인 (담당: 사람 — Supabase DB 연결 후)

### 대기 중 (블로커 있음)
- [ ] 각 page.tsx 화면 구현 — 블로커: 백엔드 서버 기동 선행 권장
- [ ] useAuth 훅 + 인증 라우트 가드 — 블로커: 화면 구현과 병행 가능
- [ ] Cloudflare Pages 배포 설정 — 블로커: 화면 구현 완료 후
- [ ] PWA 아이콘 생성 (icon-192.png, icon-512.png) — 블로커: 없음, 언제든 가능

### 완료
- [x] Next.js 16 App Router scaffold
- [x] Cloudflare Pages 정적 export 설정 (output, trailingSlash, images.unoptimized)
- [x] PWA manifest.json
- [x] 6개 화면 라우트 골격 생성
- [x] lib/api.ts: 백엔드 API 클라이언트 전체
- [x] app/layout.tsx: PWA 메타태그, 한국어, 폰트 정리
- [x] README, AGENTS.md, docs/ 문서 체계 수립

## 화면 구현 순서 (권장)

백엔드 연동 가능해지면 아래 순서로 진행:
1. `/auth/login`, `/auth/register` — 토큰 저장 루프 먼저 검증
2. `/routes` — 경로 등록 없이는 홈이 동작하지 않음
3. `/` (홈) — ETA 조회 + 미기록 배너
4. `/result` — 출발 기록 버튼
5. `/history` — 마지막 (데이터 누적 필요)
