-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS bug_bounty_registrations CASCADE;

-- Create a separate table for BUG BOUNTY HACKATHON registrations
-- This table is specifically designed for the bug bounty hackathon event - TEAM BASED (2-3 members)

CREATE TABLE bug_bounty_registrations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Team Information
    team_name VARCHAR(255) NOT NULL,
    
    -- Team Leader Information (Second and Third Year Students)
    leader_name VARCHAR(255) NOT NULL,
    leader_phone VARCHAR(20) NOT NULL,
    leader_email VARCHAR(255) NOT NULL,
    leader_semester INTEGER NOT NULL CHECK (leader_semester >= 3 AND leader_semester <= 8), -- 2nd and 3rd year students
    leader_section VARCHAR(10) NOT NULL,
    leader_prn VARCHAR(50) NOT NULL,
    
    -- Team Member 2 Information (Second and Third Year Students)
    member2_name VARCHAR(255) NOT NULL,
    member2_phone VARCHAR(20) NOT NULL,
    member2_email VARCHAR(255) NOT NULL,
    member2_semester INTEGER NOT NULL CHECK (member2_semester >= 3 AND member2_semester <= 8),
    member2_section VARCHAR(10) NOT NULL,
    member2_prn VARCHAR(50) NOT NULL,
    
    -- Team Member 3 Information (Second and Third Year Students) - Optional
    member3_name VARCHAR(255),
    member3_phone VARCHAR(20),
    member3_email VARCHAR(255),
    member3_semester INTEGER CHECK (member3_semester IS NULL OR (member3_semester >= 3 AND member3_semester <= 8)),
    member3_section VARCHAR(10),
    member3_prn VARCHAR(50),
    
    -- Event Specific Information
    event_type VARCHAR(100) DEFAULT 'Bug Bounty Hackathon',
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Team Skills and Experience
    team_experience_level VARCHAR(50) DEFAULT 'Intermediate' CHECK (team_experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
    preferred_programming_languages TEXT[], -- Array of programming languages
    cybersecurity_experience BOOLEAN DEFAULT FALSE,
    previous_hackathon_participation BOOLEAN DEFAULT FALSE,
    
    -- Registration Status
    registration_status VARCHAR(50) DEFAULT 'Pending' CHECK (registration_status IN ('Pending', 'Confirmed', 'Cancelled')),
    payment_status VARCHAR(50) DEFAULT 'Not Required' CHECK (payment_status IN ('Not Required', 'Pending', 'Completed')),
    
    -- Contact Preferences
    contact_preference VARCHAR(50) DEFAULT 'Email' CHECK (contact_preference IN ('Email', 'Phone', 'WhatsApp')),
    
    -- Additional Information
    team_motivation TEXT, -- Why the team wants to participate
    special_requirements TEXT, -- Any special accommodations needed
    dietary_restrictions TEXT, -- For any refreshments provided
    
    -- Metadata
    ip_address INET, -- For tracking registration source
    user_agent TEXT, -- Browser information
    referral_source VARCHAR(100), -- How they heard about the event
    
    -- Constraints
    UNIQUE(team_name), -- Prevent duplicate team names
    UNIQUE(leader_email), -- Prevent duplicate leader registrations
    UNIQUE(member2_email), -- Prevent duplicate member registrations
    UNIQUE(member3_email), -- Prevent duplicate member registrations (only if provided)
    CONSTRAINT valid_leader_email CHECK (leader_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_member2_email CHECK (member2_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_member3_email CHECK (member3_email IS NULL OR member3_email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'),
    CONSTRAINT valid_leader_phone CHECK (leader_phone ~* '^[+]?[0-9\s\-\(\)]{10,15}$'),
    CONSTRAINT valid_member2_phone CHECK (member2_phone ~* '^[+]?[0-9\s\-\(\)]{10,15}$'),
    CONSTRAINT valid_member3_phone CHECK (member3_phone IS NULL OR member3_phone ~* '^[+]?[0-9\s\-\(\)]{10,15}$')
);

-- Create indexes for better performance
CREATE INDEX idx_bug_bounty_registrations_team_name ON bug_bounty_registrations(team_name);
CREATE INDEX idx_bug_bounty_registrations_leader_email ON bug_bounty_registrations(leader_email);
CREATE INDEX idx_bug_bounty_registrations_status ON bug_bounty_registrations(registration_status);
CREATE INDEX idx_bug_bounty_registrations_created_at ON bug_bounty_registrations(created_at);
CREATE INDEX idx_bug_bounty_registrations_leader_semester ON bug_bounty_registrations(leader_semester);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_bug_bounty_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_bug_bounty_registrations_updated_at
    BEFORE UPDATE ON bug_bounty_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_bug_bounty_registrations_updated_at();

-- Add comments for documentation
COMMENT ON TABLE bug_bounty_registrations IS 'Registrations specifically for BUG BOUNTY HACKATHON event - Second and Third Year Students Only (Team of 2-3 members)';
COMMENT ON COLUMN bug_bounty_registrations.leader_semester IS 'Must be between 3-8 (2nd and 3rd year students) as per event requirements';
COMMENT ON COLUMN bug_bounty_registrations.member2_semester IS 'Must be between 3-8 (2nd and 3rd year students) as per event requirements';
COMMENT ON COLUMN bug_bounty_registrations.member3_semester IS 'Optional - Must be between 3-8 (2nd and 3rd year students) if provided';
COMMENT ON COLUMN bug_bounty_registrations.preferred_programming_languages IS 'Array of programming languages the team is comfortable with';
COMMENT ON COLUMN bug_bounty_registrations.team_motivation IS 'Team motivation for participating in the bug bounty hackathon';

-- Test the table by inserting a sample record
INSERT INTO bug_bounty_registrations (
    team_name, 
    leader_name, leader_phone, leader_email, leader_semester, leader_section, leader_prn,
    member2_name, member2_phone, member2_email, member2_semester, member2_section, member2_prn,
    preferred_programming_languages, 
    team_motivation, 
    registration_status
) VALUES (
    'Bug Hunters', 
    'John Doe', '+91-9876543210', 'john.doe@example.com', 4, 'A', 'SIT2023001',
    'Jane Smith', '+91-9876543211', 'jane.smith@example.com', 4, 'A', 'SIT2023002',
    ARRAY['Python', 'JavaScript', 'C++'], 
    'We want to improve our cybersecurity skills and learn from experienced developers', 
    'Pending'
);

-- Verify the table was created correctly
SELECT * FROM bug_bounty_registrations LIMIT 1;
