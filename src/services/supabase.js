import { createClient } from "@supabase/supabase-js";
export const supabaseUrl = "https://axmvuedfczmlwpaopxkf.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF4bXZ1ZWRmY3ptbHdwYW9weGtmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTM2MzA0ODksImV4cCI6MjAyOTIwNjQ4OX0.ujxfdiEYsES7OrGGe0OC3IC26unypOY92zRMZm0YhLw";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
