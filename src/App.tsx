import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { BootSequence } from './components/BootSequence';
import { Navbar } from './components/Navbar';
import { CommandPalette } from './components/CommandPalette';
import { Footer } from './components/Footer';
import { Home } from './pages/Home';
import { ProjectDetail } from './pages/ProjectDetail';
import { NotFound } from './pages/NotFound';

export function App() {
  const [activeSection, setActiveSection] = useState<string>('hero');
  const [cmdOpen, setCmdOpen] = useState<boolean>(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setCmdOpen((prev) => !prev);
      } else if (event.key === 'Escape' && cmdOpen) {
        setCmdOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [cmdOpen]);

  useEffect(() => {
    const canUseSpotlight =
      window.matchMedia('(pointer: fine)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!canUseSpotlight) return;

    const handlePointerMove = (event: MouseEvent) => {
      document.documentElement.style.setProperty('--cursor-x', `${event.clientX}px`);
      document.documentElement.style.setProperty('--cursor-y', `${event.clientY}px`);
    };

    window.addEventListener('mousemove', handlePointerMove, { passive: true });
    return () => window.removeEventListener('mousemove', handlePointerMove);
  }, []);

  return (
    <BrowserRouter>
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>
      <BootSequence />
      <Navbar
        activeSection={activeSection}
        onOpenCommandPalette={() => setCmdOpen(true)}
      />
      <CommandPalette isOpen={cmdOpen} onClose={() => setCmdOpen(false)} />

      <Routes>
        <Route
          path="/"
          element={<Home onActiveSectionChange={setActiveSection} />}
        />
        <Route path="/projects/:slug" element={<ProjectDetail />} />
        <Route path="*" element={<NotFound />} />
      </Routes>

      <Footer onOpenCommandPalette={() => setCmdOpen(true)} />
    </BrowserRouter>
  );
}

export default App;
