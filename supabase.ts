
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://suypsatlllqwniwfbnzv.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InN1eXBzYXRsbGxxd25pd2Zibnp2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTMxOTM4NjEsImV4cCI6MjA2ODc2OTg2MX0.VKNzqwGjzKhUbbcdxuso-qPbk3Aqpu6_kBHVMNm9WmA";

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
