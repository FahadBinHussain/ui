import { NewsEntry } from "../types";

// Mock news headlines pool
const mockHeadlines = [
  { category: "POLITICS", headline: "Global summit reaches historic climate agreement", isPinned: true },
  { category: "TECHNOLOGY", headline: "New quantum computing breakthrough achieves unprecedented speed", isPinned: false },
  { category: "BUSINESS", headline: "Markets surge on positive economic indicators", isPinned: false },
  { category: "WORLD", headline: "International coalition announces major humanitarian initiative", isPinned: false },
  { category: "HEALTH", headline: "Researchers discover promising treatment for rare disease", isPinned: false },
  { category: "SPORTS", headline: "Olympic committee announces new sports for upcoming games", isPinned: false },
  { category: "TECHNOLOGY", headline: "AI system achieves breakthrough in natural language understanding", isPinned: false },
  { category: "BUSINESS", headline: "Tech giants announce partnership on sustainable technology", isPinned: false },
  { category: "POLITICS", headline: "Nations sign historic trade agreement after years of negotiations", isPinned: false },
  { category: "WORLD", headline: "Archaeological discovery reveals ancient civilization secrets", isPinned: false },
  { category: "TECHNOLOGY", headline: "Space agency successfully lands rover on distant planet", isPinned: false },
  { category: "HEALTH", headline: "New vaccine shows promising results in clinical trials", isPinned: false },
  { category: "ENTERTAINMENT", headline: "Major film festival announces record-breaking attendance", isPinned: false },
  { category: "BUSINESS", headline: "Renewable energy sector sees unprecedented growth", isPinned: false },
  { category: "POLITICS", headline: "Historic peace talks conclude with landmark agreement", isPinned: false },
  { category: "TECHNOLOGY", headline: "Breakthrough in fusion energy promises clean power future", isPinned: false },
  { category: "WORLD", headline: "Global initiative launches to combat ocean pollution", isPinned: false },
  { category: "SPORTS", headline: "Underdog team claims championship in stunning upset", isPinned: false },
  { category: "HEALTH", headline: "Medical breakthrough offers hope for millions of patients", isPinned: false },
  { category: "TECHNOLOGY", headline: "Scientists develop revolutionary battery technology", isPinned: false },
];

// Keep track of used headlines to avoid duplicates in the same session
let usedHeadlineIndices: number[] = [];

const getRandomTime = () => {
  const hour = Math.floor(Math.random() * 12) + 1;
  const minute = Math.floor(Math.random() * 60);
  const period = Math.random() > 0.5 ? 'PM' : 'AM';
  return `${hour}:${minute.toString().padStart(2, '0')} ${period}`;
};

const getRandomUniqueHeadlines = (count: number) => {
  const availableIndices = mockHeadlines
    .map((_, index) => index)
    .filter(index => !usedHeadlineIndices.includes(index));

  // If we've used all headlines, reset
  if (availableIndices.length < count) {
    usedHeadlineIndices = [];
    return getRandomUniqueHeadlines(count);
  }

  const selectedIndices: number[] = [];
  while (selectedIndices.length < count && availableIndices.length > 0) {
    const randomIndex = Math.floor(Math.random() * availableIndices.length);
    const headlineIndex = availableIndices[randomIndex];
    selectedIndices.push(headlineIndex);
    availableIndices.splice(randomIndex, 1);
  }

  usedHeadlineIndices.push(...selectedIndices);
  return selectedIndices.map(index => mockHeadlines[index]);
};

export const fetchLiveNews = async (count: number = 3): Promise<NewsEntry[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800));

  const selectedHeadlines = getRandomUniqueHeadlines(count);

  return selectedHeadlines.map((item, index) => ({
    id: `news-${Date.now()}-${index}`,
    timestamp: getRandomTime(),
    category: item.category,
    headline: item.headline,
    isPinned: index === 0 && Math.random() > 0.7 ? true : item.isPinned,
    receivedAt: Date.now()
  }));
};
