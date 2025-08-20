import { School, Subject, Topic, Question, Test, User, TestResult } from '@/types';

// Mock Questions
const mathQuestions: Question[] = [
  {
    id: 'q1',
    text: 'What is the value of 2x + 3 when x = 4?',
    type: 'multiple_choice',
    options: [{id: '8', text: '8'}, {id: '11', text: '11'}, {id: '10', text: '10'}, {id: '9', text: '9'}],
    correctAnswer: '11',
    explanation: 'Substitute x = 4: 2(4) + 3 = 8 + 3 = 11',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q2',
    text: 'Solve the equation: 3x - 7 = 8',
    type: 'multiple_choice',
    options: [{id: 'x = 3', text: 'x = 3'}, {id: 'x = 5', text: 'x = 5'}, {id: 'x = 4', text: 'x = 4'}, {id: 'x = 6', text: 'x = 6'}],
    correctAnswer: 'x = 5',
    explanation: '3x - 7 = 8 → 3x = 15 → x = 5',
    difficulty: 'medium',
    points: 10
  },
  {
    id: 'q3',
    text: 'What is the area of a circle with radius 5 units?',
    type: 'multiple_choice',
    options: [{id: '25π', text: '25π'}, {id: '50π', text: '50π'}, {id: '75π', text: '75π'}, {id: '100π', text: '100π'}],
    correctAnswer: '25π',
    explanation: 'Area = πr² = π(5)² = 25π',
    difficulty: 'medium',
    points: 10
  },
  {
    id: 'q4',
    text: 'Is the number 17 prime?',
    type: 'true_false',
    options: [{id: 'True', text: 'True'}, {id: 'False', text: 'False'}],
    correctAnswer: 'True',
    explanation: '17 is only divisible by 1 and itself',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q5',
    text: 'Explain the Pythagorean theorem and provide an example.',
    type: 'essay',
    correctAnswer: 'The Pythagorean theorem states that in a right triangle, a² + b² = c² where c is the hypotenuse.',
    difficulty: 'hard',
    points: 20
  }
];

const scienceQuestions: Question[] = [
  {
    id: 'q6',
    text: 'What is the chemical symbol for gold?',
    type: 'multiple_choice',
    options: [{id: 'Ag', text: 'Ag'}, {id: 'Au', text: 'Au'}, {id: 'Fe', text: 'Fe'}, {id: 'Cu', text: 'Cu'}],
    correctAnswer: 'Au',
    explanation: 'Au comes from the Latin word "aurum"',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q7',
    text: 'Which planet is closest to the Sun?',
    type: 'multiple_choice',
    options: [{id: 'Venus', text: 'Venus'}, {id: 'Mercury', text: 'Mercury'}, {id: 'Mars', text: 'Mars'}, {id: 'Earth', text: 'Earth'}],
    correctAnswer: 'Mercury',
    explanation: 'Mercury is the first planet from the Sun',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q8',
    text: 'What is the process by which plants make their own food?',
    type: 'multiple_choice',
    options: [{id: 'Respiration', text: 'Respiration'}, {id: 'Photosynthesis', text: 'Photosynthesis'}, {id: 'Digestion', text: 'Digestion'}, {id: 'Fermentation', text: 'Fermentation'}],
    correctAnswer: 'Photosynthesis',
    explanation: 'Photosynthesis converts sunlight into chemical energy',
    difficulty: 'medium',
    points: 10
  },
  {
    id: 'q9',
    text: 'Water boils at 100°C at sea level.',
    type: 'true_false',
    options: [{id: 'True', text: 'True'}, {id: 'False', text: 'False'}],
    correctAnswer: 'True',
    explanation: 'At standard atmospheric pressure, water boils at 100°C',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q10',
    text: 'Describe the three states of matter and give examples of each.',
    type: 'essay',
    correctAnswer: 'Solid (ice), Liquid (water), Gas (steam)',
    difficulty: 'medium',
    points: 15
  }
];

const englishQuestions: Question[] = [
  {
    id: 'q11',
    text: 'Which of the following is a proper noun?',
    type: 'multiple_choice',
    options: [{id: 'city', text: 'city'}, {id: 'London', text: 'London'}, {id: 'river', text: 'river'}, {id: 'mountain', text: 'mountain'}],
    correctAnswer: 'London',
    explanation: 'London is a specific name for a city',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q12',
    text: 'What is the past tense of "go"?',
    type: 'multiple_choice',
    options: [{id: 'goed', text: 'goed'}, {id: 'went', text: 'went'}, {id: 'gone', text: 'gone'}, {id: 'going', text: 'going'}],
    correctAnswer: 'went',
    explanation: 'The irregular past tense of "go" is "went"',
    difficulty: 'medium',
    points: 10
  },
  {
    id: 'q13',
    text: 'Identify the figure of speech: "The wind whispered through the trees."',
    type: 'multiple_choice',
    options: [{id: 'Simile', text: 'Simile'}, {id: 'Metaphor', text: 'Metaphor'}, {id: 'Personification', text: 'Personification'}, {id: 'Alliteration', text: 'Alliteration'}],
    correctAnswer: 'Personification',
    explanation: 'Giving human qualities to non-human things',
    difficulty: 'medium',
    points: 10
  },
  {
    id: 'q14',
    text: 'A sentence must always end with a period.',
    type: 'true_false',
    options: [{id: 'True', text: 'True'}, {id: 'False', text: 'False'}],
    correctAnswer: 'False',
    explanation: 'Sentences can end with periods, question marks, or exclamation points',
    difficulty: 'easy',
    points: 5
  },
  {
    id: 'q15',
    text: 'Write a short paragraph describing your favorite book and why you like it.',
    type: 'essay',
    correctAnswer: 'Student should write a coherent paragraph with proper grammar and structure.',
    difficulty: 'hard',
    points: 20
  }
];

// Mock Topics
const mathTopics: Topic[] = [
  {
    id: 't1',
    name: 'Algebra Basics',
    description: 'Introduction to algebraic expressions and equations',
    questions: mathQuestions.slice(0, 2)
  },
  {
    id: 't2',
    name: 'Geometry',
    description: 'Basic geometric shapes and calculations',
    questions: mathQuestions.slice(2, 3)
  },
  {
    id: 't3',
    name: 'Number Theory',
    description: 'Prime numbers and number properties',
    questions: mathQuestions.slice(3, 5)
  }
];

const scienceTopics: Topic[] = [
  {
    id: 't4',
    name: 'Chemistry Basics',
    description: 'Introduction to chemical elements and symbols',
    questions: scienceQuestions.slice(0, 1)
  },
  {
    id: 't5',
    name: 'Astronomy',
    description: 'Solar system and planetary science',
    questions: scienceQuestions.slice(1, 2)
  },
  {
    id: 't6',
    name: 'Biology',
    description: 'Living organisms and life processes',
    questions: scienceQuestions.slice(2, 5)
  }
];

const englishTopics: Topic[] = [
  {
    id: 't7',
    name: 'Grammar',
    description: 'Parts of speech and sentence structure',
    questions: englishQuestions.slice(0, 2)
  },
  {
    id: 't8',
    name: 'Literature',
    description: 'Literary devices and analysis',
    questions: englishQuestions.slice(2, 3)
  },
  {
    id: 't9',
    name: 'Writing',
    description: 'Essay writing and composition',
    questions: englishQuestions.slice(3, 5)
  }
];

// Mock Subjects
const subjects: Subject[] = [
  {
    id: 's1',
    name: 'Mathematics',
    description: 'Study of numbers, quantities, and shapes',
    grade: '9-12',
    topics: mathTopics
  },
  {
    id: 's2',
    name: 'Science',
    description: 'Study of the natural world and its phenomena',
    grade: '9-12',
    topics: scienceTopics
  },
  {
    id: 's3',
    name: 'English',
    description: 'Language arts, literature, and composition',
    grade: '9-12',
    topics: englishTopics
  }
];

// Mock Schools
export const schools: School[] = [
  {
    id: 'school1',
    name: 'Lincoln High School',
    location: 'Springfield, IL',
    type: 'high',
    subjects: subjects
  },
  {
    id: 'school2',
    name: 'Riverside Academy',
    location: 'Chicago, IL',
    type: 'high',
    subjects: subjects
  },
  {
    id: 'school3',
    name: 'Central Middle School',
    location: 'Peoria, IL',
    type: 'secondary',
    subjects: subjects.slice(0, 2)
  }
];

// Mock Tests
export const tests: Test[] = [
  {
    id: 'test1',
    title: 'Algebra Fundamentals Quiz',
    subject: subjects[0],
    topic: mathTopics[0],
    questions: mathTopics[0].questions,
    duration: 30,
    totalPoints: 15,
    passingScore: 10,
    createdAt: new Date('2024-01-15'),
    isActive: true
  },
  {
    id: 'test2',
    title: 'Geometry Basics Test',
    subject: subjects[0],
    topic: mathTopics[1],
    questions: mathTopics[1].questions,
    duration: 45,
    totalPoints: 10,
    passingScore: 7,
    createdAt: new Date('2024-01-20'),
    isActive: true
  },
  {
    id: 'test3',
    title: 'Chemistry Elements Quiz',
    subject: subjects[1],
    topic: scienceTopics[0],
    questions: scienceTopics[0].questions,
    duration: 20,
    totalPoints: 5,
    passingScore: 3,
    createdAt: new Date('2024-01-25'),
    isActive: true
  },
  {
    id: 'test4',
    title: 'English Grammar Assessment',
    subject: subjects[2],
    topic: englishTopics[0],
    questions: englishTopics[0].questions,
    duration: 40,
    totalPoints: 15,
    passingScore: 10,
    createdAt: new Date('2024-01-30'),
    isActive: true
  }
];

// Mock Users
export const users: User[] = [
  {
    id: 'user1',
    name: 'John Smith',
    email: 'john.smith@lincoln.edu',
    role: 'student',
    school: schools[0],
    grade: '10th'
  },
  {
    id: 'user2',
    name: 'Sarah Johnson',
    email: 'sarah.johnson@lincoln.edu',
    role: 'teacher',
    school: schools[0]
  },
  {
    id: 'user3',
    name: 'Mike Davis',
    email: 'mike.davis@riverside.edu',
    role: 'student',
    school: schools[1],
    grade: '11th'
  },
  {
    id: 'user4',
    name: 'Dr. Emily Wilson',
    email: 'emily.wilson@lincoln.edu',
    role: 'admin',
    school: schools[0]
  }
];

// Mock Test Results
export const testResults: TestResult[] = [
  {
    id: 'result1',
    userId: 'user1',
    testId: 'test1',
    score: 12,
    totalPoints: 15,
    percentage: 80,
    passed: true,
    completedAt: new Date('2024-02-01'),
    answers: [
      {
        questionId: 'q1',
        userAnswer: '11',
        isCorrect: true,
        pointsEarned: 5
      },
      {
        questionId: 'q2',
        userAnswer: 'x = 5',
        isCorrect: true,
        pointsEarned: 10
      }
    ]
  },
  {
    id: 'result2',
    userId: 'user3',
    testId: 'test3',
    score: 4,
    totalPoints: 5,
    percentage: 80,
    passed: true,
    completedAt: new Date('2024-02-05'),
    answers: [
      {
        questionId: 'q6',
        userAnswer: 'Au',
        isCorrect: true,
        pointsEarned: 5
      }
    ]
  }
]; 