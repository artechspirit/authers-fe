export function setAccessToken(token: string) {
  localStorage.setItem("accessToken", token);
}

export function getAccessToken(): string | null {
  return localStorage.getItem("accessToken");
}

export function clearAccessToken(): void {
  localStorage.removeItem("accessToken");
}
