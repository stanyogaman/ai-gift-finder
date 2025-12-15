export interface QuizQuestion {
  id: string;
  type: 'single' | 'multiple' | 'range' | 'text';
  question: string;
  description?: string;
  options?: string[];
  category: string;
  required: boolean;
}

export const quizQuestions: QuizQuestion[] = [
  // Recipient Profile
  {
    id: 'recipient_relation',
    type: 'single',
    question: 'Who is this gift for?',
    description: 'Help us understand your relationship',
    category: 'recipient',
    required: true,
    options: [
      'Partner/Spouse',
      'Parent',
      'Child',
      'Sibling',
      'Friend',
      'Colleague',
      'Boss/Manager',
      'Teacher',
      'Extended Family',
      'Myself'
    ]
  },
  {
    id: 'recipient_age',
    type: 'single',
    question: 'What\'s their age range?',
    category: 'recipient',
    required: true,
    options: [
      'Under 12',
      '13-17 (Teen)',
      '18-24 (Young Adult)',
      '25-34',
      '35-44',
      '45-54',
      '55-64',
      '65+'
    ]
  },
  {
    id: 'recipient_gender',
    type: 'single',
    question: 'Gender preference for gift ideas?',
    category: 'recipient',
    required: false,
    options: [
      'Male',
      'Female',
      'Non-binary',
      'Prefer not to say',
      'Any/Universal'
    ]
  },

  // Occasion
  {
    id: 'occasion',
    type: 'single',
    question: 'What\'s the occasion?',
    description: 'This helps us match the perfect gift type',
    category: 'occasion',
    required: true,
    options: [
      'Birthday',
      'Anniversary',
      'Wedding',
      'Graduation',
      'New Baby',
      'Housewarming',
      'Christmas',
      'Valentine\'s Day',
      'Mother\'s Day',
      'Father\'s Day',
      'Thank You',
      'Get Well Soon',
      'Retirement',
      'Promotion/Achievement',
      'Just Because'
    ]
  },
  {
    id: 'occasion_timing',
    type: 'single',
    question: 'When do you need the gift?',
    category: 'occasion',
    required: true,
    options: [
      'ASAP (1-2 days)',
      'This week',
      'Within 2 weeks',
      'This month',
      'I have plenty of time'
    ]
  },

  // Interests & Personality
  {
    id: 'interests',
    type: 'multiple',
    question: 'What are their main interests?',
    description: 'Select all that apply',
    category: 'interests',
    required: true,
    options: [
      'Technology & Gadgets',
      'Books & Reading',
      'Cooking & Baking',
      'Fitness & Sports',
      'Gaming (Video/Board)',
      'Music',
      'Art & Crafts',
      'Travel',
      'Fashion & Style',
      'Home Decor',
      'Gardening',
      'Photography',
      'Pets & Animals',
      'Outdoor Activities',
      'Wine & Spirits',
      'Coffee & Tea',
      'Wellness & Self-care',
      'Movies & TV'
    ]
  },
  {
    id: 'personality',
    type: 'multiple',
    question: 'How would you describe their personality?',
    description: 'Select up to 3 traits',
    category: 'interests',
    required: false,
    options: [
      'Adventurous',
      'Creative',
      'Practical',
      'Eco-conscious',
      'Tech-savvy',
      'Minimalist',
      'Luxury-loving',
      'Sentimental',
      'Humorous',
      'Intellectual',
      'Athletic',
      'Artistic'
    ]
  },

  // Lifestyle
  {
    id: 'lifestyle',
    type: 'multiple',
    question: 'What best describes their lifestyle?',
    category: 'lifestyle',
    required: false,
    options: [
      'Work from home',
      'Always on the go',
      'Homebody',
      'Social butterfly',
      'Health-conscious',
      'Environmentally aware',
      'Early adopter of new tech',
      'DIY enthusiast',
      'Collector',
      'Minimalist'
    ]
  },

  // Gift Preferences
  {
    id: 'gift_type',
    type: 'multiple',
    question: 'What type of gifts do they usually prefer?',
    category: 'preferences',
    required: false,
    options: [
      'Practical/Useful items',
      'Experiences',
      'Sentimental/Personal',
      'Luxury items',
      'Handmade/Artisan',
      'Tech & Innovation',
      'Subscription services',
      'Collectibles',
      'Educational',
      'Eco-friendly products'
    ]
  },
  {
    id: 'uniqueness',
    type: 'single',
    question: 'How unique should the gift be?',
    category: 'preferences',
    required: false,
    options: [
      'Something popular and trending',
      'A mix of popular and unique',
      'One-of-a-kind and special',
      'Personalized/Customized',
      'They have everything - surprise me!'
    ]
  },

  // Budget
  {
    id: 'budget',
    type: 'range',
    question: 'What\'s your budget range?',
    description: 'We\'ll find the best options in your price range',
    category: 'budget',
    required: true,
    options: [
      'Under $25',
      '$25 - $50',
      '$50 - $100',
      '$100 - $250',
      '$250 - $500',
      '$500 - $1000',
      'Over $1000',
      'Budget is flexible'
    ]
  },

  // Special Considerations
  {
    id: 'avoid',
    type: 'multiple',
    question: 'Anything to avoid?',
    description: 'Optional - helps us filter out unwanted items',
    category: 'constraints',
    required: false,
    options: [
      'Allergies (food/materials)',
      'Already owns similar items',
      'Not eco-friendly',
      'Too trendy/faddish',
      'Requires assembly',
      'Fragile items',
      'Large/bulky items',
      'Requires subscription',
      'Religious/cultural sensitivities'
    ]
  },
  {
    id: 'special_requirements',
    type: 'multiple',
    question: 'Any special requirements?',
    category: 'constraints',
    required: false,
    options: [
      'Must be eco-friendly',
      'Fair trade/ethically sourced',
      'Handmade/artisan',
      'Made in USA',
      'Organic/natural materials',
      'Vegan/cruelty-free',
      'Smart home compatible',
      'Portable/travel-friendly',
      'Gift wrapping available'
    ]
  },

  // Additional Context
  {
    id: 'notes',
    type: 'text',
    question: 'Any other details we should know?',
    description: 'Optional - share anything else that might help us find the perfect gift',
    category: 'additional',
    required: false
  }
];

export const quizCategories = [
  { id: 'recipient', name: 'About the Recipient', icon: '👤' },
  { id: 'occasion', name: 'Occasion & Timing', icon: '🎉' },
  { id: 'interests', name: 'Interests & Personality', icon: '❤️' },
  { id: 'lifestyle', name: 'Lifestyle', icon: '🏡' },
  { id: 'preferences', name: 'Gift Preferences', icon: '🎁' },
  { id: 'budget', name: 'Budget', icon: '💰' },
  { id: 'constraints', name: 'Special Considerations', icon: '✨' },
  { id: 'additional', name: 'Additional Details', icon: '📝' }
];

// Helper to get questions by category
export function getQuestionsByCategory(category: string): QuizQuestion[] {
  return quizQuestions.filter(q => q.category === category);
}

// Helper to get required questions
export function getRequiredQuestions(): QuizQuestion[] {
  return quizQuestions.filter(q => q.required);
}

// Quiz completion scoring
export function calculateQuizCompleteness(answers: Record<string, any>): number {
  const answeredQuestions = Object.keys(answers).length;
  const totalQuestions = quizQuestions.length;
  return Math.round((answeredQuestions / totalQuestions) * 100);
}
