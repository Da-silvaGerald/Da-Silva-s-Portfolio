import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import { ScreenshotImage } from '../components/ScreenshotImage';
import './Home.css';

interface HomeProps {
  onActiveSectionChange: (sectionId: string) => void;
}

export function Home({ onActiveSectionChange }: HomeProps) {
  const [roleIndex, setRoleIndex] = useState<number>(0);
  const [typedText, setTypedText] = useState<string>(profile.typewriterRoles[0]);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  const [activeProjectIndex, setActiveProjectIndex] = useState<number>(0);
  const [emailCopied, setEmailCopied] = useState<boolean>(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) {
      setTypedText(profile.typewriterRoles[0]);
      return;
    }

    const currentFullRole = profile.typewriterRoles[roleIndex];
    const typingSpeed = isDeleting ? 28 : 55;

    const timeout = window.setTimeout(() => {
      if (!isDeleting && typedText.length < currentFullRole.length) {
        setTypedText(currentFullRole.slice(0, typedText.length + 1));
      } else if (!isDeleting && typedText.length === currentFullRole.length) {
        window.setTimeout(() => setIsDeleting(true), 1600);
      } else if (isDeleting && typedText.length > 0) {
        setTypedText(currentFullRole.slice(0, typedText.length - 1));
      } else if (isDeleting && typedText.length === 0) {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % profile.typewriterRoles.length);
      }
    }, typingSpeed);

    return () => window.clearTimeout(timeout);
  }, [typedText, isDeleting, roleIndex]);

  useEffect(() => {
    const sections = document.querySelectorAll<HTMLElement>('[data-section]');
    const revealNodes = document.querySelectorAll<HTMLElement>('.reveal-section');

    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12 }
    );

    const activeSectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.getAttribute('data-section');
            if (id) onActiveSectionChange(id);
          }
        });
      },
      { rootMargin: '-30% 0px -55% 0px' }
    );

    revealNodes.forEach((node) => revealObserver.observe(node));
    sections.forEach((sec) => activeSectionObserver.observe(sec));

    return () => {
      revealObserver.disconnect();
      activeSectionObserver.disconnect();
    };
  }, [onActiveSectionChange]);

  const handleCopyEmail = () => {
    navigator.clipboard?.writeText(profile.contact.email);
    setEmailCopied(true);
    window.setTimeout(() => setEmailCopied(false), 2200);
  };

  const whatsappUrl = `https://wa.me/${profile.contact.whatsappNumberPlain}?text=${encodeURIComponent(
    profile.contact.whatsappPrefill
  )}`;

  const activeProject = projects[activeProjectIndex] || projects[0];

  return (
    <main id="main-content" className="home-page">
      {/* HERO SECTION */}
      <section className="hero-section" data-section="hero">
        <div className="console-container">
          <div className="hero-telemetry">
            <div className="hero-telemetry__status">
              <span className="hero-telemetry__pulse" aria-hidden="true" />
              <span>{profile.statusText}</span>
            </div>
            <span className="hero-telemetry__coords">{profile.coordinates}</span>
          </div>

          <div className="hero-grid">
            <div className="hero-grid__primary">
              <p className="hero-eyebrow">
                {profile.authorName.toUpperCase()} // PAN-ATLANTIC UNIVERSITY, LAGOS
              </p>
              <h1 className="hero-title">{profile.siteTitle}</h1>

              <div className="hero-role-box" aria-live="polite">
                <span className="hero-role-box__prefix">&gt; ROLE_FOCUS:</span>
                <span className="hero-role-box__typed">{typedText}</span>
                <span className="hero-role-box__cursor" aria-hidden="true">
                  _
                </span>
              </div>

              <p className="hero-positioning">{profile.positioning}</p>

              <div className="hero-cta-row">
                <a href="#projects" className="btn-console btn-console--primary">
                  Inspect Project Dossiers
                </a>
                <a href="#contact" className="btn-console">
                  Get in touch
                </a>
                <Link to="/projects/udemy-50-projects" className="btn-console">
                  Featured Case Study (Udemy 50) →
                </Link>
              </div>
            </div>

            <aside className="hero-grid__dossier" aria-label="Operator telemetry summary">
              <div className="dossier-card">
                <div className="dossier-card__header">
                  <span>SYS_READOUT // 00</span>
                  <span>VERIFIED</span>
                </div>
                <dl className="dossier-card__list">
                  <div>
                    <dt>FULL NAME</dt>
                    <dd>{profile.authorName}</dd>
                  </div>
                  <div>
                    <dt>INSTITUTION</dt>
                    <dd>Pan-Atlantic University, Lagos (Software Engineering)</dd>
                  </div>
                  <div>
                    <dt>EXPERIENCE</dt>
                    <dd>IT Intern @ Oando Energy Resources Nigeria Ltd (Summers 2025 &amp; 2026)</dd>
                  </div>
                  <div>
                    <dt>TECHNICAL FOCUS</dt>
                    <dd>Secure Web Apps, Backend APIs, Encryption, DevSecOps, Defensive/Offensive Security, GRC, IAM</dd>
                  </div>
                </dl>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 01 // ABOUT ME SECTION */}
      <section
        id="about"
        className="about-section reveal-section"
        data-section="about"
        aria-labelledby="about-heading"
      >
        <div className="console-container">
          <div className="section-index-bar">
            <span className="section-index-bar__code">01 // ABOUT ME</span>
            <span>OPERATOR: {profile.authorName.toUpperCase()}</span>
          </div>

          <div className="about-layout">
            <div className="about-layout__intro">
              <h2 id="about-heading" className="section-heading">
                Software Engineering foundation with a security-first operational focus.
              </h2>
              <p className="about-lead">
                I build full-stack and desktop applications while actively training in defensive and
                offensive security, Identity and Access Management (IAM), and resilient backend design.
              </p>
            </div>

            <div className="about-pillars">
              <article className="about-pillar">
                <span className="about-pillar__index">01.1 // WHO I AM</span>
                <h3 className="about-pillar__title">Academic &amp; Industry Background</h3>
                <p>{profile.about.whoIAm}</p>
              </article>

              <article className="about-pillar">
                <span className="about-pillar__index">01.2 // WHAT I DO</span>
                <h3 className="about-pillar__title">Systems &amp; Application Engineering</h3>
                <p>{profile.about.whatIDo}</p>
              </article>

              <article className="about-pillar">
                <span className="about-pillar__index">01.3 // INTERESTS &amp; FOCUS</span>
                <h3 className="about-pillar__title">Cybersecurity, IAM, GRC &amp; DevSecOps</h3>
                <p>{profile.about.securityDirection}</p>
              </article>
            </div>

            <div className="focus-matrix">
              <div className="focus-matrix__header">
                <h3 className="focus-matrix__title">TECHNICAL FOCUS AREAS</h3>
                <span className="focus-matrix__tag">KALI LINUX // IAM // ENCRYPTION // DEVSECOPS // GRC</span>
              </div>
              <div className="focus-matrix__grid">
                {profile.focusAreas.map((area) => (
                  <div key={area.code} className="focus-cell">
                    <span className="focus-cell__code">{area.code}</span>
                    <h4 className="focus-cell__name">{area.title}</h4>
                    <p className="focus-cell__desc">{area.detail}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="timeline-block">
              <div className="timeline-block__header">
                <h3 className="timeline-block__title">EXPERIENCE &amp; EDUCATION TIMELINE</h3>
                <span className="timeline-block__sub">VERIFIED RECORDS</span>
              </div>
              <div className="timeline-list">
                {profile.experience.map((exp) => (
                  <article key={exp.id} className="timeline-item">
                    <div className="timeline-item__meta">
                      <span className="timeline-item__id">{exp.id}</span>
                      <span className="timeline-item__period">{exp.period}</span>
                      <span className="timeline-item__loc">{exp.location}</span>
                    </div>
                    <div className="timeline-item__content">
                      <h4 className="timeline-item__role">
                        {exp.role} <span className="timeline-item__at">@ {exp.organization}</span>
                      </h4>
                      <ul className="timeline-item__bullets">
                        {exp.highlights.map((bullet) => (
                          <li key={bullet}>{bullet}</li>
                        ))}
                      </ul>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 02 // PROJECTS SECTION */}
      <section
        id="projects"
        className="projects-section reveal-section"
        data-section="projects"
        aria-labelledby="projects-heading"
      >
        <div className="console-container">
          <div className="section-index-bar">
            <span className="section-index-bar__code">02 // PROJECTS</span>
            <span>ENTRIES: 0{projects.length} VERIFIED</span>
          </div>

          <div className="projects-header">
            <div>
              <h2 id="projects-heading" className="section-heading">
                Selected Engineering Logs
              </h2>
              <p className="projects-header__sub">
                Hover or focus a project entry on desktop to preview its screenshot and stack telemetry,
                or open its dedicated route (/projects/:slug) for full architectural notes.
              </p>
            </div>
          </div>

          <div className="projects-console-grid">
            <div className="project-log-list">
              {projects.map((project, idx) => {
                const isSelected = idx === activeProjectIndex;
                return (
                  <article
                    key={project.id}
                    className={`project-row ${isSelected ? 'is-selected' : ''}`}
                    onMouseEnter={() => setActiveProjectIndex(idx)}
                    onFocus={() => setActiveProjectIndex(idx)}
                  >
                    <div className="project-row__top">
                      <span className="project-row__id">{project.id}</span>
                      <span className="project-row__category">{project.category}</span>
                      {project.featuredCaseStudy && (
                        <span className="project-row__badge">DEDICATED DETAILS PAGE</span>
                      )}
                    </div>

                    <h3 className="project-row__title">
                      <Link to={`/projects/${project.slug}`}>{project.title}</Link>
                    </h3>

                    <p className="project-row__desc">{project.shortDescription}</p>

                    <div className="project-row__mobile-shot">
                      <ScreenshotImage
                        src={project.heroImage.src}
                        alt={project.heroImage.alt}
                        label={project.id}
                      />
                    </div>

                    <ul className="project-row__tags" aria-label={`${project.title} technologies`}>
                      {project.techStack.map((tech) => (
                        <li key={tech} className="project-tag">
                          {tech}
                        </li>
                      ))}
                    </ul>

                    <div className="project-row__links">
                      <Link
                        to={`/projects/${project.slug}`}
                        className="btn-console btn-console--primary"
                      >
                        Project Details (/projects/{project.slug}) →
                      </Link>
                      <a
                        href={project.repoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-console"
                      >
                        GitHub Repo ↗
                      </a>
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-console"
                        >
                          Live Link ↗
                        </a>
                      )}
                    </div>
                  </article>
                );
              })}
            </div>

            <aside
              className="project-preview-pane"
              aria-label="Selected project visual inspection"
            >
              <div className="project-preview-pane__card">
                <div className="project-preview-pane__bar">
                  <span>INSPECTING // {activeProject.id}</span>
                  <span>{activeProject.year}</span>
                </div>

                <ScreenshotImage
                  src={activeProject.heroImage.src}
                  alt={activeProject.heroImage.alt}
                  label={activeProject.id}
                />

                <p className="project-preview-pane__caption">
                  {activeProject.heroImage.caption}
                </p>

                <div className="project-preview-pane__meta">
                  <h4>STACK TELEMETRY</h4>
                  <div className="project-preview-pane__tags">
                    {activeProject.techStack.map((tech) => (
                      <span key={tech} className="project-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                <Link
                  to={`/projects/${activeProject.slug}`}
                  className="btn-console btn-console--primary project-preview-pane__btn"
                >
                  Open Full Details: {activeProject.title} →
                </Link>
              </div>
            </aside>
          </div>
        </div>
      </section>

      {/* 03 // CONTACT / CTA SECTION */}
      <section
        id="contact"
        className="contact-section reveal-section"
        data-section="contact"
        aria-labelledby="contact-heading"
      >
        <div className="console-container">
          <div className="section-index-bar">
            <span className="section-index-bar__code">03 // CONTACT &amp; CALL TO ACTION</span>
            <span>CHANNEL STATUS: ONLINE</span>
          </div>

          <div className="contact-panel">
            <div className="contact-panel__left">
              <p className="contact-panel__eyebrow">DIRECT COMMUNICATION CHANNELS</p>
              <h2 id="contact-heading" className="contact-panel__title">
                Get in touch.
              </h2>
              <p className="contact-panel__desc">
                Available for software engineering internships, cybersecurity roles, and technical
                collaborations. Reach out directly via email, WhatsApp, LinkedIn, or GitHub.
              </p>

              <div className="contact-primary-actions">
                <a
                  href={`mailto:${profile.contact.email}?subject=Inquiry%20from%20My%20Portfolio:%20Da-Silva%20Oluwasegun`}
                  className="btn-console btn-console--primary"
                >
                  Send Email (mailto)
                </a>
                <button
                  type="button"
                  className="btn-console"
                  onClick={handleCopyEmail}
                  aria-live="polite"
                >
                  {emailCopied ? '✓ Email Copied!' : `Copy Email (${profile.contact.email})`}
                </button>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-console"
                >
                  WhatsApp ({profile.contact.whatsappDisplay}) ↗
                </a>
              </div>
            </div>

            <div className="contact-panel__right">
              <div className="channel-directory">
                <div className="channel-directory__header">VERIFIED ENDPOINTS</div>

                <a href={`mailto:${profile.contact.email}`} className="channel-row">
                  <span className="channel-row__label">01 // EMAIL</span>
                  <span className="channel-row__value">{profile.contact.email}</span>
                </a>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-row"
                >
                  <span className="channel-row__label">02 // WHATSAPP</span>
                  <span className="channel-row__value">{profile.contact.whatsappDisplay} ↗</span>
                </a>

                <a
                  href={profile.contact.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-row"
                >
                  <span className="channel-row__label">03 // GITHUB</span>
                  <span className="channel-row__value">github.com/Da-silvaGerald/shegz419 ↗</span>
                </a>

                <a
                  href={profile.contact.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="channel-row"
                >
                  <span className="channel-row__label">04 // LINKEDIN</span>
                  <span className="channel-row__value">oluwasegun-da-silva-596b0a273 ↗</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
