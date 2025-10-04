-- =====================================================
-- IEEE STUDENT BRANCH WEBSITE - COMPLETE DATABASE SCHEMA
-- =====================================================

-- =====================================================
-- 1. EVENTS TABLE
-- =====================================================
CREATE TABLE events (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Event Basic Info
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  event_type TEXT NOT NULL, -- 'upcoming', 'past', 'ongoing'
  status TEXT DEFAULT 'active', -- 'active', 'inactive', 'cancelled'
  
  -- Event Details
  date DATE NOT NULL,
  time_start TIME,
  time_end TIME,
  venue TEXT,
  mode TEXT, -- 'online', 'offline', 'hybrid'
  
  -- Event Media
  image_url TEXT,
  banner_color TEXT DEFAULT '#3B82F6',
  
  -- Event Categories/Tags
  tags TEXT[], -- Array of tags like ['Technical', 'IEEE', 'Workshop']
  
  -- Event Registration
  registration_open BOOLEAN DEFAULT false,
  registration_url TEXT,
  max_participants INTEGER,
  current_participants INTEGER DEFAULT 0,
  
  -- Event Organizers
  organizer_name TEXT,
  organizer_email TEXT,
  organizer_phone TEXT,
  
  -- Event Requirements
  requirements TEXT,
  prerequisites TEXT,
  
  -- Event Outcomes (for past events)
  total_participants INTEGER,
  winners TEXT[], -- Array of winner names
  outcomes TEXT,
  feedback TEXT,
  
  -- SEO and Display
  slug TEXT UNIQUE,
  featured BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- =====================================================
-- 2. TEAM MEMBERS TABLE
-- =====================================================
CREATE TABLE team_members (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info
  name TEXT NOT NULL,
  position TEXT NOT NULL, -- 'Chair', 'Vice-Chair', 'Secretary', etc.
  role TEXT, -- 'Leadership', 'Core Team', 'Advisor'
  email TEXT,
  phone TEXT,
  
  -- Academic Info
  semester INTEGER,
  section TEXT,
  prn TEXT,
  department TEXT DEFAULT 'Computer Science and Engineering',
  
  -- Profile
  bio TEXT,
  image_url TEXT,
  initials TEXT, -- For avatar display
  
  -- Social Links
  linkedin_url TEXT,
  github_url TEXT,
  portfolio_url TEXT,
  
  -- Display Settings
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  is_featured BOOLEAN DEFAULT false,
  
  -- Color coding for cards
  card_color TEXT DEFAULT '#3B82F6'
);

-- =====================================================
-- 3. REGISTRATIONS TABLE (Enhanced)
-- =====================================================
CREATE TABLE registrations (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Event Reference
  event_id BIGINT REFERENCES events(id) ON DELETE CASCADE,
  
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
  
  -- Registration Status
  status TEXT DEFAULT 'pending', -- 'pending', 'approved', 'rejected', 'cancelled'
  payment_status TEXT DEFAULT 'pending', -- 'pending', 'paid', 'refunded'
  
  -- Additional Info
  team_name TEXT,
  special_requirements TEXT,
  notes TEXT,
  
  -- Contact Info
  emergency_contact TEXT,
  emergency_phone TEXT
);

-- =====================================================
-- 4. NEWS/ANNOUNCEMENTS TABLE
-- =====================================================
CREATE TABLE announcements (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Content
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  
  -- Media
  image_url TEXT,
  attachment_url TEXT,
  
  -- Categorization
  category TEXT DEFAULT 'general', -- 'general', 'event', 'achievement', 'news'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high', 'urgent'
  
  -- Status
  is_published BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  is_pinned BOOLEAN DEFAULT false,
  
  -- SEO
  slug TEXT UNIQUE,
  meta_description TEXT,
  
  -- Author
  author_name TEXT,
  author_email TEXT,
  
  -- Display
  publish_date TIMESTAMP WITH TIME ZONE,
  expiry_date TIMESTAMP WITH TIME ZONE,
  sort_order INTEGER DEFAULT 0
);

-- =====================================================
-- 5. ACHIEVEMENTS TABLE
-- =====================================================
CREATE TABLE achievements (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Achievement Info
  title TEXT NOT NULL,
  description TEXT,
  category TEXT, -- 'academic', 'competition', 'research', 'leadership'
  
  -- Participants
  participant_names TEXT[], -- Array of participant names
  participant_emails TEXT[], -- Array of participant emails
  
  -- Achievement Details
  event_name TEXT,
  event_date DATE,
  position TEXT, -- '1st Place', '2nd Place', 'Winner', etc.
  prize TEXT,
  certificate_url TEXT,
  image_url TEXT,
  
  -- Recognition
  is_featured BOOLEAN DEFAULT false,
  is_verified BOOLEAN DEFAULT false,
  
  -- Display
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- 6. GALLERY TABLE
-- =====================================================
CREATE TABLE gallery (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Image Info
  title TEXT,
  description TEXT,
  image_url TEXT NOT NULL,
  thumbnail_url TEXT,
  
  -- Categorization
  category TEXT DEFAULT 'general', -- 'events', 'team', 'achievements', 'general'
  event_id BIGINT REFERENCES events(id) ON DELETE SET NULL,
  
  -- Metadata
  file_size INTEGER,
  dimensions TEXT, -- '1920x1080'
  alt_text TEXT,
  
  -- Display
  is_featured BOOLEAN DEFAULT false,
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true
);

-- =====================================================
-- 7. CONTACT MESSAGES TABLE
-- =====================================================
CREATE TABLE contact_messages (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Contact Info
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  subject TEXT,
  message TEXT NOT NULL,
  
  -- Status
  status TEXT DEFAULT 'unread', -- 'unread', 'read', 'replied', 'archived'
  priority TEXT DEFAULT 'normal', -- 'low', 'normal', 'high'
  
  -- Response
  reply TEXT,
  replied_at TIMESTAMP WITH TIME ZONE,
  replied_by TEXT
);

-- =====================================================
-- 8. WEBSITE SETTINGS TABLE
-- =====================================================
CREATE TABLE website_settings (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Basic Info
  setting_key TEXT UNIQUE NOT NULL,
  setting_value TEXT,
  setting_type TEXT DEFAULT 'text', -- 'text', 'number', 'boolean', 'json'
  
  -- Categorization
  category TEXT DEFAULT 'general', -- 'general', 'seo', 'social', 'contact'
  description TEXT,
  
  -- Display
  is_public BOOLEAN DEFAULT false,
  sort_order INTEGER DEFAULT 0
);

-- =====================================================
-- 9. ANALYTICS TABLE
-- =====================================================
CREATE TABLE analytics (
  id BIGSERIAL PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  
  -- Page Analytics
  page_url TEXT NOT NULL,
  page_title TEXT,
  visit_count INTEGER DEFAULT 1,
  
  -- User Info
  ip_address INET,
  user_agent TEXT,
  referrer TEXT,
  
  -- Session Info
  session_id TEXT,
  visit_duration INTEGER, -- in seconds
  
  -- Device Info
  device_type TEXT, -- 'desktop', 'mobile', 'tablet'
  browser TEXT,
  os TEXT,
  
  -- Location (if available)
  country TEXT,
  city TEXT
);

-- =====================================================
-- INDEXES FOR PERFORMANCE
-- =====================================================

-- Events indexes
CREATE INDEX idx_events_type ON events(event_type);
CREATE INDEX idx_events_date ON events(date);
CREATE INDEX idx_events_featured ON events(featured);
CREATE INDEX idx_events_status ON events(status);

-- Team members indexes
CREATE INDEX idx_team_members_role ON team_members(role);
CREATE INDEX idx_team_members_active ON team_members(is_active);
CREATE INDEX idx_team_members_display_order ON team_members(display_order);

-- Registrations indexes
CREATE INDEX idx_registrations_event_id ON registrations(event_id);
CREATE INDEX idx_registrations_status ON registrations(status);
CREATE INDEX idx_registrations_created_at ON registrations(created_at);
CREATE INDEX idx_registrations_leader_email ON registrations(leader_email);

-- Announcements indexes
CREATE INDEX idx_announcements_published ON announcements(is_published);
CREATE INDEX idx_announcements_category ON announcements(category);
CREATE INDEX idx_announcements_publish_date ON announcements(publish_date);

-- Gallery indexes
CREATE INDEX idx_gallery_category ON gallery(category);
CREATE INDEX idx_gallery_event_id ON gallery(event_id);
CREATE INDEX idx_gallery_active ON gallery(is_active);

-- Analytics indexes
CREATE INDEX idx_analytics_page_url ON analytics(page_url);
CREATE INDEX idx_analytics_created_at ON analytics(created_at);
CREATE INDEX idx_analytics_device_type ON analytics(device_type);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE team_members ENABLE ROW LEVEL SECURITY;
ALTER TABLE registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;
ALTER TABLE gallery ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE website_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE analytics ENABLE ROW LEVEL SECURITY;

-- Public read policies
CREATE POLICY "Public read events" ON events FOR SELECT USING (status = 'active');
CREATE POLICY "Public read team" ON team_members FOR SELECT USING (is_active = true);
CREATE POLICY "Public read announcements" ON announcements FOR SELECT USING (is_published = true);
CREATE POLICY "Public read achievements" ON achievements FOR SELECT USING (is_active = true);
CREATE POLICY "Public read gallery" ON gallery FOR SELECT USING (is_active = true);
CREATE POLICY "Public read settings" ON website_settings FOR SELECT USING (is_public = true);

-- Public insert policies
CREATE POLICY "Public insert registrations" ON registrations FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert contact" ON contact_messages FOR INSERT WITH CHECK (true);
CREATE POLICY "Public insert analytics" ON analytics FOR INSERT WITH CHECK (true);

-- =====================================================
-- INITIAL DATA INSERTION
-- =====================================================

-- Insert default events
INSERT INTO events (name, subtitle, description, event_type, date, time_start, time_end, venue, mode, tags, registration_open, organizer_name, organizer_email, featured) VALUES
('Bug Bounty Hackathon', 'IEEE DAY EVENT', 'A unique coding event blending hackathon and bug bounty challenges. First-year students participate in coding competitions, while advanced students tackle real-world debugging, fixing, and optimizing codebases.', 'upcoming', '2025-10-07', '10:00:00', '16:00:00', 'S-02 & S-08', 'offline', ARRAY['Hackathon', 'Debugging', 'Bug Bounty', 'CSE'], true, 'Parth Choudhari', 'parth@ieee.sitnagpur.com', true),
('Salesforce for the Future: Skills that Matter', 'LEARN. BUILD. DEPLOY.', 'Master the Salesforce platform and develop essential skills for the future! Learn about CRM, cloud computing, automation, and how to build scalable business solutions that matter in today''s digital world.', 'upcoming', '2025-04-15', '14:00:00', '17:00:00', 'SO-8 & SO-2', 'offline', ARRAY['Salesforce', 'CRM', 'Cloud Computing', 'Automation'], false, 'IEEE Team', 'ieee@sitnagpur.com', false),
('Tech Escape 2.0', 'IEEE EVENT FOR 1ST YEAR', 'Join us for Tech Escape 2.0, an exciting IEEE event designed specifically for first-year students! This technical event will provide hands-on experience with cutting-edge technology and innovative problem-solving challenges.', 'past', '2025-08-14', '15:00:00', '16:45:00', '2nd Floor', 'offline', ARRAY['Technical', 'IEEE', '1st Year'], false, 'Parth Choudhari', 'parth@ieee.sitnagpur.com', false);

-- Insert default team members
INSERT INTO team_members (name, position, role, email, semester, section, prn, bio, initials, card_color, display_order, is_active, is_featured) VALUES
('Dr. Bhupesh Kumar Dewangan', 'Faculty Coordinator', 'Advisor', 'bhupesh.dewangan@sitnagpur.edu.in', NULL, NULL, NULL, 'Faculty advisor providing guidance and support for IEEE activities and initiatives.', 'BD', '#3B82F6', 1, true, true),
('Parth Choudhari', 'Chair', 'Leadership', 'parth.choudhari@sitnagpur.edu.in', 5, 'A', '2023BCS001', 'Leading the IEEE Student Branch with passion for technology and innovation.', 'PC', '#10B981', 2, true, true),
('Rishab Thutheja', 'Vice-Chair', 'Leadership', 'rishab.thutheja@sitnagpur.edu.in', 5, 'A', '2023BCS002', 'Supporting the chair in organizing events and managing activities.', 'RT', '#8B5CF6', 3, true, true),
('Rinku Choudhary', 'Vice-Chair', 'Leadership', 'rinku.choudhary@sitnagpur.edu.in', 5, 'B', '2023BCS003', 'Co-leading initiatives and ensuring smooth operations.', 'RC', '#F59E0B', 4, true, true),
('Rahul Malani', 'Secretary', 'Leadership', 'rahul.malani@sitnagpur.edu.in', 5, 'A', '2023BCS004', 'Managing documentation and communication for IEEE activities.', 'RM', '#EF4444', 5, true, true),
('Atharv Jaiswal', 'Treasurer', 'Leadership', 'atharv.jaiswal@sitnagpur.edu.in', 5, 'B', '2023BCS005', 'Handling financial matters and budget planning for events.', 'AJ', '#F97316', 6, true, true);

-- Insert default website settings
INSERT INTO website_settings (setting_key, setting_value, setting_type, category, description, is_public) VALUES
('site_title', 'IEEE Student Branch SIT Nagpur', 'text', 'general', 'Main website title', true),
('site_description', 'The IEEE Student Branch at Symbiosis Institute of Technology, Nagpur, is a dynamic platform dedicated to fostering innovation, technical excellence, and research-driven learning among students.', 'text', 'seo', 'Website description for SEO', true),
('contact_email', 'ieee.sitnagpur@example.com', 'text', 'contact', 'Main contact email', true),
('contact_phone', '+91-XXXXXXXXXX', 'text', 'contact', 'Contact phone number', true),
('social_facebook', 'https://facebook.com/ieee.sitnagpur', 'text', 'social', 'Facebook page URL', true),
('social_twitter', 'https://twitter.com/ieee.sitnagpur', 'text', 'social', 'Twitter handle URL', true),
('social_linkedin', 'https://linkedin.com/company/ieee.sitnagpur', 'text', 'social', 'LinkedIn page URL', true),
('social_instagram', 'https://instagram.com/ieee.sitnagpur', 'text', 'social', 'Instagram page URL', true);

-- =====================================================
-- VIEWS FOR ANALYTICS
-- =====================================================

-- Registration analytics view
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
  leader_section,
  COUNT(CASE WHEN status = 'approved' THEN 1 END) as approved_registrations,
  COUNT(CASE WHEN status = 'pending' THEN 1 END) as pending_registrations
FROM registrations
GROUP BY DATE(created_at), leader_semester, leader_section
ORDER BY registration_date DESC;

-- Event participation analytics
CREATE VIEW event_analytics AS
SELECT 
  e.name as event_name,
  e.date as event_date,
  e.event_type,
  COUNT(r.id) as total_registrations,
  COUNT(CASE WHEN r.status = 'approved' THEN 1 END) as approved_count,
  COUNT(CASE WHEN r.status = 'pending' THEN 1 END) as pending_count,
  AVG(CASE 
    WHEN r.member2_name IS NOT NULL AND r.member3_name IS NOT NULL THEN 3
    WHEN r.member2_name IS NOT NULL THEN 2
    ELSE 1
  END) as avg_team_size
FROM events e
LEFT JOIN registrations r ON e.id = r.event_id
GROUP BY e.id, e.name, e.date, e.event_type
ORDER BY e.date DESC;

-- Team member statistics
CREATE VIEW team_stats AS
SELECT 
  role,
  COUNT(*) as member_count,
  COUNT(CASE WHEN is_active = true THEN 1 END) as active_members,
  COUNT(CASE WHEN is_featured = true THEN 1 END) as featured_members
FROM team_members
GROUP BY role
ORDER BY member_count DESC;

-- =====================================================
-- FUNCTIONS FOR COMMON OPERATIONS
-- =====================================================

-- Function to get event statistics
CREATE OR REPLACE FUNCTION get_event_stats(event_id_param BIGINT)
RETURNS JSON AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total_registrations', COUNT(*),
    'approved_registrations', COUNT(CASE WHEN status = 'approved' THEN 1 END),
    'pending_registrations', COUNT(CASE WHEN status = 'pending' THEN 1 END),
    'avg_team_size', AVG(CASE 
      WHEN member2_name IS NOT NULL AND member3_name IS NOT NULL THEN 3
      WHEN member2_name IS NOT NULL THEN 2
      ELSE 1
    END)
  ) INTO result
  FROM registrations
  WHERE event_id = event_id_param;
  
  RETURN result;
END;
$$ LANGUAGE plpgsql;

-- Function to update event participant count
CREATE OR REPLACE FUNCTION update_event_participants()
RETURNS TRIGGER AS $$
BEGIN
  UPDATE events 
  SET current_participants = (
    SELECT COUNT(*) 
    FROM registrations 
    WHERE event_id = NEW.event_id AND status = 'approved'
  )
  WHERE id = NEW.event_id;
  
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update participant count
CREATE TRIGGER trigger_update_participants
  AFTER INSERT OR UPDATE OR DELETE ON registrations
  FOR EACH ROW
  EXECUTE FUNCTION update_event_participants();

-- =====================================================
-- SAMPLE DATA FOR TESTING
-- =====================================================

-- Insert sample achievements
INSERT INTO achievements (title, description, category, participant_names, event_name, event_date, position, is_featured, is_verified) VALUES
('Tech Escape 2.0 Winners', 'First place in the technical competition', 'competition', ARRAY['Team Cloud9', 'Vineet Gadhwal', 'Tejas Mahurkar', 'Samaira Kale', 'Khushi Agrawal'], 'Tech Escape 2.0', '2025-08-14', '1st Place', true, true),
('Hackathon Excellence', 'Outstanding performance in debugging challenges', 'competition', ARRAY['Team De-Coders', 'Ansh sonkusare', 'Shreyansh jadhao', 'Vardhini aswar', 'Anushka sarode'], 'Bug Bounty Hackathon', '2025-10-07', '2nd Place', true, true);

-- Insert sample announcements
INSERT INTO announcements (title, content, excerpt, category, is_published, is_featured, author_name, publish_date) VALUES
('IEEE Day Celebration', 'Join us for the grand IEEE Day celebration with exciting events and competitions!', 'IEEE Day celebration with events and competitions', 'event', true, true, 'IEEE Team', NOW()),
('New Team Members Welcome', 'We are excited to welcome new members to our IEEE Student Branch family!', 'Welcome new IEEE team members', 'general', true, false, 'IEEE Team', NOW());

-- =====================================================
-- COMPLETION MESSAGE
-- =====================================================
-- Database schema created successfully!
-- This includes all tables, indexes, policies, views, and functions
-- needed for a complete IEEE Student Branch website.
