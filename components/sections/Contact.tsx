"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone, FiCheckCircle } from "react-icons/fi";

const socialLinks = [
  { icon: <FiGithub size={24} />, href: "https://github.com/debmalyo-hub07", label: "GitHub" },
  { icon: <FiLinkedin size={24} />, href: "https://www.linkedin.com/in/debmalyo-barman-087429318/", label: "LinkedIn" },
];

type FormStatus = "idle" | "sending" | "success" | "error";

export default function Contact() {
  const [formStatus, setFormStatus] = useState<FormStatus>("idle");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormStatus("sending");

    try {
      await new Promise((res) => setTimeout(res, 1500));
      setFormStatus("success");
      (e.target as HTMLFormElement).reset();
      setTimeout(() => setFormStatus("idle"), 4000);
    } catch {
      setFormStatus("error");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <section id="contact" className="py-32 px-6 relative overflow-hidden">

      {/* Decorative Glow Elements */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse will-change-gpu" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] -z-10 will-change-gpu" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20"
        >
          <motion.h2
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-4xl md:text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Strategic</motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="neon-text inline-block cursor-default"
            >Connection</motion.span>
          </motion.h2>
          <motion.p
            whileHover={{ scale: 1.02, color: "#d1d5db" }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto text-base md:text-lg italic cursor-default"
          >
            &quot;The best way to predict the future is to create it.&quot; &mdash; Let&apos;s build something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-10"
          >
            <div>
              <motion.h3
                whileHover={{ x: 5, color: "#00f0ff" }}
                transition={{ duration: 0.3 }}
                className="text-2xl md:text-3xl font-black heading-font mb-8 border-l-4 border-cyan-400 pl-6 cursor-default"
              >Contact Channels</motion.h3>
              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="mailto:debmalyobarman2003@gmail.com"
                  className="flex items-center gap-4 md:gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all"
                  >
                    <FiMail size={24} className="text-cyan-400" />
                  </motion.div>
                  <div className="min-w-0">
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Email Address</span>
                    <span className="text-lg md:text-xl font-bold group-hover:text-white transition-colors lowercase cursor-default block truncate">debmalyobarman2003@gmail.com</span>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="https://wa.me/917596810200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 md:gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all"
                  >
                    <FiPhone size={24} className="text-emerald-400" />
                  </motion.div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Direct Liaison</span>
                    <span className="text-lg md:text-xl font-bold group-hover:text-white transition-colors cursor-default">WhatsApp Support</span>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  whileHover={{ x: 10, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="https://www.linkedin.com/in/debmalyo-barman-087429318/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 md:gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-3 md:p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-fuchsia-400/50 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.2)] transition-all"
                  >
                    <FiLinkedin size={24} className="text-fuchsia-400" />
                  </motion.div>
                  <div>
                    <span className="block text-[10px] uppercase tracking-widest text-gray-500 mb-1">Professional Network</span>
                    <span className="text-lg md:text-xl font-bold group-hover:text-white transition-colors cursor-default">LinkedIn Profile</span>
                  </div>
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-6 ml-1">Digital Presence</h4>
              <div className="flex gap-4 md:gap-6">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true, amount: 0.5 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.1, y: -5 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`Visit my ${link.label} profile`}
                    className="p-4 md:p-5 bg-white/5 rounded-2xl md:rounded-3xl border border-white/10 text-white hover:bg-white/10 hover:border-cyan-400/50 transition-all shadow-xl"
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
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="panel p-6 md:p-10 flex flex-col gap-8 bg-black/40 backdrop-blur-2xl border-white/10 relative overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <div className="relative group">
                <input
                  id="user-identity"
                  type="text"
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium disabled:opacity-50"
                  placeholder=" "
                />
                <label
                  htmlFor="user-identity"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-[10px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-placeholder-shown:top-4 peer-[:not(:placeholder-shown)]:-top-4"
                >
                  Full Name
                </label>
              </div>

              <div className="relative group">
                <input
                  id="user-email"
                  type="email"
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium disabled:opacity-50"
                  placeholder=" "
                />
                <label
                  htmlFor="user-email"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-[10px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-placeholder-shown:top-4 peer-[:not(:placeholder-shown)]:-top-4"
                >
                  Email Address
                </label>
              </div>
            </div>

            <div className="relative group">
              <textarea
                id="user-message"
                required
                rows={4}
                disabled={formStatus === "sending" || formStatus === "success"}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-fuchsia-500 transition-all peer text-white font-medium resize-none disabled:opacity-50"
                placeholder=" "
              />
              <label
                htmlFor="user-message"
                className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-[10px] pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-fuchsia-500 peer-placeholder-shown:top-4 peer-[:not(:placeholder-shown)]:-top-4"
              >
                Project Details / Message
              </label>
            </div>

            <motion.button
              whileHover={formStatus === "idle" ? { scale: 1.02, y: -2 } : {}}
              whileTap={formStatus === "idle" ? { scale: 0.98 } : {}}
              type="submit"
              disabled={formStatus !== "idle"}
              className="btn-primary w-full group overflow-hidden relative py-4 rounded-xl disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 font-bold tracking-[0.2em] uppercase text-sm">
                {formStatus === "sending" ? "Transmitting…" : formStatus === "success" ? "Received" : "Send Message"}
                {formStatus === "idle" && <FiSend size={18} />}
                {formStatus === "success" && <FiCheckCircle size={18} />}
              </span>
            </motion.button>

            {/* Success / Error Message Banner */}
            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-lg bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-medium"
                >
                  <FiCheckCircle size={16} />
                  Message received! I&apos;ll get back to you shortly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

        </div>
      </div>

    </section>
  );
}