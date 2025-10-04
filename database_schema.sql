-- Create registrations table
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Team Leader (Required)
  leader_name TEXT NOT NULL,
  leader_phone TEXT NOT NULL,
  leader_email TEXT NOT NULL,
  leader_semester TEXT NOT NULL,
  leader_section TEXT NOT NULL,
  leader_prn TEXT NOT NULL,
  
  -- Team Member 2 (Optional)
  member2_name TEXT,
  member2_phone TEXT,
  member2_email TEXT,
  member2_semester TEXT,
  member2_section TEXT,
  member2_prn TEXT,
  
  -- Team Member 3 (Optional)
  member3_name TEXT,
  member3_phone TEXT,
  member3_email TEXT,
  member3_semester TEXT,
  member3_section TEXT,
  member3_prn TEXT,
  
  -- Event Information
  event_name TEXT DEFAULT 'Bug Bounty Hackathon',
  event_date DATE DEFAULT '2025-10-07',
  registration_status TEXT DEFAULT 'pending'
);

-- Create indexes for better performance
CREATE INDEX idx_registrations_created_at ON registrations(created_at);
CREATE INDEX idx_registrations_leader_email ON registrations(leader_email);
CREATE INDEX idx_registrations_semester ON registrations(leader_semester);
CREATE INDEX idx_registrations_section ON registrations(leader_section);

-- Enable Row Level Security (RLS)
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public insert (for registration)
CREATE POLICY "Allow public registration" ON registrations
  FOR INSERT WITH CHECK (true);

-- Create policy to allow public read (for analytics)
CREATE POLICY "Allow public read" ON registrations
  FOR SELECT USING (true);

-- Create a view for analytics
CREATE VIEW registration_analytics AS
SELECT 
  DATE(created_at) as registration_date,
  COUNT(*) as daily_registrations,
  AVG(CASE 
    WHEN member2_name IS NOT NULL AND member3_name IS NOT NULL THEN 3
    WHEN member2_name IS NOT NULL THEN 2
    ELSE 1
  END) as avg_team_size,
  leader_semester,
  leader_section
FROM registrations
GROUP BY DATE(created_at), leader_semester, leader_section
ORDER BY registration_date DESC;
