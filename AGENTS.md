<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# 에이전트 작업 가이드 — sora-frontend

이 저장소에서 Claude와 Codex가 작업할 때 지켜야 하는 정책을 정의한다.
공통 정책 섹션은 sora-backend의 AGENTS.md와 동일하게 유지한다.

---

## 1. 역할 분리 〔공통〕

| 에이전트 | 담당 |
|---|---|
| **Claude** | 방향 결정, 범위 조정, UX 구조 검토, 정책 수립, gstack 기획 스킬 실행 |
| **Codex** | 화면 구현, 반복 수정, 버그 대응, 컴포넌트 작성 |

- 결정 권한이 불명확할 때는 Codex가 먼저 Claude에 확인하고 진행한다.
- 마감 단계에서는 `/review`와 `/qa`를 기본 점검 절차로 사용한다.

---

## 2. 커밋 규칙 〔공통〕

### 2-1. 언어
- 커밋 제목과 본문은 **한국어**로 작성한다.
- Co-authored-by 줄은 넣지 않는다.

### 2-2. 형식
```
<제목> (50자 내외)

- <변경 이유 또는 내용> (bullet, 필요한 경우만)
- <변경 이유 또는 내용>
```
- 제목만으로 의도가 충분히 전달되면 본문 생략 가능.
- 본문은 무엇을 바꿨는지보다 **왜** 바꿨는지 중심으로 작성한다.

### 2-3. 의미 단위 분할 원칙
- **하나의 커밋 = 하나의 의도.** 기능 추가, 버그 수정, 리팩토링, 문서 변경은 각각 별도 커밋.
- 예외: 초기 scaffold처럼 분리가 불가능한 경우에 한해 하나로 묶는다.
- 코드 변경과 문서 변경을 같은 커밋에 넣지 않는다 (scaffold 제외).

### 2-4. 자동화 환경에서의 준수
- Codex가 자율 작업 중에도 위 규칙을 동일하게 적용한다.
- 에이전트가 생성한 커밋이 이 규칙을 위반하면 rebase로 정정한 뒤 push한다.
- 자동화 도중 규칙 위반이 감지되면 작업을 중단하고 Claude에 보고한다.

---

## 3. 문서 구조 규칙 〔공통〕

### 3-1. 루트 파일
루트에는 아래 파일만 허용한다. 임의 md 파일을 루트에 추가하지 않는다.

| 파일 | 역할 |
|---|---|
| `README.md` | 프로젝트 소개, 개발 환경, 주요 구조 |
| `AGENTS.md` | 에이전트 작업 정책 (이 파일) |
| `CLAUDE.md` | Claude 전용 보조 지시 (필요 시) |

### 3-2. docs/ 디렉터리 구조
```
docs/
  operations/   ← 설치·운영·배포 절차 (영구 문서)
  decisions/    ← 아키텍처·기술 결정 기록 (ADR 형식)
  history/      ← 세션별 작업 기록 (누적)
```

### 3-3. 파일 네이밍
- 파일명은 **영어 kebab-case**로 작성한다. 한글 파일명 금지.
- 날짜 기반 파일: `YYYY-MM-DD-brief-slug.md`
- 영구 운영 문서: 날짜 없이 역할 중심 이름 (예: `gstack-global-setup.md`)

### 3-4. 문서 내용 언어
- 문서 내용은 **한국어**를 우선한다.
- 코드 블록, 명령어, 고유명사(패키지명 등)는 그대로 영어.

---

## 4. 현재 작업 컨텍스트 정책 〔공통〕

### 4-1. 목적
- `docs/current.md`는 **지금 이 저장소가 어떤 상태인지**를 항상 반영하는 단일 파일이다.
- 에이전트 교체·컨텍스트 재시작 시 이 파일 하나로 즉시 작업을 이어받을 수 있어야 한다.
- history(과거 기록)와 분리한다. current는 항상 "지금"만 담는다.

### 4-2. 위치
```
docs/current.md
```

### 4-3. 파일 형식
```md
# 현재 작업 컨텍스트

최종 업데이트: YYYY-MM-DD HH:MM
업데이트 주체: Claude / Codex

## 프로젝트 상태
<현재 단계를 한 줄로> (예: 프론트엔드 scaffold 완료, 화면 구현 대기 중)

## 활성 컨텍스트
<지금 이 시점에서 중요한 결정·제약·전제 조건 요약>

## 작업 체크리스트

### 진행 중
- [ ] <작업> (담당: Claude/Codex)

### 대기 중 (블로커 있음)
- [ ] <작업> — 블로커: <이유>

### 완료
- [x] <작업>
```

### 4-4. 업데이트 규칙
- **작업 시작 시**: 담당 에이전트가 파일을 읽고 컨텍스트를 파악한다.
- **작업 완료 시**: 체크리스트를 갱신하고, 프로젝트 상태 한 줄을 업데이트한 뒤 커밋한다.
- **방향 전환 시**: Claude가 활성 컨텍스트를 업데이트한다.
- current.md 갱신은 별도 커밋으로 분리하지 않고 해당 작업 커밋에 포함한다.

### 4-5. 에이전트 인수인계 절차
새 에이전트(또는 컨텍스트 재시작)가 작업을 이어받을 때:
1. `docs/current.md` 읽기
2. `docs/history/` 최신 파일 읽기 (필요 시)
3. `AGENTS.md` 정책 확인
4. 작업 시작

---

## 5. 작업 히스토리 정책 〔공통〕

### 4-1. 목적
- 세션 단위 작업 기록을 `docs/history/`에 남긴다.
- 에이전트 교체, 컨텍스트 재시작 시 히스토리 파일이 인수인계 역할을 한다.

### 4-2. 생성 시점
다음 중 하나에 해당할 때 히스토리 파일을 생성하거나 갱신한다.
- 기획·설계 단계 완료 (office-hours, eng-review, design-review 등)
- 구현 단위 완료 (모듈 구현, 화면 구현 등)
- 주요 결정 사항 확정 (기술 스택 변경, 정책 수립 등)

### 4-3. 파일 위치와 이름
```
docs/history/YYYY-MM-DD-<slug>.md
예: docs/history/2026-03-30-frontend-scaffold.md
```

### 4-4. 파일 형식
```md
# <작업 제목>

날짜: YYYY-MM-DD
작업자: Claude / Codex / 혼합

## 작업 범위
<무엇을 했는지 한 줄 요약>

## 변경 내용
- <항목>

## 결정 사항
- <이번 세션에서 확정된 결정>

## 다음 스텝
- <미완료 항목 또는 이어서 할 것>
```

### 4-5. gstack 프로젝트 파일과의 관계
- `~/.gstack/projects/`의 파일은 **기획·리뷰 단계의 산출물**이다.
- 실행 기록(구현 완료, 결정 확정)은 저장소의 `docs/history/`에 남긴다.
- 중복 기록보다 역할 구분이 중요하다: gstack = 계획, history = 실행 결과.

---

## 6. 자동화 계약 〔공통〕

에이전트가 자율 작업(하네스 모드) 중에도 반드시 지켜야 하는 규칙이다.
이 규칙은 사람의 명시적 지시 없이는 변경할 수 없다.

### 5-1. 절대 금지
- `.env`, `.env.local` 파일 커밋
- `node_modules/`, `.next/`, `out/` 커밋
- 아키텍처 변경(신규 라이브러리 도입, 라우팅 구조 변경, CSR 원칙 위반)을 Claude 승인 없이 진행
- `app/api/` 디렉터리 생성 (CSR 원칙 위반)
- 커밋 규칙(섹션 2)을 위반한 커밋 생성
- 루트에 임의 md 파일 추가

### 5-2. 커밋 전 필수 확인
- 빌드 통과 (`npm run build`)
- 타입 에러 없음 (`npx tsc --noEmit`)
- 린트 통과 (`npm run lint`)

### 5-3. 불확실할 때의 행동 원칙
- 범위가 애매하면 **작게 실행하고 Claude에 보고**한다.
- 삭제·덮어쓰기보다 추가를 우선한다.
- 확신 없는 아키텍처 결정은 TODO 주석으로 표시하고 멈춘다.

---

## 7. gstack 운영 원칙 〔공통〕

- 전역 설치 기준 경로: `~/.claude/skills/gstack`
- repo-local skill 설치 금지
- 설치·업그레이드 절차: [docs/operations/gstack-global-setup.md](./docs/operations/gstack-global-setup.md)

---

## 8. 프론트엔드 저장소 전용 규칙

### 기술 제약
- **순수 CSR** — `app/api/` 디렉터리 생성 금지. 모든 데이터 요청은 `lib/api.ts` 경유.
- **정적 export** — `next.config.ts`의 `output: "export"` 유지 필수.
- **Cloudflare Pages** — Node.js API 사용 코드 작성 금지. `next/headers`, `cookies()` 등 서버 API 금지.
- **`"use client"` 필수** — 상태·이벤트를 사용하는 모든 컴포넌트에 선언.

### 인증
- 토큰: `localStorage`의 `access_token` 키, Bearer 방식.
- API 요청: `lib/api.ts`의 `request()` 함수만 사용. 직접 `fetch` 호출 금지.

### 디자인 원칙 (ADHD 타겟)
- 탭 후 200ms 내 버튼 상태 변화
- 화면당 Primary CTA 1개
- 결과 화면: 지각/정시 대형 텍스트 최상단
- 텍스트 최소화, 시각적 단서 우선

### 연관 저장소
- 백엔드: [earlydreamer/sora-backend](https://github.com/earlydreamer/sora-backend)
