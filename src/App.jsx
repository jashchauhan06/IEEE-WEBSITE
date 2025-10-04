import React, { useState } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import "remixicon/fonts/remixicon.css";
import { addRegistration } from './supabase';

function App() {
  let [showContent, setShowContent] = useState(false);
  let [currentPage, setCurrentPage] = useState('home');
  let [selectedEvent, setSelectedEvent] = useState(null);

  useGSAP(() => {
    const tl = gsap.timeline();

    tl.to(".vi-mask-group", {
      rotate: 10,
      duration: 2,
      ease: "Power4.easeInOut",
      transformOrigin: "50% 50%",
    }).to(".vi-mask-group", {
      scale: 10,
      duration: 2,
      delay: -1.8,
      ease: "Expo.easeInOut",
      transformOrigin: "50% 50%",
      opacity: 0,
      onUpdate: function () {
        if (this.progress() >= 0.9) {
          const svgElement = document.querySelector(".svg");
          if (svgElement) {
            svgElement.remove();
          }
          setShowContent(true);
          this.kill();
        }
      },
    });
  });

  useGSAP(() => {
    if (!showContent) return;

    // Ensure loading screen is removed when content shows
    const svgElement = document.querySelector(".svg");
    if (svgElement) {
      svgElement.remove();
    }

    gsap.to(".main", {
      scale: 1,
      duration: 2,
      delay: "-1",
      ease: "Expo.easeInOut",
    });



    gsap.to(".character", {
      scale: 1.0,
      x: "-50%",
      bottom: "-60%",
      duration: 2,
      delay: "-.8",
      ease: "Expo.easeInOut",
    });


    const main = document.querySelector(".main");

    main?.addEventListener("mousemove", function (e) {
      const xMove = (e.clientX / window.innerWidth - 0.5) * 20;
    });
  }, [showContent]);

  return (
    <>
      <div className="svg flex items-center justify-center fixed top-0 left-0 z-[10] w-full h-screen overflow-hidden bg-[#000]">
        <svg viewBox="0 0 800 600" preserveAspectRatio="xMidYMid slice">
          <defs>
            <mask id="viMask">
              <rect width="100%" height="100%" fill="black" />
              <g className="vi-mask-group">
                <text
                  x="50%"
                  y="50%"
                  fontSize="200"
                  textAnchor="middle"
                  fill="white"
                  dominantBaseline="middle"
                  fontFamily="Arial Black"
                >
                  IEEE
                </text>
              </g>
            </mask>
          </defs>
          <image
            href="./bg.png"
            width="100%"
            height="100%"
            preserveAspectRatio="xMidYMid slice"
            mask="url(#viMask)"
          />
        </svg>
      </div>
      {showContent && (
        <div className="main w-full">
          {/* Navigation Bar */}
          <nav
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              zIndex: 100,
              background: '#2f9aa6', // Teal background
              color: '#ffffff', // White text
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '1.5rem 2rem',
              boxShadow: 'none', // No shadow for pure transparency
              border: 'none'
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <button 
                onClick={() => setCurrentPage('home')}
                style={{ 
                  background: 'none', 
                  border: 'none', 
                  cursor: 'pointer',
                  padding: '4px',
                  borderRadius: '8px',
                  transition: 'background-color 0.3s ease'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = 'rgba(255,255,255,0.1)'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'transparent'}
              >
              <img 
                src="./ieee_stb.png" 
                  alt="IEEE Logo - Click to go home" 
                style={{ height: '40px', width: 'auto' }}
              />
              </button>
              <div style={{ fontWeight: 'normal', fontSize: '1.5rem', letterSpacing: 2, fontFamily: 'Arial, sans-serif' }}>
                IEEE SIT Nagpur
              </div>
            </div>
            <ul style={{
              display: 'flex',
              gap: '2.5rem',
              listStyle: 'none',
              margin: 0,
              padding: 0
            }}>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('home'); }} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}>Home</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('events'); }} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}>Events</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('team'); }} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}>Team</a></li>
            <li><a href="#" onClick={(e) => { e.preventDefault(); setCurrentPage('about'); }} style={{ color: 'inherit', textDecoration: 'none', fontWeight: 'normal', fontFamily: 'Arial, sans-serif', cursor: 'pointer' }}>About</a></li>
            </ul>
          </nav>

          {/* Event Details Page */}
          {currentPage === 'event-details' && selectedEvent && (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
              <div className="container mx-auto px-6 py-12">
                {/* Back Button */}
                <button
                  onClick={() => setCurrentPage('home')}
                  className="mb-8 flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300"
                  style={{ fontFamily: 'Arial, sans-serif' }}
                >
                  <i className="ri-arrow-left-line text-xl"></i>
                  <span className="text-lg font-medium">Back to Events</span>
                </button>

                {/* Event Header */}
                <div className="bg-white rounded-2xl shadow-2xl overflow-hidden mb-8">
                  <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-8 text-white">
                    <div className="flex justify-between items-start mb-6">
                      <div className="bg-white/20 px-4 py-2 rounded-full text-sm font-semibold tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>
                        ✓ Event Completed Successfully
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>14 AUG</div>
                        <div className="text-sm font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>2025</div>
                      </div>
                    </div>
                    <h1 className="text-5xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {selectedEvent.name}
                    </h1>
                    <p className="text-2xl font-medium opacity-90 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                      {selectedEvent.subtitle}
                    </p>
                    <div className="flex items-center gap-6 text-lg font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                      <span className="flex items-center gap-2">
                        <i className="ri-calendar-line text-xl"></i>
                        {selectedEvent.date}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="ri-time-line text-xl"></i>
                        {selectedEvent.time}
                      </span>
                      <span className="flex items-center gap-2">
                        <i className="ri-map-pin-line text-xl"></i>
                        {selectedEvent.location}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Event Content */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                  {/* Main Content */}
                  <div className="lg:col-span-2">
                    <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
                      <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Event Report: Tech Escape 2.0
                      </h2>
                      
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                        <div>
                          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Information</h3>
                          <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <p><strong>Title:</strong> Tech Escape 2.0</p>
                            <p><strong>Duration:</strong> 01 Day</p>
                            <p><strong>Date:</strong> 14/08/25</p>
                            <p><strong>Mode:</strong> Offline</p>
                            <p><strong>Department:</strong> Computer Science and Engineering, SIT Nagpur</p>
                            <p><strong>Organizing Cell:</strong> IEEE Student Branch, SIT Nagpur</p>
                          </div>
                        </div>
                        <div>
                          <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Organizing Committee</h3>
                          <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <p><strong>Faculty Coordinator:</strong> Dr. Bhupesh Dewangan</p>
                            <p><strong>SRC Coordinator:</strong> Dr. Snehlata Wankhade</p>
                            <p><strong>IEEE Chair:</strong> Parth Choudhari</p>
                          </div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Objectives</h3>
                      <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <li>Encourage teamwork, communication, and logical problem-solving through gamified activities</li>
                        <li>Provide an engaging, hands-on experience that combines digital puzzles with physical exploration</li>
                        <li>Promote student participation, leadership, and decision-making in a fun environment</li>
                        <li>Foster a spirit of inclusiveness and unity among students of diverse backgrounds</li>
                        <li>Challenge attendees to think critically and solve cybersecurity challenges</li>
                      </ul>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Description</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Tech Escape was an exciting and adventurous two-hour event conducted by the IEEE Student Branch, SIT Nagpur, in rooms S08 and S02.
                        The event comprised three rounds designed to test participants' problem-solving, logical thinking, and teamwork abilities.
                      </p>
                      <ol className="list-decimal list-inside space-y-2 mb-6 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <li>The first round was a capture-the-flag style online puzzle challenge, where teams solved riddles to unlock clues</li>
                        <li>In the second round, students raced to collect puzzle pieces forming the IEEE logo, with only the first 10 teams progressing to the finale</li>
                        <li>The final round took participants across the SIU campus in search of the winning bike among decoys</li>
                        <li>The team that successfully solved the final riddle and blew the horn at the correct location was declared the winner</li>
                      </ol>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Participation Statistics</h3>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Arial, sans-serif' }}>140+</div>
                          <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Students</div>
                        </div>
                        <div className="bg-green-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Arial, sans-serif' }}>25</div>
                          <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Volunteers</div>
                        </div>
                        <div className="bg-purple-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-purple-600" style={{ fontFamily: 'Arial, sans-serif' }}>2</div>
                          <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Teaching Staff</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg text-center">
                          <div className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Arial, sans-serif' }}>168</div>
                          <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Total</div>
                        </div>
                      </div>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Achieved Outcomes</h3>
                      <p className="text-lg text-gray-600 leading-relaxed mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                        The Tech Escape event successfully engaged students in an innovative blend of digital and on-campus challenges, fulfilling its objectives of fostering teamwork, problem-solving, and decision-making skills. Students improved their ability to work collaboratively under time constraints, communicated effectively to solve puzzles, and explored the campus in an enjoyable way.
                      </p>

                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Winners</h3>
                      <div className="space-y-3 mb-6">
                        <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                          <div className="font-bold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>🥇 1st Place: Team Cloud9</div>
                          <div className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Vineet Gadhwal, Tejas Mahurkar, Samaira Kale, Khushi Agrawal</div>
                        </div>
                        <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                          <div className="font-bold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>🥈 2nd Place: Team De-Coders</div>
                          <div className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Ansh sonkusare, Shreyansh jadhao, Vardhini aswar, Anushka sarode</div>
                        </div>
                        <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                          <div className="font-bold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>🥉 3rd Place: Team Vault Breakers</div>
                          <div className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Shruti Kale, Keyuri Buddhe, Anvita Kulkarni, Savani Kulkarni</div>
                        </div>
                      </div>
                      
                      <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Event Details
                      </h3>
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 text-lg text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <i className="ri-calendar-line text-blue-600"></i>
                          <span><strong>Date:</strong> {selectedEvent.day}, {selectedEvent.date}</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <i className="ri-time-line text-blue-600"></i>
                          <span><strong>Time:</strong> {selectedEvent.time}</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <i className="ri-map-pin-line text-blue-600"></i>
                          <span><strong>Location:</strong> {selectedEvent.location}</span>
                        </div>
                        <div className="flex items-center gap-3 text-lg text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                          <i className="ri-building-line text-blue-600"></i>
                          <span><strong>Organizer:</strong> {selectedEvent.organizer}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Sidebar */}
                  <div className="lg:col-span-1">
                    {/* Event Poster */}
                    <div className="mb-6">
                      <img src="/Tech_Escape.jpg" alt="Tech Escape 2.0 Event Poster" className="w-full h-auto object-contain rounded-lg shadow-lg" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>

                    {/* Contacts */}
                    <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Management Team
                      </h3>
                      <div className="space-y-3">
                        {selectedEvent.contacts.map((contact, index) => (
                          <div key={index} className="flex items-center gap-3 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <i className="ri-user-line text-blue-600"></i>
                            <span>{contact}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Event Tags */}
                    <div className="bg-white rounded-2xl shadow-2xl p-6 mb-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Event Categories
                      </h3>
                      <div className="flex flex-wrap gap-2">
                        <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {selectedEvent.category}
                        </span>
                        <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {selectedEvent.organizer}
                        </span>
                        <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>
                          {selectedEvent.target}
                        </span>
                      </div>
                    </div>

                    {/* Status */}
                    <div className="bg-white rounded-2xl shadow-2xl p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Event Status
                      </h3>
                      <div className="bg-green-100 text-green-800 px-4 py-3 rounded-lg text-center font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                        ✓ {selectedEvent.status} Successfully
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Page Content with Top Padding for Fixed Nav */}
          {currentPage !== 'event-details' && (
          <div className="pt-20">
            {/* Home Page */}
            {currentPage === 'home' && (
              <>
                <div className="landing relative w-full h-screen bg-black">
                  <div className="imagesdiv relative w-full h-screen">
                    <img
                      className="absolute bg top-0 left-0 w-full h-full object-cover z-[2]"
                      src="./bg.png"
                      alt=""
                    />
                    <div style={{ 
                      position: 'absolute', 
                      top: '45%', 
                      left: '50%', 
                      transform: 'translate(-50%, -50%)', 
                      zIndex: 6, 
                      color: 'white', 
                      textAlign: 'center',
                      fontSize: '7rem',
                      fontFamily: 'pricedown, Arial, sans-serif',
                      fontWeight: 'bold',
                      textShadow: '0 0 20px rgba(255,255,255,0.5), 0 0 40px rgba(255,255,255,0.3)',
                      whiteSpace: 'pre-line',
                      lineHeight: '1.2'
                    }}>
                      IEEE STUDENT{'\n'}BRANCH{'\n'}SIT NAGPUR
                    </div>
                    <img
                      className="absolute character -bottom-[50%] left-1/2 -translate-x-1/2 scale-[1.0] z-[5]"
                      src="./girlbg.png"
                      alt=""
                    />
                  </div>
                  <div className="btmbar text-white absolute bottom-0 left-0 w-full py-15 px-10 bg-gradient-to-t from-black to-transparent z-[7]">
                    <div className="flex gap-4 items-center">
                      <i className="text-4xl ri-arrow-down-line"></i>
                      <h3 className="text-xl font-[Helvetica_Now_Display]">
                        Scroll Down
                      </h3>
                    </div>
                  </div>
                </div>

                <div className="w-full flex justify-center bg-black py-10 relative z-[8]">
                  <div className="flex text-white w-full px-10">
                    <div className="ieee-formation-container">
                      <img
                        className="ieee-formation-image"
                        src="./IEEE_FORMATION.png"
                        alt="IEEE Student Formation at SIT Nagpur"
                      />
                    </div>
                    <div className="ieee-text-container">
                      <h1 className="ieee-main-title">IEEE Student Chapter</h1>
                      <h1 className="ieee-subtitle">SIT Nagpur</h1>
                      <p className="ieee-description">
                        The IEEE Student Branch at Symbiosis Institute of Technology, Nagpur, is a dynamic platform dedicated to fostering innovation, technical excellence, and research-driven learning among students.
                      </p>
                      <p className="ieee-description">
                        Its primary objectives include promoting knowledge sharing in emerging technologies, facilitating hands-on workshops and projects, and encouraging active participation in research and development initiatives.
                      </p>
                      <p className="ieee-description">
                        The branch aims to create opportunities for students to collaborate on innovative ideas, publish research papers, and engage with professionals and peers globally. By nurturing technical and professional skills, it empowers members to contribute to technological advancements and research breakthroughs that benefit society.
                      </p>
                      <button 
                        className="ieee-contact-button"
                        onClick={() => setCurrentPage('events')}
                        style={{ cursor: 'pointer', fontFamily: 'Arial, sans-serif' }}
                      >
                        Events Details
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* Event Details Page */}
            {currentPage === 'events' && (
              <div className="w-full min-h-screen bg-gradient-to-b from-gray-900 to-black py-20 relative z-[8]">
                <div className="text-white max-w-7xl mx-auto px-10">
                  <div className="text-center mb-16">
                    <h1 className="text-6xl mb-4 font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>Event Details</h1>
                    <p className="text-xl text-gray-300" style={{ fontFamily: 'Arial, sans-serif' }}>Discover our amazing events and workshops</p>
                  </div>

                  {/* Past Events Section */}
                  <div className="mb-20">
                    <div className="text-center mb-12">
                      <h2 className="text-5xl mb-4 font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>Past Events</h2>
                      <p className="text-lg text-gray-400" style={{ fontFamily: 'Arial, sans-serif' }}>Highlights from our previous events</p>
                    </div>

                    <div className="flex justify-center">
                      <div className="w-full max-w-md">
                      {/* Event Card 1 - Tech Escape 2.0 */}
                      <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300">
                        <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>✓ Event Completed Successfully</div>
                            <div className="text-right">
                              <div className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>14 AUG</div>
                              <div className="text-xs font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>2025</div>
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>TECH ESCAPE 2.0</h3>
                          <p className="text-lg font-medium opacity-90" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE EVENT FOR 1ST YEAR</p>
                          <div className="flex items-center gap-4 mt-4 text-sm font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> August 14, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 3:00 PM - 4:45 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> S-02 & S-08</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>Tech Escape 2.0 - IEEE Event</h4>
                          <p className="text-gray-600 mb-4 leading-relaxed font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Join us for Tech Escape 2.0, an exciting IEEE event designed specifically for first-year students! This technical event will provide hands-on experience with cutting-edge technology and innovative problem-solving challenges.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> Thursday, August 14, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 03:00 PM - 04:45 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> 2nd Floor</span>
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-user-line"></i> Parth Choudhari</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Technical</span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE</span>
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>1st Year</span>
                          </div>
                          <button 
                            onClick={() => {
                              setSelectedEvent({
                                name: "Tech Escape 2.0",
                                subtitle: "IEEE EVENT FOR 1ST YEAR",
                                date: "August 14, 2025",
                                time: "3:00 PM - 4:45 PM",
                                location: "S-02 & S-08",
                                day: "Thursday",
                                contacts: [
                                  "Dr. Bhupesh Dewangan",
                                  "Parth Choudhari", 
                                  "Rishab Thutheja",
                                  "Jash Chauhan",
                                  "Atharv Jaiswal",
                                  "Rahul Malani",
                                  "Ojaswini Thote",
                                  "Sanika Jumde",
                                  "Falguni Rinke",
                                  "Anaya Shende",
                                  "Pranati Tyagi",
                                  "Sushmit Partakke",
                                  "Jasraj Singh Ataliya",
                                  "Yash Khadgi",
                                  "Ayushi Ray",
                                  "Kashish Gupta",
                                  "Arya Khandekar",
                                  "Tabish Mansoori",
                                  "Sunidhi Haware",
                                  "Arpita Waghmare"
                                ],
                                category: "Technical",
                                organizer: "IEEE",
                                target: "1st Year",
                                description: "Join us for Tech Escape 2.0, an exciting IEEE event designed specifically for first-year students! This technical event will provide hands-on experience with cutting-edge technology and innovative problem-solving challenges.",
                                status: "Completed"
                              });
                              setCurrentPage('event-details');
                            }}
                            className="bg-blue-100 text-blue-800 px-4 py-2 rounded-lg text-center font-bold hover:bg-blue-200 transition-colors duration-300 w-full" 
                            style={{ fontFamily: 'Arial, sans-serif' }}
                          >
                            View Event Details
                          </button>
                        </div>
                      </div>
                      </div>
                    </div>
                  </div>

                  {/* Upcoming Events Section */}
                  <div>
                    <div className="text-center mb-12">
                      <h2 className="text-5xl mb-4 font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>Upcoming Events</h2>
                      <p className="text-lg text-gray-400" style={{ fontFamily: 'Arial, sans-serif' }}>Don't miss out on these exciting upcoming events</p>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                      {/* Upcoming Event 1 - Bug Bounty Hackathon */}
                      <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-red-400">
                        <div className="bg-gradient-to-r from-red-600 to-pink-600 p-6 text-white">
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-white/20 px-3 py-1 rounded-full text-xs font-semibold tracking-wide" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE STUDENT BRANCH PRESENTS</div>
                            <div className="text-right">
                              <div className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>07 OCT</div>
                              <div className="text-xs font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>2025</div>
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>BUG BOUNTY HACKATHON</h3>
                          <p className="text-lg font-medium opacity-90" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE DAY EVENT</p>
                          <div className="flex items-center gap-4 mt-4 text-sm font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> October 7, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 10:00 AM - 4:00 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> S-02 & S-08</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>Bug Bounty Hackathon</h4>
                          <p className="text-gray-600 mb-4 leading-relaxed font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            A unique coding event blending hackathon and bug bounty challenges. First-year students participate in coding competitions, while advanced students tackle real-world debugging, fixing, and optimizing codebases.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4 font-medium" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> Tuesday, October 7, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 10:00 AM - 04:00 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> S-02 & S-08</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-red-100 text-red-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Hackathon</span>
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Debugging</span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>Bug Bounty</span>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm font-semibold" style={{ fontFamily: 'Arial, sans-serif' }}>CSE</span>
                          </div>
                          <button 
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg transition-colors duration-300 text-lg" 
                            style={{ fontFamily: 'Arial, sans-serif' }}
                            onClick={() => setCurrentPage('registration')}
                          >
                            Register Now
                          </button>
                        </div>
                      </div>

                      {/* Upcoming Event 2 - Salesforce Workshop */}
                      <div className="bg-white rounded-xl shadow-2xl overflow-hidden transform hover:scale-105 transition-all duration-300 border-2 border-blue-400">
                        <div className="bg-gradient-to-r from-blue-600 to-cyan-600 p-6 text-white">
                          <div className="flex justify-between items-start mb-4">
                            <div className="bg-white/20 px-3 py-1 rounded-full text-sm font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE STUDENT BRANCH PRESENTS</div>
                            <div className="text-right">
                              <div className="text-2xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>15 APR</div>
                              <div className="text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>2025</div>
                            </div>
                          </div>
                          <h3 className="text-3xl font-bold mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>SALESFORCE WORKSHOP</h3>
                          <p className="text-lg opacity-90" style={{ fontFamily: 'Arial, sans-serif' }}>LEARN. BUILD. DEPLOY.</p>
                          <div className="flex items-center gap-4 mt-4 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> April 15, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 2:00 PM - 5:00 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> SO-8 & SO-2</span>
                          </div>
                        </div>
                        <div className="p-6">
                          <h4 className="text-2xl font-bold text-gray-800 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>Salesforce for the Future: Skills that Matter</h4>
                          <p className="text-gray-600 mb-4 leading-relaxed" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Master the Salesforce platform and develop essential skills for the future! Learn about CRM, cloud computing, automation, and how to build scalable business solutions that matter in today's digital world.
                          </p>
                          <div className="flex items-center gap-4 text-sm text-gray-500 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                            <span className="flex items-center gap-1"><i className="ri-calendar-line"></i> Tuesday, April 15, 2025</span>
                            <span className="flex items-center gap-1"><i className="ri-time-line"></i> 02:00 PM - 05:00 PM</span>
                            <span className="flex items-center gap-1"><i className="ri-map-pin-line"></i> SO-8 & SO-2</span>
                          </div>
                          <div className="flex flex-wrap gap-2 mb-4">
                            <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Salesforce</span>
                            <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>CRM</span>
                            <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Cloud Computing</span>
                            <span className="bg-orange-100 text-orange-800 px-3 py-1 rounded-full text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>Automation</span>
                          </div>
                          <button className="w-full bg-gray-400 text-gray-600 font-bold py-3 px-6 rounded-lg cursor-not-allowed text-lg" style={{ fontFamily: 'Arial, sans-serif' }} disabled>
                            Registration Not Open Yet
                          </button>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Team Page */}
            {currentPage === 'team' && (
              <div className="w-full min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 relative z-[8]">
                <div className="text-center max-w-7xl mx-auto px-4 sm:px-10">
                  <div className="mb-16">
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Our Core Team
                    </h1>
                    <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Meet the brilliant minds behind IEEE SIT Nagpur - passionate students driving innovation and excellence in technology.
                    </p>
                    <div className="w-24 h-1 bg-gradient-to-r from-red-500 to-red-600 mx-auto mt-6 rounded-full"></div>
                  </div>

                  {/* Leadership Team */}
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Leadership Team
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-cyan-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                      {/* Arya Kashikar - Advisor */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-blue-500 bg-gradient-to-br from-blue-100 to-cyan-100 flex items-center justify-center">
                              <span className="text-blue-600 text-2xl font-bold">AK</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Arya Kashikar
                          </h3>
                          <p className="text-blue-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Advisor
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Faculty advisor providing guidance and support for IEEE activities and initiatives.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-blue-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Parth Choudhari - Chair */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-emerald-500 bg-gradient-to-br from-emerald-100 to-green-100 flex items-center justify-center">
                              <span className="text-emerald-600 text-2xl font-bold">PC</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Parth Choudhari
                          </h3>
                          <p className="text-emerald-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Chair
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Leading the IEEE chapter with vision and dedication to promote technology and innovation.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-emerald-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Rishab Thutheja - Vice-Chair */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-purple-500 bg-gradient-to-br from-purple-100 to-indigo-100 flex items-center justify-center">
                              <span className="text-purple-600 text-2xl font-bold">RT</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Rishab Thutheja
                          </h3>
                          <p className="text-purple-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Vice-Chair
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Supporting the chair in leading IEEE initiatives and managing chapter operations.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-purple-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Rinku Choudhary - Vice-Chair */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-pink-500 bg-gradient-to-br from-pink-100 to-rose-100 flex items-center justify-center">
                              <span className="text-pink-600 text-2xl font-bold">RC</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Rinku Choudhary
                          </h3>
                          <p className="text-pink-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Vice-Chair
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Co-leading IEEE activities and ensuring smooth coordination of events and programs.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-pink-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Rahul Malani - Secretary */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-orange-500 bg-gradient-to-br from-orange-100 to-red-100 flex items-center justify-center">
                              <span className="text-orange-600 text-2xl font-bold">RM</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Rahul Malani
                          </h3>
                          <p className="text-orange-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Secretary
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Managing communications, documentation, and administrative tasks for IEEE.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-orange-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Atharv Jaiswal - Treasurer */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-amber-500 bg-gradient-to-br from-amber-100 to-yellow-100 flex items-center justify-center">
                              <span className="text-amber-600 text-2xl font-bold">AJ</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Atharv Jaiswal
                          </h3>
                          <p className="text-amber-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Treasurer
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Managing financial aspects and budgeting for IEEE events and activities.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-amber-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Event Managers */}
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Event Managers
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                      {/* Sanika Jumde - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-green-500 bg-gradient-to-br from-green-100 to-emerald-100 flex items-center justify-center">
                              <span className="text-green-600 text-2xl font-bold">SJ</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Sanika Jumde
                          </h3>
                          <p className="text-green-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Coordinating seminars and managing participant engagement for IEEE events.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-green-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Falguni Rinke - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-teal-500 bg-gradient-to-br from-teal-100 to-cyan-100 flex items-center justify-center">
                              <span className="text-teal-600 text-2xl font-bold">FR</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Falguni Rinke
                          </h3>
                          <p className="text-teal-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Organizing and managing IEEE events, workshops, and technical sessions.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-teal-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Ojaswini Thote - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-indigo-500 bg-gradient-to-br from-indigo-100 to-blue-100 flex items-center justify-center">
                              <span className="text-indigo-600 text-2xl font-bold">OT</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Ojaswini Thote
                          </h3>
                          <p className="text-indigo-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Coordinating seminars and managing participant engagement for IEEE events.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-indigo-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Jash Chauhan - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-violet-500">
                              <img
                                src="/Jash.jpg"
                                alt="Jash Chauhan"
                                className="w-full h-full object-cover"
                                onError={(e) => {
                                  e.currentTarget.src = '/ieee_circle.png'
                                }}
                              />
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Jash Chauhan
                          </h3>
                          <p className="text-violet-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Organizing and managing IEEE events, workshops, and technical sessions.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-violet-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-violet-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Anaya Shende - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-rose-500 bg-gradient-to-br from-rose-100 to-pink-100 flex items-center justify-center">
                              <span className="text-rose-600 text-2xl font-bold">AS</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Anaya Shende
                          </h3>
                          <p className="text-rose-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Coordinating seminars and managing participant engagement for IEEE events.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-rose-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Pranati Tyagi - Event Manager */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-sky-500 bg-gradient-to-br from-sky-100 to-cyan-100 flex items-center justify-center">
                              <span className="text-sky-600 text-2xl font-bold">PT</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Pranati Tyagi
                          </h3>
                          <p className="text-sky-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Event Manager
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Organizing and managing IEEE events, workshops, and technical sessions.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-sky-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Web Developer */}
                  <div className="mb-16">
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Web Developer
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-cyan-500 to-blue-500 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10">
                      {/* Sushmit Partakke - Web Developer */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-cyan-500 bg-gradient-to-br from-cyan-100 to-blue-100 flex items-center justify-center">
                              <span className="text-cyan-600 text-2xl font-bold">SP</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Sushmit Partakke
                          </h3>
                          <p className="text-cyan-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Web Developer
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Developing and maintaining web applications and digital solutions for IEEE initiatives.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-200">
                              <i className="ri-github-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-cyan-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Core Members */}
                  <div>
                    <div className="text-center mb-12">
                      <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Core Members
                      </h2>
                      <div className="w-20 h-1 bg-gradient-to-r from-gray-500 to-gray-600 mx-auto rounded-full"></div>
                    </div>
                    
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-10">
                      {/* Jasraj Singh Ataliya */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-gray-500 bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center">
                              <span className="text-gray-600 text-2xl font-bold">JA</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Jasraj Singh Ataliya
                          </h3>
                          <p className="text-gray-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Yash Khadgi */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-slate-500 bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center">
                              <span className="text-slate-600 text-2xl font-bold">YK</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Yash Khadgi
                          </h3>
                          <p className="text-slate-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Ayushi Ray */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-zinc-500 bg-gradient-to-br from-zinc-100 to-gray-100 flex items-center justify-center">
                              <span className="text-zinc-600 text-2xl font-bold">AR</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Ayushi Ray
                          </h3>
                          <p className="text-zinc-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-zinc-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-zinc-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Kashish Gupta */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-neutral-500 bg-gradient-to-br from-neutral-100 to-gray-100 flex items-center justify-center">
                              <span className="text-neutral-600 text-2xl font-bold">KG</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Kashish Gupta
                          </h3>
                          <p className="text-neutral-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-neutral-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-neutral-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Arya Khandekar */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-stone-500 bg-gradient-to-br from-stone-100 to-gray-100 flex items-center justify-center">
                              <span className="text-stone-600 text-2xl font-bold">AK</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Arya Khandekar
                          </h3>
                          <p className="text-stone-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-stone-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-stone-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Tabish Mansoori */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-gray-500 bg-gradient-to-br from-gray-100 to-slate-100 flex items-center justify-center">
                              <span className="text-gray-600 text-2xl font-bold">TM</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Tabish Mansoori
                          </h3>
                          <p className="text-gray-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Sunidhi Haware */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-slate-500 bg-gradient-to-br from-slate-100 to-gray-100 flex items-center justify-center">
                              <span className="text-slate-600 text-2xl font-bold">SH</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Sunidhi Haware
                          </h3>
                          <p className="text-slate-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-slate-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>

                      {/* Arpita Waghmare */}
                      <div className="group bg-white rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 overflow-hidden border border-gray-100">
                        <div className="p-8 text-center">
                          <div className="relative mb-4">
                            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-3 border-zinc-500 bg-gradient-to-br from-zinc-100 to-gray-100 flex items-center justify-center">
                              <span className="text-zinc-600 text-2xl font-bold">AW</span>
                            </div>
                          </div>
                          <h3 className="text-lg font-semibold text-gray-900 mb-1" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Arpita Waghmare
                          </h3>
                          <p className="text-zinc-600 font-medium mb-2 text-sm" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Core Member
                          </p>
                          <p className="text-xs text-gray-600 mb-3" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Active core member contributing to IEEE initiatives and community building.
                          </p>
                          <div className="flex justify-center space-x-2">
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-zinc-500 hover:text-white transition-colors duration-200">
                              <i className="ri-linkedin-fill text-xs"></i>
                            </a>
                            <a href="#" className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center hover:bg-zinc-500 hover:text-white transition-colors duration-200">
                              <i className="ri-mail-line text-xs"></i>
                            </a>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* 404 Page */}
            {currentPage === '404' && (
              <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 py-20 relative z-[8] overflow-hidden">
                {/* Animated Background Elements */}
                <div className="absolute inset-0 overflow-hidden">
                  <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl animate-pulse"></div>
                  <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
                  <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-cyan-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
                </div>

                <div className="relative z-10 text-center max-w-6xl mx-auto px-10">
                  {/* Main 404 Content */}
                  <div className="mb-16">
                    <h1 className="text-9xl md:text-[12rem] font-bold bg-gradient-to-r from-yellow-400 via-red-500 to-pink-500 bg-clip-text text-transparent animate-pulse mb-8" style={{ fontFamily: 'Arial, sans-serif' }}>
                      404
                    </h1>
                    <h2 className="text-5xl md:text-6xl font-bold text-white mb-6 animate-bounce" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Oops! Page Not Found
                    </h2>
                    <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed mb-12" style={{ fontFamily: 'Arial, sans-serif' }}>
                      The page you're looking for seems to have vanished into the digital void. 
                      Don't worry, even the best engineers encounter bugs sometimes!
                    </p>
                  </div>

                  {/* Animated Robot/Character */}
                  <div className="mb-16 flex justify-center">
                    <div className="relative">
                      <div className="w-48 h-48 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-full flex items-center justify-center shadow-2xl animate-bounce">
                        <div className="text-6xl">🤖</div>
                      </div>
                      <div className="absolute -top-4 -right-4 w-8 h-8 bg-red-500 rounded-full animate-ping"></div>
                      <div className="absolute -bottom-4 -left-4 w-6 h-6 bg-yellow-400 rounded-full animate-pulse"></div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col md:flex-row gap-6 justify-center items-center mb-16">
                    <button 
                      onClick={() => setCurrentPage('home')}
                      className="group relative bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/25"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <i className="ri-home-line text-xl"></i>
                        Go Home
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>

                    <button 
                      onClick={() => window.history.back()}
                      className="group relative bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white font-bold py-4 px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/25"
                      style={{ fontFamily: 'Arial, sans-serif' }}
                    >
                      <span className="relative z-10 flex items-center gap-2">
                        <i className="ri-arrow-left-line text-xl"></i>
                        Go Back
                      </span>
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </button>
                  </div>

                  {/* IEEE Branding */}
                  <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
                    <div className="flex items-center justify-center gap-4 mb-4">
                      <img src="/ieee_circle.png" alt="IEEE Logo" className="w-12 h-12" />
                      <h3 className="text-2xl font-bold text-white" style={{ fontFamily: 'Arial, sans-serif' }}>IEEE SIT Nagpur</h3>
                    </div>
                    <p className="text-gray-300 text-lg" style={{ fontFamily: 'Arial, sans-serif' }}>
                      "Advancing Technology for Humanity"
                    </p>
                  </div>

                  {/* Floating Elements */}
                  <div className="absolute top-20 left-10 w-4 h-4 bg-yellow-400 rounded-full animate-ping" style={{ animationDelay: '0.5s' }}></div>
                  <div className="absolute top-40 right-20 w-3 h-3 bg-cyan-400 rounded-full animate-ping" style={{ animationDelay: '1.5s' }}></div>
                  <div className="absolute bottom-40 left-20 w-5 h-5 bg-purple-400 rounded-full animate-ping" style={{ animationDelay: '2.5s' }}></div>
                  <div className="absolute bottom-20 right-10 w-3 h-3 bg-pink-400 rounded-full animate-ping" style={{ animationDelay: '3s' }}></div>
                </div>
              </div>
            )}

            {/* Registration Page */}
            {currentPage === 'registration' && (
              <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20 relative z-[8]">
                <div className="container mx-auto px-6 py-12">
                  {/* Back Button */}
                  <button
                    onClick={() => setCurrentPage('events')}
                    className="mb-8 flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    <i className="ri-arrow-left-line text-xl"></i>
                    <span>Back to Events</span>
                  </button>

                  {/* Registration Header */}
                  <div className="text-center mb-12">
                    <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Bug Bounty Hackathon Registration
                    </h1>
                    <p className="text-xl text-gray-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                      Register your team for the IEEE Day Event - October 7, 2025
                    </p>
                  </div>

                  {/* Registration Form */}
                  <div className="max-w-4xl mx-auto">
                    <div className="bg-gray-800 rounded-2xl shadow-2xl p-8">
                      <form onSubmit={async (e) => {
                        e.preventDefault();
                        
                        // Get form data
                        const formData = new FormData(e.target);
                        const registrationData = {
                          leader_name: formData.get('leader_name'),
                          leader_phone: formData.get('leader_phone'),
                          leader_email: formData.get('leader_email'),
                          leader_semester: formData.get('leader_semester'),
                          leader_section: formData.get('leader_section'),
                          leader_prn: formData.get('leader_prn'),
                          member2_name: formData.get('member2_name') || null,
                          member2_phone: formData.get('member2_phone') || null,
                          member2_email: formData.get('member2_email') || null,
                          member2_semester: formData.get('member2_semester') || null,
                          member2_section: formData.get('member2_section') || null,
                          member2_prn: formData.get('member2_prn') || null,
                          member3_name: formData.get('member3_name') || null,
                          member3_phone: formData.get('member3_phone') || null,
                          member3_email: formData.get('member3_email') || null,
                          member3_semester: formData.get('member3_semester') || null,
                          member3_section: formData.get('member3_section') || null,
                          member3_prn: formData.get('member3_prn') || null,
                        };
                        
                        // Submit to Supabase
                        const result = await addRegistration(registrationData);
                        
                        if (result.success) {
                          alert('Registration submitted successfully! We will contact you soon.');
                          setCurrentPage('events');
                        } else {
                          alert('Registration failed. Please try again.');
                        }
                      }}>
                        <div className="mb-8">
                          <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                            Team Information
                          </h2>
                          
                          {/* Team Leader (Required) */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                              Team Leader (Required)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Full Name *</label>
                                <input type="text" name="leader_name" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Phone Number *</label>
                                <input type="tel" name="leader_phone" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>College Email *</label>
                                <input type="email" name="leader_email" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Semester *</label>
                                <select name="leader_semester" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                                  <option value="">Select Semester</option>
                                  <option value="1">1st Semester</option>
                                  <option value="2">2nd Semester</option>
                                  <option value="3">3rd Semester</option>
                                  <option value="4">4th Semester</option>
                                  <option value="5">5th Semester</option>
                                  <option value="6">6th Semester</option>
                                  <option value="7">7th Semester</option>
                                  <option value="8">8th Semester</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section *</label>
                                <input type="text" name="leader_section" required placeholder="e.g., A, B, C" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN *</label>
                                <input type="text" name="leader_prn" required placeholder="e.g., 2023BCS001" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                            </div>
                          </div>

                          {/* Team Member 2 (Optional) */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                              Team Member 2 (Optional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Full Name</label>
                                <input type="text" name="member2_name" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Phone Number</label>
                                <input type="tel" name="member2_phone" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>College Email</label>
                                <input type="email" name="member2_email" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Semester</label>
                                <select name="member2_semester" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                                  <option value="">Select Semester</option>
                                  <option value="1">1st Semester</option>
                                  <option value="2">2nd Semester</option>
                                  <option value="3">3rd Semester</option>
                                  <option value="4">4th Semester</option>
                                  <option value="5">5th Semester</option>
                                  <option value="6">6th Semester</option>
                                  <option value="7">7th Semester</option>
                                  <option value="8">8th Semester</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section</label>
                                <input type="text" name="member2_section" placeholder="e.g., A, B, C" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN</label>
                                <input type="text" name="member2_prn" placeholder="e.g., 2023BCS001" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                            </div>
                          </div>

                          {/* Team Member 3 (Optional) */}
                          <div className="mb-8">
                            <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                              Team Member 3 (Optional)
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Full Name</label>
                                <input type="text" name="member3_name" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Phone Number</label>
                                <input type="tel" name="member3_phone" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>College Email</label>
                                <input type="email" name="member3_email" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Semester</label>
                                <select name="member3_semester" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                                  <option value="">Select Semester</option>
                                  <option value="1">1st Semester</option>
                                  <option value="2">2nd Semester</option>
                                  <option value="3">3rd Semester</option>
                                  <option value="4">4th Semester</option>
                                  <option value="5">5th Semester</option>
                                  <option value="6">6th Semester</option>
                                  <option value="7">7th Semester</option>
                                  <option value="8">8th Semester</option>
                                </select>
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section</label>
                                <input type="text" name="member3_section" placeholder="e.g., A, B, C" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                              <div>
                                <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN</label>
                                <input type="text" name="member3_prn" placeholder="e.g., 2023BCS001" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                              </div>
                            </div>
                          </div>

                          {/* Submit Button */}
                          <div className="flex justify-center">
                            <button
                              type="submit"
                              className="bg-red-600 hover:bg-red-700 text-white font-bold py-4 px-12 rounded-lg transition-colors duration-300 text-lg"
                              style={{ fontFamily: 'Arial, sans-serif' }}
                            >
                              Submit Registration
                            </button>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* About Page */}
            {currentPage === 'about' && (
              <div className="w-full min-h-screen bg-black py-20 relative z-[8]">
                <div className="text-white text-center max-w-4xl mx-auto px-10">
                  <h1 className="text-6xl mb-12 mt-10 text-xl font-[Helvetica_Now_Display]">About IEEE Student Chapter</h1>

                  <div className="text-left space-y-8">
                    <div className="bg-gray-800 p-8 rounded-lg">
                      <h2 className="text-3xl mb-6 mt-10 text-xl font-[Helvetica_Now_Display]">Our Mission</h2>
                      <p className="text-lg leading-relaxed mt-10 text-xl font-[Helvetica_Now_Display]">
                        The IEEE Student Branch at Symbiosis Institute of Technology, Nagpur, is a dynamic platform dedicated to fostering innovation, technical excellence, and research-driven learning among students. Its primary objectives include promoting knowledge sharing in emerging technologies, facilitating hands-on workshops and projects, and encouraging active participation in research and development initiatives.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-lg">
                      <h2 className="text-3xl mb-6 mt-10 text-xl font-[Helvetica_Now_Display]">Our Vision</h2>
                      <p className="text-lg leading-relaxed mt-10 text-xl font-[Helvetica_Now_Display]">
                        The branch aims to create opportunities for students to collaborate on innovative ideas, publish research papers, and engage with professionals and peers globally. By nurturing technical and professional skills, it empowers members to contribute to technological advancements and research breakthroughs that benefit society.
                      </p>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-lg">
                      <h2 className="text-3xl mb-6 mt-10 text-xl font-[Helvetica_Now_Display]">What We Do</h2>
                      <ul className="text-lg leading-relaxed space-y-4 mt-10 text-xl font-[Helvetica_Now_Display]">
                        <li>• Organize technical workshops and seminars</li>
                        <li>• Conduct coding competitions and hackathons</li>
                        <li>• Facilitate industry interactions and networking</li>
                        <li>• Promote research and innovation projects</li>
                        <li>• Provide mentorship and career guidance</li>
                        <li>• Collaborate with other IEEE chapters and societies</li>
                      </ul>
                    </div>

                    <div className="bg-gray-800 p-8 rounded-lg">
                      <h2 className="text-3xl mb-6 mt-10 text-xl font-[Helvetica_Now_Display]">Join Us</h2>
                      <p className="text-lg leading-relaxed mt-10 text-xl font-[Helvetica_Now_Display]">
                        Whether you're a first-year student or a senior, there's always a place for you in our IEEE Student Branch. We welcome students from all engineering disciplines who share our passion for technology and innovation. Join us to be part of a community that's shaping the future of engineering.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
          )}
        </div>
      )}
    </>
  );
}

export default App;