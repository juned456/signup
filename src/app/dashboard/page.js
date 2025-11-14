// /app/dashboard/page.js
import { requireUser } from "@/lib/auth";
import LogoutButton from "@/components/auth/signout";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";

export default async function Dashboard() {
  const user = await requireUser(); // redirects if not logged in

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <Card className="w-full max-w-xl shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-bold">Dashboard</CardTitle>
        </CardHeader>

        <CardContent className="space-y-4">
          <p className="text-lg">
            Welcome <span className="font-semibold">{user.name}</span> 👋
          </p>

          <div className="pt-4">
            <LogoutButton />
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
