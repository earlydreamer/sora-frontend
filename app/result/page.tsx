"use client";

// TODO: 결과 화면
// - 지각 / 정시 대형 텍스트 (빨강/초록)
// - 예상 도착 시각, 목표 도착, 차이
// - 안전 출발 시각 (버퍼 포함)
// - "지금 출발합니다" 버튼 → POST /departures → 홈으로
//
// searchParams로 ETA 결과 수신 (또는 sessionStorage 경유)
// 구현: Codex 위임 대상

export default function ResultPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen p-6 gap-4">
      <p className="text-zinc-500">결과 화면 — 구현 예정</p>
    </main>
  );
}
