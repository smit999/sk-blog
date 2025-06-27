import type { APIRoute } from 'astro';
import fs from 'fs/promises';
import path from 'path';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();
    
    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Path to subscribers file
    const subscribersPath = path.join(process.cwd(), 'data', 'subscribers.json');
    
    // Ensure data directory exists
    await fs.mkdir(path.dirname(subscribersPath), { recursive: true });
    
    // Read existing subscribers
    let subscribers: string[] = [];
    try {
      const existingData = await fs.readFile(subscribersPath, 'utf-8');
      subscribers = JSON.parse(existingData);
    } catch (error) {
      // File doesn't exist, start with empty array
      subscribers = [];
    }
    
    // Check if email already exists
    if (subscribers.includes(email)) {
      return new Response(JSON.stringify({ error: 'Email already subscribed' }), {
        status: 409,
        headers: { 'Content-Type': 'application/json' }
      });
    }
    
    // Add new email
    subscribers.push(email);
    
    // Save updated list
    await fs.writeFile(subscribersPath, JSON.stringify(subscribers, null, 2));
    
    // Log subscription (for development)
    console.log(`New subscription: ${email}`);
    
    return new Response(JSON.stringify({ 
      success: true, 
      message: 'Successfully subscribed!',
      totalSubscribers: subscribers.length 
    }), {
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