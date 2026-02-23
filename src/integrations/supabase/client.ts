import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = "https://igdxbtuaajrhvuqtwhmm.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlnZHhidHVhYWpyaHZ1cXR3aG1tIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzE3ODQzMDEsImV4cCI6MjA4NzM2MDMwMX0.TVkCfOruv2ZheDTeMLuL_JOf7rb0weuzNUZOb5vPkhc";

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
