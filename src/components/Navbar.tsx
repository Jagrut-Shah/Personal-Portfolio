"use client";

import { useTheme } from "./ThemeProvider";
import { useEffect, useState } from "react";
import styles from "./Navbar.module.css";
import Magnetic from "./Magnetic";

export default function Navbar() {
  const { theme, toggleTheme } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      { rootMargin: "-30% 0px -50% 0px" }
    );

    const sections = ["home", "about", "skills", "projects", "experience"];
    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      observer.disconnect();
    };
  }, []);

  return (
    <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ""}`}>
      <div className={styles.container}>
        <Magnetic>
          <a href="#home" className={styles.logo}>
            JS<span>.</span>
          </a>
        </Magnetic>

        <ul className={styles.desktopNav}>
          <li><Magnetic><a href="#about" className={activeSection === "about" ? styles.active : ""}>About</a></Magnetic></li>
          <li><Magnetic><a href="#skills" className={activeSection === "skills" ? styles.active : ""}>Skills</a></Magnetic></li>
          <li><Magnetic><a href="#projects" className={activeSection === "projects" ? styles.active : ""}>Projects</a></Magnetic></li>
          <li><Magnetic><a href="#experience" className={activeSection === "experience" ? styles.active : ""}>Experience</a></Magnetic></li>
        </ul>

        <div className={styles.actions}>
          <Magnetic>
            <button onClick={toggleTheme} className={styles.themeToggle} aria-label="Toggle Theme">
              {theme === "dark" ? (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2"/><path d="M12 20v2"/><path d="m4.93 4.93 1.41 1.41"/><path d="m17.66 17.66 1.41 1.41"/><path d="M2 12h2"/><path d="M20 12h2"/><path d="m6.34 17.66-1.41 1.41"/><path d="m19.07 4.93-1.41 1.41"/></svg>
              ) : (
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/></svg>
              )}
            </button>
          </Magnetic>
          
          <button 
            className={styles.mobileMenuBtn} 
            onClick={() => setMobileMenuOpen(true)}
            aria-label="Open Mobile Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
          </button>
        </div>
      </div>

      {/* Mobile Nav Overlay */}
      <div className={`${styles.mobileNavOverlay} ${mobileMenuOpen ? styles.active : ""}`}>
        <button 
          className={styles.closeBtn} 
          onClick={() => setMobileMenuOpen(false)}
          aria-label="Close Mobile Menu"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
        </button>
        <ul className={styles.mobileLinks}>
          <li><a href="#about" onClick={() => setMobileMenuOpen(false)}>About</a></li>
          <li><a href="#skills" onClick={() => setMobileMenuOpen(false)}>Skills</a></li>
          <li><a href="#projects" onClick={() => setMobileMenuOpen(false)}>Projects</a></li>
          <li><a href="#experience" onClick={() => setMobileMenuOpen(false)}>Experience</a></li>
        </ul>
      </div>
    </nav>
  );
}
