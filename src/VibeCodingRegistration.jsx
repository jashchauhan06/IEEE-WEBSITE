import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addVibeCodingRegistration } from './supabase';

const VibeCodingRegistration = () => {
  const navigate = useNavigate();

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 py-20 relative z-[8]">
      <div className="container mx-auto px-6 py-12">
        {/* Back Button */}
        <button
          onClick={() => navigate('/events')}
          className="mb-8 flex items-center gap-2 text-white hover:text-blue-300 transition-colors duration-300"
          style={{ fontFamily: 'Arial, sans-serif' }}
        >
          <i className="ri-arrow-left-line text-xl"></i>
          <span>Back to Events</span>
        </button>

        {/* Registration Header */}
        <div className="text-center mb-12">
          <h1 className="text-5xl font-bold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
            Vibe Coding Challenge Registration
          </h1>
          <p className="text-xl text-gray-300" style={{ fontFamily: 'Arial, sans-serif' }}>
            Register your team for the Vibe Coding Challenge - October 7, 2025
          </p>
          <p className="text-lg text-blue-300 mt-2" style={{ fontFamily: 'Arial, sans-serif' }}>
            For First Year Students Only - Team of 2-3 Members (3rd Member Optional)
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
                team_name: formData.get('team_name'),
                leader_name: formData.get('leader_name'),
                leader_phone: formData.get('leader_phone'),
                leader_email: formData.get('leader_email'),
                leader_semester: parseInt(formData.get('leader_semester')),
                leader_section: formData.get('leader_section'),
                leader_prn: formData.get('leader_prn'),
                member2_name: formData.get('member2_name'),
                member2_phone: formData.get('member2_phone'),
                member2_email: formData.get('member2_email'),
                member2_semester: parseInt(formData.get('member2_semester')),
                member2_section: formData.get('member2_section'),
                member2_prn: formData.get('member2_prn'),
                member3_name: formData.get('member3_name') || null,
                member3_phone: formData.get('member3_phone') || null,
                member3_email: formData.get('member3_email') || null,
                member3_semester: formData.get('member3_semester') ? parseInt(formData.get('member3_semester')) : null,
                member3_section: formData.get('member3_section') || null,
                member3_prn: formData.get('member3_prn') || null,
                event_type: 'Vibe Coding Challenge',
                team_experience_level: 'Beginner',
                preferred_programming_languages: ['C++'], // Default to C++ since we removed the selection
                previous_coding_competition_experience: false,
                github_team_repository: null, // Optional field
                registration_status: 'Pending',
                payment_status: 'Not Required',
                contact_preference: 'Email',
                team_motivation: 'We want to participate in the Vibe Coding Challenge to improve our programming skills and learn from experienced developers.',
                special_requirements: null, // Optional field
                dietary_restrictions: null // Optional field
              };
              
              // Submit to Supabase
              const result = await addVibeCodingRegistration(registrationData);
              
              if (result.success) {
                alert('Vibe Coding Challenge registration submitted successfully! We will contact you soon.');
                navigate('/events');
              } else {
                alert('Registration failed. Please try again.');
              }
            }}>
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-6" style={{ fontFamily: 'Arial, sans-serif' }}>
                  Team Information
                </h2>
                
                {/* Team Name */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Team Name
                  </h3>
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Team Name *</label>
                      <input type="text" name="team_name" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" placeholder="Enter your team name" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                  </div>
                </div>
                
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
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section *</label>
                      <select name="leader_section" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                        <option value="E">Section E</option>
                        <option value="F">Section F</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN *</label>
                      <input type="text" name="leader_prn" required placeholder="e.g., 24070521000" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                  </div>
                </div>

                {/* Team Member 2 (Required) */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Team Member 2 (Required)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Full Name *</label>
                      <input type="text" name="member2_name" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Phone Number *</label>
                      <input type="tel" name="member2_phone" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>College Email *</label>
                      <input type="email" name="member2_email" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Semester *</label>
                      <select name="member2_semester" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <option value="">Select Semester</option>
                        <option value="1">1st Semester</option>
                        <option value="2">2nd Semester</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section *</label>
                      <select name="member2_section" required className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                        <option value="E">Section E</option>
                        <option value="F">Section F</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN *</label>
                      <input type="text" name="member2_prn" required placeholder="e.g., 24070521001" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
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
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>Section</label>
                      <select name="member3_section" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }}>
                        <option value="">Select Section</option>
                        <option value="A">Section A</option>
                        <option value="B">Section B</option>
                        <option value="C">Section C</option>
                        <option value="D">Section D</option>
                        <option value="E">Section E</option>
                        <option value="F">Section F</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-white mb-2" style={{ fontFamily: 'Arial, sans-serif' }}>PRN</label>
                      <input type="text" name="member3_prn" placeholder="e.g., 24070521002" className="w-full px-4 py-3 bg-gray-700 border border-gray-600 text-white rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent" style={{ fontFamily: 'Arial, sans-serif' }} />
                    </div>
                  </div>
                </div>


                {/* Event Information */}
                <div className="mb-8 bg-blue-900/30 p-6 rounded-lg border border-blue-500/30">
                  <h3 className="text-lg font-semibold text-white mb-4" style={{ fontFamily: 'Arial, sans-serif' }}>
                    Event Details
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300" style={{ fontFamily: 'Arial, sans-serif' }}>
                    <div className="flex items-center gap-2">
                      <i className="ri-calendar-line text-blue-400"></i>
                      <span><strong>Date:</strong> Tuesday, October 7, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-time-line text-blue-400"></i>
                      <span><strong>Time:</strong> 09:00 AM</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-map-pin-line text-blue-400"></i>
                      <span><strong>Location:</strong>S-08</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <i className="ri-team-line text-blue-400"></i>
                      <span><strong>Format:</strong> Team Competition (2-3 Members)</span>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="flex justify-center">
                  <button
                    type="submit"
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-12 rounded-lg transition-colors duration-300 text-lg"
                    style={{ fontFamily: 'Arial, sans-serif' }}
                  >
                    Submit Vibe Coding Registration
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VibeCodingRegistration;