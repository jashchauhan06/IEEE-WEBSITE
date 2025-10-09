import React from 'react';
import { useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import CircularGallery from './CircularGallery';

const EventDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();
  
  // Get event type from URL parameter or location state
  const eventType = searchParams.get('event') || location.state?.eventType || 'vibe-coding';
  
  // Define event data based on event type
  const getEventData = (type) => {
    switch (type) {
      case 'tech-escape':
        return {
          name: "Tech Escape 2.0",
          subtitle: "IEEE EVENT FOR 1ST YEAR",
          date: "August 14, 2025",
          time: "3:00 PM - 4:45 PM",
          location: "S-02 & S-08",
          category: "Technical",
          organizer: "IEEE Student Branch",
          target: "1st Year",
          status: "Event Completed",
          contacts: [
            "Dr. Bhupesh Dewangan - Faculty Coordinator",
            "Dr. Snehlata Wankhade - SRC Coordinator", 
            "Parth Choudhari - IEEE Chair"
          ],
          day: "Thursday"
        };
      case 'vibe-coding':
      default:
        return {
          name: "Vibe Coding Challenge",
          subtitle: "Code Your Way to Victory!",
          date: "October 7, 2025",
          time: "9:00 AM - 1:00 PM",
          location: "S-08",
          category: "Technical Competition",
          organizer: "IEEE Student Branch",
          target: "CSE Students",
          status: "Event Completed",
          contacts: [
            "Dr. Bhupesh Dewangan - Faculty Coordinator",
            "Dr. Snehlata Wankhade - SRC Coordinator", 
            "Parth Choudhari - IEEE Chair"
          ],
          day: "Monday"
        };
    }
  };

  const selectedEvent = getEventData(eventType);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 pt-20">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/')}
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
                <div className="text-3xl font-bold" style={{ fontFamily: 'Arial, sans-serif' }}>
                  {selectedEvent.name === "Tech Escape 2.0" ? "14 AUG" : 
                   selectedEvent.name === "Vibe Coding Challenge" ? "07 OCT" : "14 AUG"}
                </div>
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

        {/* Image Gallery Section - Commented out for Tech Escape */}
        {eventType !== 'tech-escape' && (
          <div className="mb-8">
            <div style={{ height: '400px', position: 'relative' }}>
              <CircularGallery 
                bend={0} 
                textColor="#ffffff" 
                borderRadius={0.05} 
                scrollEase={0.02}
                items={[
                  { image: '/bug bounty/Picture1.jpg', text: '' },
                  { image: '/bug bounty/Picture2.jpg', text: '' },
                  { image: '/bug bounty/Picture3.jpg', text: '' },
                  { image: '/bug bounty/Picture4.jpg', text: '' },
                  { image: '/bug bounty/Picture5.jpg', text: '' },
                  { image: '/bug bounty/Picture6.jpg', text: '' },
                  { image: '/bug bounty/Picture7.jpg', text: '' },
                  { image: '/bug bounty/Picture8.jpg', text: '' }
                ]}
              />
            </div>
          </div>
        )}

        {/* Event Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-2xl p-8 mb-8">
              <h2 className="text-3xl font-bold text-gray-800 mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                Event Report: {selectedEvent.name}
              </h2>
              
              {/* Tech Escape 2.0 Report */}
              {selectedEvent.name === "Tech Escape 2.0" && (
                <>
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
                </>
              )}

              {/* Vibe Coding Challenge Report */}
              {selectedEvent.name === "Vibe Coding Challenge" && (
                <>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div>
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Information</h3>
                      <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <p><strong>Title:</strong> Vibe Coding</p>
                        <p><strong>Duration:</strong> 01 Day</p>
                        <p><strong>Date:</strong> 07/10/25</p>
                        <p><strong>Mode:</strong> Offline</p>
                        <p><strong>Department:</strong> Computer Science and Engineering, Symbiosis Institute of Technology, Nagpur</p>
                        <p><strong>Organizing Cell:</strong> IEEE Student Branch, SIT Nagpur</p>
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Organizing Committee</h3>
                      <div className="space-y-2 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <p><strong>Faculty Coordinator:</strong> Dr. Bhupesh Dewangan, Faculty Incharge, IEEE Student Branch, SIT Nagpur</p>
                        <p><strong>SRC Coordinator:</strong> Dr. Snehlata Wankhade, SRC Incharge, SIT Nagpur</p>
                        <p><strong>Student Coordinator:</strong> Parth Choudhari, Chair, IEEE Student Branch, SIT Nagpur</p>
                      </div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Objectives</h3>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <li>Foster Unity and Inclusiveness: To foster a spirit of inclusiveness and unity among students of diverse backgrounds, reinforcing a collective, supportive community</li>
                    <li>Encourage Core Skills: To encourage teamwork, communication, and logical problem-solving through gamified activities like the coding competition</li>
                    <li>Promote Participation and Leadership: To promote student participation, leadership, and decision-making in a fun and challenging technical environment</li>
                    <li>Provide Hands-on Experience: To provide an engaging, hands-on experience that combines digital technical challenges with structured problem-solving</li>
                    <li>Challenge Critical Thinking: To challenge attendees to think critically and solve technical and algorithmic problems during the competition and interactive sessions</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Event Description</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    The IEEE Day Celebration, encompassing the formal inauguration, motivational address, and the "Vibe Coding" competition, was conducted as part of the IEEE Day festivities. 
                    This was the technical segment of the celebration, designed to test the students' problem-solving abilities. Teams of participants were presented with four diverse problem statements 
                    and given three hours to devise efficient coding solutions.
                  </p>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    The competition submissions were rigorously evaluated by a dedicated team of six faculty members, ensuring a fair and challenging experience. 
                    Winners were recognized with prizes, including mice and mouse pads.
                  </p>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Formal Proceedings</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Formal Inauguration</h4>
                      <p className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        The proceedings were inaugurated by Dr. Nitin Rakesh, Director of SIT Nagpur, who highlighted the importance of professional excellence, 
                        along with Mr. Will Harris, the distinguished guest, and Dr. Bhupesh, Faculty In-charge of the IEEE Student Chapter.
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Motivational Address by Mr. Will Harris</h4>
                      <p className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        The inaugural session featured a powerful and heartfelt motivational speech by Mr. Will Harris. His address focused entirely on personal betterment 
                        and growth in life, centered on the principle of unity and community. He passionately discussed the idea that "We Are One," emphasizing the critical 
                        importance of collaboration, mutual respect, and working together to overcome challenges.
                      </p>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Evaluation Team</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Pawan Verma</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Akhil Gupta</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Rashmi Sharma</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Deepak Asudani</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Pradnya Borkar</div>
                    </div>
                    <div className="bg-purple-50 p-3 rounded-lg text-center">
                      <div className="font-semibold text-gray-800" style={{ fontFamily: 'Arial, sans-serif' }}>Dr. Gaurav Londhe</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Participation Statistics</h3>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-blue-600" style={{ fontFamily: 'Arial, sans-serif' }}>125</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Students</div>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-green-600" style={{ fontFamily: 'Arial, sans-serif' }}>12</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Volunteers</div>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-purple-600" style={{ fontFamily: 'Arial, sans-serif' }}>6</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Teaching Staff</div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg text-center">
                      <div className="text-2xl font-bold text-orange-600" style={{ fontFamily: 'Arial, sans-serif' }}>144</div>
                      <div className="text-sm text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>Total</div>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Achieved Outcomes</h3>
                  <p className="text-lg text-gray-600 leading-relaxed mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    The celebrations successfully achieved both inspirational and technical goals:
                  </p>
                  <ul className="list-disc list-inside space-y-2 mb-6 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <li><strong>Fostered Unity:</strong> The motivational address effectively inspired a strong spirit of inclusiveness and unity among students</li>
                    <li><strong>Boosted Morale:</strong> The event provided a significant boost to student morale, encouraging focus on personal growth and positive human values</li>
                    <li><strong>Enhanced Technical Skills:</strong> The "Vibe Coding" competition promoted teamwork, logical problem-solving, and technical skill development in a challenging environment</li>
                    <li><strong>Reinforced Commitment:</strong> The involvement of the Director and the faculty evaluation team underscored the institute's commitment to academic rigor and professional body engagement</li>
                  </ul>

                  <h3 className="text-2xl font-bold text-gray-800 mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>Winners</h3>
                  <div className="space-y-4 mb-6">
                    <div className="bg-yellow-50 p-4 rounded-lg border-l-4 border-yellow-400">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>🖱️ Mouse Winners (Teams of 3)</h4>
                      <div className="space-y-1 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <div><strong>Growth Spark:</strong> Yashwardhan Chourasia, Ved Khode, Bhavik Khobragade</div>
                        <div><strong>DARKCODE:</strong> Saksham Wadhankar, Pradume Meshram, Om Rai</div>
                        <div><strong>SparkX:</strong> Shravani Sadawarte, Mahek Malkan, Namrata Vaidya</div>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-4 rounded-lg border-l-4 border-gray-400">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>🖱️ Mouse Pad Winners (Teams of 3)</h4>
                      <div className="space-y-1 text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <div><strong>Code Rockers:</strong> Ojas Morey, Tanay Gulhane, Anurag Mishra</div>
                        <div><strong>loTech:</strong> Suryansh Pol, Sayed Aaquib Ali, Pranav Dhage</div>
                        <div><strong>Hello Guys:</strong> Ritika Bhoyar, Esha Hadap, Nandini Durugkar</div>
                      </div>
                    </div>
                    <div className="bg-orange-50 p-4 rounded-lg border-l-4 border-orange-400">
                      <h4 className="font-bold text-gray-800 mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>🖱️ Mouse Pad Winners (Individuals - Consolation Prizes)</h4>
                      <div className="text-gray-600" style={{ fontFamily: 'Arial, sans-serif' }}>
                        Rohit Kindarle, Namrata Vaidya, Moksha Kindarle, Lekhit Kalambe, Aarya Mardikar, and Parth Parkhi
                      </div>
                    </div>
                  </div>
                </>
              )}
              
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
              <img 
                src={selectedEvent.name === "Tech Escape 2.0" ? "/Tech_Escape.jpg" : "/Bug_Bounty.jpg"} 
                alt={`${selectedEvent.name} Event Poster`} 
                className="w-full h-auto object-contain rounded-lg shadow-lg" 
                style={{ fontFamily: 'Arial, sans-serif' }} 
              />
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
  );
};

export default EventDetails;
