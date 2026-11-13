import { profile } from '../data/profile';
import './Footer.css';

interface FooterProps {
  onOpenCommandPalette: () => void;
}

export function Footer({ onOpenCommandPalette }: FooterProps) {
  return (
    <footer className="site-footer">
      <div className="console-container site-footer__inner">
        <div className="site-footer__col">
          <p className="site-footer__title">{profile.siteTitle}</p>
          <p className="site-footer__meta">
            {profile.authorName} // {profile.university} ({profile.courseCode})
          </p>
        </div>

        <div className="site-footer__col site-footer__col--right">
          <button
            type="button"
            className="site-footer__cmd"
            onClick={onOpenCommandPalette}
          >
            PRESS [⌘K / CTRL+K] FOR COMMAND PALETTE
          </button>
          <p className="site-footer__meta">{profile.coordinates}</p>
        </div>
      </div>
    </footer>
  );
}
