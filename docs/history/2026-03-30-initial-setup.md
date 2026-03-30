# 프론트엔드 초기 설정 및 scaffold

날짜: 2026-03-30
작업자: Claude

## 작업 범위

디자인 리뷰(design-review) → Next.js scaffold + 화면 구조 + 정책 문서화까지 완료.

## 변경 내용

- Next.js 16 App Router scaffold (TypeScript, Tailwind CSS)
- Cloudflare Pages 정적 export 설정 (`output: "export"`, `trailingSlash`)
- PWA manifest.json (standalone, 한국어, 다크 테마 컬러)
- 6개 화면 라우트 골격 생성 (/, /result, /routes, /history, /auth/login, /auth/register)
- lib/api.ts: 백엔드 API 클라이언트 전체 (Auth, Routes, Transit, Departures)
- README 재작성 (프로젝트 개요, 화면 구조, 연관 저장소 링크)
- AGENTS.md 정책 수립 (커밋 규칙, 문서 구조, 히스토리, 자동화 계약)
- docs/operations/ 추가 (gstack-global-setup, gstack-repo-note-pattern)

## 결정 사항

- 프레임워크: Next.js 순수 CSR (API Routes 없음, 정적 export)
- 배포: Cloudflare Pages
- 인증: localStorage access_token Bearer
- API 호출: lib/api.ts 단일 진입점 원칙
- 주소 입력: 수동 텍스트 (Phase 1 본인 사용)
- 지각 기록 트리거: 앱 오픈 시 미기록 배너
- 화면당 CTA 1개 (ADHD 타겟 디자인 원칙)

## 다음 스텝

- 백엔드 서버 기동 확인 후 각 page.tsx TODO 구현 (Codex 위임 가능)
- lib/api.ts 기반으로 useAuth 훅, 인증 라우트 가드 구현
- 홈 화면: 경로 탭 + ETA 버튼 + 미기록 배너
- 결과 화면: 지각/정시 대형 텍스트 + 출발 기록 버튼
- Cloudflare Pages 배포 설정
