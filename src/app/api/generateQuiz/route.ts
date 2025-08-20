import { GoogleGenAI } from "@google/genai";
import { NextResponse } from "next/server";

// The client gets the API key from the environment variable `GEMINI_API_KEY`.
const ai = new GoogleGenAI({
    apiKey: process.env.GEMINI_API_KEY,
});

interface QuizQuestion {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation?: string;
}

interface QuizData {
  id: string;
  title: string;
  subject: string;
  topic: string;
  difficulty: string;
  questionCount: number;
  questions: QuizQuestion[];
  instructions: string;
  timeLimit?: number;
  createdAt: string;
}

export async function POST(request: Request) {
    try {
        const { subject, topic, difficulty, questionCount, questionTypes, focusAreas } = await request.json();
        
        // Create a structured prompt for the AI
        const prompt = `Generate a ${difficulty} difficulty quiz on ${topic} (${subject}) with exactly ${questionCount} questions. 

Requirements:
- Format the response as valid JSON only
- Include ${questionTypes.join(', ')} question types
- Focus on: ${focusAreas.join(', ') || 'general understanding'}
- Each question should have 4 multiple choice options (A, B, C, D)
- Provide explanations for correct answers

Return the response in this exact JSON format:
{
  "title": "Quiz Title",
  "instructions": "Clear instructions for the quiz",
  "questions": [
    {
      "id": 1,
      "question": "Question text here?",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correctAnswer": 0,
      "explanation": "Explanation of why this answer is correct"
    }
  ]
}

Note: correctAnswer should be 0 for A, 1 for B, 2 for C, 3 for D. Return ONLY the JSON, no additional text.`;

        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: prompt,
        });

        const responseText = response.text;
        
        if (!responseText) {
            throw new Error('No response received from AI');
        }
        
        // Try to extract JSON from the response
        let quizData;
        try {
            // Look for JSON in the response (sometimes AI adds extra text)
            const jsonMatch = responseText.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                quizData = JSON.parse(jsonMatch[0]);
            } else {
                quizData = JSON.parse(responseText);
            }
        } catch (parseError) {
            console.error('Failed to parse AI response as JSON:', parseError);
            console.log('Raw response:', responseText);
            
            // Fallback: create a basic quiz structure
            quizData = {
                title: `${topic} Quiz`,
                instructions: `Answer all ${questionCount} questions about ${topic}`,
                questions: []
            };
        }

        // Create the complete quiz object
        const quiz: QuizData = {
            id: `quiz-${Date.now()}`,
            title: quizData.title || `${topic} Quiz`,
            subject,
            topic,
            difficulty,
            questionCount,
            questions: quizData.questions || [],
            instructions: quizData.instructions || `Complete this ${difficulty} difficulty quiz on ${topic}`,
            createdAt: new Date().toISOString()
        };

        // Store the quiz in session storage (you might want to use a database in production)
        // For now, we'll return it directly
        
        return NextResponse.json({ 
            id: quiz.id,
            quiz: quiz
        }, { status: 200 });

    } catch (error) {
        console.error('Error generating quiz:', error);
        return NextResponse.json({ 
            error: "Failed to generate quiz",
            details: error instanceof Error ? error.message : "Unknown error"
        }, { status: 500 });
    }
}

