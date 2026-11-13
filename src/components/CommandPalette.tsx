import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { profile } from '../data/profile';
import { projects } from '../data/projects';
import './CommandPalette.css';

interface CommandPaletteProps {
  isOpen: boolean;
  onClose: () => void;
}

interface CommandAction {
  id: string;
  group: string;
  label: string;
  hint: string;
  execute: () => void;
}

export function CommandPalette({ isOpen, onClose }: CommandPaletteProps) {
  const [query, setQuery] = useState<string>('');
  const [copiedFeedback, setCopiedFeedback] = useState<string>('');
  const inputRef = useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      window.setTimeout(() => inputRef.current?.focus(), 20);
    }
  }, [isOpen]);

  const goToSection = (sectionId: string) => {
    onClose();
    navigate('/');
    window.setTimeout(() => {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    }, 90);
  };

  const actions: CommandAction[] = useMemo(() => {
    const whatsappUrl = `https://wa.me/${profile.contact.whatsappNumberPlain}?text=${encodeURIComponent(
      profile.contact.whatsappPrefill
    )}`;

    return [
      {
        id: 'nav-about',
        group: 'NAVIGATION',
        label: 'Jump to 01 // About & Oando Internship Timeline',
        hint: 'SECTION',
        execute: () => goToSection('about')
      },
      {
        id: 'nav-projects',
        group: 'NAVIGATION',
        label: 'Jump to 02 // Project Logs',
        hint: 'SECTION',
        execute: () => goToSection('projects')
      },
      {
        id: 'nav-contact',
        group: 'NAVIGATION',
        label: 'Jump to 03 // Contact & Direct Channels',
        hint: 'SECTION',
        execute: () => goToSection('contact')
      },
      ...projects.map((project) => ({
        id: `prj-${project.slug}`,
        group: 'PROJECT DOSSIERS',
        label: `${project.id}: Inspect ${project.title}`,
        hint: `/projects/${project.slug}`,
        execute: () => {
          onClose();
          navigate(`/projects/${project.slug}`);
        }
      })),
      {
        id: 'act-copy-email',
        group: 'DIRECT ACTIONS',
        label: `Copy Email Address (${profile.contact.email})`,
        hint: 'CLIPBOARD',
        execute: () => {
          navigator.clipboard?.writeText(profile.contact.email);
          setCopiedFeedback('EMAIL COPIED TO CLIPBOARD');
          window.setTimeout(() => {
            setCopiedFeedback('');
            onClose();
          }, 900);
        }
      },
      {
        id: 'act-whatsapp',
        group: 'DIRECT ACTIONS',
        label: `Open WhatsApp Chat (${profile.contact.whatsappDisplay})`,
        hint: 'EXTERNAL',
        execute: () => {
          onClose();
          window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
        }
      },
      {
        id: 'act-github',
        group: 'DIRECT ACTIONS',
        label: 'Open GitHub Profile (Da-silvaGerald)',
        hint: 'EXTERNAL',
        execute: () => {
          onClose();
          window.open(profile.contact.github, '_blank', 'noopener,noreferrer');
        }
      },
      {
        id: 'act-linkedin',
        group: 'DIRECT ACTIONS',
        label: 'Open LinkedIn Profile',
        hint: 'EXTERNAL',
        execute: () => {
          onClose();
          window.open(profile.contact.linkedin, '_blank', 'noopener,noreferrer');
        }
      }
    ];
  }, [navigate, onClose]);

  const filteredActions = useMemo(() => {
    const trimmed = query.trim().toLowerCase();
    if (!trimmed) return actions;
    return actions.filter(
      (item) =>
        item.label.toLowerCase().includes(trimmed) ||
        item.group.toLowerCase().includes(trimmed) ||
        item.hint.toLowerCase().includes(trimmed)
    );
  }, [actions, query]);

  if (!isOpen) return null;

  return (
    <div
      className="cmd-backdrop"
      role="dialog"
      aria-modal="true"
      aria-label="Command Palette"
      onClick={onClose}
    >
      <div className="cmd-modal" onClick={(e) => e.stopPropagation()}>
        <div className="cmd-modal__header">
          <span className="cmd-modal__prompt">&gt;_</span>
          <input
            ref={inputRef}
            type="text"
            className="cmd-modal__input"
            placeholder="Type a command, project name, or section..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Filter commands"
          />
          <button type="button" className="cmd-modal__esc" onClick={onClose}>
            ESC
          </button>
        </div>

        {copiedFeedback && <div className="cmd-modal__banner">{copiedFeedback}</div>}

        <div className="cmd-modal__list" role="listbox" aria-label="Available commands">
          {filteredActions.length === 0 ? (
            <p className="cmd-modal__empty">NO MATCHING OPERATIONS FOUND FOR "{query}"</p>
          ) : (
            filteredActions.map((item) => (
              <button
                key={item.id}
                type="button"
                className="cmd-modal__item"
                onClick={item.execute}
              >
                <div className="cmd-modal__item-main">
                  <span className="cmd-modal__group">{item.group}</span>
                  <span className="cmd-modal__label">{item.label}</span>
                </div>
                <span className="cmd-modal__hint">{item.hint}</span>
              </button>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
