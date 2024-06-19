import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://faxjigmeriaqfylqmrfb.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZheGppZ21lcmlhcWZ5bHFtcmZiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTg3MTk2MDksImV4cCI6MjAzNDI5NTYwOX0.owz3SVPJd8qNokO2j_tqRK-iJFnb9rc3uuZsOa1VFF4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)