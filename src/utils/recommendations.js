const QUESTION_WEIGHTS = {
  relationship: 12,
  colleagueType: 18,
  occasion: 16,
  age: 8,
  gender: 4,
  personality: 14,
  lifestyle: 14,
  interest: 24,
  style: 10,
  budget: 12
};

const VALUE_ALIASES = {
  relationship: {
    colleague: ['colleague-peer', 'coworker-boss']
  },
  gender: {
    unisex: ['unisex', 'male', 'female']
  },
  style: {
    'style-casual': ['style-casual', 'style-fashion']
  },
  occasion: {
    'occasion-justbecause': ['occasion-justbecause', 'occasion-birthday']
  }
};

const KEYWORD_ALIASES = {
  boss: 'coworker-boss',
  chief: 'coworker-boss',
  manager: 'coworker-boss',
  colleague: 'colleague-peer',
  coworker: 'colleague-peer',
  eco: 'eco',
  sustainable: 'eco',
  yoga: 'interest-wellness',
  gamer: 'interest-gaming',
  travel: 'interest-travel',
  cooking: 'interest-foodie',
  chef: 'interest-foodie',
  art: 'interest-art',
  creative: 'style-creative',
  spa: 'interest-wellness',
  relax: 'interest-wellness',
  music: 'interest-media',
  film: 'interest-media',
  movie: 'interest-media',
  tech: 'interest-tech',
  gadget: 'interest-tech',
  friend: 'friend',
  mom: 'mom',
  dad: 'dad',
  partner: 'partner',
  anniversary: 'occasion-anniversary',
  birthday: 'occasion-birthday',
  holiday: 'occasion-holiday'
};

const sanitizeKeyword = (word) => word.replace(/[^\p{L}\p{N}-]+/gu, '');

const expandAnswerValue = (questionId, value) => {
  const aliasMap = VALUE_ALIASES[questionId];
  if (aliasMap && aliasMap[value]) {
    return aliasMap[value];
  }
  return [value];
};

export const scoreGiftForAnswers = (gift, answers) => {
  let score = 0;
  Object.entries(answers).forEach(([questionId, value]) => {
    const weight = QUESTION_WEIGHTS[questionId] ?? 5;
    const valuesToCheck = Array.isArray(value) ? value : [value];

    valuesToCheck
      .flatMap((val) => expandAnswerValue(questionId, val))
      .forEach((normalizedValue) => {
        if (gift.tags.includes(normalizedValue)) {
          score += weight;
        }
      });
  });

  const ratingBoost = Math.min(10, Math.round((gift.rating - 4) * 10));
  return Math.min(100, score + Math.max(0, ratingBoost));
};

export const scoreGiftForKeywords = (gift, keywords) => {
  let score = 0;
  keywords.forEach((keyword) => {
    if (!keyword) return;
    const normalized = KEYWORD_ALIASES[keyword] ?? keyword;

    if (gift.title.toLowerCase().includes(keyword)) {
      score += 28;
    }
    if (gift.description.toLowerCase().includes(keyword)) {
      score += 18;
    }
    if (gift.tags.some((tag) => tag.includes(normalized))) {
      score += 32;
    }
  });

  const ratingBoost = Math.round(gift.rating * 3);
  const clamped = Math.min(100, score + ratingBoost);
  return clamped;
};

const pickTopGifts = (scoredGifts, limit = 10) => {
  const sorted = scoredGifts
    .slice()
    .sort((a, b) => {
      if (b.compatibility === a.compatibility) {
        return b.rating - a.rating;
      }
      return b.compatibility - a.compatibility;
    });

  const withScore = sorted.filter((gift) => gift.compatibility > 0).slice(0, limit);
  if (withScore.length >= limit) {
    return withScore;
  }

  const remainder = sorted
    .filter((gift) => !withScore.includes(gift))
    .slice(0, limit - withScore.length)
    .map((gift) => ({ ...gift, compatibility: gift.compatibility ?? 0 }));

  return [...withScore, ...remainder];
};

export const buildQuizRecommendations = (gifts, answers, limit = 10) => {
  const scored = gifts.map((gift) => ({
    ...gift,
    compatibility: scoreGiftForAnswers(gift, answers)
  }));
  return pickTopGifts(scored, limit);
};

export const buildSearchRecommendations = (gifts, rawQuery, limit = 10) => {
  if (!rawQuery || !rawQuery.trim()) {
    const fallback = gifts
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, limit)
      .map((gift) => ({ ...gift, compatibility: Math.round(gift.rating * 10) }));
    return fallback;
  }

  const keywords = rawQuery
    .toLowerCase()
    .split(/\s+/)
    .map(sanitizeKeyword)
    .filter((word) => word.length > 2);

  const scored = gifts.map((gift) => ({
    ...gift,
    compatibility: scoreGiftForKeywords(gift, keywords)
  }));

  return pickTopGifts(scored, limit);
};
