import { createClient } from '@supabase/supabase-js';
import { SUPABASE_KEY } from '@env';

const supabaseUrl = 'https://ujlburlwpwthqkppwvxg.supabase.co';

if (!SUPABASE_KEY) {
  throw new Error('SUPABASE_KEY is not defined in the .env file');
}

export const supabase = createClient(supabaseUrl, SUPABASE_KEY);
