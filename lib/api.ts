const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:3000";

function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("access_token");
}

async function request<T>(
  path: string,
  options: RequestInit = {}
): Promise<T> {
  const token = getToken();
  const res = await fetch(`${BASE_URL}${path}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      ...options.headers,
    },
  });

  if (!res.ok) {
    const body = await res.json().catch(() => ({}));
    throw new Error((body as { message?: string }).message ?? res.statusText);
  }

  return res.json() as Promise<T>;
}

// Auth
export const authApi = {
  register: (email: string, password: string) =>
    request<{ access_token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
  login: (email: string, password: string) =>
    request<{ access_token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }),
};

// Routes
export interface Route {
  id: string;
  name: string;
  origin: string;
  destination: string;
  targetArrivalTime: string;
  bufferMinutes: number;
  isDefault: boolean;
}

export const routesApi = {
  list: () => request<Route[]>("/routes"),
  create: (data: Omit<Route, "id" | "isDefault"> & { isDefault?: boolean }) =>
    request<Route>("/routes", { method: "POST", body: JSON.stringify(data) }),
  update: (id: string, data: Partial<Route>) =>
    request<Route>(`/routes/${id}`, {
      method: "PATCH",
      body: JSON.stringify(data),
    }),
  remove: (id: string) =>
    request<void>(`/routes/${id}`, { method: "DELETE" }),
};

// Transit
export interface EtaResult {
  routeId: string;
  routeName: string;
  etaMinutes: number;
  predictedArrivalAt: string;
  targetArrivalTime: string;
  isLate: boolean;
  safeDepartureAt: string;
  bufferMinutes: number;
}

export const transitApi = {
  getEta: (routeId?: string) =>
    request<EtaResult>(
      `/transit/eta${routeId ? `?routeId=${routeId}` : ""}`
    ),
};

// Departures
export interface DepartureRecord {
  id: string;
  routeId: string;
  departedAt: string;
  predictedArrivalAt: string;
  predictedLate: boolean;
  actualLate: boolean | null;
  tmapEtaMinutes: number;
  route: { name: string };
}

export const departuresApi = {
  list: () => request<DepartureRecord[]>("/departures"),
  pending: () => request<DepartureRecord[]>("/departures?status=pending"),
  create: (data: {
    routeId: string;
    predictedArrivalAt: string;
    departedAt: string;
  }) =>
    request<DepartureRecord>("/departures", {
      method: "POST",
      body: JSON.stringify(data),
    }),
  update: (id: string, actualLate: boolean) =>
    request<DepartureRecord>(`/departures/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ actualLate }),
    }),
};
