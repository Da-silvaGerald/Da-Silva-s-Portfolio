import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { projects, ProjectScreenshot } from '../data/projects';
import { profile } from '../data/profile';
import { ScreenshotImage } from '../components/ScreenshotImage';
import { NotFound } from './NotFound';
import './ProjectDetail.css';

export function ProjectDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [lightboxShot, setLightboxShot] = useState<ProjectScreenshot | null>(null);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [slug]);

  useEffect(() => {
    if (!lightboxShot) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLightboxShot(null);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [lightboxShot]);

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  if (currentIndex === -1) {
    return <NotFound />;
  }

  const project = projects[currentIndex];
  const prevProject = projects[(currentIndex - 1 + projects.length) % projects.length];
  const nextProject = projects[(currentIndex + 1) % projects.length];

  const whatsappUrl = `https://wa.me/${profile.contact.whatsappNumberPlain}?text=${encodeURIComponent(
    `Hello Oluwasegun, I reviewed your ${project.title} case study on "${profile.siteTitle}" and would like to connect.`
  )}`;

  return (
    <main id="main-content" className="detail-page">
      <div className="console-container">
        <div className="detail-topbar">
          <Link to="/#projects" className="detail-topbar__back">
            ← BACK TO ALL PROJECT LOGS
          </Link>
          <span className="detail-topbar__id">
            DOSSIER // {project.id} // {project.year}
          </span>
        </div>

        <header className="detail-header">
          <div className="detail-header__main">
            <p className="detail-header__cat">{project.category}</p>
            <h1 className="detail-header__title">{project.title}</h1>
            <p className="detail-header__summary">{project.shortDescription}</p>
          </div>

          <div className="detail-header__actions">
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-console btn-console--primary"
            >
              Inspect GitHub Repository ↗
            </a>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-console"
              >
                Open Live Link ↗
              </a>
            )}
          </div>
        </header>

        <section className="detail-hero-shot" aria-label="Primary project visual">
          <ScreenshotImage
            src={project.heroImage.src}
            alt={project.heroImage.alt}
            label={project.id}
          />
          <p className="detail-hero-shot__caption">{project.heroImage.caption}</p>
        </section>

        <div className="detail-grid-two">
          <section className="detail-card" aria-labelledby="overview-heading">
            <span className="detail-card__index">01 // FULL DESCRIPTION</span>
            <h2 id="overview-heading" className="detail-card__title">
              Project Overview
            </h2>
            <p className="detail-card__prose">{project.fullOverview}</p>
          </section>

          <section className="detail-card" aria-labelledby="tech-heading">
            <span className="detail-card__index">02 // TECHNOLOGIES USED</span>
            <h2 id="tech-heading" className="detail-card__title">
              Stack &amp; Tooling
            </h2>
            <ul className="detail-tech-list">
              {project.techStack.map((tech) => (
                <li key={tech} className="detail-tech-item">
                  <span className="detail-tech-item__bullet" aria-hidden="true">
                    ■
                  </span>
                  <span>{tech}</span>
                </li>
              ))}
            </ul>
          </section>
        </div>

        <div className="detail-grid-two">
          <section className="detail-card" aria-labelledby="problem-heading">
            <span className="detail-card__index">03 // PROBLEM SOLVED</span>
            <h2 id="problem-heading" className="detail-card__title">
              Operational Challenge
            </h2>
            <ul className="detail-bullet-list">
              {project.problemSolved.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="detail-card" aria-labelledby="features-heading">
            <span className="detail-card__index">04 // KEY FEATURES</span>
            <h2 id="features-heading" className="detail-card__title">
              Implemented Capabilities
            </h2>
            <ul className="detail-bullet-list">
              {project.features.map((feat) => (
                <li key={feat}>{feat}</li>
              ))}
            </ul>
          </section>
        </div>

        <section className="detail-gallery-section" aria-labelledby="gallery-heading">
          <div className="section-index-bar">
            <span className="section-index-bar__code">05 // SCREENSHOT GALLERY</span>
            <span>CLICK ANY FRAME TO ENLARGE</span>
          </div>
          <h2 id="gallery-heading" className="detail-card__title">
            Interface &amp; Module Captures
          </h2>

          <div className="detail-gallery-grid">
            {project.gallery.map((shot, idx) => (
              <figure key={`${shot.src}-${idx}`} className="detail-gallery-item">
                <button
                  type="button"
                  className="detail-gallery-item__btn"
                  onClick={() => setLightboxShot(shot)}
                  aria-label={`Enlarge screenshot: ${shot.alt}`}
                >
                  <ScreenshotImage
                    src={shot.src}
                    alt={shot.alt}
                    label={`${project.id}-SHOT-${idx + 1}`}
                  />
                  <span className="detail-gallery-item__zoom">[+ ENLARGE VIEW]</span>
                </button>
                <figcaption className="detail-gallery-item__caption">{shot.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        <section className="detail-card detail-card--full" aria-labelledby="learned-heading">
          <span className="detail-card__index">06 // ENGINEERING TAKEAWAYS</span>
          <h2 id="learned-heading" className="detail-card__title">
            What I Learned Building {project.title}
          </h2>
          <ul className="detail-bullet-list">
            {project.whatILearned.map((lesson) => (
              <li key={lesson}>{lesson}</li>
            ))}
          </ul>
        </section>

        <nav className="detail-pagination" aria-label="Next and previous project navigation">
          <Link to={`/projects/${prevProject.slug}`} className="detail-pagination__link">
            <span className="detail-pagination__dir">← PREVIOUS PROJECT ({prevProject.id})</span>
            <span className="detail-pagination__name">{prevProject.title}</span>
          </Link>

          <Link
            to={`/projects/${nextProject.slug}`}
            className="detail-pagination__link detail-pagination__link--right"
          >
            <span className="detail-pagination__dir">NEXT PROJECT ({nextProject.id}) →</span>
            <span className="detail-pagination__name">{nextProject.title}</span>
          </Link>
        </nav>

        <section className="detail-cta" aria-labelledby="detail-cta-heading">
          <div>
            <p className="detail-cta__eyebrow">DIRECT CONTACT</p>
            <h2 id="detail-cta-heading" className="detail-cta__title">
              Want to discuss {project.title} or an internship opportunity?
            </h2>
          </div>
          <div className="detail-cta__buttons">
            <a
              href={`mailto:${profile.contact.email}?subject=Inquiry%20regarding%20${encodeURIComponent(
                project.title
              )}`}
              className="btn-console btn-console--primary"
            >
              Email {profile.authorName}
            </a>
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-console"
            >
              Message on WhatsApp ↗
            </a>
          </div>
        </section>
      </div>

      {lightboxShot && (
        <div
          className="lightbox-overlay"
          role="dialog"
          aria-modal="true"
          aria-label="Enlarged project screenshot"
          onClick={() => setLightboxShot(null)}
        >
          <div className="lightbox-modal" onClick={(e) => e.stopPropagation()}>
            <div className="lightbox-modal__top">
              <span>{lightboxShot.caption}</span>
              <button
                type="button"
                className="btn-console"
                onClick={() => setLightboxShot(null)}
              >
                CLOSE [ESC]
              </button>
            </div>
            <ScreenshotImage
              src={lightboxShot.src}
              alt={lightboxShot.alt}
              label="LIGHTBOX"
            />
          </div>
        </div>
      )}
    </main>
  );
}
