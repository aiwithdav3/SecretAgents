/**
 * Dictum-inspired quote system for Hardcade RPG
 * Collection of cyberpunk, tech, and inspirational expressions
 */

export type Quote = {
  text: string;
  author: string;
  category: "cyber" | "tech" | "future" | "wisdom" | "code";
};

const quotes: Quote[] = [
  // Cyberpunk & Future
  { text: "The future is already here — it's just not evenly distributed.", author: "William Gibson", category: "cyber" },
  { text: "The street finds its own uses for things.", author: "William Gibson", category: "cyber" },
  { text: "Information wants to be free.", author: "Stewart Brand", category: "cyber" },
  { text: "We are stuck with technology when what we really want is just stuff that works.", author: "Douglas Adams", category: "tech" },
  { text: "The best way to predict the future is to invent it.", author: "Alan Kay", category: "future" },
  { text: "Any sufficiently advanced technology is indistinguishable from magic.", author: "Arthur C. Clarke", category: "tech" },
  
  // Code & Development
  { text: "First, solve the problem. Then, write the code.", author: "John Johnson", category: "code" },
  { text: "Code is like humor. When you have to explain it, it's bad.", author: "Cory House", category: "code" },
  { text: "Programs must be written for people to read, and only incidentally for machines to execute.", author: "Harold Abelson", category: "code" },
  { text: "The most disastrous thing that you can ever learn is your first programming language.", author: "Alan Kay", category: "code" },
  { text: "Walking on water and developing software from a specification are easy if both are frozen.", author: "Edward V. Berard", category: "code" },
  { text: "Make it work, make it right, make it fast.", author: "Kent Beck", category: "code" },
  
  // Wisdom & Innovation
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", category: "wisdom" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", category: "wisdom" },
  { text: "Technology is best when it brings people together.", author: "Matt Mullenweg", category: "tech" },
  { text: "The advance of technology is based on making it fit in so that you don't really even notice it.", author: "Bill Gates", category: "tech" },
  { text: "We are changing the world with technology.", author: "Bill Gates", category: "future" },
  { text: "The computer was born to solve problems that did not exist before.", author: "Bill Gates", category: "tech" },
  
  // Digital Philosophy
  { text: "I think it's fair to say that personal computers have become the most empowering tool we've ever created.", author: "Bill Gates", category: "tech" },
  { text: "The Internet is becoming the town square for the global village of tomorrow.", author: "Bill Gates", category: "cyber" },
  { text: "We're entering a new world in which data may be more important than software.", author: "Tim O'Reilly", category: "future" },
  { text: "Software is eating the world.", author: "Marc Andreessen", category: "tech" },
  { text: "Every company is a technology company.", author: "Gary Vaynerchuk", category: "future" },
  { text: "The real danger is not that computers will begin to think like men, but that men will begin to think like computers.", author: "Sydney J. Harris", category: "wisdom" },
  
  // Neon Hardcade Originals
  { text: "Walk to the light. Press E. Pretend I'm not excited.", author: "Hardcade System", category: "cyber" },
  { text: "In the neon grid, every door is a portal, every choice a commit.", author: "Hardcade Archives", category: "cyber" },
  { text: "Your pages are portals. Your navigation is legendary.", author: "Hardcade Protocol", category: "cyber" },
  { text: "Third person or isometric, the view is always forward.", author: "CameraRig.tsx", category: "code" },
  { text: "WASD for motion. E for destiny. T for perspective.", author: "Input Handler", category: "code" },
];

/**
 * Get a random quote from the collection
 */
export function getRandomQuote(): Quote {
  return quotes[Math.floor(Math.random() * quotes.length)];
}

/**
 * Get a random quote by category
 */
export function getQuoteByCategory(category: Quote["category"]): Quote {
  const filtered = quotes.filter((q) => q.category === category);
  return filtered[Math.floor(Math.random() * filtered.length)] || getRandomQuote();
}

/**
 * Get quote for a specific navigation destination
 */
export function getQuoteForDestination(destination: string): Quote {
  const destinationQuotes: Record<string, Quote> = {
    Main: { text: "Every journey begins with a single step into the void.", author: "System Core", category: "cyber" },
    About: { text: "Know thyself, and you shall know the universe.", author: "Ancient Protocol", category: "wisdom" },
    Gallery: { text: "Art is how we decorate space. Music is how we decorate time.", author: "Jean-Michel Basquiat", category: "wisdom" },
    Dashboard: { text: "Data is the new oil, but insight is the refinery.", author: "Analytics Engine", category: "tech" },
    Contact: { text: "Connection is why we're here. We are hardwired to connect.", author: "Brené Brown", category: "wisdom" },
  };
  
  return destinationQuotes[destination] || getRandomQuote();
}

/**
 * Get a quote rotation stream (for continuous display)
 */
export function* quoteRotation(intervalMs: number = 10000): Generator<Quote, never, never> {
  let lastQuote: Quote | null = null;
  
  while (true) {
    let quote = getRandomQuote();
    // Avoid repeating the same quote twice in a row
    while (lastQuote && quote.text === lastQuote.text) {
      quote = getRandomQuote();
    }
    lastQuote = quote;
    yield quote;
  }
}
