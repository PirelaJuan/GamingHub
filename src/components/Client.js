import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://ybcyuhycpmxhzczthuxe.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InliY3l1aHljcG14aHpjenRodXhlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzEzNDI0NzIsImV4cCI6MjA0NjkxODQ3Mn0.VvWdAWz-emK8WOQKFDWSMsWyLvP6sYpBJiaR8vZeopI'

export const supabase = createClient(supabaseUrl, supabaseKey)