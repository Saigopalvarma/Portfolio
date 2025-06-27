import React, { useState, useRef, useEffect } from "react";
import ModifyForm from "./components/ModifyForm";
import ContactForm from "./components/ContactForm";
import ThreeBackground from "./components/ThreeBackground";
import "./Portfolio.css";

function Portfolio() {
  const [navOpen, setNavOpen] = useState(false);

  // Hardcoded skills and projects
  const [skills] = useState([
    "C",
    "C++",
    "Java",
    "JavaScript",
    "Python",

    "Data Structures",
    "Algorithms",
    "React",
    "Pandas",
    "Data Preprocessing",

    "Data Visualization",

    "Scikit-learn",
    "Deep Learining",
    "Tensorflow",
    "NLP",

    "Flask",

    "Github",
    "MongoDB",
    "MySQL",

    "Netify",
  ]);
  const [projects] = useState([
    {
      title: "Event Management & Attendance Tracking",
      description: "An online event registration and attendance tracking system with QR code check-ins using React, Flask, and MongoDB.",
      link: "https://github.com/Saigopalvarma/myproject",
      image: "/download.png",
      tech: ["React", "Flask", "MongoDB"],
    },
    {
      title: "Criminal Record Analysis System",
      description: "A full-stack system for criminal record analysis with ML models like BERT and LigGBM integrated using Flask backend and React frontend.",
      link: "https://github.com/Saigopalvarma/criminal-record-management",
      image: "/download.png",
      tech: ["React", "Flask", "BERT", " LightGBM ", "Kmeans"],
    },
    {
      title: "Crop Disease Prediction",
      description: "A crop disease detection system for paddy using CNN models integrated with Gemini API for extended analysis.",
      link: "https://github.com/Saigopalvarma/crop_disease_management",
      image: "/download.png",
      tech: ["CNN", "Gemini API", "Flask","MongoDB"],
    },
  ]);

  const [showModify, setShowModify] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [skillsAnimated, setSkillsAnimated] = useState(false);
  const [welcomeAnimated, setWelcomeAnimated] = useState(false);

  // Refs for each section
  const sectionIds = ["home", "about", "skills", "projects", "contact"];
  const sectionRefs = useRef(sectionIds.map(() => React.createRef()));

  // Intersection Observer to update activeSection on scroll
  useEffect(() => {
    const handleScroll = () => {
      let found = "home";
      sectionRefs.current.forEach((ref, idx) => {
        const rect = ref.current.getBoundingClientRect();
        if (
          rect.top <= window.innerHeight / 2 &&
          rect.bottom >= window.innerHeight / 2
        ) {
          found = sectionIds[idx];
        }
      });
      setActiveSection(found);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (activeSection === "skills") {
      setSkillsAnimated(true);
    } else {
      setSkillsAnimated(false);
    }
  }, [activeSection]);

  useEffect(() => {
    // Trigger animation on first mount
    setTimeout(() => setWelcomeAnimated(true), 100);
  }, []);

  const scrollToSection = (id) => {
    const idx = sectionIds.indexOf(id);
    if (sectionRefs.current[idx]?.current) {
      sectionRefs.current[idx].current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <ThreeBackground />
      <div
        style={{
          position: "fixed",
          top: 30,
          right: 30,
          left: "auto",
          width: "auto",
          zIndex: 1000,
          borderRadius: "32px",
          padding: "6px", // Border thickness
          background: "linear-gradient(90deg, #007bff, #00ffb8, #ff6ec4)",
          boxShadow: "0 4px 24px rgba(0,0,0,0.12)",
          minHeight: 0,
          minWidth: 0,
          display: "inline-block",
        }}
      >
        {/* Hamburger Icon */}
        <button
          className="navbar-toggler"
          type="button"
          aria-label="Toggle navigation"
          onClick={() => setNavOpen((open) => !open)}
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <nav
          className={`navbar navbar-expand-lg navbar-dark bg-dark${
            navOpen ? " show-mobile" : ""
          }`}
          style={{
            borderRadius: "29px",
            padding: "10px 32px",
            background: "#212529",
            minHeight: 0,
            minWidth: 0,
            display: navOpen ? "block" : "flex",
            alignItems: "center",
            border: "none",
          }}
        >
          <div
            className={`collapse navbar-collapse${
              navOpen ? " show" : ""
            }`}
            style={{ padding: 0 }}
          >
            <ul
              className="navbar-nav ms-auto"
              style={{ gap: "16px", flexWrap: "wrap" }}
            >
              {sectionIds.map((sec) => (
                <li className="nav-item" key={sec}>
                  <span
                    className={`nav-link${
                      activeSection === sec ? " active" : ""
                    }`}
                    style={{
                      cursor: "pointer",
                      borderRadius: "20px",
                      padding: "8px 18px",
                      position: "relative",
                      background: "none",
                      boxShadow: "none",
                    }}
                    onClick={() => {
                      scrollToSection(sec);
                      setNavOpen(false);
                    }}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </span>
                </li>
              ))}
              <li className="nav-item">
                <span
                  className="nav-link"
                  style={{
                    cursor: "pointer",
                    borderRadius: "20px",
                    padding: "8px 18px",
                  }}
                  onClick={() => setShowModify(true)}
                >
                  {/* You can add an icon or text here if needed */}
                </span>
              </li>
            </ul>
          </div>
        </nav>
      </div>

      <div
        style={{
          paddingTop: "70px",
          minHeight: "100vh",
          backgroundImage: "url('/download.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <section
          ref={sectionRefs.current[0]}
          id="home"
          className={`container d-flex flex-column justify-content-center align-items-center section-transition${
            activeSection === "home" ? " active" : ""
          }`}
          style={{ minHeight: "100vh", position: "relative" }}
        >
          {/* Light, transparent image on the left */}
          
         <div style={{ position: "relative", zIndex: 2, width: "100%" }}>
  <h2 className="homepage-title">Welcome</h2>
  <div className="homepage-description">
    I'm Varma, a passionate learner and developer.<br />
    I build projects that turn ideas into reality.
  </div>
  <div className="homepage-icons">
    <a
      href="https://github.com/Saigopalvarma/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="GitHub"
    >
      <i className="bi bi-github"></i>
    </a>
    <a
      href="https://www.linkedin.com/in/bhupathiraju-sai-gopal-varma-749257282/"
      target="_blank"
      rel="noopener noreferrer"
      aria-label="LinkedIn"
    >
      <i className="bi bi-linkedin"></i>
    </a>
  </div>
  <div className="homepage-resume">
    <a href="/RESUME.pdf" download>
      Download Resume
    </a>
  </div>
</div>


        </section>

        <section
          ref={sectionRefs.current[1]}
          id="about"
          className={`container d-flex flex-column justify-content-center align-items-center section-transition${
            activeSection === "about" ? " active" : ""
          }`}
          style={{ minHeight: "100vh" }}
        >
          <h2 style={{ marginBottom: "4rem" }}>About Me</h2>
          <div className="about-3d">
            <div className="about-3d-inner">
              <p>
                I'm a passionate web developer with a strong foundation in machine
                learning. I specialize in building responsive, user-centric web
                applications that seamlessly integrate ML-powered features to solve
                real-world problems. My work combines elegant frontend design with
                intelligent backend systems for a complete, efficient user experience.
              </p>
              <p>
                Driven by curiosity and creativity, I constantly explore emerging tools
                and frameworks across both web and ML domains. Whether it's deploying
                predictive models or crafting dynamic interfaces, I strive to create
                solutions that are both innovative and impactful.
              </p>
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section
          ref={sectionRefs.current[2]}
          id="skills"
          className={`container d-flex flex-column justify-content-center align-items-center section-transition${
            activeSection === "skills" ? " active" : ""
          }`}
          style={{ minHeight: "100vh" }}
        >
          <h2
            style={{
              marginBottom: "2.5rem",
              color: "#222",
              fontWeight: 700,
              letterSpacing: 1,
            }}
          >
            Skills
          </h2>
          <div
            className="d-flex justify-content-center align-items-start mb-4"
            style={{ gap: "40px" }}
          >
            {/* Web Development Rectangle */}
            <div className="d-flex flex-column align-items-center">
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #b2f0ff, #e0ffe7, #ffe0f7)",
                  borderRadius: "32px",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  width: 320,
                  height: 120,
                  boxShadow: "0 8px 32px 0 rgba(0, 123, 255, 0.08)",
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 100,
                    borderRadius: "28px",
                    background: "rgba(255,255,255,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 26,
                    color: "#007bff",
                    letterSpacing: 1,
                    boxSizing: "border-box",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <i
                    className="bi bi-code-slash"
                    style={{
                      fontSize: 32,
                      marginRight: 16,
                      color: "#00b8d9",
                    }}
                  ></i>
                  Web Development
                </div>
              </div>
            </div>
            {/* Machine Learning Rectangle */}
            <div className="d-flex flex-column align-items-center">
              <div
                style={{
                  background:
                    "linear-gradient(90deg, #e0ffe7, #b2f0ff, #ffe0f7)",
                  borderRadius: "32px",
                  padding: "4px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  marginBottom: 16,
                  width: 320,
                  height: 120,
                  boxShadow: "0 8px 32px 0 rgba(40, 167, 69, 0.08)",
                }}
              >
                <div
                  style={{
                    width: 300,
                    height: 100,
                    borderRadius: "28px",
                    background: "rgba(255,255,255,0.95)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontWeight: "bold",
                    fontSize: 26,
                    color: "#28a745",
                    letterSpacing: 1,
                    boxSizing: "border-box",
                    boxShadow: "0 2px 12px rgba(0,0,0,0.04)",
                  }}
                >
                  <i
                    className="bi bi-cpu"
                    style={{
                      fontSize: 32,
                      marginRight: 16,
                      color: "#00b894",
                    }}
                  ></i>
                  Machine Learning
                </div>
              </div>
            </div>
          </div>
          {/* All skills floating in a row */}
          <div
            className={`skills-row d-flex justify-content-center align-items-center flex-wrap mt-4${
              skillsAnimated ? " skills-row-animate" : ""
            }`}
            style={{ gap: "18px", minHeight: 60 }}
          >
            {skills.map((skill, i) => (
              <span
                key={i}
                className="skill-float"
                style={{
                  background: "rgba(255,255,255,0.95)",
                  color: "#007bff",
                  borderRadius: "20px",
                  padding: "10px 22px",
                  fontWeight: "bold",
                  fontSize: 18,
                  boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                  opacity: 0,
                  transform: "translateY(-40px) scale(0.7)",
                  transition: `all 0.7s cubic-bezier(.23,1.02,.54,.98) ${i * 0.08}s`,
                  border: "1.5px solid #e0f7fa",
                  marginBottom: 8,
                }}
              >
                {skill}
              </span>
            ))}
          </div>
        </section>

        {/* ...other code... */}
<section
  ref={sectionRefs.current[3]}
  id="projects"
  className={`container d-flex flex-column justify-content-center align-items-center section-transition${
    activeSection === "projects" ? " active" : ""
  }`}
  style={{ minHeight: "100vh" }}
>
  <h2 style={{ marginBottom: "4rem" }}>Projects</h2>
  <div className="projects-wrapper">
    {projects.map((p, i) => (
      <div key={i} className="project-card-col">
        <div className="card">
          {p.image && (
            <img src={p.image} className="card-img-top" alt={p.title} />
          )}
          <div className="card-body">
            <h5 className="card-title">{p.title}</h5>
            <p className="card-text">{p.description}</p>
            <div className="project-tech-list">
              {p.tech && p.tech.map((t, idx) => (
                <span className="project-tech-badge" key={idx}>{t}</span>
              ))}
            </div>
            {p.link && (
              <a
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                View
              </a>
            )}
          </div>
        </div>
      </div>
    ))}
  </div>
</section>
        <section
          ref={sectionRefs.current[4]}
          id="contact"
          className={`container d-flex flex-column justify-content-center align-items-center section-transition${
            activeSection === "contact" ? " active" : ""
          }`}
          style={{ minHeight: "100vh" }}
        >
          <h2 style={{ marginBottom: "4rem" }}>Contact</h2>
          <ContactForm />
        </section>
      </div>

      {/* Modify Modal */}
      {showModify && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100vw",
            height: "100vh",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 9999,
          }}
        >
          <div
            style={{
              background: "#fff",
              padding: 24,
              borderRadius: 8,
              minWidth: 320,
              maxWidth: 500,
              width: "100%",
              position: "relative",
            }}
          >
            <button
              onClick={() => setShowModify(false)}
              style={{
                position: "absolute",
                top: 8,
                right: 12,
                border: "none",
                background: "none",
                fontSize: 24,
                cursor: "pointer",
              }}
              aria-label="Close"
            >
              &times;
            </button>
            <ModifyForm />
          </div>
        </div>
      )}
    </>
  );
}

export default Portfolio;
