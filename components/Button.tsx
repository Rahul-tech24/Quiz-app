import React, { ReactNode } from 'react';

export default function Button({ children, ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { children: ReactNode }) {
  return (
    <button
      {...props}
      className={`px-4 py-2 rounded ${props.className}`}
    >
      {children}
    </button>
  );
}
