import { getAccessToken } from "@/lib/auth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function withAuth(Component: any) {
  return function ProtectedComponent(props: any) {
    const router = useRouter();

    useEffect(() => {
      const token = getAccessToken();
      if (!token) {
        router.replace("/login");
      }
    }, []);

    return <Component {...props} />;
  };
}
