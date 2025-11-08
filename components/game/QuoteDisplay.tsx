"use client";
import { useEffect, useState } from "react";
import { getRandomQuote, type Quote } from "./quotes";

type Props = {
  className?: string;
  interval?: number;
  showAuthor?: boolean;
};

export default function QuoteDisplay({ className = "", interval = 15000, showAuthor = true }: Props) {
  const [quote, setQuote] = useState<Quote | null>(null);
  const [fade, setFade] = useState(false);

  useEffect(() => {
    // Initial quote
    setQuote(getRandomQuote());

    // Rotate quotes at interval
    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setQuote(getRandomQuote());
        setFade(false);
      }, 500);
    }, interval);

    return () => clearInterval(timer);
  }, [interval]);

  if (!quote) return null;

  return (
    <div
      className={`transition-opacity duration-500 ${fade ? "opacity-0" : "opacity-100"} ${className}`}
    >
      <blockquote className="space-y-1 text-center">
        <p className="text-sm italic text-cyan-200/80">
          &quot;{quote.text}&quot;
        </p>
        {showAuthor && (
          <footer className="text-xs text-purple-300/60">
            — {quote.author}
          </footer>
        )}
      </blockquote>
    </div>
  );
}
