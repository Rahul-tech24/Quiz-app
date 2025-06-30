import './globals.css';
import { ReactNode } from 'react';

export const metadata = {
  title: 'Trivia Master - Industry-grade Quiz Platform',
  description: 'Test your knowledge with thousands of questions from the Open Trivia Database. Choose from multiple categories and difficulty levels.',
  keywords: 'quiz, trivia, knowledge, questions, learning, education',
  authors: [{ name: 'Trivia Master Team' }],
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}