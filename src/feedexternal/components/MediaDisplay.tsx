interface MediaDisplayProps {
  src: string;
  alt?: string;
  className?: string;
  style?: React.CSSProperties;
  objectFit?: 'cover' | 'contain';
}

export function MediaDisplay({ src, alt = '', className = '', style = {}, objectFit = 'cover' }: MediaDisplayProps) {
  if (!src || typeof src !== 'string') {
    return null;
  }
  const ERROR_IMG_SRC =
    'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iODgiIGhlaWdodD0iODgiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgc3Ryb2tlPSIjMDAwIiBzdHJva2UtbGluZWpvaW49InJvdW5kIiBvcGFjaXR5PSIuMyIgZmlsbD0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIzLjciPjxyZWN0IHg9IjE2IiB5PSIxNiIgd2lkdGg9IjU2IiByeD0iNiIvPjxwYXRoIGQ9Im0xNiA1OCAxNi0xOCAzMiAzMiIvPjxjaXJjbGUgY3g9IjUzIiBjeT0iMzUiIHI9IjciLz48L3N2Zz4KCg==';
  // Normalize dev-time Vite paths to public assets
  if (src.startsWith('/src/assets/')) {
    src = src.replace('/src/assets/', '/assets/');
  }
  // Normalize local backend absolute URLs to relative so Vite proxy applies
  try {
    const u = new URL(src);
    if ((u.hostname === 'localhost' || u.hostname === '127.0.0.1') && u.port === '3001') {
      src = u.pathname + (u.search || '');
    }
  } catch {}
  // Check if URL is YouTube
  const isYouTube = (url: string) => {
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  // Check if the value is a video
  const isVideo = (url: string) => {
    if (url.startsWith('data:video')) return true;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  const finalStyle = { ...style, objectFit };

  if (isYouTube(src)) {
    return (
      <iframe
        src={`https://www.youtube.com/embed/${getYouTubeId(src)}`}
        className={className}
        style={{ ...finalStyle, border: 'none' }}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      />
    );
  }

  if (isVideo(src)) {
    return (
      <video 
        src={src} 
        className={className}
        style={finalStyle}
        controls
        loop
        muted
        autoPlay
      />
    );
  }

  return (
    <img 
      src={src} 
      alt={alt}
      className="w-full h-full object-cover rounded-[3px]"
      style={finalStyle}
      onError={(e) => {
        const target = e.currentTarget as HTMLImageElement;
        target.src = ERROR_IMG_SRC;
      }}
    />
  );
}
