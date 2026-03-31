# Codex 위임 작업

## Codex 위임 작업

**상태**: done
**출처**: direct-to-codex intake
**목표**: frontend 저장소의 handoff harness 문서를 backend와 같은 thin trigger + downstream ownership 구조로 정렬한다.

**배경**:
- backend에서 `start-harness`의 역할을 얇은 트리거 오케스트레이터로 재정의하고, mode-aware GitHub gate와 downstream Verify/Correct ownership을 명시했다.
- frontend 저장소도 같은 `start-harness`를 소비하지만, 저장소 문서가 아직 그 구조를 같은 수준으로 설명하지 않는다.
- frontend `main` 기준 작업공간에는 backend처럼 완성된 `scripts/orchestrator/` helper 집합이 아직 없으므로, 이번 반영 범위는 문서 계약 정렬에 집중한다.
- 현재 frontend 작업 디렉터리는 다른 변경이 섞여 있어, 별도 worktree와 별도 issue/branch에서 이 작업만 분리해 진행한다.

**수정 대상 파일**:
- `docs/current.md` — 현재 frontend 작업 상태판을 새 tracked task 기준으로 갱신
- `docs/operations/agent-handoff-harness.md` — thin trigger, 지연 로드 문맥, tracked-task GitHub gate, downstream ownership 반영

**비범위**:
- frontend UI 구현
- 글로벌 start-harness skill 재수정
- backend와 frontend를 하나의 통합 스펙으로 묶는 작업

**완료 조건**:
- [x] `npm run build`
- [x] `npx tsc --noEmit`
- [x] `npm run lint`
- [x] frontend handoff 문서가 thin trigger + downstream ownership 구조로 읽힌다.

**Claude 재호출 조건**:
- frontend 저장소에 새로운 하네스 상태 이름을 추가해야 하는 경우
- tmux 전용 영구 운영 문서를 새로 추가해야 하는 경우
- dirty worktree의 기존 변경과 충돌해 범위를 분리할 수 없는 경우

**참고**:
- GitHub issue: #2
- branch: `codex/2-start-harness-trigger-hardening`
- worktree: `.worktrees/codex-2-start-harness-trigger-hardening`
