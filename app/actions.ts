'use server';
import { createTransport } from 'nodemailer';

export async function saveScore(formData: FormData): Promise<void> {
  // Placeholder: Implement backend score saving if needed
}

export async function emailScore(formData: FormData): Promise<void> {
  try {
    const score = formData.get('score');
    const userId = (formData.get('userId') as string) || 'guest';
    if (!score) {
      throw new Error('Score is required');
    }
    const transporter = createTransport({ 
      host: 'smtp.example.com', 
      auth: {
        user: 'user', 
        pass: 'pass' 
      } 
    });
    await transporter.sendMail({
      to: userId,
      subject: 'Your Quiz Score',
      text: `You scored ${score} points.`,
    });
  } catch (error) {
    console.error('Error sending email:', error);
  }
}
    