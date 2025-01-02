import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://khpipxfbxoxxrogexnaf.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtocGlweGZieG94eHJvZ2V4bmFmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mjc2MjE5MTcsImV4cCI6MjA0MzE5NzkxN30.SYPwsrzokMuHeyqaM2mVykXG7gpp-GOVxzpGOtQuNDk"

export const supabase = createClient(supabaseUrl, supabaseAnonKey)