import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, phone, business_type, monthly_revenue, goal } = body;

    if (!name || !email) {
      return NextResponse.json(
        { error: "Name and email are required." },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const supabase = createClient(supabaseUrl, supabaseAnonKey);
    const { error: dbError } = await supabase.from("leads").insert({
      name,
      email,
      phone: phone || null,
      business_type: business_type || null,
      monthly_revenue: monthly_revenue || null,
      goal: goal || null,
      source: "landing_page",
    });

    if (dbError) {
      console.error("Supabase insert error:", dbError);
      return NextResponse.json(
        { error: "Failed to save your information. Please try again." },
        { status: 500 }
      );
    }

    // Send email notification via Resend (if configured)
    const resendKey = process.env.RESEND_API_KEY;
    const ownerEmail = process.env.OWNER_EMAIL;

    if (resendKey && ownerEmail) {
      try {
        const { resend } = await import("@/lib/resend");
        await resend.emails.send({
          from: "Forge & Ascend <onboarding@resend.dev>",
          to: ownerEmail,
          subject: `New Lead: ${name}`,
          html: `
            <h2>New Lead from Forge & Ascend</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Phone:</strong> ${phone || "Not provided"}</p>
            <p><strong>Business Type:</strong> ${business_type || "Not provided"}</p>
            <p><strong>Monthly Revenue:</strong> ${monthly_revenue || "Not provided"}</p>
            <p><strong>Goal:</strong> ${goal || "Not provided"}</p>
            <p><em>Submitted at ${new Date().toISOString()}</em></p>
          `,
        });
      } catch (emailErr) {
        console.error("Resend email error:", emailErr);
        // Don't fail the whole request for email errors
      }
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Lead submission error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}
