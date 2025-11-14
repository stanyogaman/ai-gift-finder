export const quizTree = {
  start: {
    id: 'relationship',
    question: 'Who are you shopping for?',
    answers: [
      { text: 'Partner', icon: '❤️', value: 'partner', next: 'occasion' },
      { text: 'Mom', icon: '👩‍👧‍👦', value: 'mom', next: 'occasion' },
      { text: 'Dad', icon: '👨‍👧‍👦', value: 'dad', next: 'occasion' },
      { text: 'Friend', icon: '🧑‍🤝‍🧑', value: 'friend', next: 'occasion' },
      { text: 'Sibling', icon: '👨‍👩‍👧', value: 'sibling', next: 'occasion' },
      { text: 'Coworker', icon: '👔', value: 'colleague', next: 'colleagueType' }
    ]
  },
  colleagueType: {
    id: 'colleagueType',
    question: 'Is this for a specific type of coworker?',
    answers: [
      { text: 'My manager or boss', icon: '📈', value: 'coworker-boss', next: 'occasion' },
      { text: 'Someone at my level', icon: '👥', value: 'colleague-peer', next: 'occasion' }
    ]
  },
  occasion: {
    id: 'occasion',
    question: 'What is the occasion?',
    answers: [
      { text: 'Birthday', icon: '🎂', value: 'occasion-birthday', next: 'age' },
      { text: 'Anniversary', icon: '💕', value: 'occasion-anniversary', next: 'age' },
      { text: 'Thank you', icon: '🙏', value: 'occasion-thankyou', next: 'age' },
      { text: 'Housewarming or new job', icon: '🏠', value: 'occasion-housewarming', next: 'age' },
      { text: 'Holiday', icon: '🎄', value: 'occasion-holiday', next: 'age' },
      { text: 'Just because', icon: '😊', value: 'occasion-justbecause', next: 'age' }
    ]
  },
  age: {
    id: 'age',
    question: 'How old are they roughly?',
    answers: [
      { text: 'Teen (13-19)', icon: '🛹', value: 'teen', next: 'gender' },
      { text: 'Young adult (20s)', icon: '🎓', value: '20s', next: 'gender' },
      { text: 'Adult (30s-40s)', icon: '💼', value: '30s-40s', next: 'gender' },
      { text: 'Mature (50+)', icon: '🍷', value: '50+', next: 'gender' }
    ]
  },
  gender: {
    id: 'gender',
    question: 'What is their gender?',
    answers: [
      { text: 'Male', icon: '♂️', value: 'male', next: 'personality' },
      { text: 'Female', icon: '♀️', value: 'female', next: 'personality' },
      { text: 'No preference', icon: '🌈', value: 'unisex', next: 'personality' }
    ]
  },
  personality: {
    id: 'personality',
    question: 'Which description fits them best?',
    answers: [
      { text: 'Life of the party', icon: '🥳', value: 'extrovert', next: 'lifestyle' },
      { text: 'Cozy introvert', icon: '🏡', value: 'introvert', next: 'lifestyle' },
      { text: 'Always cracking jokes', icon: '😂', value: 'funny', next: 'lifestyle' },
      { text: 'Practical and organized', icon: '📈', value: 'practical', next: 'lifestyle' }
    ]
  },
  lifestyle: {
    id: 'lifestyle',
    question: 'What is their lifestyle like?',
    answers: [
      { text: 'Traveler or adventurer', icon: '🗺️', value: 'lifestyle-adventurer', next: 'interest' },
      { text: 'Homebody who loves cozy vibes', icon: '🛋️', value: 'lifestyle-homebody', next: 'interest' },
      { text: 'Active or sporty', icon: '🏋️', value: 'lifestyle-active', next: 'interest' },
      { text: 'Always on the go for work', icon: '🏃‍♂️', value: 'lifestyle-commuter', next: 'interest' },
      { text: 'Loves hosting friends', icon: '🥂', value: 'lifestyle-entertainer', next: 'interest' }
    ]
  },
  interest: {
    id: 'interest',
    question: 'What are they into?',
    answers: [
      { text: 'Tech & gadgets', icon: '🤖', value: 'interest-tech', next: 'style' },
      { text: 'Cooking & food', icon: '👨‍🍳', value: 'interest-foodie', next: 'style' },
      { text: 'Art & creativity', icon: '🎨', value: 'interest-art', next: 'style' },
      { text: 'Wellness & fitness', icon: '🧘‍♀️', value: 'interest-wellness', next: 'style' },
      { text: 'Music & film', icon: '🎬', value: 'interest-media', next: 'style' },
      { text: 'Gardening & nature', icon: '🌳', value: 'interest-gardening', next: 'style' },
      { text: 'Gaming (video or board)', icon: '🎮', value: 'interest-gaming', next: 'style' },
      { text: 'Travel', icon: '✈️', value: 'interest-travel', next: 'style' }
    ]
  },
  style: {
    id: 'style',
    question: 'How would you describe their style?',
    answers: [
      { text: 'Casual everyday', icon: '👟', value: 'style-casual', next: 'budget' },
      { text: 'Trendy or polished', icon: '💅', value: 'style-fashion', next: 'budget' },
      { text: 'Professional & business', icon: '👔', value: 'style-professional', next: 'budget' },
      { text: 'Creative & unique', icon: '✨', value: 'style-creative', next: 'budget' }
    ]
  },
  budget: {
    id: 'budget',
    question: 'Finally, what is your budget?',
    answers: [
      { text: 'Under $25', icon: '💵', value: 'budget', next: 'END' },
      { text: '$25 - $75', icon: '💰', value: 'mid-range', next: 'END' },
      { text: '$75 - $150', icon: '💸', value: 'premium', next: 'END' },
      { text: 'No real limit!', icon: '🚀', value: 'luxury', next: 'END' }
    ]
  }
};
