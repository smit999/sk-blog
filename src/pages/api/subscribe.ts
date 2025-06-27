import type { APIRoute } from 'astro';

// Add a type for the env property
interface Env {
  SUBSCRIBERS: KVNamespace;
}

export const prerender = false;

export const POST: APIRoute = async ({ request, locals }) => {
  const env = (locals as typeof locals & { env: Env }).env;
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Check if already subscribed
    const exists = await env.SUBSCRIBERS.get(email);
    if (exists) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Store the email (value can be a timestamp or just '1')
    await env.SUBSCRIBERS.put(email, Date.now().toString());
    
    return new Response(JSON.stringify({ success: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
};

// Cloudflare KVNamespace type for TypeScript
// Remove this if you already have global types
interface KVNamespace {
  get(key: string): Promise<string | null>;
  put(key: string, value: string): Promise<void>;
  delete(key: string): Promise<void>;
} 