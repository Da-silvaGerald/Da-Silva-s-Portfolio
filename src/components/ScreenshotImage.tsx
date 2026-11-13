import { useState } from 'react';
import './ScreenshotImage.css';

interface ScreenshotImageProps {
  src: string;
  alt: string;
  label?: string;
  className?: string;
  controls?: boolean;
}

const VIDEO_EXTENSIONS = ['.mp4', '.webm', '.ogg'];

export function ScreenshotImage({
  src,
  alt,
  label,
  className = '',
  controls = false
}: ScreenshotImageProps) {
  const [hasError, setHasError] = useState<boolean>(false);

  const cleanPath = src.split('?')[0].toLowerCase();
  const isVideo = VIDEO_EXTENSIONS.some((ext) => cleanPath.endsWith(ext));
  const prefersReducedMotion =
    typeof window !== 'undefined' &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  return (
    <div className={`screenshot-frame ${className}`}>
      {!hasError ? (
        isVideo ? (
          <video
            src={src}
            aria-label={alt}
            className="screenshot-frame__img"
            autoPlay={!prefersReducedMotion}
            loop
            muted
            playsInline
            controls={controls || prefersReducedMotion}
            preload="metadata"
            onError={() => setHasError(true)}
          />
        ) : (
          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="screenshot-frame__img"
            onError={() => setHasError(true)}
          />
        )
      ) : (
        <div className="screenshot-frame__fallback" role="img" aria-label={alt}>
          <span className="screenshot-frame__fallback-tag">
            [REPLACE ME // {label || src}]
          </span>
          <p className="screenshot-frame__fallback-alt">{alt}</p>
        </div>
      )}
    </div>
  );
}