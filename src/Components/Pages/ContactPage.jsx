import React, { useState } from 'react';
import { Mail, MessageCircle, Phone, MapPin, Send } from 'lucide-react';
import { Link } from 'react-router-dom';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Form submitted:', formData);
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: Mail,
      
      details: "support@retroread.com",
      link: "mailto:support@retroread.com"
    },
    {
      icon: MessageCircle,
      title: " ",
      details: " ",
      link: "#"
    },
    {
      icon: Phone,
      title: "Phone",
      details: "+91 9654325678",
    },
    {
      icon: MapPin,
      title: "Location",
      details: "Retro Read Office, J M Road ,Pune, Maharashtra, 411010",
      link: "#"
    }
  ];

  return (
    <div className="min-h-screen bg-[#F6EFE3] py-12 px-4">
      <div className="container mx-auto max-w-6xl">
     
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-[#D8472F]/10 px-4 py-2 rounded-full mb-4">
            <span className="text-sm font-medium text-[#D8472F]">Contact</span>
          </div>
          <h1 className="font-serif text-4xl font-bold text-[#1E2A42] mb-3">Get in Touch</h1>
          <p className="text-[#5B6478] max-w-2xl mx-auto">
            Have questions? We'd love to hear from you. Reach out to us anytime.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-12">
          {contactInfo.map((info, index) => {
            const Icon = info.icon;
            return (
              <a
                key={index}
                href={info.link}
                className="bg-white rounded-xl p-6 border border-[#E2D5BC] text-center hover:shadow-lg hover:border-[#D8472F] transition-all duration-300 group"
              >
                <div className="w-12 h-12 rounded-lg bg-[#D8472F]/10 flex items-center justify-center mx-auto mb-3 group-hover:bg-[#D8472F] transition-colors duration-300">
                  <Icon size={22} className="text-[#D8472F] group-hover:text-white transition-colors duration-300" />
                </div>
                <h4 className="font-semibold text-[#1E2A42]">{info.title}</h4>
                <p className="text-sm text-[#5B6478] mt-1">{info.details}</p>
              </a>
            );
          })}
        </div>

        <div className="bg-white rounded-xl border border-[#E2D5BC] p-8 md:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Form */}
            <div>
              <h2 className="font-serif text-2xl font-bold text-[#1E2A42] mb-4">Send us a Message</h2>
              <p className="text-[#5B6478] mb-6">
                Fill out the form below and we'll get back to you as soon as possible.
              </p>

              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1E2A42] mb-1.5">
                    Full Name <span className="text-[#D8472F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="John Doe"
                    className="w-full px-4 py-3 rounded-lg border border-[#E2D5BC] focus:outline-none focus:border-[#D8472F] focus:ring-2 focus:ring-[#D8472F]/20 transition-all"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1E2A42] mb-1.5">
                    Email Address <span className="text-[#D8472F]">*</span>
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="RetroReadCompany@yahoo.com"
                    className="w-full px-4 py-3 rounded-lg border border-[#E2D5BC] focus:outline-none focus:border-[#D8472F] focus:ring-2 focus:ring-[#D8472F]/20 transition-all"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-[#1E2A42] mb-1.5">
                    Subject <span className="text-[#D8472F]">*</span>
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="How can we help?"
                    className="w-full px-4 py-3 rounded-lg border border-[#E2D5BC] focus:outline-none focus:border-[#D8472F] focus:ring-2 focus:ring-[#D8472F]/20 transition-all"
                    value={formData.subject}
                    onChange={(e) => setFormData({...formData, subject: e.target.value})}
                  />
                </div>

                <div className="mb-6">
                  <label className="block text-sm font-medium text-[#1E2A42] mb-1.5">
                    Message <span className="text-[#D8472F]">*</span>
                  </label>
                  <textarea
                    required
                    rows="4"
                    placeholder="Describe your issue or question in detail..."
                    className="w-full px-4 py-3 rounded-lg border border-[#E2D5BC] focus:outline-none focus:border-[#D8472F] focus:ring-2 focus:ring-[#D8472F]/20 transition-all resize-none"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                  />
                </div>

                <button
                  type="submit"
                  className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-[#D8472F] text-white rounded-lg font-semibold hover:bg-[#B23522] transition-colors"
                >
                  <Send size={18} />
                  Send Message
                </button>

                {submitted && (
                  <div className="mt-4 p-3 bg-green-50 border border-green-200 rounded-lg text-green-700 text-sm text-center">
                    ✓ Message sent successfully! We'll get back to you soon.
                  </div>
                )}
              </form>
            </div>

           
            <div className="space-y-6">
              {/*  */}

              <div className="bg-[#F6EFE3] rounded-xl p-6">
                <h3 className="font-serif text-xl font-bold text-[#1E2A42] mb-3">Quick Help</h3>
                <ul className="space-y-2 text-[#5B6478]">
                  <li>• Check our <Link to="/faq" className="text-[#D8472F] hover:underline">FAQ page</Link> for quick answers</li>
                  <li>• Visit the <Link to="/help" className="text-[#D8472F] hover:underline">Help Center</Link> for guides</li>
          
                </ul>
              </div>

              <div className="bg-[#F6EFE3] rounded-xl p-6">
                <h3 className="font-serif text-xl font-bold text-[#1E2A42] mb-3">Business Hours</h3>
                <div className="space-y-1 text-[#5B6478]">
                  <p>Monday - Friday: 9:00 AM - 6:00 PM IST</p>
                  <p>Saturday: 10:00 AM - 4:00 PM IST</p>
                  <p>Sunday: Closed</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;