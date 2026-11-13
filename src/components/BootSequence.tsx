import { useEffect, useState } from 'react';
import './BootSequence.css';

const BOOT_STORAGE_KEY = 'ods_console_boot_seen_v1';

const BOOT_LINES = [
  '[OK] INITIALIZING CONSOLE // MY PORTFOLIO: DA-SILVA OLUWASEGUN',
  '[OK] MOUNTING OPERATOR PROFILE: PAN-ATLANTIC UNIVERSITY (CSC 419)',
  '[OK] VERIFYING TELEMETRY: LAGOS_NODE (WAT / UTC+1)',
  '[OK] LOADING DOSSIERS: PRJ-001, PRJ-002, PRJ-003',
  '[READY] LAUNCHING MY PORTFOLIO: DA-SILVA OLUWASEGUN...'
];

export function BootSequence() {
  const [visible, setVisible] = useState<boolean>(() => {
    if (typeof window === 'undefined') return false;
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem(BOOT_STORAGE_KEY) === 'true';
    return !prefersReduced && !alreadySeen;
  });

  const [lineCount, setLineCount] = useState<number>(1);

  const dismissBoot = () => {
    try {
      window.sessionStorage.setItem(BOOT_STORAGE_KEY, 'true');
    } catch {
      // Ignore storage errors in private browsing
    }
    setVisible(false);
  };

  useEffect(() => {
    if (!visible) return;

    const lineInterval = window.setInterval(() => {
      setLineCount((prev) => (prev < BOOT_LINES.length ? prev + 1 : prev));
    }, 300);

    const finishTimeout = window.setTimeout(() => {
      dismissBoot();
    }, 1850);

    const handleKeyDown = () => {
      dismissBoot();
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.clearInterval(lineInterval);
      window.clearTimeout(finishTimeout);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      className="boot-overlay"
      role="dialog"
      aria-modal="true"
      aria-label="Terminal boot sequence"
      onClick={dismissBoot}
    >
      <div className="boot-terminal">
        <div className="boot-terminal__header">
          <span>MY PORTFOLIO: DA-SILVA OLUWASEGUN // BOOT</span>
          <span>PRESS ANY KEY OR CLICK TO SKIP</span>
        </div>
        <div className="boot-terminal__body">
          {BOOT_LINES.slice(0, lineCount).map((line, index) => (
            <p key={line} className="boot-terminal__line">
              <span className="boot-terminal__index">0{index + 1}</span> {line}
            </p>
          ))}
          <div className="boot-terminal__progress">
            <div
              className="boot-terminal__progress-bar"
              style={{ width: `${(lineCount / BOOT_LINES.length) * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
