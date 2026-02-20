import { NextRequest, NextResponse } from "next/server";

const STREAMTAPE_LOGIN = process.env.STREAMTAPE_LOGIN;
const STREAMTAPE_KEY = process.env.STREAMTAPE_KEY;

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL is required" }, { status: 400 });
  }

  try {
    const fileMatch = url.match(/\/e\/([a-zA-Z0-9]+)/);
    const fileId = fileMatch ? fileMatch[1] : null;

    if (!fileId) {
      return NextResponse.json({ error: "Invalid Streamtape URL" }, { status: 400 });
    }

    const ticketUrl = `https://api.streamtape.com/file/dlticket?file=${fileId}&login=${STREAMTAPE_LOGIN || ''}&key=${STREAMTAPE_KEY || ''}`;
    
    const ticketResponse = await fetch(ticketUrl);
    const ticketData = await ticketResponse.json();

    if (ticketData.result !== 200) {
      return NextResponse.json({ 
        error: ticketData.msg || "Failed to get ticket",
        needsCaptcha: ticketData.result === -1
      });
    }

    const { ticket, expires } = ticketData;

    if (ticketData.captcha_url) {
      return NextResponse.json({ 
        error: "Captcha required",
        captchaUrl: ticketData.captcha_url,
        ticket,
        fileId
      });
    }

    const dlUrl = `https://api.streamtape.com/file/dl?file=${fileId}&ticket=${ticket}`;
    const dlResponse = await fetch(dlUrl);
    const dlData = await dlResponse.json();

    if (dlData.result === 200 && dlData.link) {
      return NextResponse.json({ 
        success: true, 
        downloadUrl: dlData.link,
        expires
      });
    }

    return NextResponse.json({ error: dlData.msg || "Failed to get download link" });

  } catch (error) {
    console.error("Streamtape download error:", error);
    return NextResponse.json({ error: "Failed to fetch download link" }, { status: 500 });
  }
}
