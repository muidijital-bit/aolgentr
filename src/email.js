import { supabase } from './supabase.js';

export async function sendEmail(params) {
  const { error } = await supabase.functions.invoke('send-email', { body: params });
  if (error) throw error;
}
