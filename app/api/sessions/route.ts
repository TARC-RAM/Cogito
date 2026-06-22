import { getSessions, getSessionById } from "@/lib/hermes-client";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const sessionId = url.searchParams.get("id");

  try {
    if (sessionId) {
      // Single session by ID
      const session = await getSessionById(sessionId);
      if (!session) {
        return Response.json(
          { error: "Session not found" },
          { status: 404 }
        );
      }

      return Response.json(session);
    }

    // List all sessions
    const sessions = await getSessions();
    return Response.json({
      sessions,
      total: sessions.length,
    });
  } catch (error) {
    console.error("Error fetching sessions:", error);
    return Response.json(
      { error: "Failed to fetch sessions", details: String(error) },
      { status: 500 }
    );
  }
}
