"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import SpotlightCard from "@/components/SpotlightCard";
import Magnetic from "@/components/Magnetic";
import { motion } from "framer-motion";
import styles from "./page.module.css";
import Image from "next/image";

export default function Home() {
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const handleEmailClick = (e: React.MouseEvent) => {
    e.preventDefault();
    const email = 'jagrutshah2508@gmail.com';

    // Copy to clipboard
    if (typeof navigator !== "undefined" && navigator.clipboard) {
      navigator.clipboard.writeText(email).then(() => {
        setToastMessage("Email copied to clipboard!");
        setTimeout(() => {
          setToastMessage(null);
        }, 2500);
      });
    }

    // Attempt mailto triggering
    window.location.href = `mailto:${email}`;
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -50px 0px" }
    );

    document.querySelectorAll(".reveal").forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <main className={styles.main}>
      {toastMessage && (
        <div className="hud-toast">
          <span className="hud-toast-icon">📧</span>
          <span>{toastMessage}</span>
        </div>
      )}
      <Navbar />

      {/* Hero Section */}
      <section id="home" className={`section ${styles.hero}`}>
        <div className={`container ${styles.heroContainer}`}>
          <div className={styles.heroContent}>
            <motion.div 
              className={styles.badge}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              Available for work
            </motion.div>

            <h1 className={styles.title} style={{ overflow: "hidden" }}>
              <motion.div
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              >
                Building <span className="glow-text hover-float" style={{ display: 'inline-block' }}>AI-Powered</span> <br />
                Software Systems.
              </motion.div>
            </h1>

            <motion.p 
              className={styles.description}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            >
              Hi, I'm Jagrut Shah. A passionate vibe coder and continuous learner, deeply exploring the world of AI and Machine Learning to build intelligent, modern applications.
            </motion.p>

            <motion.div 
              className={styles.ctaGroup}
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
            >
              <Magnetic>
                <a href="#projects" className={styles.primaryBtn}>Explore Work</a>
              </Magnetic>
              <Magnetic>
                <a href="https://drive.google.com/file/d/1I9YFdwHX6NA6GH0kTWjCO07KJJ6U64OL/view?usp=drivesdk" target="_blank" rel="noreferrer" className={styles.secondaryBtn}>View Resume</a>
              </Magnetic>
            </motion.div>
          </div>

          <motion.div 
            className={styles.heroVisual}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            {/* Minimalist Profile representation */}
            <div className={styles.profileCircle}>
              <div className={styles.profileInner}>
                <Image src="/profile.jpeg" alt="Jagrut Shah" width={350} height={350} style={{ objectFit: 'cover', borderRadius: '50%' }} priority />
              </div>
              <div className={styles.orbit}></div>
              <div className={styles.orbit2}></div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className={`section ${styles.projects}`}>
        <div className="container">
          <motion.div 
            className={`${styles.sectionHeader}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Featured Projects</h2>
            <div className={styles.line}></div>
          </motion.div>

          <div className={styles.projectGrid}>
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', width: '100%' }}
            >
              <SpotlightCard as="a" href="https://deciflow-frontend-647556267131.europe-west1.run.app/" className={`${styles.projectCard}`} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
                <div className={styles.projectImagePlaceholder}>
                  <Image src="/deciflow_v2.png" alt="DeciFlow AI" width={500} height={250} className={styles.projectImg} />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectTech}>
                    <span>FastAPI</span><span>Next.js</span><span>Gemini API</span><span>GCP</span>
                  </div>
                  <h3 className={styles.projectTitle}>
                    DeciFlow-AI <span className={styles.teamBadge}>Team Project</span>
                    <span className={styles.projectArrow}>↗</span>
                  </h3>
                  <p>An AI platform transforming business datasets into insights, predictions, and recommendations.</p>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', width: '100%' }}
            >
              <SpotlightCard as="a" href="https://clarity-ai-jet.vercel.app/" className={`${styles.projectCard}`} target="_blank" rel="noreferrer" style={{ width: '100%' }}>
                <div className={styles.projectImagePlaceholder}>
                  <Image src="/clarity_v2.png" alt="Clarity AI" width={500} height={250} className={styles.projectImg} />
                </div>
                <div className={styles.projectInfo}>
                  <div className={styles.projectTech}>
                    <span>React</span><span>Next.js</span><span>Gemini API</span><span>Vercel</span>
                  </div>
                  <h3 className={styles.projectTitle}>
                    Clarity-AI
                    <span className={styles.projectArrow}>↗</span>
                  </h3>
                  <p>An AI-powered platform evaluating choices through personalized questioning to generate action plans and scenario analysis.</p>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className={`section ${styles.skills}`}>
        <div className="container">
          <motion.div 
            className={`${styles.sectionHeader}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Technical Arsenal</h2>
            <div className={styles.line}></div>
          </motion.div>

          <div className={styles.skillsGrid}>
            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', width: '100%' }}
            >
              <SpotlightCard className={`${styles.skillCategory} glass`} style={{ width: '100%' }}>
                <h3>Languages</h3>
                <div className={styles.tags}>
                  <span>Python</span>
                  <span>JavaScript</span>
                  <span>C</span>
                  <span>C++ (Basics)</span>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', width: '100%' }}
            >
              <SpotlightCard className={`${styles.skillCategory} glass`} style={{ width: '100%' }}>
                <h3>Frontend</h3>
                <div className={styles.tags}>
                  <span>React.js</span>
                  <span>Next.js</span>
                  <span>HTML/CSS</span>
                </div>
              </SpotlightCard>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 45 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              style={{ display: 'flex', width: '100%' }}
            >
              <SpotlightCard className={`${styles.skillCategory} glass`} style={{ width: '100%' }}>
                <h3>AI & Cloud</h3>
                <div className={styles.tags}>
                  <span>Gemini API</span>
                  <span>GCP (Basic)</span>
                  <span>Vercel</span>
                  <span>Git/GitHub</span>
                </div>
              </SpotlightCard>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Experience & Leadership Section */}
      <section id="experience" className={`section ${styles.experience}`}>
        <div className="container">
          <motion.div 
            className={`${styles.sectionHeader}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Leadership</h2>
            <div className={styles.line}></div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <SpotlightCard className={`${styles.expCard} glass`}>
              <div className={styles.expTop}>
                <div>
                  <h3>Interim Vice Chair, Technical Committee</h3>
                  <p className={styles.expOrg}>IEEE Student Branch — Silver Oak University</p>
                </div>
                <span className={styles.expDate}>Present</span>
              </div>
              <ul>
                <li>Promoting active engagement in technical discussions, learning sessions, and innovation-focused initiatives.</li>
                <li>Leading technical volunteering activities and encouraging real-world project development.</li>
                <li>Coordinating committee activities, assigning technical tasks, and tracking member contributions.</li>
              </ul>
            </SpotlightCard>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className={`section ${styles.about}`}>
        <div className="container">
          <motion.div 
            className={`${styles.sectionHeader}`}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Background & Education</h2>
            <div className={styles.line}></div>
          </motion.div>

          <div className={styles.aboutGrid}>
            <motion.div 
              className={`${styles.aboutText} glass`}
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            >
              <p>
                I am a first-year Computer Science student specializing in building scalable full-stack applications.
                My focus is heavily on integrating AI and Machine Learning systems to solve real-world practical problems.
              </p>
              <div className={styles.currentlyExploring}>
                <h3>Currently Exploring</h3>
                <div className={styles.tags}>
                  <span className="hover-float">Agentic Workflows</span>
                  <span className="hover-float">Generative UI</span>
                  <span className="hover-float">LLM Integrations</span>
                </div>
              </div>
              <div className={styles.contactInfo}>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>📍</span> Ahmedabad, Gujarat, India
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>✉️</span> jagrutshah2508@gmail.com
                </div>
                <div className={styles.contactItem}>
                  <span className={styles.icon}>📞</span> +91 9313690577
                </div>
              </div>
            </motion.div>

            <div className={styles.educationList}>
              <motion.div 
                className={`${styles.eduCard} hover-float`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.eduDate}>Ongoing</div>
                <h3>B.Tech in Computer Science Engineering</h3>
                <p>Silver Oak University</p>
              </motion.div>
              <motion.div 
                className={`${styles.eduCard} hover-float`}
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <div className={styles.eduDate}>Ongoing</div>
                <h3>BS Degree (Foundation Level)</h3>
                <p>IIT Madras</p>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className={`section ${styles.contact}`}>
        <div className="container">
          <motion.div 
            className={`${styles.contactWrapper} glass`}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          >
            <h2>Let's build something awesome.</h2>
            <p>I'm always open to discussing AI, collaborating on interesting projects, or just geeking out about tech.</p>
            <Magnetic>
              <a href="mailto:jagrutshah2508@gmail.com" onClick={handleEmailClick} className={`${styles.primaryBtn}`} style={{ display: 'inline-block' }}>Say Hello</a>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      <footer className={styles.footer}>
        <div className="container">
          <div className={styles.footerContent}>
            <div className={styles.footerLeft}>
              <h2>JS.</h2>
              <p>Building AI-powered scalable systems.</p>
            </div>
            <div className={styles.footerLinks}>
              <Magnetic>
                <a href="https://github.com/Jagrut-Shah" target="_blank" rel="noreferrer" className="hover-float" style={{ display: 'inline-block' }}>GitHub</a>
              </Magnetic>
              <Magnetic>
                <a href="https://linkedin.com/in/jagrut-shah25" target="_blank" rel="noreferrer" className="hover-float" style={{ display: 'inline-block' }}>LinkedIn</a>
              </Magnetic>
              <Magnetic>
                <a href="mailto:jagrutshah2508@gmail.com" onClick={handleEmailClick} className="hover-float" style={{ display: 'inline-block' }}>Email</a>
              </Magnetic>
            </div>
          </div>
          <div className={styles.footerBottom}>
            <p>© {new Date().getFullYear()} Jagrut Shah. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </main>
  );
}
