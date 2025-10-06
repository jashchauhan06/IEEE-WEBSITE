-- Drop the table if it exists to start fresh
DROP TABLE IF EXISTS vibe_coding_challenge_registrations CASCADE;

-- Create a separate table for VIBE CODING CHALLENGE registrations
-- This table is specifically designed for the coding challenge event - TEAM BASED (2-3 members)

CREATE TABLE vibe_coding_challenge_registrations (
    id SERIAL PRIMARY KEY,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Team Information
    team_name VARCHAR(255) NOT NULL,
    
    -- Team Leader Information (First Year Student)
    leader_name VARCHAR(255) NOT NULL,
    leader_phone VARCHAR(20) NOT NULL,
    leader_email VARCHAR(255) NOT NULL,
    leader_semester INTEGER NOT NULL CHECK (leader_semester >= 1 AND leader_semester <= 2), -- 1st year students only
    leader_section VARCHAR(10) NOT NULL,
    leader_prn VARCHAR(50) NOT NULL,
    
    -- Team Member 2 Information (First Year Student)
    member2_name VARCHAR(255) NOT NULL,
    member2_phone VARCHAR(20) NOT NULL,
    member2_email VARCHAR(255) NOT NULL,
    member2_semester INTEGER NOT NULL CHECK (member2_semester >= 1 AND member2_semester <= 2),
    member2_section VARCHAR(10) NOT NULL,
    member2_prn VARCHAR(50) NOT NULL,
    
    -- Team Member 3 Information (First Year Student) - Optional
    member3_name VARCHAR(255),
    member3_phone VARCHAR(20),
    member3_email VARCHAR(255),
    member3_semester INTEGER CHECK (member3_semester IS NULL OR (member3_semester >= 1 AND member3_semester <= 2)),
    member3_section VARCHAR(10),
    member3_prn VARCHAR(50),
    
    -- Event Specific Information
    event_type VARCHAR(100) DEFAULT 'Vibe Coding Challenge',
    registration_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    
    -- Team Skills and Experience
    team_experience_level VARCHAR(50) DEFAULT 'Beginner' CHECK (team_experience_level IN ('Beginner', 'Intermediate', 'Advanced')),
    preferred_programming_languages TEXT[], -- Array of programming languages the team is comfortable with
    previous_coding_competition_experience BOOLEAN DEFAULT FALSE,
    github_team_repository VARCHAR(255), -- Optional team GitHub repository
    
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
CREATE INDEX idx_vibe_registrations_team_name ON vibe_coding_challenge_registrations(team_name);
CREATE INDEX idx_vibe_registrations_leader_email ON vibe_coding_challenge_registrations(leader_email);
CREATE INDEX idx_vibe_registrations_status ON vibe_coding_challenge_registrations(registration_status);
CREATE INDEX idx_vibe_registrations_created_at ON vibe_coding_challenge_registrations(created_at);
CREATE INDEX idx_vibe_registrations_leader_semester ON vibe_coding_challenge_registrations(leader_semester);

-- Create a trigger to automatically update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_vibe_registrations_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trigger_update_vibe_registrations_updated_at
    BEFORE UPDATE ON vibe_coding_challenge_registrations
    FOR EACH ROW
    EXECUTE FUNCTION update_vibe_registrations_updated_at();

-- Add comments for documentation
COMMENT ON TABLE vibe_coding_challenge_registrations IS 'Registrations specifically for VIBE CODING CHALLENGE event - First Year Students Only (Team of 2-3 members)';
COMMENT ON COLUMN vibe_coding_challenge_registrations.leader_semester IS 'Must be between 1-2 (1st year students) as per event requirements';
COMMENT ON COLUMN vibe_coding_challenge_registrations.member2_semester IS 'Must be between 1-2 (1st year students) as per event requirements';
COMMENT ON COLUMN vibe_coding_challenge_registrations.member3_semester IS 'Optional - Must be between 1-2 (1st year students) if provided';
COMMENT ON COLUMN vibe_coding_challenge_registrations.preferred_programming_languages IS 'Array of programming languages the team is comfortable with';
COMMENT ON COLUMN vibe_coding_challenge_registrations.team_motivation IS 'Team motivation for participating in the coding challenge';

-- Test the table by inserting a sample record
INSERT INTO vibe_coding_challenge_registrations (
    team_name, 
    leader_name, leader_phone, leader_email, leader_semester, leader_section, leader_prn,
    member2_name, member2_phone, member2_email, member2_semester, member2_section, member2_prn,
    preferred_programming_languages, 
    team_motivation, 
    registration_status
) VALUES (
    'Test Team', 
    'John Doe', '+91-9876543210', 'john.doe@example.com', 1, 'A', 'SIT2024001',
    'Jane Smith', '+91-9876543211', 'jane.smith@example.com', 1, 'A', 'SIT2024002',
    ARRAY['C++'], 
    'We want to improve our coding skills', 
    'Pending'
);

-- Verify the table was created correctly
SELECT * FROM vibe_coding_challenge_registrations LIMIT 1;
