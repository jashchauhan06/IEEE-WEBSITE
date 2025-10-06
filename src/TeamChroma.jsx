import React from 'react';
import ChromaGrid from './ChromaGrid';

const TeamChroma = () => {
  // IEEE Team data with complete hierarchy and all members
  const ieeeTeam = [
    // Club Incharge (First Position - Center Only)
    {
      image: "/Bhupesh.png",
      title: "Dr. Bhupesh Dewangan",
      subtitle: "Club Incharge",
      handle: "@bhupeshdewangan",
      borderColor: "#FF6B35", // Orange for Club Incharge
      gradient: "linear-gradient(180deg, #FF6B35, #000)",
      url: "https://linkedin.com"
    },
    // Leadership Team (Second Row)
    {
      image: "/Arya Kashikar.png",
      title: "Arya Kashikar",
      subtitle: "Advisor",
      handle: "@aryakashikar",
      borderColor: "#3B82F6", // Blue for Advisor
      gradient: "linear-gradient(225deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Parth Choudhari.jpg",
      title: "Parth Choudhari",
      subtitle: "Chair",
      handle: "@parthchoudhari",
      borderColor: "#EF4444", // Red for Chair
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Rishabh Thutheja.jpg",
      title: "Rishab Thutheja",
      subtitle: "Vice-Chair",
      handle: "@rishabthutheja",
      borderColor: "#8B5CF6", // Purple for Vice-Chair
      gradient: "linear-gradient(180deg, #8B5CF6, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Rinku Choudhary.jpg",
      title: "Rinku Choudhary",
      subtitle: "Vice-Chair",
      handle: "@rinkuchoudhary",
      borderColor: "#EC4899", // Pink for Vice-Chair
      gradient: "linear-gradient(210deg, #EC4899, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Rahul Malani",
      subtitle: "Secretary",
      handle: "@rahulmalani",
      borderColor: "#F59E0B", // Orange for Secretary
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Atharva Jaiswal.jpg",
      title: "Atharv Jaiswal",
      subtitle: "Treasurer",
      handle: "@atharvjaiswal",
      borderColor: "#10B981", // Green for Treasurer
      gradient: "linear-gradient(195deg, #10B981, #000)",
      url: "https://linkedin.com/"
    },
    
    // Event Managers
    {
      title: "Sanika Jumde",
      subtitle: "Event Manager",
      handle: "@sanikajumde",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(145deg, #EAB308, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Falguni Rinke",
      subtitle: "Event Manager",
      handle: "@falgunirinke",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(180deg, #EAB308, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Ojaswini Thote",
      subtitle: "Event Manager",
      handle: "@ojaswinithote",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(210deg, #EAB308, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Jash.jpg",
      title: "Jash Chauhan",
      subtitle: "Event Manager",
      handle: "@jashchauhan",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(165deg, #EAB308, #000)",
      url: "https://linkedin.com/in/jashchauhan06"
    },
    {
      title: "Anaya Shende",
      subtitle: "Event Manager",
      handle: "@anayashende",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(195deg, #EAB308, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Pranati Tyagi",
      subtitle: "Event Manager",
      handle: "@pranatityagi",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(225deg, #EAB308, #000)",
      url: "https://linkedin.com"
    },
    
    // Web Developer
    {
      title: "Sushmit Partakke",
      subtitle: "Web Developer",
      handle: "@sushmitpartakke",
      borderColor: "#EC4899", // Pink for Web Developer
      gradient: "linear-gradient(135deg, #EC4899, #000)",
      url: "https://linkedin.com"
    },
    
    // Core Members
    {
      image: "/Jasraj.jpg",
      title: "Jasraj Singh Ataliya",
      subtitle: "Core Member",
      handle: "@jasrajsingh",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Yash Khadgi",
      subtitle: "Core Member",
      handle: "@yashkhadgi",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Ayushi Ray",
      subtitle: "Core Member",
      handle: "@ayushiray",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(210deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Kashish Gupta",
      subtitle: "Core Member",
      handle: "@kashishgupta",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(165deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Arya Khandekar",
      subtitle: "Core Member",
      handle: "@aryakhandekar",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(195deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Tabish Mansoori",
      subtitle: "Core Member",
      handle: "@tabishmansoori",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(225deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      image: "/Sunidhi.png",
      title: "Sunidhi Haware",
      subtitle: "Core Member",
      handle: "@sunidhihaware",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(135deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    },
    {
      title: "Arpita Waghmare",
      subtitle: "Core Member",
      handle: "@arpitawaghmare",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(150deg, #3B82F6, #000)",
      url: "https://linkedin.com"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
          IEEE Core Team
        </h1>
        <p className="text-lg text-gray-400 mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
          Meet our dedicated team leading the IEEE Student Branch
        </p>
        <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
      </div>

      {/* ChromaGrid Component */}
      <div className="w-full flex justify-center">
        <div style={{ 
          minHeight: '1200px', 
          position: 'relative',
          width: '100%',
          maxWidth: '1200px',
          paddingBottom: '2rem'
        }}>
          <ChromaGrid 
            items={ieeeTeam}
            radius={300}
            columns={3}
            rows={Math.ceil(ieeeTeam.length / 3)}
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>
    </div>
  );
};

export default TeamChroma;
