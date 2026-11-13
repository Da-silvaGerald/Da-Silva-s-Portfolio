import { useEffect, useRef, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { profile } from '../data/profile';
import './Navbar.css';

interface NavbarProps {
  activeSection: string;
  onOpenCommandPalette: () => void;
}

export function Navbar({ activeSection, onOpenCommandPalette }: NavbarProps) {
  const [lagosTime, setLagosTime] = useState<string>('');
  const [scrollProgress, setScrollProgress] = useState<number>(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const toggleBtnRef = useRef<HTMLButtonElement | null>(null);

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const updateClock = () => {
      try {
        const formatter = new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Africa/Lagos',
          hour: '2-digit',
          minute: '2-digit',
          second: '2-digit',
          hour12: false
        });
        setLagosTime(`${formatter.format(new Date())} WAT`);
      } catch {
        setLagosTime('UTC+1 WAT');
      }
    };

    updateClock();
    const timer = window.setInterval(updateClock, 1000);
    return () => window.clearInterval(timer);
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = docHeight > 0 ? Math.min(100, Math.max(0, (scrollTop / docHeight) * 100)) : 0;
      setScrollProgress(progress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [location.pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMobileMenuOpen(false);
        toggleBtnRef.current?.focus();
        return;
      }

      if (event.key === 'Tab' && menuRef.current) {
        const focusable = menuRef.current.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled])'
        );
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [mobileMenuOpen]);

  const jumpToSection = (sectionId: string) => {
    setMobileMenuOpen(false);
    if (location.pathname !== '/') {
      navigate('/');
      window.setTimeout(() => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div
        className="site-header__progress"
        style={{ width: `${scrollProgress}%` }}
        aria-hidden="true"
      />
      <div className="console-container site-header__inner">
        <div className="site-header__brand">
          <Link to="/" className="site-header__logo" aria-label="Go to homepage">
            <span className="site-header__logo-dot" aria-hidden="true" />
            <span className="site-header__logo-text">{profile.siteTitle}</span>
          </Link>
          <span className="site-header__clock" aria-label="Current time in Lagos, Nigeria">
            LOS // {lagosTime || 'WAT'}
          </span>
        </div>

        <nav className="site-header__nav" aria-label="Primary navigation">
          <button
            type="button"
            className={`site-header__link ${
              location.pathname === '/' && activeSection === 'about' ? 'is-active' : ''
            }`}
            onClick={() => jumpToSection('about')}
          >
            01 // ABOUT
          </button>
          <button
            type="button"
            className={`site-header__link ${
              (location.pathname === '/' && activeSection === 'projects') ||
              location.pathname.startsWith('/projects')
                ? 'is-active'
                : ''
            }`}
            onClick={() => jumpToSection('projects')}
          >
            02 // PROJECTS
          </button>
          <button
            type="button"
            className={`site-header__link ${
              location.pathname === '/' && activeSection === 'contact' ? 'is-active' : ''
            }`}
            onClick={() => jumpToSection('contact')}
          >
            03 // CONTACT
          </button>
        </nav>

        <div className="site-header__actions">
          <button
            type="button"
            className="site-header__cmd-btn"
            onClick={onOpenCommandPalette}
            aria-label="Open command palette (Ctrl or Command + K)"
          >
            <span>CMD</span>
            <kbd className="site-header__kbd">⌘K</kbd>
          </button>

          <button
            type="button"
            className="btn-console btn-console--primary site-header__cta"
            onClick={() => jumpToSection('contact')}
          >
            Get in touch
          </button>

          <button
            ref={toggleBtnRef}
            type="button"
            className="site-header__burger"
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-console-drawer"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            onClick={() => setMobileMenuOpen((prev) => !prev)}
          >
            <span className="site-header__burger-label">{mobileMenuOpen ? 'CLOSE' : 'MENU'}</span>
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          id="mobile-console-drawer"
          ref={menuRef}
          className="mobile-drawer"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation menu"
        >
          <div className="console-container mobile-drawer__inner">
            <div className="mobile-drawer__meta">
              <span>{profile.statusText}</span>
              <span>{lagosTime}</span>
            </div>
            <div className="mobile-drawer__links">
              <button
                type="button"
                className="mobile-drawer__link"
                onClick={() => jumpToSection('about')}
              >
                <span>01 // ABOUT ME</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-drawer__link"
                onClick={() => jumpToSection('projects')}
              >
                <span>02 // PROJECT LOGS</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-drawer__link"
                onClick={() => jumpToSection('contact')}
              >
                <span>03 // CONTACT &amp; CHANNELS</span>
                <span>→</span>
              </button>
              <button
                type="button"
                className="mobile-drawer__link"
                onClick={() => {
                  setMobileMenuOpen(false);
                  onOpenCommandPalette();
                }}
              >
                <span>04 // OPEN COMMAND PALETTE</span>
                <span>⌘K</span>
              </button>
            </div>
            <button
              type="button"
              className="btn-console btn-console--primary mobile-drawer__cta"
              onClick={() => jumpToSection('contact')}
            >
              Get in touch
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
