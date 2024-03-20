import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://mgtlijrpsimrqnupirbn.supabase.co';
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1ndGxpanJwc2ltcnFudXBpcmJuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDgzNTQ3NzIsImV4cCI6MjAyMzkzMDc3Mn0.qJgcTH5vJqbB3KQEKBjkmncMlZ2DzZX-mdzJn3IqZYI"  // Assurez-vous que l'espace après SUPABASE_KEY dans l'original est supprimé
const supabase = createClient(supabaseUrl, supabaseKey);

export { supabase };