"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Button from "@/components/Button";
import api from "@/utils/api";
import withAuth from "@/components/withAuth";
import { clearAccessToken, setAccessToken } from "@/lib/auth";

function Home() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await api.get("/user/profile");
        setUser(res.data.user);
      } catch {
        router.push("/login");
      }
    };

    fetchProfile();
  }, [router]);

  const handleLogout = async () => {
    try {
      const res = await api.post("/auth/logout");

      if (res.status === 200) {
        router.push("/login");
        clearAccessToken(); // Clear the access token from the browser
      }
    } catch (error) {
      console.error("error", error);
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md rounded-lg bg-white p-8 shadow-lg">
        <h2 className="mb-6 text-center text-2xl font-bold text-gray-800">
          Profile
        </h2>
        <p className="mb-2">
          User ID: <span className="font-mono">{user?.userId}</span>
        </p>
        <p className="mb-6">
          Email: <span className="font-mono">{user?.email}</span>
        </p>
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </main>
  );
}

export default withAuth(Home); // Wrap the Home component with withAuth to protect it
