// src/app/api/auth/signup/route.js
import { NextResponse } from "next/server";
import { Pool } from "pg";
import bcrypt from "bcryptjs";
import { signupSchema } from "@/lib/validations_zod/auth";

const pool = new Pool({ connectionString: process.env.DATABASE_URL });

export async function POST(req) {
  try {
    const body = await req.json();
    const parsed = signupSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { error: parsed.error.errors[0].message },
        { status: 400 }
      );
    }

    const { name, email, mobile, password } = parsed.data;

    const emailLower = email.toLowerCase();
    const mobileVal = mobile.trim();

    // check existing user
    const exists = await pool.query(
      "SELECT id FROM users_next WHERE email = $1",
      [emailLower]
    );

    if (exists.rows.length) {
      return NextResponse.json(
        { error: "User already exists" },
        { status: 409 }
      );
    }

    // hash password
    const password_hash = await bcrypt.hash(password, 10);

    // insert including mobile
    const insert = await pool.query(
      "INSERT INTO users_next(name, email, mobile, password_hash) VALUES ($1,$2,$3,$4) RETURNING id, name, email, mobile",
      [name, emailLower, mobileVal, password_hash]
    );

    const user = insert.rows[0];
    return NextResponse.json({ ok: true, user }, { status: 201 });
  } catch (err) {
    console.error("signup error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
