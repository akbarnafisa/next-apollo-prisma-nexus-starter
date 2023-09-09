import prisma from "@/lib/api/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest, response: NextResponse) {
  const { email, secret } = await request.json();

  if (secret !== process.env.AUTH0_HOOK_SECRET) {
    return new Response(`You must provide the secret 🤫`, {
      status: 403,
    });
  }

  console.log("asoi", {
    email,
    secret,
  });
  if (email) {
    return NextResponse.json({
      message: `User with email: ${email} has been created successfully!`
    }, {
      status: 200,
    })
  }
}

export async function GET(request: NextRequest, response: NextResponse) {
  return new Response(`get response`, {
    status: 200,
  });
}
