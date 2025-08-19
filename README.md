# ExamCenter - Online Test Platform

A comprehensive online exam center application built with Next.js, TypeScript, and Tailwind CSS. This platform allows schools and educational institutions to create, manage, and administer online tests with various question types.

## 🚀 Features

### For Students
- **Dashboard**: View available tests, recent results, and performance statistics
- **Test Taking**: Interactive test interface with timer and question navigation
- **Multiple Question Types**: Support for multiple choice, true/false, short answer, and essay questions
- **Real-time Progress**: Track completion progress and time remaining
- **Results Review**: Detailed breakdown of test results with correct answers and explanations

### For Teachers & Administrators
- **Test Management**: Create and manage tests with different subjects and topics
- **Question Bank**: Comprehensive question database with difficulty levels
- **Performance Analytics**: View student performance and test statistics
- **User Management**: Manage students, teachers, and administrators

### Core Features
- **Responsive Design**: Works seamlessly on desktop, tablet, and mobile devices
- **Modern UI**: Clean, intuitive interface built with Tailwind CSS
- **Type Safety**: Full TypeScript support for better development experience
- **Mock Data**: Comprehensive mock data for testing and demonstration

## 🛠️ Technology Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Custom component library
- **State Management**: React hooks and local state
- **Development**: ESLint, PostCSS

## 📁 Project Structure

```
exam-center/
├── src/
│   ├── app/                    # Next.js app router pages
│   │   ├── page.tsx           # Dashboard
│   │   ├── tests/             # Tests pages
│   │   ├── results/           # Results page
│   │   └── layout.tsx         # Root layout
│   ├── components/            # React components
│   │   ├── ui/               # Reusable UI components
│   │   ├── Header.tsx        # Navigation header
│   │   ├── TestCard.tsx      # Test display card
│   │   └── QuestionDisplay.tsx # Question rendering
│   ├── data/                 # Mock data
│   │   └── mockData.ts       # Schools, tests, users, results
│   ├── types/                # TypeScript type definitions
│   │   └── index.ts          # Interface definitions
│   └── utils/                # Utility functions
│       └── helpers.ts        # Helper functions
├── public/                   # Static assets
└── package.json             # Dependencies and scripts
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd exam-center
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Run the development server**
   ```bash
   npm run dev
   ```

4. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npx tsc --noEmit` - Type checking

## 📊 Mock Data

The application includes comprehensive mock data for demonstration:

### Schools
- Lincoln High School (Springfield, IL)
- Riverside Academy (Chicago, IL)
- Central Middle School (Peoria, IL)

### Subjects
- **Mathematics**: Algebra, Geometry, Number Theory
- **Science**: Chemistry, Astronomy, Biology
- **English**: Grammar, Literature, Writing

### Question Types
- **Multiple Choice**: Standard multiple choice questions
- **True/False**: Binary choice questions
- **Short Answer**: Text-based answers
- **Essay**: Long-form written responses

### Users
- **Students**: John Smith, Mike Davis
- **Teachers**: Sarah Johnson
- **Administrators**: Dr. Emily Wilson

## 🎯 Usage Guide

### For Students

1. **Dashboard**: View your test statistics and available tests
2. **Browse Tests**: Use filters to find specific tests by subject or difficulty
3. **Take Tests**: 
   - Review test information and instructions
   - Answer questions with the interactive interface
   - Navigate between questions using the question navigator
   - Submit when complete or when time runs out
4. **View Results**: Check your performance and review correct answers

### For Teachers/Administrators

1. **Admin Panel**: Access administrative features (coming soon)
2. **Test Creation**: Create new tests with various question types
3. **Question Management**: Add questions to the question bank
4. **Performance Monitoring**: Track student performance and analytics

## 🎨 UI Components

The application includes a custom component library:

- **Button**: Multiple variants (primary, secondary, outline, danger)
- **Card**: Flexible card layouts with header, content, and footer
- **Badge**: Status indicators and labels
- **QuestionDisplay**: Interactive question rendering for all question types

## 🔧 Customization

### Adding New Question Types

1. Update the `Question` interface in `src/types/index.ts`
2. Add rendering logic in `QuestionDisplay.tsx`
3. Update validation in `src/utils/helpers.ts`

### Adding New Subjects

1. Add subject data to `src/data/mockData.ts`
2. Update the subject color mapping in `TestCard.tsx`

### Styling

The application uses Tailwind CSS for styling. Custom styles can be added to:
- `src/app/globals.css` for global styles
- Component-specific classes for component styling

## 🚧 Future Enhancements

- [ ] User authentication and authorization
- [ ] Database integration (PostgreSQL/MongoDB)
- [ ] Real-time collaboration features
- [ ] Advanced analytics and reporting
- [ ] Mobile app (React Native)
- [ ] API endpoints for external integrations
- [ ] Bulk test import/export
- [ ] Advanced question types (matching, ordering, etc.)
- [ ] Proctoring features
- [ ] Certificate generation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

---

**Built with ❤️ using Next.js, TypeScript, and Tailwind CSS**
