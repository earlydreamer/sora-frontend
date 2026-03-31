# start-harness 소비 계약 정렬

날짜: 2026-03-31
작업자: Codex

## 작업 범위
frontend 저장소의 handoff harness 문서를 backend와 같은 thin trigger + downstream ownership 해석으로 정렬했다.

## 변경 내용
- `docs/operations/agent-handoff-harness.md`에 최소 부트 문맥, tracked-task 기준 GitHub gate, downstream Verify/Correct ownership, tmux helper 위임 원칙을 보강했다.
- `docs/current.md`와 새 task spec을 추가해 별도 issue/branch/worktree 기준 tracked task로 작업을 분리했다.
- `.gitignore`에 `.orchestrator/`를 추가해 향후 런타임 산출물이 작업 디렉터리를 오염시키지 않도록 했다.
- backend 실검증에서 확인한 worker별 `CODEX_HOME` runtime isolation 계약을 frontend 문서에도 후속 도입 기준으로 반영했다.

## 결정 사항
- frontend도 backend와 동일하게 `/start-harness`를 얇은 트리거로 해석한다.
- frontend `main` 기준 worktree에는 backend처럼 완성된 tmux helper 집합이 아직 없으므로, 이번 반영 범위는 문서 계약 정렬에 집중했다.
- 향후 frontend에 tmux helper를 도입하면 backend와 같은 worker별 Codex runtime isolation 규칙을 그대로 따른다.
- 교차 저장소 작업은 하나의 통합 spec이 아니라 저장소별 issue/branch/worktree로 분리한다.

## 다음 스텝
- frontend 변경을 한국어 커밋과 PR로 정리한다.
- 이후 실제 화면 구현 task는 백엔드 서버 기동 이후 별도 활성 스펙으로 시작한다.
