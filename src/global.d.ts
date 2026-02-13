/// <reference types="react" />
/// <reference types="react-dom" />

// Declare figma:asset module for webpack loader
declare module 'figma:asset/*' {
  const content: string;
  export default content;
}

// Declare SVG imports
declare module '*.svg' {
  const content: React.FunctionComponent<React.SVGAttributes<SVGElement>>;
  export default content;
}

// Declare image imports
declare module '*.png' {
  const content: string;
  export default content;
}

declare module '*.jpg' {
  const content: string;
  export default content;
}

declare module '*.jpeg' {
  const content: string;
  export default content;
}

declare module '*.gif' {
  const content: string;
  export default content;
}

declare module '*.webp' {
  const content: string;
  export default content;
}

// Declare CSS module imports
declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

// Declare SVG path modules from imports folder
declare module './imports/svg-*' {
  const content: { [key: string]: string };
  export default content;
}

// Make SVG imports with relative paths work
declare module '*/svg-*' {
  const content: { [key: string]: string };
  export default content;
}
