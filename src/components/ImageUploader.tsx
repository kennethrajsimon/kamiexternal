import { useState } from 'react';
import { Upload, X, Link } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  accentColor: string;
  fontFamily: string;
  objectFit?: 'cover' | 'contain';
  onObjectFitChange?: (fit: 'cover' | 'contain') => void;
  showUploadButton?: boolean;
  customDetailText?: string;
}

export function ImageUploader({ 
  value, 
  onChange, 
  accentColor, 
  fontFamily,
  objectFit = 'cover',
  onObjectFitChange,
  showUploadButton = false,
  customDetailText
}: ImageUploaderProps) {
  const [urlInput, setUrlInput] = useState('');
  const [showInput, setShowInput] = useState(false);
  const fileInputId = `file-upload-${useState(() => Math.random())[0]}`;

  // Check if the value is a video
  const isVideo = (url: string) => {
    if (!url || typeof url !== 'string') return false;
    if (url.startsWith('data:video')) return true;
    const videoExtensions = ['.mp4', '.webm', '.ogg'];
    return videoExtensions.some(ext => url.toLowerCase().includes(ext));
  };

  // Check if URL is YouTube
  const isYouTube = (url: string) => {
    if (!url || typeof url !== 'string') return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  };

  // Extract YouTube video ID
  const getYouTubeId = (url: string) => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (response.ok) {
          const data = await response.json();
          onChange(data.url);
        } else {
          console.error('Upload failed');
        }
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      onChange(urlInput.trim());
      setUrlInput('');
      setShowInput(false);
    }
  };

  const handleRemove = () => {
    onChange('');
  };

  return (
    <div>
      {value ? (
        <div className="space-y-[12px]">
          {/* Image Preview */}
          <div className="relative w-full h-[200px] border overflow-hidden" style={{ borderColor: '#2a2a2a' }}>
            {isYouTube(value) ? (
              <iframe
                src={`https://www.youtube.com/embed/${getYouTubeId(value)}`}
                className="w-full h-full"
                style={{ border: 'none' }}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            ) : isVideo(value) ? (
              <video 
                src={value} 
                alt="Preview" 
                className="w-full h-full"
                style={{ objectFit }}
                controls
              />
            ) : (
              <img 
                src={value} 
                alt="Preview" 
                className="w-full h-full object-cover rounded-[3px]"
              />
            )}
            <button
              onClick={handleRemove}
              className="absolute top-[8px] right-[8px] p-[6px] transition-all"
              style={{
                backgroundColor: '#1a1a1a',
                color: '#f1f0eb',
                border: '1px solid #2a2a2a'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#2a2a2a';
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#1a1a1a';
                e.currentTarget.style.borderColor = '#2a2a2a';
              }}
              title="Remove media"
            >
              <X className="size-[16px]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Fill/Crop Toggle */}
          {onObjectFitChange && (
            <div className="flex gap-[8px]">
              <button
                onClick={() => onObjectFitChange('cover')}
                className="flex-1 px-[16px] py-[8px] border transition-all"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: objectFit === 'cover' ? accentColor : 'transparent',
                  color: objectFit === 'cover' ? '#1a1a1a' : '#9e9e9d',
                  borderColor: objectFit === 'cover' ? accentColor : '#2a2a2a'
                }}
                onMouseEnter={(e) => {
                  if (objectFit !== 'cover') {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.color = accentColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (objectFit !== 'cover') {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.color = '#9e9e9d';
                  }
                }}
              >
                Fill
              </button>
              <button
                onClick={() => onObjectFitChange('contain')}
                className="flex-1 px-[16px] py-[8px] border transition-all"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: objectFit === 'contain' ? accentColor : 'transparent',
                  color: objectFit === 'contain' ? '#1a1a1a' : '#9e9e9d',
                  borderColor: objectFit === 'contain' ? accentColor : '#2a2a2a'
                }}
                onMouseEnter={(e) => {
                  if (objectFit !== 'contain') {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.color = accentColor;
                  }
                }}
                onMouseLeave={(e) => {
                  if (objectFit !== 'contain') {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.color = '#9e9e9d';
                  }
                }}
              >
                Crop
              </button>
            </div>
          )}
          
          {/* URL Display */}
          <div 
            className="text-[11px] break-all px-[12px] py-[8px] border"
            style={{
              fontFamily: `'${fontFamily}',sans-serif`,
              color: '#9e9e9d',
              borderColor: '#2a2a2a',
              backgroundColor: '#0f0f0f'
            }}
          >
            {typeof value === 'string' && value.startsWith('data:') ? 'Uploaded from computer' : value}
          </div>
        </div>
      ) : (
        <div className="space-y-[12px]">
          {!showInput ? (
            <div className="space-y-[8px]">
              {/* File Upload Button */}
              <input
                type="file"
                accept="image/*,video/*"
                onChange={handleFileUpload}
                id={fileInputId}
                className="hidden"
              />
              <label
                htmlFor={fileInputId}
                className="w-full h-[100px] border-2 border-dashed transition-all flex flex-col items-center justify-center gap-[8px] cursor-pointer"
                style={{
                  borderColor: '#2a2a2a',
                  backgroundColor: 'transparent',
                  color: '#9e9e9d'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.color = '#9e9e9d';
                }}
              >
                <Upload className="size-[24px]" strokeWidth={1.5} />
                <span 
                  style={{
                    fontFamily: `'${fontFamily}',sans-serif`,
                    fontSize: '13px',
                    fontWeight: '600'
                  }}
                >
                  Upload from Computer
                </span>
                <span 
                  style={{
                    fontFamily: `'${fontFamily}',sans-serif`,
                    fontSize: '11px',
                    fontWeight: '400',
                    opacity: 0.7,
                    whiteSpace: 'pre-line',
                    textAlign: 'center'
                  }}
                >
                  {customDetailText || 'JPG, PNG, GIF, MP4'}
                </span>
              </label>

              {/* URL Input Button */}
              <button
                onClick={() => setShowInput(true)}
                className="w-full px-[16px] py-[10px] border transition-all"
                style={{
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: 'transparent',
                  color: '#9e9e9d',
                  borderColor: '#2a2a2a'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = accentColor;
                  e.currentTarget.style.color = accentColor;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = '#2a2a2a';
                  e.currentTarget.style.color = '#9e9e9d';
                }}
              >
                <Link className="inline size-[14px] mr-[6px]" strokeWidth={1.5} />
                Or add from URL
              </button>
            </div>
          ) : (
            <div className="space-y-[8px]">
              <input
                type="text"
                value={urlInput}
                onChange={(e) => setUrlInput(e.target.value)}
                placeholder="Enter image or video URL..."
                className="w-full bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all"
                style={{ 
                  fontFamily: `'${fontFamily}',sans-serif`,
                  fontSize: '15px',
                  borderColor: '#2a2a2a',
                  color: '#f1f0eb'
                }}
                onFocus={(e) => e.target.style.borderColor = accentColor}
                onBlur={(e) => e.target.style.borderColor = '#2a2a2a'}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleUrlSubmit();
                  } else if (e.key === 'Escape') {
                    setShowInput(false);
                    setUrlInput('');
                  }
                }}
                autoFocus
              />
              <div className="flex gap-[8px]">
                <button
                  onClick={handleUrlSubmit}
                  className="flex-1 px-[16px] py-[10px] transition-all"
                  style={{
                    fontFamily: `'${fontFamily}',sans-serif`,
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: accentColor,
                    color: '#1a1a1a',
                    border: 'none'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.opacity = '0.8';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.opacity = '1';
                  }}
                >
                  Add Media
                </button>
                <button
                  onClick={() => {
                    setShowInput(false);
                    setUrlInput('');
                  }}
                  className="px-[16px] py-[10px] border transition-all"
                  style={{
                    fontFamily: `'${fontFamily}',sans-serif`,
                    fontSize: '13px',
                    fontWeight: '600',
                    backgroundColor: 'transparent',
                    color: '#9e9e9d',
                    borderColor: '#2a2a2a'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = accentColor;
                    e.currentTarget.style.color = accentColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = '#2a2a2a';
                    e.currentTarget.style.color = '#9e9e9d';
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
