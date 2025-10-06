import { createClient } from '@supabase/supabase-js'

// Replace these with your actual Supabase project credentials
// You'll get these from your Supabase dashboard
const supabaseUrl = 'https://wkqgbykptfdejezirucb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndrcWdieWtwdGZkZWplemlydWNiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTk1OTQ4NzcsImV4cCI6MjA3NTE3MDg3N30.ciyzwGgiVWw_mpA06H_h-Nd9UN2jnN8a_MR9GvtiBGE'

// Create a singleton instance to prevent multiple GoTrueClient instances
let supabaseInstance = null;

export const supabase = (() => {
  if (!supabaseInstance) {
    supabaseInstance = createClient(supabaseUrl, supabaseKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false
      }
    });
  }
  return supabaseInstance;
})();

// Database functions for registration
export const addRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registrationData])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error adding registration:', error)
    return { success: false, error: error.message }
  }
}

// Database functions for Bug Bounty Hackathon registration
export const addBugBountyRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('bug_bounty_registrations')
      .insert([registrationData])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error adding bug bounty registration:', error)
    return { success: false, error: error.message }
  }
}

// Database functions for Vibe Coding Challenge registration
export const addVibeCodingRegistration = async (registrationData) => {
  try {
    const { data, error } = await supabase
      .from('vibe_coding_challenge_registrations')
      .insert([registrationData])
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error adding vibe coding registration:', error)
    return { success: false, error: error.message }
  }
}

export const getRegistrations = async () => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false })
    
    if (error) throw error
    return { success: true, data }
  } catch (error) {
    console.error('Error fetching registrations:', error)
    return { success: false, error: error.message }
  }
}

export const getRegistrationStats = async () => {
  try {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
    
    if (error) throw error
    
    // Calculate statistics
    const stats = {
      totalRegistrations: data.length,
      teamSizes: data.map(reg => {
        let teamSize = 1
        if (reg.member2_name) teamSize++
        if (reg.member3_name) teamSize++
        return teamSize
      }),
      semesters: data.map(reg => reg.leader_semester).filter(Boolean),
      sections: data.map(reg => reg.leader_section).filter(Boolean)
    }
    
    return { success: true, stats }
  } catch (error) {
    console.error('Error fetching stats:', error)
    return { success: false, error: error.message }
  }
}
