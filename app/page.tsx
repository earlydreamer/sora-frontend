"use client";

// TODO: 홈 화면 — 지금 출발하면 지각?
// - 경로 탭 (1~2개)
// - "지금 출발하면 지각?" 버튼 → GET /transit/eta → /result로 이동
// - 미기록 세션 배너 → GET /departures?status=pending
// - 경로 미설정 시 → /routes로 안내
//
// 구현: Codex 위임 대상

export default function HomePage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-6">
      <h1 className="text-2xl font-bold">Sora</h1>
      <p className="text-zinc-500">지금 출발하면 지각?</p>
      {/* TODO: 구현 */}
    </main>
  );
}
