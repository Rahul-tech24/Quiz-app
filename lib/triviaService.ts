import { TriviaQuestion, QuizApiResponse, ProcessedQuestion, Category } from '../types/quiz';
import shuffleArray from './shuffleArray';

const API_BASE_URL = 'https://opentdb.com/api.php';
const CATEGORIES_URL = 'https://opentdb.com/api_category.php';

// Cache for categories to avoid repeated API calls
let categoriesCache: Category[] | null = null;
let categoriesCacheTime = 0;
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 hours

export async function fetchCategories(): Promise<Category[]> {
  // Check cache first
  if (Array.isArray(categoriesCache) && Date.now() - categoriesCacheTime < CACHE_DURATION) {
    return categoriesCache;
  }

  try {
    const response = await fetch(CATEGORIES_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const data = await response.json();
    categoriesCache = data.trivia_categories;
    categoriesCacheTime = Date.now();
    
    return categoriesCache || [];
  } catch (error) {
    console.error('Error fetching categories:', error);
    // Return fallback categories if API fails
    return [
      { id: 9, name: 'General Knowledge', count: 0 },
      { id: 10, name: 'Entertainment: Books', count: 0 },
      { id: 11, name: 'Entertainment: Film', count: 0 },
      { id: 12, name: 'Entertainment: Music', count: 0 },
      { id: 14, name: 'Entertainment: Television', count: 0 },
      { id: 15, name: 'Entertainment: Video Games', count: 0 },
      { id: 17, name: 'Science & Nature', count: 0 },
      { id: 18, name: 'Science: Computers', count: 0 },
      { id: 19, name: 'Science: Mathematics', count: 0 },
      { id: 20, name: 'Mythology', count: 0 },
      { id: 21, name: 'Sports', count: 0 },
      { id: 22, name: 'Geography', count: 0 },
      { id: 23, name: 'History', count: 0 },
      { id: 24, name: 'Politics', count: 0 },
      { id: 25, name: 'Art', count: 0 },
      { id: 27, name: 'Animals', count: 0 },
      { id: 28, name: 'Vehicles', count: 0 },
      { id: 29, name: 'Entertainment: Comics', count: 0 },
      { id: 30, name: 'Science: Gadgets', count: 0 },
      { id: 32, name: 'Entertainment: Cartoon & Animations', count: 0 }
    ];
  }
}

export async function fetchQuestions(
  amount: number = 10,
  category?: number,
  difficulty?: 'easy' | 'medium' | 'hard',
  type?: 'multiple' | 'boolean'
): Promise<ProcessedQuestion[]> {
  try {
    const params = new URLSearchParams({
      amount: amount.toString(),
      encode: 'url3986' // Use URL encoding for special characters
    });

    if (category) params.append('category', category.toString());
    if (difficulty) params.append('difficulty', difficulty);
    if (type) params.append('type', type);

    const url = `${API_BASE_URL}?${params.toString()}`;
    const response = await fetch(url, {
      headers: {
        'Accept': 'application/json',
        'User-Agent': 'QuizApp/1.0'
      },
      next: { revalidate: 3600 } // Cache for 1 hour
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data: QuizApiResponse = await response.json();
    
    if (data.response_code !== 0) {
      throw new Error(`API Error: Response code ${data.response_code}`);
    }

    return data.results.map((question, index) => ({
      id: `q_${Date.now()}_${index}`,
      category: question.category,
      type: question.type,
      difficulty: question.difficulty,
      question: decodeHtmlEntities(question.question),
      correct_answer: decodeHtmlEntities(question.correct_answer),
      incorrect_answers: question.incorrect_answers.map(decodeHtmlEntities),
      options: shuffleArray([
        decodeHtmlEntities(question.correct_answer),
        ...question.incorrect_answers.map(decodeHtmlEntities)
      ])
    }));
  } catch (error) {
    console.error('Error fetching questions:', error);
    throw new Error('Failed to fetch quiz questions. Please try again later.');
  }
}

export function decodeHtmlEntities(text: string): string {
  // First decode URL encoding
  let decodedText = decodeURIComponent(text);
  
  const entities: { [key: string]: string } = {
    '&amp;': '&',
    '&lt;': '<',
    '&gt;': '>',
    '&quot;': '"',
    '&#039;': "'",
    '&apos;': "'",
    '&ldquo;': '"',
    '&rdquo;': '"',
    '&lsquo;': "'",
    '&rsquo;': "'",
    '&hellip;': '...',
    '&mdash;': '—',
    '&ndash;': '–',
    '&copy;': '©',
    '&reg;': '®',
    '&trade;': '™',
    '&euro;': '€',
    '&pound;': '£',
    '&cent;': '¢',
    '&deg;': '°',
    '&plusmn;': '±',
    '&times;': '×',
    '&divide;': '÷',
    '&frac12;': '½',
    '&frac14;': '¼',
    '&frac34;': '¾',
    '&sup1;': '¹',
    '&sup2;': '²',
    '&sup3;': '³',
    '&micro;': 'µ',
    '&alpha;': 'α',
    '&beta;': 'β',
    '&gamma;': 'γ',
    '&delta;': 'δ',
    '&epsilon;': 'ε',
    '&zeta;': 'ζ',
    '&eta;': 'η',
    '&theta;': 'θ',
    '&iota;': 'ι',
    '&kappa;': 'κ',
    '&lambda;': 'λ',
    '&mu;': 'μ',
    '&nu;': 'ν',
    '&xi;': 'ξ',
    '&omicron;': 'ο',
    '&pi;': 'π',
    '&rho;': 'ρ',
    '&sigma;': 'σ',
    '&tau;': 'τ',
    '&upsilon;': 'υ',
    '&phi;': 'φ',
    '&chi;': 'χ',
    '&psi;': 'ψ',
    '&omega;': 'ω'
  };

  return decodedText.replace(/&[#\w]+;/g, (entity) => {
    if (entity.startsWith('&#x')) {
      return String.fromCharCode(parseInt(entity.slice(3, -1), 16));
    }
    if (entity.startsWith('&#')) {
      return String.fromCharCode(parseInt(entity.slice(2, -1)));
    }
    return entities[entity] || entity;
  });
}

export function calculateScore(questions: ProcessedQuestion[]): {
  score: number;
  total: number;
  percentage: number;
  correct: number;
  incorrect: number;
} {
  const total = questions.length;
  const correct = questions.filter(q => q.is_correct).length;
  const incorrect = total - correct;
  const score = correct;
  const percentage = total > 0 ? Math.round((correct / total) * 100) : 0;

  return { score, total, percentage, correct, incorrect };
} 

