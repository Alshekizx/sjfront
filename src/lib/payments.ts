import { supabase } from './supabase';

export async function paymentRequest(action: 'initialize' | 'verify', body: Record<string, string>) {
  const { data, error } = await supabase.functions.invoke(`make-server-f63d7d22/payments/${action}`, { body });
  if (error) {
    let message = 'Unable to reach the payment service. Please try again.';
    try { message = (await error.context.json()).error || message; } catch { /* Network failures have no JSON body. */ }
    throw new Error(message);
  }
  if (data?.error) throw new Error(data.error);
  return data;
}
