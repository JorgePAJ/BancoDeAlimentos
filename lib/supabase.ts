import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = "https://hqzzgchjjzvykqckqebm.supabase.co"
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhxenpnY2hqanp2eWtxY2txZWJtIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjE4OTU4MDksImV4cCI6MTk3NzQ3MTgwOX0.XiOM93AkLCU_tMjyKnN-iULWdjxUDITqInLXu6Hawx4"

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage as any,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
})