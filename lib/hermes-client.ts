import fs from "fs";
import path from "path";
import { HermesSession } from "./types";

const HERMES_HOME = path.join(process.env.HOME || "/root", ".hermes");
const DEFAULT_SESSIONS_DIR = path.join(HERMES_HOME, "sessions");
const PROFILES_DIR = path.join(HERMES_HOME, "profiles");

/**
 * Parse a request dump JSON file and extract session data
 */
function parseRequestDump(filePath: string): HermesSession | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    return {
      id: data.session_id || path.basename(filePath),
      model: data.request?.body?.model || "unknown",
      profile: "default",
      timestamp: data.timestamp || new Date().toISOString(),
      messages: data.request?.body?.input ? [{ role: "user", content: data.request.body.input }] : [],
      reason: data.reason,
      error: data.error,
    };
  } catch {
    return null;
  }
}

/**
 * Parse a saved conversation JSON file
 */
function parseSavedConversation(filePath: string, profile: string): HermesSession | null {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    const data = JSON.parse(content);

    return {
      id: data.session_id || path.basename(filePath),
      model: data.model || "unknown",
      profile,
      timestamp: data.session_start || new Date().toISOString(),
      messages: (data.messages || []).map((msg: Record<string, unknown>) => ({
        role: (msg.role as string) || "user",
        content: (msg.content as string) || "",
        reasoning: msg.reasoning as string | undefined,
        tool_calls: msg.tool_calls as Record<string, unknown>[] | undefined,
        tool_name: msg.tool_name as string | undefined,
        tool_call_id: msg.tool_call_id as string | undefined,
      })),
    };
  } catch {
    return null;
  }
}

/**
 * Get all sessions from the default profile and other profiles
 */
export async function getSessions(): Promise<HermesSession[]> {
  const sessions: HermesSession[] = [];

  // Get sessions from default profile
  if (fs.existsSync(DEFAULT_SESSIONS_DIR)) {
    const files = fs.readdirSync(DEFAULT_SESSIONS_DIR);

    // Parse request dumps
    for (const file of files) {
      if (file.startsWith("request_dump_") && file.endsWith(".json")) {
        const filePath = path.join(DEFAULT_SESSIONS_DIR, file);
        const session = parseRequestDump(filePath);
        if (session) sessions.push(session);
      }
    }

    // Parse saved conversations
    const savedDir = path.join(DEFAULT_SESSIONS_DIR, "saved");
    if (fs.existsSync(savedDir)) {
      const savedFiles = fs.readdirSync(savedDir);
      for (const file of savedFiles) {
        if (file.endsWith(".json")) {
          const filePath = path.join(savedDir, file);
          const session = parseSavedConversation(filePath, "default");
          if (session) sessions.push(session);
        }
      }
    }
  }

  // Get sessions from other profiles
  if (fs.existsSync(PROFILES_DIR)) {
    const profiles = fs.readdirSync(PROFILES_DIR);

    for (const profile of profiles) {
      const profileSessionsDir = path.join(PROFILES_DIR, profile, "sessions");

      if (fs.existsSync(profileSessionsDir)) {
        // Parse request dumps
        const files = fs.readdirSync(profileSessionsDir);
        for (const file of files) {
          if (file.startsWith("request_dump_") && file.endsWith(".json")) {
            const filePath = path.join(profileSessionsDir, file);
            const session = parseRequestDump(filePath);
            if (session) {
              session.profile = profile;
              sessions.push(session);
            }
          }
        }

        // Parse saved conversations
        const savedDir = path.join(profileSessionsDir, "saved");
        if (fs.existsSync(savedDir)) {
          const savedFiles = fs.readdirSync(savedDir);
          for (const file of savedFiles) {
            if (file.endsWith(".json")) {
              const filePath = path.join(savedDir, file);
              const session = parseSavedConversation(filePath, profile);
              if (session) sessions.push(session);
            }
          }
        }
      }
    }
  }

  // Sort by timestamp descending
  sessions.sort((a, b) => {
    const aTime = new Date(a.timestamp || 0).getTime();
    const bTime = new Date(b.timestamp || 0).getTime();
    return bTime - aTime;
  });

  return sessions;
}

/**
 * Get a specific session by ID
 */
export async function getSessionById(id: string): Promise<HermesSession | null> {
  const sessions = await getSessions();
  return sessions.find((s) => s.id === id) || null;
}

/**
 * Get the N most recent sessions
 */
export async function getRecentSessions(limit: number = 10): Promise<HermesSession[]> {
  const sessions = await getSessions();
  return sessions.slice(0, limit);
}

/**
 * List available profiles
 */
export async function getProfiles(): Promise<string[]> {
  const profiles = ["default"];

  if (fs.existsSync(PROFILES_DIR)) {
    const dirs = fs.readdirSync(PROFILES_DIR);
    for (const dir of dirs) {
      const fullPath = path.join(PROFILES_DIR, dir);
      if (fs.statSync(fullPath).isDirectory()) {
        profiles.push(dir);
      }
    }
  }

  return profiles.sort();
}

/**
 * Get sessions for a specific profile
 */
export async function getSessionsByProfile(profile: string): Promise<HermesSession[]> {
  const sessions = await getSessions();
  return sessions.filter((s) => s.profile === profile);
}
