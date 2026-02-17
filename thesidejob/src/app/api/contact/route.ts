import { NextRequest, NextResponse } from "next/server";
import { getSupabase } from "@/lib/supabase";

export async function POST(req: NextRequest) {
    try {
        const { name, email, message } = await req.json();

        if (!name || !email || !message) {
            return NextResponse.json(
                { error: "Name, email, and message are required." },
                { status: 400 }
            );
        }

        const supabase = getSupabase();
        const { error } = await supabase
            .from("contacts")
            .insert([{ name, email, message }]);

        if (error) {
            console.error("Supabase insert error:", error);
            return NextResponse.json(
                { error: error.message },
                { status: 500 }
            );
        }

        return NextResponse.json(
            { success: true, message: "Message saved successfully!" },
            { status: 200 }
        );
    } catch (err) {
        console.error("Contact API error:", err);
        return NextResponse.json(
            { error: "Something went wrong. Please try again." },
            { status: 500 }
        );
    }
}
