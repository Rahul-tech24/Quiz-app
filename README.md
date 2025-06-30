# 🎯 Trivia Master - Industry-Grade Quiz Platform

A modern, responsive quiz application built with Next.js 15, TypeScript, and Tailwind CSS. Powered by the Open Trivia Database API.

[![Next.js](https://img.shields.io/badge/Next.js-15.3.4-black?style=for-the-badge&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=for-the-badge&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.0-38B2AC?style=for-the-badge&logo=tailwind-css)](https://tailwindcss.com/)
[![Vercel](https://img.shields.io/badge/Vercel-Deployed-black?style=for-the-badge&logo=vercel)](https://quiz-app-ten-theta-92.vercel.app/)
[![License](https://img.shields.io/badge/License-MIT-green.svg?style=for-the-badge)](LICENSE)

## 🌐 Live Demo

**[Try the Quiz App Live!](https://quiz-app-ten-theta-92.vercel.app/)**

## ✨ Features

- 🎮 **Interactive Quiz Experience**: Real-time timer, progress tracking, and immediate feedback
- 📚 **Multiple Categories**: 20+ categories including Science, History, Entertainment, and more
- 🎯 **Three Difficulty Levels**: Easy, Medium, and Hard for all skill levels
- ⏱️ **Timer System**: 5-minute countdown with pause/resume functionality
- 📊 **Detailed Results**: Comprehensive score analysis and performance metrics
- 📱 **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- 🚀 **Fast Performance**: Server-side rendering and optimized builds
- 🛡️ **Error Handling**: Graceful fallbacks and user-friendly error messages
- 🎨 **Modern UI**: Beautiful gradients, animations, and smooth transitions

## 🏗️ Architecture

### Tech Stack
- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **API**: Open Trivia Database
- **Deployment**: Vercel (recommended)

### Project Structure
```
quiz-app/
├── app/                    # Next.js App Router pages
│   ├── page.tsx           # Homepage with category selection
│   ├── quiz/[category]/[level]/ # Dynamic quiz pages
│   ├── leaderboard/       # Leaderboard page
│   └── admin/             # Admin panel
├── components/            # Reusable React components
├── lib/                   # Utility functions and services
├── types/                 # TypeScript type definitions
├── hooks/                 # Custom React hooks
└── utils/                 # Helper utilities
```

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Rahul-tech24/Quiz-app.git
   cd Quiz-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🎮 How to Use

1. **Select a Category**: Choose from 20+ categories on the homepage
2. **Choose Difficulty**: Pick Easy, Medium, or Hard level
3. **Take the Quiz**: Answer 10 questions within 5 minutes
4. **Review Results**: See your score, time taken, and performance analysis
5. **Try Again**: Take another quiz or explore different categories

## 🔧 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run type-check   # Run TypeScript type checking
```

## 🌐 API Integration

The app integrates with the [Open Trivia Database](https://opentdb.com/api.php) API:

- **Categories**: Fetches available quiz categories
- **Questions**: Retrieves questions by category and difficulty
- **Error Handling**: Graceful fallbacks when API is unavailable
- **Caching**: 24-hour category caching for better performance

## 🎨 Customization

### Adding New Categories
Categories are automatically fetched from the Open Trivia Database API.

### Styling
The app uses Tailwind CSS. Modify `tailwind.config.js` for custom styling.

### Configuration
Update API endpoints and settings in `lib/triviaService.ts`.

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy on Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy

### Deploy to Other Platforms

The app can be deployed to any platform that supports Next.js:
- Netlify
- Railway
- DigitalOcean App Platform
- AWS Amplify

## 🐛 Troubleshooting

### Common Issues

1. **API Errors**: The app includes fallback categories if the API is unavailable
2. **Build Errors**: Ensure Node.js version is 18+ and all dependencies are installed
3. **Styling Issues**: Check Tailwind CSS configuration

### Development Tips

- Use the browser's developer tools to debug
- Check the console for API errors
- Test on different devices for responsive design

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [Open Trivia Database](https://opentdb.com) for providing the quiz questions
- [Next.js](https://nextjs.org) for the amazing framework
- [Tailwind CSS](https://tailwindcss.com) for the utility-first CSS framework
- [Vercel](https://vercel.com) for the deployment platform

## 📞 Support

If you have any questions or need help, please open an issue on GitHub.

---

**Made with ❤️ by [Rahul Kumar](https://github.com/Rahul-tech24)**
