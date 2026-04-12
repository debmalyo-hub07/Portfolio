"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiMail, FiLinkedin, FiGithub, FiSend, FiPhone, FiCheckCircle, FiAlertCircle } from "react-icons/fi";

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

    // Simulate async submission (replace with real endpoint like Formspree/EmailJS)
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
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-500/10 rounded-full blur-[120px] -z-10 animate-pulse" />
      <div className="absolute bottom-0 right-1/4 w-[400px] h-[400px] bg-fuchsia-500/10 rounded-full blur-[100px] -z-10" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-24"
        >
          <motion.h2
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="text-6xl font-black heading-font mb-4 cursor-default"
          >
            <motion.span whileHover={{ color: "#00f0ff" }} transition={{ duration: 0.3 }}>Command</motion.span>{" "}
            <motion.span
              whileHover={{ scale: 1.05, rotate: [-1, 1, -1] }}
              transition={{ duration: 0.5, repeat: Infinity, repeatType: "reverse" }}
              className="neon-text inline-block cursor-default"
            >Center</motion.span>
          </motion.h2>
          <motion.p
            whileHover={{ scale: 1.02, color: "#d1d5db" }}
            transition={{ duration: 0.3 }}
            className="text-gray-400 max-w-xl mx-auto text-lg italic cursor-default"
          >
            &quot;The best way to predict the future is to create it.&quot; &mdash; Let&apos;s build something extraordinary together.
          </motion.p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-20 items-start">

          {/* Info Card */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            className="flex flex-col gap-12"
          >
            <div>
              <motion.h3
                whileHover={{ x: 5, color: "#00f0ff" }}
                transition={{ duration: 0.3 }}
                className="text-3xl font-black heading-font mb-8 border-l-4 border-cyan-400 pl-6 cursor-default"
              >Access Points</motion.h3>
              <div className="space-y-6">
                {/* Email */}
                <motion.a
                  whileHover={{ x: 15, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="mailto:debmalyobarman2003@gmail.com"
                  className="flex items-center gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-cyan-400/50 group-hover:shadow-[0_0_20px_rgba(34,211,238,0.2)] transition-all"
                  >
                    <FiMail size={28} className="text-cyan-400" />
                  </motion.div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Electronic Mail</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors lowercase cursor-default">debmalyobarman2003@gmail.com</span>
                  </div>
                </motion.a>

                {/* WhatsApp */}
                <motion.a
                  whileHover={{ x: 15, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="https://wa.me/917596810200"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-emerald-400/50 group-hover:shadow-[0_0_20px_rgba(52,211,153,0.2)] transition-all"
                  >
                    <FiPhone size={28} className="text-emerald-400" />
                  </motion.div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Instant Messaging</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors cursor-default">Direct WhatsApp</span>
                  </div>
                </motion.a>

                {/* LinkedIn */}
                <motion.a
                  whileHover={{ x: 15, scale: 1.02 }}
                  transition={{ duration: 0.3 }}
                  href="https://www.linkedin.com/in/debmalyo-barman-087429318/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-6 group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 10 }}
                    transition={{ duration: 0.3 }}
                    className="p-4 bg-white/5 rounded-2xl border border-white/10 group-hover:border-fuchsia-400/50 group-hover:shadow-[0_0_20px_rgba(232,121,249,0.2)] transition-all"
                  >
                    <FiLinkedin size={28} className="text-fuchsia-400" />
                  </motion.div>
                  <div>
                    <span className="block text-xs uppercase tracking-widest text-gray-500 mb-1">Professional Network</span>
                    <span className="text-xl font-bold group-hover:text-white transition-colors cursor-default">Expand Connection</span>
                  </div>
                </motion.a>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-[0.3em] text-gray-600 mb-8 ml-1">Digital Presence</h4>
              <div className="flex gap-6">
                {socialLinks.map((link, i) => (
                  <motion.a
                    key={i}
                    initial={{ opacity: 0, scale: 0.5 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: false, amount: 0.5 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    whileHover={{ scale: 1.2, y: -10 }}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
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
            viewport={{ once: false, amount: 0.5 }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.01 }}
            className="panel p-10 flex flex-col gap-8 bg-black/40 backdrop-blur-2xl border-white/10 relative overflow-hidden"
            onSubmit={handleSubmit}
          >
            <div className="grid md:grid-cols-2 gap-8">
              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <input
                  id="user-identity"
                  type="text"
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium disabled:opacity-50"
                />
                <label
                  htmlFor="user-identity"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-cyan-400"
                >
                  Identity / Name
                </label>
              </motion.div>

              <motion.div
                whileHover={{ y: -3 }}
                transition={{ duration: 0.3 }}
                className="relative group"
              >
                <input
                  id="user-email"
                  type="email"
                  required
                  disabled={formStatus === "sending" || formStatus === "success"}
                  className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-cyan-400 transition-all peer text-white font-medium disabled:opacity-50"
                />
                <label
                  htmlFor="user-email"
                  className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-cyan-400 peer-valid:-top-4 peer-valid:text-cyan-400"
                >
                  Electronic Address
                </label>
              </motion.div>
            </div>

            <motion.div
              whileHover={{ y: -3 }}
              transition={{ duration: 0.3 }}
              className="relative group"
            >
              <textarea
                id="user-message"
                required
                rows={4}
                disabled={formStatus === "sending" || formStatus === "success"}
                className="w-full bg-transparent border-b-2 border-white/10 py-4 outline-none focus:border-fuchsia-500 transition-all peer text-white font-medium resize-none disabled:opacity-50"
              />
              <label
                htmlFor="user-message"
                className="absolute left-0 top-4 text-gray-500 uppercase tracking-widest text-xs pointer-events-none transition-all peer-focus:-top-4 peer-focus:text-fuchsia-500 peer-valid:-top-4 peer-valid:text-fuchsia-500"
              >
                Transmission / Message
              </label>
            </motion.div>

            <motion.button
              whileHover={formStatus === "idle" ? { scale: 1.05, y: -5 } : {}}
              whileTap={formStatus === "idle" ? { scale: 0.95 } : {}}
              type="submit"
              disabled={formStatus !== "idle"}
              className="btn-primary w-full group overflow-hidden relative py-5 rounded-2xl disabled:opacity-80 disabled:cursor-not-allowed"
            >
              <span className="relative z-10 flex items-center justify-center gap-3 font-black tracking-[0.2em] uppercase">
                {formStatus === "sending" && (
                  <>
                    <motion.div
                      animate={{ rotate: 360 }}
                      transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      className="w-5 h-5 border-2 border-white/50 border-t-white rounded-full"
                    />
                    Transmitting…
                  </>
                )}
                {formStatus === "idle" && (
                  <>
                    Initiate Transmission
                    <motion.div
                      animate={{ x: [0, 5, 0], y: [0, -5, 0] }}
                      transition={{ duration: 1, repeat: Infinity, repeatType: "reverse" }}
                    >
                      <FiSend size={20} />
                    </motion.div>
                  </>
                )}
                {formStatus === "success" && (
                  <>
                    <FiCheckCircle size={20} />
                    Signal Received!
                  </>
                )}
                {formStatus === "error" && (
                  <>
                    <FiAlertCircle size={20} />
                    Transmission Failed
                  </>
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-fuchsia-600 opacity-0 group-hover:opacity-100 transition-all duration-500 -z-10" />
            </motion.button>

            {/* Success / Error Toast Banner */}
            <AnimatePresence>
              {formStatus === "success" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-sm font-medium"
                >
                  <FiCheckCircle size={18} />
                  Transmission received. I&apos;ll get back to you shortly!
                </motion.div>
              )}
              {formStatus === "error" && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  className="flex items-center gap-3 px-5 py-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm font-medium"
                >
                  <FiAlertCircle size={18} />
                  Transmission failed. Please try again or email me directly.
                </motion.div>
              )}
            </AnimatePresence>
          </motion.form>

        </div>
      </div>

    </section>
  );
}