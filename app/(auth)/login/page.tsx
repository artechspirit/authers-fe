"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Input from "@/components/Input";
import Button from "@/components/Button";
import api from "@/utils/api";
import { setAccessToken } from "@/lib/auth";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/auth/login", { email, password });
      setAccessToken(res.data.accessToken);
      router.push("/");
    } catch (err: any) {
      setError(err.response?.data?.message || "Login gagal");
    }
  };

  const handleRegister = () => {
    router.push("/register");
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <Input
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            error={error && !email ? error : ""}
          />
          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            error={error && !password ? error : ""}
          />
          {error && <p className="mb-4 text-center text-red-600">{error}</p>}
          <Button type="submit">Login</Button>
        </form>
        <Button className="mt-2" onClick={handleRegister}>
          Register
        </Button>
      </div>
    </main>
  );
}
