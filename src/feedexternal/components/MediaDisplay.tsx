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
    />
  );
}
