import React from 'react';
import { useTheme } from '../../context/ThemeContext';
import SectionTitle from '../common/SectionTitle';

const Contact = () => {
  const { darkMode } = useTheme();
  
  // Form submission handler (can be expanded later)
  const handleSubmit = (e) => {
    e.preventDefault();
    // Form submission logic here
    console.log('Form submitted');
  };
  
  return (
    <section className="mb-12">
      <SectionTitle title="Contact Me" />
      
      <div className="bg-white rounded-lg shadow-md">
        <div className="grid md:grid-cols-2 gap-0">
          {/* Left side - Contact info with icons */}
          <div className="p-12 flex flex-col justify-center">
            <div className="space-y-10">
              {/* Phone */}
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-4 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600">+91 98765 43210</p>
                </div>
              </div>
              
              {/* Email */}
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-4 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600">sreevaatsav@example.com</p>
                </div>
              </div>
              
              {/* Location */}
              <div className="flex items-center">
                <div className="rounded-full bg-blue-100 p-4 mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p className="text-gray-600">Hyderabad, Telangana, India</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Right side - Contact form */}
          <div className="p-12">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  placeholder="Your name"
                />
              </div>
              
              <div>
                <input 
                  type="email" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  placeholder="your.email@example.com"
                />
              </div>
              
              <div>
                <input 
                  type="text" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  placeholder="How can I help you?"
                />
              </div>
              
              <div>
                <textarea 
                  rows="4" 
                  className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 transition" 
                  placeholder="Your message here..."
                ></textarea>
              </div>
              
              <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors duration-300"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;