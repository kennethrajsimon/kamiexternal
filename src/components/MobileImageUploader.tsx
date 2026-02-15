import { useState } from 'react';
import { Upload, X } from 'lucide-react';

interface MobileImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  accentColor: string;
  objectFit?: 'cover' | 'contain';
  onObjectFitChange?: (fit: 'cover' | 'contain') => void;
  customDetailText?: string;
}

export function MobileImageUploader({ 
  value, 
  onChange, 
  accentColor,
  objectFit = 'cover',
  onObjectFitChange,
  customDetailText
}: MobileImageUploaderProps) {
  const fileInputId = `mobile-file-upload-${useState(() => Math.random())[0]}`;

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

  const handleRemove = () => {
    onChange('');
  };

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

  return (
    <div className="space-y-3">
      {value ? (
        <>
          {/* Image Preview */}
          <div className="relative w-full h-[160px] border rounded-lg overflow-hidden" style={{ borderColor: '#3a3a3a' }}>
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
              className="absolute top-2 right-2 p-1.5 rounded transition-all"
              style={{
                backgroundColor: '#1a1a1a',
                color: '#f1f0eb',
                border: '1px solid #3a3a3a'
              }}
              title="Remove media"
            >
              <X className="size-[14px]" strokeWidth={1.5} />
            </button>
          </div>

          {/* Fill/Crop Toggle */}
          {onObjectFitChange && (
            <div className="flex gap-2">
              <button
                onClick={() => onObjectFitChange('cover')}
                className="flex-1 py-2 rounded-lg border transition-all"
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: objectFit === 'cover' ? accentColor : '#2a2a2a',
                  color: objectFit === 'cover' ? '#1a1a1a' : '#9e9e9d',
                  borderColor: objectFit === 'cover' ? accentColor : '#3a3a3a'
                }}
              >
                Fill
              </button>
              <button
                onClick={() => onObjectFitChange('contain')}
                className="flex-1 py-2 rounded-lg border transition-all"
                style={{
                  fontSize: '12px',
                  fontWeight: '600',
                  backgroundColor: objectFit === 'contain' ? accentColor : '#2a2a2a',
                  color: objectFit === 'contain' ? '#1a1a1a' : '#9e9e9d',
                  borderColor: objectFit === 'contain' ? accentColor : '#3a3a3a'
                }}
              >
                Crop
              </button>
            </div>
          )}
          
          {/* URL Display */}
          <div 
            className="text-[10px] break-all px-3 py-2 rounded border"
            style={{
              color: '#9e9e9d',
              borderColor: '#3a3a3a',
              backgroundColor: '#0f0f0f'
            }}
          >
            {typeof value === 'string' && value.startsWith('data:') ? 'Uploaded from computer' : value}
          </div>
        </>
      ) : (
        <div className="space-y-3">
          {/* File Upload Button */}
          <input
            type="file"
            id={fileInputId}
            accept="image/*,video/*"
            onChange={handleFileUpload}
            className="hidden"
          />
          <label
            htmlFor={fileInputId}
            className="block w-full py-3 rounded-lg border cursor-pointer transition-all active:scale-98 text-center"
            style={{
              backgroundColor: '#2a2a2a',
              borderColor: '#3a3a3a',
              fontSize: '13px',
              fontWeight: '600',
              color: '#9e9e9d'
            }}
          >
            <Upload className="size-[16px] inline mr-2" strokeWidth={2} />
            Upload from Computer
          </label>
          
          {customDetailText && (
            <div 
              className="text-[11px] px-3 py-2"
              style={{
                color: '#9e9e9d',
                lineHeight: '1.4'
              }}
            >
              {customDetailText}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
