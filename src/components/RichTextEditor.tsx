import { useRef, useEffect, useState } from 'react';
import { Bold, Italic, Underline, Strikethrough, List, ListOrdered, Type, Link } from 'lucide-react';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  fontFamily: string;
  fontSize: string;
  textColor: string;
  accentColor: string;
  rows?: number;
  mainColors?: string[]; // Main color palette
  fontSizeOptions?: string[]; // Custom font size options
}

export function RichTextEditor({ value, onChange, fontFamily, fontSize, textColor, accentColor, rows = 5, mainColors = ['#f1f0eb', '#11ff49', '#9E9E9D', '#A79755'], fontSizeOptions }: RichTextEditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const isUserEditingRef = useRef(false);
  const [linkInputValue, setLinkInputValue] = useState('');
  const [isLinkInputOpen, setIsLinkInputOpen] = useState(false);
  const selectionRangeRef = useRef<Range | null>(null);

  // Initialize editor content only once on mount
  useEffect(() => {
    if (editorRef.current && !isInitialized) {
      editorRef.current.innerHTML = value;
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // Update content only if not currently editing and value changed externally
  useEffect(() => {
    if (editorRef.current && isInitialized && !isUserEditingRef.current) {
      const currentContent = editorRef.current.innerHTML;
      if (currentContent !== value) {
        editorRef.current.innerHTML = value;
      }
    }
  }, [value, isInitialized]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const handleFocus = () => {
    isUserEditingRef.current = true;
  };

  const handleBlur = () => {
    isUserEditingRef.current = false;
  };

  const cacheSelection = () => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;
    const range = selection.getRangeAt(0);
    if (!range.collapsed) {
      selectionRangeRef.current = range;
    }
  };

  const applyFormat = (command: string) => {
    document.execCommand(command, false);
    editorRef.current?.focus();
  };

  const applyColor = (color: string) => {
    if (!editorRef.current) return;
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) {
      editorRef.current.focus();
      return;
    }

    const range = selection.getRangeAt(0);
    const processNode = (node: Node): Node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        if (element.style.color) {
          element.style.color = '';
          if (element.style.length === 0) {
            element.removeAttribute('style');
          }
        }
        if (element.tagName === 'FONT' && element.getAttribute('color')) {
          element.removeAttribute('color');
          if (element.attributes.length === 0) {
            const fragment = document.createDocumentFragment();
            while (element.firstChild) {
              fragment.appendChild(processNode(element.firstChild));
            }
            return fragment;
          }
        }
        if (element.tagName === 'SPAN' && element.attributes.length === 0) {
          const fragment = document.createDocumentFragment();
          while (element.firstChild) {
            fragment.appendChild(processNode(element.firstChild));
          }
          return fragment;
        }
        const children = Array.from(element.childNodes);
        children.forEach(child => {
          const processed = processNode(child);
          if (processed !== child) {
            element.replaceChild(processed, child);
          }
        });
      }
      return node;
    };

    if (range.collapsed) {
      editorRef.current.focus();
      return;
    }

    const selectedContent = range.extractContents();
    if (!selectedContent.hasChildNodes()) {
      editorRef.current.focus();
      return;
    }
    const span = document.createElement('span');
    span.style.color = color;
    const processedNodes = Array.from(selectedContent.childNodes).map(node => processNode(node));
    processedNodes.forEach(node => span.appendChild(node));
    range.insertNode(span);
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
    handleInput();
    editorRef.current.focus();
  };

  const applyFontSize = (size: string) => {
    const selection = window.getSelection();
    if (!selection || selection.rangeCount === 0) return;

    const range = selection.getRangeAt(0);
    
    // Check if selection is collapsed (no text selected)
    if (range.collapsed) {
      editorRef.current?.focus();
      return;
    }

    // Extract the selected content
    const selectedContent = range.extractContents();
    
    // Create a new span with the desired font size
    const span = document.createElement('span');
    span.style.fontSize = size;
    
    // Process the selected content to remove any existing font-size styles
    const processNode = (node: Node): Node => {
      if (node.nodeType === Node.ELEMENT_NODE) {
        const element = node as HTMLElement;
        
        // If it's a span with only font-size, extract its content
        if (element.tagName === 'SPAN' && element.style.fontSize && element.style.length === 1) {
          const fragment = document.createDocumentFragment();
          while (element.firstChild) {
            fragment.appendChild(processNode(element.firstChild));
          }
          return fragment;
        }
        
        // If it's a span with other styles, just remove font-size
        if (element.tagName === 'SPAN' && element.style.fontSize) {
          element.style.fontSize = '';
          if (element.style.length === 0) {
            element.removeAttribute('style');
          }
        }
        
        // Process children
        const children = Array.from(element.childNodes);
        children.forEach(child => {
          const processed = processNode(child);
          if (processed !== child) {
            element.replaceChild(processed, child);
          }
        });
      }
      return node;
    };
    
    // Process all nodes in the selected content
    const processedNodes = Array.from(selectedContent.childNodes).map(node => processNode(node));
    processedNodes.forEach(node => span.appendChild(node));
    
    // Insert the new span
    range.insertNode(span);
    
    // Restore selection
    range.selectNodeContents(span);
    selection.removeAllRanges();
    selection.addRange(range);
    
    // Trigger change
    handleInput();
    editorRef.current?.focus();
  };

  const applyLink = () => {
    const trimmed = linkInputValue.trim();
    const range = selectionRangeRef.current;
    if (!trimmed || !range) {
      editorRef.current?.focus();
      return;
    }
    const selection = window.getSelection();
    if (!selection) return;
    selection.removeAllRanges();
    selection.addRange(range);
    document.execCommand('createLink', false, trimmed);
    const root = range.commonAncestorContainer.nodeType === Node.ELEMENT_NODE
      ? (range.commonAncestorContainer as Element)
      : range.commonAncestorContainer.parentElement;
    if (root) {
      const anchors = Array.from(root.querySelectorAll('a[href]')).filter(anchor => {
        const anchorRange = document.createRange();
        anchorRange.selectNodeContents(anchor);
        return (
          range.compareBoundaryPoints(Range.END_TO_START, anchorRange) < 0 &&
          range.compareBoundaryPoints(Range.START_TO_END, anchorRange) > 0
        );
      });
      anchors.forEach(anchor => {
        anchor.setAttribute('target', '_blank');
        anchor.setAttribute('rel', 'noopener noreferrer');
      });
    }
    selectionRangeRef.current = null;
    setLinkInputValue('');
    setIsLinkInputOpen(false);
    editorRef.current?.focus();
  };

  const handlePaste = (event: React.ClipboardEvent<HTMLDivElement>) => {
    event.preventDefault();
    const text = event.clipboardData.getData('text/plain');
    const normalized = text.replace(/\r\n/g, '\n').replace(/\r/g, '\n');
    const escaped = normalized
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#39;');
    const html = escaped.replace(/\n/g, '<br />');
    document.execCommand('insertHTML', false, html);
    handleInput();
  };

  const formatButtons = [
    { command: 'bold', icon: Bold, label: 'Bold' },
    { command: 'italic', icon: Italic, label: 'Italic' },
    { command: 'underline', icon: Underline, label: 'Underline' },
    { command: 'strikeThrough', icon: Strikethrough, label: 'Strikethrough' },
    { command: 'insertUnorderedList', icon: List, label: 'Unordered List' },
    { command: 'insertOrderedList', icon: ListOrdered, label: 'Ordered List' },
  ];

  const fontSizes = fontSizeOptions || ['12px', '15px', '16px', '24px', '48px', '60px'];

  return (
    <div>
      {/* Toolbar */}
      <div 
        className="flex gap-[4px] p-[8px] border mb-[8px] flex-wrap"
        style={{ 
          borderColor: '#2a2a2a',
          backgroundColor: '#0f0f0f'
        }}
      >
        {/* Format buttons */}
        {formatButtons.map(({ command, icon: Icon, label }) => (
          <button
            key={command}
            onClick={() => applyFormat(command)}
            className="p-[6px] hover:bg-opacity-20 transition-all"
            style={{
              color: textColor,
              backgroundColor: 'transparent',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = accentColor + '20';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
            title={label}
            type="button"
          >
            <Icon className="size-[16px]" strokeWidth={1.5} />
          </button>
        ))}
        
        {/* Separator */}
        <div 
          className="w-[1px] mx-[4px] self-stretch"
          style={{ backgroundColor: '#2a2a2a' }}
        />
        
        {/* Color buttons */}
        <div className="flex gap-[4px] items-center">
          {mainColors.map((color, index) => (
            <button
              key={color}
              onClick={() => applyColor(color)}
              className="size-[24px] border-2 transition-all"
              style={{ 
                backgroundColor: color,
                borderColor: '#2a2a2a'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
              }}
              title={`Color ${index + 1}`}
              type="button"
            />
          ))}
        </div>
        
        {/* Separator */}
        <div 
          className="w-[1px] mx-[4px] self-stretch"
          style={{ backgroundColor: '#2a2a2a' }}
        />
        
        {/* Font size buttons */}
        <div className="flex gap-[4px] items-center">
          {fontSizes.map((size) => (
            <button
              key={size}
              onClick={() => applyFontSize(size)}
              className="px-[8px] py-[4px] border transition-all"
              style={{ 
                backgroundColor: 'transparent',
                borderColor: '#2a2a2a',
                color: textColor,
                fontFamily: `'${fontFamily}',sans-serif`,
                fontSize: '11px',
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
                e.currentTarget.style.color = textColor;
              }}
              title={`Font Size ${size}`}
              type="button"
            >
              {size}
            </button>
          ))}
        </div>
        
        {/* Separator */}
        <div 
          className="w-[1px] mx-[4px] self-stretch"
          style={{ backgroundColor: '#2a2a2a' }}
        />
        
        {/* Link button */}
        <button
          onClick={() => {
            cacheSelection();
            setIsLinkInputOpen((prev) => !prev);
          }}
          className="p-[6px] hover:bg-opacity-20 transition-all"
          style={{
            color: textColor,
            backgroundColor: 'transparent',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = accentColor + '20';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
          }}
          title="Link"
          type="button"
        >
          <Link className="size-[16px]" strokeWidth={1.5} />
        </button>
        {isLinkInputOpen && (
          <div className="flex items-center gap-[6px]">
            <input
              value={linkInputValue}
              onChange={(e) => setLinkInputValue(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  e.preventDefault();
                  applyLink();
                }
                if (e.key === 'Escape') {
                  e.preventDefault();
                  setIsLinkInputOpen(false);
                  setLinkInputValue('');
                }
              }}
              className="px-[8px] py-[4px] border bg-transparent text-[11px] outline-none"
              style={{
                borderColor: '#2a2a2a',
                color: textColor,
                fontFamily: `'${fontFamily}',sans-serif`
              }}
              placeholder="https://"
              type="text"
            />
            <button
              onClick={applyLink}
              className="px-[8px] py-[4px] border transition-all text-[11px]"
              style={{
                backgroundColor: 'transparent',
                borderColor: '#2a2a2a',
                color: textColor,
                fontFamily: `'${fontFamily}',sans-serif`,
                fontWeight: '600'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = accentColor;
                e.currentTarget.style.color = accentColor;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = '#2a2a2a';
                e.currentTarget.style.color = textColor;
              }}
              type="button"
            >
              Apply
            </button>
          </div>
        )}
      </div>

      {/* Editable area */}
      <div
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onPaste={handlePaste}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyUp={cacheSelection}
        onMouseUp={cacheSelection}
        className="w-full bg-transparent border px-[16px] py-[12px] focus:outline-none transition-all overflow-y-auto rich-text-content"
        style={{
          fontFamily: `'${fontFamily}',sans-serif`,
          fontSize,
          borderColor: '#2a2a2a',
          color: textColor,
          minHeight: `${rows * 24}px`,
          maxHeight: `${rows * 24}px`,
        }}
      />
      
      {/* CSS for formatting */}
      <style>{`
        .rich-text-content {
          white-space: pre-wrap !important;
        }
        .rich-text-content i,
        .rich-text-content em {
          font-style: italic !important;
        }
        .rich-text-content b,
        .rich-text-content strong {
          font-weight: bold !important;
        }
        .rich-text-content u {
          text-decoration: underline !important;
          text-decoration-thickness: 1px !important;
          text-underline-offset: 4px !important;
        }
        .rich-text-content strike,
        .rich-text-content s {
          text-decoration: line-through !important;
          text-decoration-thickness: 1px !important;
        }
        .rich-text-content a {
          color: #11ff49 !important;
          text-decoration: underline !important;
          cursor: pointer !important;
        }
        .rich-text-content a:hover {
          opacity: 0.8 !important;
        }
        .rich-text-content ul,
        .rich-text-content ol {
          margin: 8px 0 !important;
          padding-left: 24px !important;
        }
        .rich-text-content ul {
          list-style-type: disc !important;
        }
        .rich-text-content ol {
          list-style-type: decimal !important;
        }
        .rich-text-content li {
          margin: 4px 0 !important;
        }
        .rich-text-content br {
          display: block !important;
          content: "" !important;
          margin: 4px 0 !important;
        }
      `}</style>
    </div>
  );
}
