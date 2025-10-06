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
      url: "https://www.linkedin.com/in/bhupesh-dewangan-ph-d-mieee-051ba6ab/"
    },
    // Leadership Team (Second Row)
    {
      image: "/Arya Kashikar.png",
      title: "Arya Kashikar",
      subtitle: "Advisor",
      handle: "@aryakashikar",
      borderColor: "#3B82F6", // Blue for Advisor
      gradient: "linear-gradient(225deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/arya-kashikar-262b17285/"
    },
    {
      image: "/Parth Choudhari.jpg",
      title: "Parth Choudhari",
      subtitle: "Chair",
      handle: "@parthchoudhari",
      borderColor: "#EF4444", // Red for Chair
      gradient: "linear-gradient(145deg, #EF4444, #000)",
      url: "https://www.linkedin.com/in/parth-choudhari-2073a0294/"
    },
    {
      image: "/Rishabh Thutheja.jpg",
      title: "Rishab Thutheja",
      subtitle: "Vice-Chair",
      handle: "@rishabthutheja",
      borderColor: "#8B5CF6", // Purple for Vice-Chair
      gradient: "linear-gradient(180deg, #8B5CF6, #000)",
      url: "https://www.linkedin.com/in/rishab-thutheja-7547b526b/"
    },
    {
      image: "/Rinku Choudhary.jpg",
      title: "Rinku Choudhary",
      subtitle: "Vice-Chair",
      handle: "@rinkuchoudhary",
      borderColor: "#EC4899", // Pink for Vice-Chair
      gradient: "linear-gradient(210deg, #EC4899, #000)",
      url: "https://www.linkedin.com/in/rinku-choudhary-7251b6293/"
    },
    {
      image: "/Rahul.jpg",
      title: "Rahul Malani",
      subtitle: "Secretary",
      handle: "@rahulmalani",
      borderColor: "#F59E0B", // Orange for Secretary
      gradient: "linear-gradient(165deg, #F59E0B, #000)",
      url: "https://www.linkedin.com/in/rahul-malani-693740284/"
    },
    {
      image: "/Atharva Jaiswal.jpg",
      title: "Atharv Jaiswal",
      subtitle: "Treasurer",
      handle: "@atharvjaiswal",
      borderColor: "#10B981", // Green for Treasurer
      gradient: "linear-gradient(195deg, #10B981, #000)",
      url: "https://www.linkedin.com/in/atharv-jaiswal-51a513286/"
    },
    
    // Event Managers
    {
      image: "/Sanika.jpg",
      title: "Sanika Jumde",
      subtitle: "Event Manager",
      handle: "@sanikajumde",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(145deg, #EAB308, #000)",
      url: "https://www.linkedin.com/in/sanika-jumde-5baa6528a/"
    },
    {
      image: "/Falguni.jpg",
      title: "Falguni Rinke",
      subtitle: "Event Manager",
      handle: "@falgunirinke",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(180deg, #EAB308, #000)",
      url: "https://www.linkedin.com/in/falguni-rinke-4ba9b2352/"
    },
    {
      image: "/Ojaswini.jpg",
      title: "Ojaswini Thote",
      subtitle: "Event Manager",
      handle: "@ojaswinithote",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(210deg, #EAB308, #000)",
      url: "https://www.linkedin.com/in/ojaswini-thote-9a5979320/"
    },
    {
      image: "/Jash.jpg",
      title: "Jash Chauhan",
      subtitle: "Event Manager",
      handle: "@jashchauhan",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(165deg, #EAB308, #000)",
      url: "https://linkedin.com/in/jashchauhan06"
    },
    {
      image: "/Anaya.jpg",
      title: "Anaya Shende",
      subtitle: "Event Manager",
      handle: "@anayashende",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(195deg, #EAB308, #000)",
      url: "https://www.linkedin.com/in/anaya-shende-148470340/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      image: "/Pranati.jpg",
      title: "Pranati Tyagi",
      subtitle: "Event Manager",
      handle: "@pranatityagi",
      borderColor: "#EAB308",  
      gradient: "linear-gradient(225deg, #EAB308, #000)",
      url: "https://www.linkedin.com/in/pranati-tyagi-47a892315/"
    },
    
    // Web Developer
    {
      image: "/Sushmit.jpg",
      title: "Sushmit Partakke",
      subtitle: "Web Developer",
      handle: "@sushmitpartakke",
      borderColor: "#EC4899", // Pink for Web Developer
      gradient: "linear-gradient(135deg, #EC4899, #000)",
      url: "https://www.linkedin.com/in/sushmit-partakke-04bb6b2a9/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    
    // Core Members
    {
      image: "/Jasraj.jpg",
      title: "Jasraj Singh Ataliya",
      subtitle: "Core Member",
      handle: "@jasrajsingh",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(145deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/jasraj-singh-989762347/"
    },
    {
      image: "/Yash.jpg",
      title: "Yash Khadgi",
      subtitle: "Core Member",
      handle: "@yashkhadgi",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(180deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/yash-khadgi-b6528b314/"
    },
    {
      image: "/Ayushi.jpg",
      title: "Ayushi Ray",
      subtitle: "Core Member",
      handle: "@ayushiray",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(210deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/ayushi-ray-306979320/?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
    },
    {
      image: "/Kashish.jpg",
      title: "Kashish Gupta",
      subtitle: "Core Member",
      handle: "@kashishgupta",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(165deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/kashish-gupta-07981b320/"
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
      url: "https://www.linkedin.com/in/tabish-shahroz-mansoori-08a235278/"
    },
    {
      image: "/Sunidhi.png",
      title: "Sunidhi Haware",
      subtitle: "Core Member",
      handle: "@sunidhihaware",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(135deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/sunidhi-haware-797a97323/"
    },
    {
      image: "/Arpita.jpg",
      title: "Arpita Waghmare",
      subtitle: "Core Member",
      handle: "@arpitawaghmare",
      borderColor: "#3B82F6", // Blue for Core Member
      gradient: "linear-gradient(150deg, #3B82F6, #000)",
      url: "https://www.linkedin.com/in/arpita-waghmare-33a5a6314/"
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
