import React from 'react';
import ChromaGrid from './ChromaGrid';

const TeamChroma = () => {
  // IEEE Team data with complete hierarchy and all members
  const ieeeTeam = [
    // Advisor (First Position)
    {
      title: "Arya Kashikar",
      subtitle: "Advisor",
      handle: "@aryakashikar",
      borderColor: "#3B82F6", // Blue for Advisor
      gradient: "linear-gradient(225deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/aryakashikar"
    },
    
    // Leadership Team
    { // Using existing image
      title: "Parth Choudhari",
      subtitle: "Chair",
      handle: "@parthchoudhari",
      borderColor: "#EF4444", // Red for Chair
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://linkedin.com/in/parthchoudhari"
    },
    {
      title: "Rishab Thutheja",
      subtitle: "Vice-Chair",
      handle: "@rishabthutheja",
      borderColor: "#8B5CF6", // Purple for Vice-Chair
      gradient: "linear-gradient(180deg, #8B5CF6, #000)",
      url: "https://linkedin.com/in/rishabthutheja"
    },
    {
      title: "Rinku Choudhary",
      subtitle: "Vice-Chair",
      handle: "@rinkuchoudhary",
      borderColor: "#EC4899", // Pink for Vice-Chair
      gradient: "linear-gradient(210deg, #EC4899, #000)",
      url: "https://linkedin.com/in/rinkuchoudhary"
    },
    {
      title: "Rahul Malani",
      subtitle: "Secretary",
      handle: "@rahulmalani",
      borderColor: "#F59E0B", // Orange for Secretary
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://linkedin.com/in/rahulmalani"
    },
    {
      title: "Atharv Jaiswal",
      subtitle: "Treasurer",
      handle: "@atharvjaiswal",
      borderColor: "#10B981", // Green for Treasurer
      gradient: "linear-gradient(195deg, #10B981, #000)",
      url: "https://linkedin.com/in/atharvjaiswal"
    },
    
    // Event Managers
    {
      title: "Sanika Jumde",
      subtitle: "Event Manager",
      handle: "@sanikajumde",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(145deg, #EAB308, #000)",
      url: "https://linkedin.com/in/sanikajumde"
    },
    {
      title: "Falguni Rinke",
      subtitle: "Event Manager",
      handle: "@falgunirinke",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(180deg, #EAB308, #000)",
      url: "https://linkedin.com/in/falgunirinke"
    },
    {
      title: "Ojaswini Thote",
      subtitle: "Event Manager",
      handle: "@ojaswinithote",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(210deg, #EAB308, #000)",
      url: "https://linkedin.com/in/ojaswinithote"
    },
    {
      image: "/Jash.jpg", // Using existing image
      title: "Jash Chauhan",
      subtitle: "Event Manager",
      handle: "@jashchauhan",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(165deg, #EAB308, #000)",
      url: "https://linkedin.com/in/jashchauhan"
    },
    {
      title: "Anaya Shende",
      subtitle: "Event Manager",
      handle: "@anayashende",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(195deg, #EAB308, #000)",
      url: "https://linkedin.com/in/anayashende"
    },
    {
      title: "Pranati Tyagi",
      subtitle: "Event Manager",
      handle: "@pranatityagi",
      borderColor: "#EAB308", // Yellow for Event Manager
      gradient: "linear-gradient(225deg, #EAB308, #000)",
      url: "https://linkedin.com/in/pranatityagi"
    },
    
    // Web Developer
    {
      title: "Sushmit Partakke",
      subtitle: "Web Developer",
      handle: "@sushmitpartakke",
      borderColor: "#EC4899", // Pink for Web Developer
      gradient: "linear-gradient(135deg, #EC4899, #000)",
      url: "https://linkedin.com/in/sushmitpartakke"
    },
    
    // Core Members
    {
      title: "Jasraj Singh Ataliya",
      subtitle: "Core Member",
      handle: "@jasrajsingh",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/jasrajsingh"
    },
    {
      title: "Yash Khadgi",
      subtitle: "Core Member",
      handle: "@yashkhadgi",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/yashkhadgi"
    },
    {
      title: "Ayushi Ray",
      subtitle: "Core Member",
      handle: "@ayushiray",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(210deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/ayushiray"
    },
    {
      title: "Kashish Gupta",
      subtitle: "Core Member",
      handle: "@kashishgupta",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(165deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/kashishgupta"
    },
    {
      title: "Arya Khandekar",
      subtitle: "Core Member",
      handle: "@aryakhandekar",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(195deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/aryakhandekar"
    },
    {
      title: "Tabish Mansoori",
      subtitle: "Core Member",
      handle: "@tabishmansoori",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(225deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/tabishmansoori"
    },
    {
      title: "Sunidhi Haware",
      subtitle: "Core Member",
      handle: "@sunidhihaware",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(135deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/sunidhihaware"
    },
    {
      title: "Arpita Waghmare",
      subtitle: "Core Member",
      handle: "@arpitawaghmare",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(150deg, #3B82F6, #000)",
      url: "https://linkedin.com/in/arpitawaghmare"
    }
  ];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <div className="text-center py-12">
        <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
          IEEE Leadership Team
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
            damping={0.45}
            fadeOut={0.6}
            ease="power3.out"
          />
        </div>
      </div>

      {/* Footer Info */}
      <div className="text-center py-8 text-gray-400">
        <p style={{ fontFamily: 'Arial, sans-serif' }}>
          Hover over the cards to see the interactive spotlight effect
        </p>
      </div>
    </div>
  );
};

export default TeamChroma;
