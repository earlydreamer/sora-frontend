# 현재 작업 컨텍스트

최종 업데이트: 2026-04-01 00:16
업데이트 주체: Codex

## 프로젝트 상태

프론트엔드 scaffold 완료 상태를 유지하면서 `start-harness` 소비 계약을 backend와 같은 해석으로 정렬하는 tracked task를 완료했다.

## 활성 컨텍스트

- **스택**: Next.js 16 App Router, 순수 CSR, Tailwind CSS, Cloudflare Pages 정적 export
- **제약**: `app/api/` 금지, `output: "export"` 유지, `"use client"` 필수
- **인증**: `localStorage`의 `access_token` Bearer. `lib/api.ts`의 `request()` 경유.
- **API 클라이언트**: `lib/api.ts`에 Auth/Routes/Transit/Departures 전부 작성됨.
- **화면 골격**: 6개 라우트 모두 생성됨 (/, /result, /routes, /history, /auth/login, /auth/register). 내용은 TODO.
- **백엔드 URL**: `.env.local`의 `NEXT_PUBLIC_API_BASE_URL`. 기본값 `http://localhost:3000`.
- **PWA**: manifest.json 작성 완료. 아이콘(icon-192.png, icon-512.png) 미생성.
- **운영 하네스**: `docs/operations/agent-handoff-harness.md`, `docs/operations/agent-handoff-harness-overview.md`, `docs/tasks/`, `AGENTS.md`에 frontend 저장소용 handoff harness 규칙을 반영했다.
- **start-harness 오케스트레이션**: `/start-harness`는 전달된 명령과 프롬프트를 기준으로 superpowers, gstack, repo-local workflow, 기타 지원 skill/명령 중 가장 적절한 흐름을 먼저 고른 뒤 하네스를 이어간다.
- **최근 완료 task**: backend에서 안정화한 thin trigger, 지연 로드 문맥, tracked-task GitHub gate, downstream ownership 구조를 frontend 문서에 반영했다.
- **tmux future contract**: backend live 검증 결과를 기준으로, frontend에 tmux helper를 도입할 때도 Codex worker별 격리 `CODEX_HOME` runtime을 사용해야 한다.
- **리뷰 루프 제한**: 같은 파일/같은 task에서 reviewer 수정 루프는 최대 2회까지만 반복하고, 이후에는 blocking 이슈만 추가 수정한 뒤 다음 단계로 진행한다.
- **GitHub 파이프라인**: 신규 작업은 `gh` 기반 한국어 issue 생성 → `codex/<issue-number>-brief-slug` 브랜치 작업 → 한국어 PR → `main` merge → issue/PR/브랜치 정리 순서로 진행한다.

## 하네스 상태
- 상태: done
- 현재 담당: 사람
- 활성 스펙: 없음
- Claude 재판단 필요: 없음

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
- [x] lib/api.ts EtaResult.safeDepatureAt → safeDepartureAt 오타 수정
- [x] handoff harness 운영 절차 문서 추가
- [x] AGENTS에 handoff harness 게이트와 리뷰 루프 제한 반영
- [x] `docs/tasks/` handoff 템플릿 및 사용 규칙 추가
- [x] GitHub issue/PR 기반 작업 파이프라인 문서화
- [x] `/start-harness`가 superpowers/gstack/지원 skill 전체를 대상으로 가장 적절한 흐름을 먼저 선택하도록 오케스트레이션 규칙 강화
- [x] frontend handoff harness 문서를 thin trigger + downstream ownership 구조로 정렬

## 화면 구현 순서 (권장)

백엔드 연동 가능해지면 아래 순서로 진행:
1. `/auth/login`, `/auth/register` — 토큰 저장 루프 먼저 검증
2. `/routes` — 경로 등록 없이는 홈이 동작하지 않음
3. `/` (홈) — ETA 조회 + 미기록 배너
4. `/result` — 출발 기록 버튼
5. `/history` — 마지막 (데이터 누적 필요)
