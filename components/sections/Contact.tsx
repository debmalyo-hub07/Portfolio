"use client";

import { motion } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone } from "react-icons/fi";

const socialLinks = [
  { icon: <FiGithub size={24} />, href: "https://github.com/debmalyo-hub07", label: "GitHub" },
  { icon: <FiLinkedin size={24} />, href: "https://www.linkedin.com/in/debmalyo-barman-087429318/", label: "LinkedIn" },
];

export default function Contact() {
  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">
      
      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <h2 className="text-6xl font-black heading-font mb-4">
            Command <span className="neon-text">Center</span>
          </h2>
          <p className="text-gray-400 max-w-xl mx-auto text-lg italic">
            "The best way to predict the future is to create it." — Let's build something extraordinary together.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">
          
          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="flex flex-col gap-12"
          >
            <div>
              <h3 className="text-3xl font-black heading-font mb-8 border-l-4 border-cyan-400 pl-6">Access Points</h3>
              <div className="space-y-6">
                {/* Email */}
                <motion.a 
                  whileHover={{ x: 10 }}
                  href="mailto:debmalyobarman2003@gmail.com"
                  className="flex items-center gap-6 group"
                >
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all">
                    <FiMail size={28} className="text-cyan-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Electronic Mail</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors lowercase">debmalyobarman2003@gmail.com</span>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a 
                  whileHover={{ x: 10 }}
                  href="https://wa.me/917596810200"
                  target="_blank"
                  className="flex items-center gap-6 group"
                >
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all">
                    <FiPhone size={28} className="text-emerald-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Instant Messaging</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors">Direct WhatsApp</span>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a 
                  whileHover={{ x: 10 }}
                  href="https://www.linkedin.com/in/debmalyo-barman-087429318/"
                  target="_blank"
                  className="flex items-center gap-6 group"
                >
                  <div className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-fuchsia-400/50 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.2)] transition-all">
                    <FiLinkedin size={28} className="text-fuchsia-400" />
                  </div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Professional Network</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors">Expand Connection</span>
                  </div>
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-8 ml-1">Digital Archeology</h4>
              <div className="flex gap-6">
                {socialLinks.map((link, i) => (
                  <motion.a 
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    href={link.href} 
                    target="_blank"
                    aria-label={`Visit my ${link.label} profile`}
                    className="p-5 bg-white/5 rounded-3xl border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all shadow-xl"
                  >
                    {link.icon}
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Form */}
          <motion.form
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="panel p-10 flex flex-col gap-8 bg-black/40 backdrop-blur-2xl border-white/10"
            onSubmit={(e) => e.preventDefault()}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <input 
                  id="user-identity"
                  type="text" 
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium"
                />
                <label 
                  htmlFor="user-identity"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-cyan-400"
                >
                  Identity / Name
                </label>
              </div>

              <div className="relative group">
                <input 
                  id="user-email"
                  type="email" 
                  required
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium"
                />
                <label 
                  htmlFor="user-email"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-cyan-400"
                >
                  Electronic Address
                </label>
              </div>
            </div>

            <div className="relative group">
              <textarea 
                id="user-message"
                required
                rows={4}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-fuchsia-500 transition-all peer text-white font-medium resize-none"
              />
              <label 
                htmlFor="user-message"
                className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-fuchsia-500 peer-valid:-top-4 peer-valid:text-fuchsia-500"
              >
                Transmission / Message
              </label>
            </div>

            <button className="btn-primary w-full group overflow-hidden relative py-5 rounded-2xl">
              <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-[0.2em] uppercase">
                Initiate Transmission
                <FiSend size={20} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform duration-500" />
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-1" />
            </button>
          </motion.form>

        </div>
      </div>

    </section>
  );
}