export interface QuizOption {
  value: string;
  text_en: string;
  text_ru: string;
  icon: string;
  next?: string;
}

export interface QuizQuestion {
  id: string;
  question_en: string;
  question_ru: string;
  type: 'single' | 'multiple' | 'slider' | 'text';
  options: QuizOption[];
}

export const defaultQuizQuestions: QuizQuestion[] = [
  {
    id: 'relationship',
    question_en: 'Who are you shopping for?',
    question_ru: 'Для кого вы ищете подарок?',
    type: 'single',
    options: [
      { value: 'partner', text_en: 'Partner', text_ru: 'Партнер', icon: '❤️', next: 'occasion' },
      { value: 'close-friend', text_en: 'Close Friend', text_ru: 'Близкий друг', icon: '🤝', next: 'occasion' },
      { value: 'parent', text_en: 'Parent', text_ru: 'Родитель', icon: '👨‍👩‍👧', next: 'occasion' },
      { value: 'child', text_en: 'Child', text_ru: 'Ребенок', icon: '👶', next: 'occasion' },
      { value: 'colleague', text_en: 'Colleague', text_ru: 'Коллега', icon: '💼', next: 'occasion' },
      { value: 'client', text_en: 'Client', text_ru: 'Клиент', icon: '🤝', next: 'occasion' },
      { value: 'other', text_en: 'Someone else', text_ru: 'Кто-то другой', icon: '🎁', next: 'occasion' },
    ],
  },
  {
    id: 'occasion',
    question_en: 'What is the occasion?',
    question_ru: 'Какой повод?',
    type: 'single',
    options: [
      { value: 'birthday', text_en: 'Birthday', text_ru: 'День рождения', icon: '🎂', next: 'age' },
      { value: 'anniversary', text_en: 'Anniversary', text_ru: 'Годовщина', icon: '💕', next: 'age' },
      { value: 'wedding', text_en: 'Wedding', text_ru: 'Свадьба', icon: '💒', next: 'age' },
      { value: 'baby', text_en: 'New Baby', text_ru: 'Рождение ребенка', icon: '👶', next: 'age' },
      { value: 'graduation', text_en: 'Graduation', text_ru: 'Выпускной', icon: '🎓', next: 'age' },
      { value: 'holiday', text_en: 'Holiday / Christmas', text_ru: 'Праздник / Новый год', icon: '🎄', next: 'age' },
      { value: 'thankyou', text_en: 'Thank You', text_ru: 'Благодарность', icon: '🙏', next: 'age' },
      { value: 'justbecause', text_en: 'Just Because', text_ru: 'Просто так', icon: '😊', next: 'age' },
    ],
  },
  {
    id: 'age',
    question_en: 'What is their approximate age?',
    question_ru: 'Примерный возраст получателя?',
    type: 'single',
    options: [
      { value: '0-5', text_en: '0-5 years', text_ru: '0-5 лет', icon: '👶', next: 'personality' },
      { value: '6-12', text_en: '6-12 years', text_ru: '6-12 лет', icon: '🧒', next: 'personality' },
      { value: '13-17', text_en: '13-17 years', text_ru: '13-17 лет', icon: '🧑', next: 'personality' },
      { value: '18-24', text_en: '18-24 years', text_ru: '18-24 года', icon: '👱', next: 'personality' },
      { value: '25-34', text_en: '25-34 years', text_ru: '25-34 года', icon: '🧑‍💼', next: 'personality' },
      { value: '35-49', text_en: '35-49 years', text_ru: '35-49 лет', icon: '👨', next: 'personality' },
      { value: '50-64', text_en: '50-64 years', text_ru: '50-64 года', icon: '👴', next: 'personality' },
      { value: '65+', text_en: '65+ years', text_ru: '65+ лет', icon: '👵', next: 'personality' },
    ],
  },
  {
    id: 'personality',
    question_en: 'How would you describe their personality?',
    question_ru: 'Как бы вы описали их характер?',
    type: 'single',
    options: [
      { value: 'introvert', text_en: 'Introverted & thoughtful', text_ru: 'Интроверт, вдумчивый', icon: '🏡', next: 'interests' },
      { value: 'extrovert', text_en: 'Extroverted & social', text_ru: 'Экстраверт, общительный', icon: '🎉', next: 'interests' },
      { value: 'creative', text_en: 'Creative & artistic', text_ru: 'Творческий, артистичный', icon: '🎨', next: 'interests' },
      { value: 'practical', text_en: 'Practical & organized', text_ru: 'Практичный, организованный', icon: '📊', next: 'interests' },
      { value: 'tech-lover', text_en: 'Tech enthusiast', text_ru: 'Любитель технологий', icon: '💻', next: 'interests' },
      { value: 'minimalist', text_en: 'Minimalist', text_ru: 'Минималист', icon: '✨', next: 'interests' },
      { value: 'sentimental', text_en: 'Sentimental & nostalgic', text_ru: 'Сентиментальный', icon: '💝', next: 'interests' },
      { value: 'adventurous', text_en: 'Adventurous & spontaneous', text_ru: 'Авантюрный, спонтанный', icon: '🚀', next: 'interests' },
    ],
  },
  {
    id: 'interests',
    question_en: 'What are they really into right now?',
    question_ru: 'Чем они сейчас увлекаются?',
    type: 'multiple',
    options: [
      { value: 'tech', text_en: 'Tech & gadgets', text_ru: 'Технологии и гаджеты', icon: '📱' },
      { value: 'books', text_en: 'Books & reading', text_ru: 'Книги и чтение', icon: '📚' },
      { value: 'fitness', text_en: 'Fitness & sports', text_ru: 'Фитнес и спорт', icon: '🏋️' },
      { value: 'cooking', text_en: 'Cooking & food', text_ru: 'Кулинария и еда', icon: '👨‍🍳' },
      { value: 'travel', text_en: 'Travel & adventure', text_ru: 'Путешествия', icon: '✈️' },
      { value: 'art', text_en: 'Art & design', text_ru: 'Искусство и дизайн', icon: '🎨' },
      { value: 'gaming', text_en: 'Gaming', text_ru: 'Видеоигры', icon: '🎮' },
      { value: 'beauty', text_en: 'Self-care & beauty', text_ru: 'Уход за собой', icon: '💅' },
      { value: 'sustainability', text_en: 'Sustainability & eco', text_ru: 'Экология', icon: '🌱' },
      { value: 'diy', text_en: 'DIY & crafts', text_ru: 'Рукоделие', icon: '🔧' },
      { value: 'music', text_en: 'Music', text_ru: 'Музыка', icon: '🎵' },
      { value: 'gardening', text_en: 'Gardening & plants', text_ru: 'Садоводство', icon: '🌿' },
    ],
  },
  {
    id: 'emotion',
    question_en: 'What emotion should the gift create?',
    question_ru: 'Какую эмоцию должен вызвать подарок?',
    type: 'single',
    options: [
      { value: 'thoughtful', text_en: 'Deeply thoughtful & meaningful', text_ru: 'Глубоко продуманный', icon: '💭', next: 'budget' },
      { value: 'funny', text_en: 'Funny & lighthearted', text_ru: 'Веселый и легкий', icon: '😂', next: 'budget' },
      { value: 'luxurious', text_en: 'Luxurious & indulgent', text_ru: 'Роскошный', icon: '✨', next: 'budget' },
      { value: 'practical', text_en: 'Practical & useful', text_ru: 'Практичный и полезный', icon: '🔧', next: 'budget' },
      { value: 'surprise', text_en: 'Surprising & wow', text_ru: 'Удивительный, вау!', icon: '🎉', next: 'budget' },
    ],
  },
  {
    id: 'budget',
    question_en: 'What is your budget?',
    question_ru: 'Ваш бюджет?',
    type: 'single',
    options: [
      { value: 'under-25', text_en: 'Under $25', text_ru: 'До $25', icon: '💵', next: 'giftType' },
      { value: '25-50', text_en: '$25 - $50', text_ru: '$25 - $50', icon: '💰', next: 'giftType' },
      { value: '50-100', text_en: '$50 - $100', text_ru: '$50 - $100', icon: '💎', next: 'giftType' },
      { value: '100-plus', text_en: '$100+', text_ru: '$100+', icon: '🚀', next: 'giftType' },
    ],
  },
  {
    id: 'giftType',
    question_en: 'Any preference for gift type?',
    question_ru: 'Предпочтения по типу подарка?',
    type: 'single',
    options: [
      { value: 'physical', text_en: 'Physical product', text_ru: 'Физический товар', icon: '📦', next: 'closeness' },
      { value: 'experience', text_en: 'Experience', text_ru: 'Впечатление', icon: '🎭', next: 'closeness' },
      { value: 'digital', text_en: 'Digital / Online', text_ru: 'Цифровой / Онлайн', icon: '💻', next: 'closeness' },
      { value: 'no-preference', text_en: 'No preference', text_ru: 'Без предпочтений', icon: '🎁', next: 'closeness' },
    ],
  },
  {
    id: 'closeness',
    question_en: 'How close are you to this person?',
    question_ru: 'Насколько вы близки с этим человеком?',
    type: 'single',
    options: [
      { value: 'just-met', text_en: 'We just met', text_ru: 'Недавно познакомились', icon: '👋', next: 'dislikes' },
      { value: 'acquaintance', text_en: 'Acquaintance', text_ru: 'Знакомый', icon: '🤝', next: 'dislikes' },
      { value: 'friend', text_en: 'Friend', text_ru: 'Друг', icon: '😊', next: 'dislikes' },
      { value: 'close-friend', text_en: 'Close friend', text_ru: 'Близкий друг', icon: '🤗', next: 'dislikes' },
      { value: 'family', text_en: 'Family', text_ru: 'Семья', icon: '👨‍👩‍👧', next: 'dislikes' },
      { value: 'partner', text_en: 'Partner / Spouse', text_ru: 'Партнер / Супруг(а)', icon: '❤️', next: 'dislikes' },
    ],
  },
  {
    id: 'dislikes',
    question_en: 'Anything they absolutely dislike or already have?',
    question_ru: 'Что им точно не нравится или уже есть?',
    type: 'text',
    options: [],
  },
];

export function getQuestionById(questions: QuizQuestion[], id: string): QuizQuestion | undefined {
  return questions.find((q) => q.id === id);
}

export function getNextQuestionId(questions: QuizQuestion[], currentId: string, selectedValue: string): string | null {
  const question = getQuestionById(questions, currentId);
  if (!question) return null;

  const option = question.options.find((o) => o.value === selectedValue);
  if (option?.next) return option.next;

  // Find next question in order
  const currentIndex = questions.findIndex((q) => q.id === currentId);
  if (currentIndex < questions.length - 1) {
    return questions[currentIndex + 1].id;
  }

  return null; // End of quiz
}
