import { env } from "@/env";
import { db } from "@/server/db";
import { users } from "@/server/db/schema";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  const { getUser } = getKindeServerSession();
  const user = await getUser();

  if (!user || user == null || !user.id)
    throw new Error("something went wrong with authentication");

  const dbUser = await db
    .select()
    .from(users)
    .where(eq(users.kindeId, user.id));

  if (!dbUser.length) {
    await db.insert(users).values({
      kindeId: user.id,
      firstName: user.given_name ?? "",
      lastName: user.family_name ?? "",
      email: user.email ?? "",
      photo: user.picture ?? "",
    });
  }

  return NextResponse.redirect(env.NEXT_PUBLIC_APP_URL);
}

export const dynamic = "force-dynamic";
