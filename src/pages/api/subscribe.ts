import type { APIRoute } from 'astro';
import { promises as fs } from 'fs';
import path from 'path';

// Define the path to the subscribers.json file.
// Using process.cwd() to ensure it's relative to the project root.
// In a deployed Cloudflare environment, file system writes might be restricted or ephemeral.
// This setup is more for local development or build-time data generation.
// For Cloudflare Pages, a KV store or Cloudflare D1 would be more robust for persistent storage.
const SUBSCRIBERS_FILE_PATH = path.join(process.cwd(), 'subscribers.json');

async function getSubscribers(): Promise<string[]> {
  try {
    await fs.access(SUBSCRIBERS_FILE_PATH); // Check if file exists
    const data = await fs.readFile(SUBSCRIBERS_FILE_PATH, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    // If file doesn't exist or other error, return empty array
    return [];
  }
}

async function saveSubscribers(emails: string[]): Promise<void> {
  try {
    await fs.writeFile(SUBSCRIBERS_FILE_PATH, JSON.stringify(emails, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to save subscribers:", error);
    // Depending on the environment, you might want to throw this error
    // or handle it in a way that doesn't crash the function if it's non-critical.
  }
}

export const POST: APIRoute = async ({ request }) => {
  if (request.headers.get("Content-Type") !== "application/json") {
    return new Response(JSON.stringify({ message: "Content-Type must be application/json" }), { status: 415 });
  }

  let email: string;
  try {
    const body = await request.json();
    email = body.email;
    if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return new Response(JSON.stringify({ message: "Valid email is required" }), { status: 400 });
    }
  } catch (error) {
    return new Response(JSON.stringify({ message: "Invalid JSON body" }), { status: 400 });
  }

  const subscribers = await getSubscribers();

  if (subscribers.includes(email)) {
    return new Response(JSON.stringify({ message: "You are already subscribed!" }), { status: 200 }); // Or 409 for conflict
  }

  subscribers.push(email);
  await saveSubscribers(subscribers);

  return new Response(JSON.stringify({ message: "Successfully subscribed!" }), { status: 200 });
};

// Fallback for GET or other methods to indicate endpoint exists but method not allowed
export const ALL: APIRoute = ({ request }) => {
  if (request.method !== 'POST') {
    return new Response(JSON.stringify({ message: `Method ${request.method} not allowed. Use POST.` }), { status: 405 });
  }
  // Should not be reached if POST is defined correctly
  return new Response(null, { status: 404 });
};
