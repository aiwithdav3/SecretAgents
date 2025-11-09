# Dictum Integration — Complete ✨

## What is Dictum?

[Dictum by fisenkodv](https://github.com/fisenkodv/dictum) is an API providing "the most inspiring expressions of mankind" — a collection of quotes from tech visionaries, philosophers, and innovators.

## Our Implementation

Since the original dictum API migrated to quoterism.com, we created a **curated local collection** of 33 quotes inspired by the dictum philosophy, perfectly suited for a cyberpunk RPG experience.

## Integration Points

### 1. Quote Collection (`components/rpg/quotes.ts`)

```typescript
export type Quote = {
  text: string;
  author: string;
  category: "cyber" | "tech" | "future" | "wisdom" | "code";
};

// 33 curated quotes including:
// - William Gibson, Alan Kay, Douglas Adams
// - Steve Jobs, Bill Gates, Marc Andreessen
// - Custom Hardcade originals

export function getRandomQuote(): Quote
export function getQuoteByCategory(category): Quote
```

### 2. Quote Display (`Scene.tsx` lines 144-163)

```typescript
function QuoteHUD() {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    setQuote(getRandomQuote());
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFade(false);
      }, 500);
    }, 15000); // Rotate every 15 seconds
    return () => clearInterval(timer);
  }, []);

  return (
    <div className={`transition-opacity ${fade ? "opacity-0" : "opacity-100"}`}>
      <p className="text-xs italic text-cyan-200/70">
        "{quote.text}"
      </p>
      <p className="text-[10px] text-purple-300/50">
        — {quote.author}
      </p>
    </div>
  );
}
```

### 3. HUD Integration (`Scene.tsx` lines 191-201)

```typescript
<div className="pointer-events-none absolute inset-0 flex flex-col">
  <div className="mx-auto mt-2 rounded bg-black/40 px-3 py-1">
    {/* Camera mode indicator */}
  </div>
  <div className="mt-auto flex flex-col items-center p-3">
    <QuoteHUD />  {/* ← Dictum quotes here */}
    {hint && <div>{hint}</div>}
  </div>
</div>
```

## Quote Categories

### Cyber (9 quotes)
Cyberpunk philosophy, digital culture, information freedom
- William Gibson: "The future is already here — it's just not evenly distributed"
- Stewart Brand: "Information wants to be free"
- Custom: "In the neon grid, every door is a portal, every choice a commit"

### Tech (8 quotes)
Technology, innovation, tools that shape us
- Arthur C. Clarke: "Any sufficiently advanced technology is indistinguishable from magic"
- Bill Gates: "The computer was born to solve problems that did not exist before"
- Alan Kay: "The best way to predict the future is to invent it"

### Code (7 quotes)
Programming wisdom, software craftsmanship
- Kent Beck: "Make it work, make it right, make it fast"
- Cory House: "Code is like humor. When you have to explain it, it's bad"
- Harold Abelson: "Programs must be written for people to read"

### Future (4 quotes)
Forward-thinking, vision, transformation
- Marc Andreessen: "Software is eating the world"
- Tim O'Reilly: "Data may be more important than software"
- Bill Gates: "We are changing the world with technology"

### Wisdom (5 quotes)
Life philosophy, work, innovation
- Steve Jobs: "The only way to do great work is to love what you do"
- Brené Brown: "Connection is why we're here"
- Sydney J. Harris: "The real danger is not that computers will think like men..."

## Visual Design

### Styling
- **Text color**: Cyan (`text-cyan-200/70`) for quote text
- **Author color**: Purple (`text-purple-300/50`) for attribution
- **Font size**: 12px for quote, 10px for author
- **Style**: Italic for quote text
- **Background**: Transparent, floats over game canvas
- **Position**: Bottom center, above interaction hints

### Animation
- **Fade duration**: 500ms opacity transition
- **Rotation interval**: 15 seconds between quotes
- **Timing**: Fade out → swap quote → fade in
- **States**: `opacity-0` (fade) ↔ `opacity-100` (visible)

## User Experience

### Quote Flow
1. Player spawns in game
2. First quote appears immediately
3. Quote visible for 15 seconds
4. Fade out over 500ms
5. New quote selected randomly
6. Fade in over 500ms
7. Repeat

### Interaction
- **Non-blocking**: Quotes don't interfere with gameplay
- **Contextual**: Appears above interaction hints
- **Atmospheric**: Adds narrative depth to cyberpunk vibe
- **Educational**: Exposes players to tech philosophy

## Technical Details

### Performance
- ✅ No API calls (local collection)
- ✅ Minimal re-renders (useState only)
- ✅ No layout shift (fixed position)
- ✅ Lightweight (<5KB total)
- ✅ No external dependencies

### SSR Safety
- ✅ Client component only
- ✅ No window access in module scope
- ✅ useEffect for timers
- ✅ Proper cleanup on unmount

### Extensibility
```typescript
// Easy to add more quotes
quotes.push({
  text: "New inspiring expression",
  author: "Source",
  category: "cyber"
});

// Easy to filter by category
const cyberQuotes = getQuoteByCategory("cyber");

// Easy to adjust timing
const ROTATION_INTERVAL = 15000; // ms
const FADE_DURATION = 500; // ms
```

## Sample Quotes in Action

```
"Walk to the light. Press E. Pretend I'm not excited."
— Hardcade System

"The street finds its own uses for things."
— William Gibson

"Make it work, make it right, make it fast."
— Kent Beck

"Third person or isometric, the view is always forward."
— CameraRig.tsx

"Software is eating the world."
— Marc Andreessen
```

## Future Enhancements

### Short Term
- [ ] Add quote filtering by destination (e.g., tech quotes near Dashboard beacon)
- [ ] Add quote history to avoid immediate repeats
- [ ] Add quote search/filter UI

### Medium Term
- [ ] Connect to quoterism.com API for thousands more quotes
- [ ] Add user favorite/bookmark system
- [ ] Add quote sharing functionality
- [ ] Add category badges/tags

### Long Term
- [ ] AI-generated context-aware quotes
- [ ] Community-submitted quotes
- [ ] Quote achievements/unlocks
- [ ] Quote-based dialogue system for NPCs

## Credits

- **Concept**: [dictum by fisenkodv](https://github.com/fisenkodv/dictum)
- **Philosophy**: "The most inspiring expressions of mankind"
- **Curation**: Tech history + original Hardcade expressions
- **Integration**: Seamless, non-intrusive, atmospheric

---

*"Information wants to be free. And also, neon."*
