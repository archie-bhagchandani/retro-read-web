import React, { useEffect, useState } from "react";
import { Sparkles, BookOpen, Users, Feather, Flame, Target, Library, Search, X } from "lucide-react";
import ChatPanel from "../ChatPanel";
import { searchBooks } from '../lib/googleBooks';
import { useNavigate } from "react-router-dom";

const bookQuotes = [
  { text: "A reader lives a thousand lives before he dies.", author: "George R. R. Martin" },
  { text: "There is no friend as loyal as a book.", author: "Ernest Hemingway" },
  { text: "A room without books is like a body without a soul.", author: "Marcus Tullius Cicero" },
  { text: "Books are a uniquely portable magic.", author: "Stephen King" },
  { text: "Once you learn to read, you will be forever free.", author: "Frederick Douglass" },
  { text: "Books are the mirrors of the soul.", author: "Virginia Woolf" },
];

const trending = [
  { rank: 1, title: "The Night Circus", author: "Erin Morgenstern", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
  { rank: 2, title: "Project Hail Mary", author: "Andy Weir", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
  { rank: 3, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
  { rank: 4, title: "It Ends With Us", author: "Colleen Hoover", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
  { rank: 5, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
];

const forYou = [
  { title: "Klara and the Sun", author: "Kazuo Ishiguro", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
  { title: "The Hobbit", author: "J.R.R. Tolkien", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
  { title: "Educated", author: "Tara Westover", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { title: "Atomic Habits", author: "James Clear", cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
];

const recentlyAdded = [
  { rank: null, title: "Lessons in Chemistry", author: "Bonnie Garmus", cover: "https://covers.openlibrary.org/b/isbn/9780385547345-L.jpg", isNew: true },
  { rank: null, title: "Tomorrow, and Tomorrow, and Tomorrow", author: "Gabrielle Zevin", cover: "https://covers.openlibrary.org/b/isbn/9780593321201-L.jpg", isNew: true },
  { rank: null, title: "Fourth Wing", author: "Rebecca Yarros", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg", isNew: true },
  { rank: null, title: "Dune", author: "Frank Herbert", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
  { rank: null, title: "The Silent Patient", author: "Alex Michaelides", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
];

const shelfRowA = [
  { title: "The Psychology of Money", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4e8GZDve-S3E7Z9MWbnBg6DxpIBHTSNmmSdMV6wip4g&s=10" },
  { title: "The Design of Everyday Things", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRymGoQp0oPqVTNGiT0oy90Bhizxih9ApTM_SbOaKir4za_7W3Esmici__1&s=10" },
  { title: "Atomic Habits", cover: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg" },
  { title: "Educated", cover: "https://covers.openlibrary.org/b/isbn/9780399590504-L.jpg" },
  { title: "The Silent Patient", cover: "https://covers.openlibrary.org/b/isbn/9781250301697-L.jpg" },
  { title: "Fourth Wing", cover: "https://covers.openlibrary.org/b/isbn/9781649374042-L.jpg" },
  { title: "Dune", cover: "https://covers.openlibrary.org/b/isbn/9780441013593-L.jpg" },
  { title: "The Hobbit", cover: "https://covers.openlibrary.org/b/isbn/9780547928227-L.jpg" },
];

const shelfRowB = [
  { title: "Deep Work", cover: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYoNbwM6uYYhX5mzJvJNf3zcVh5n1uN8ou0VUFGbFi-A&s" },
  { title: "Thinking, Fast and Slow", cover: "https://m.media-amazon.com/images/I/41iJ8QmVs2L._SY445_SX342_FMwebp_.jpg" },
  { title: "Klara and the Sun", cover: "https://covers.openlibrary.org/b/isbn/9780571364879-L.jpg" },
  { title: "The Night Circus", cover: "https://covers.openlibrary.org/b/isbn/9780307744432-L.jpg" },
  { title: "It Ends With Us", cover: "https://covers.openlibrary.org/b/isbn/9781501110368-L.jpg" },
  { title: "Project Hail Mary", cover: "https://covers.openlibrary.org/b/isbn/9780593135204-L.jpg" },
  { title: "Sapiens", cover: "https://covers.openlibrary.org/b/isbn/9780062316097-L.jpg" },
  { title: "The Alchemist", cover: "https://covers.openlibrary.org/b/isbn/9780062315007-L.jpg" },
];

const stats = [
  { icon: BookOpen, value: "10K+", label: "Books Available" },
  { icon: Sparkles, value: "AI", label: "Powered" },
  { icon: Users, value: "50K+", label: "Happy Readers" },
];

const streakDays = [true, true, false, true, true, true, true];
const streakDayLabels = ["M", "T", "W", "T", "F", "S", "S"];

function SectionEyebrow({ icon: Icon, children }) {
  return (
    <div className="inline-flex items-center gap-2 text-sm md:text-base font-display font-semibold tracking-wide text-[#5B6478] mb-2">
      <Icon size={16} className="text-[#D8472F]" />
      {children}
    </div>
  );
}

function RankStamp({ rank }) {
  if (!rank) return null;
  return (
    <div className="absolute -top-2.5 -left-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-[#1E2A42] font-display text-xs font-bold text-[#F0C572] shadow-[0_3px_10px_rgba(0,0,0,0.35)] ring-2 ring-[#FFFBF3]">
      {rank}
    </div>
  );
}

function NewBadge() {
  return (
    <div className="absolute -top-2 -right-2 z-10 bg-[#4B7A4E] text-[#FFFBF3] text-[9px] font-bold px-2 py-0.5 rounded-full shadow-sm">
      NEW
    </div>
  );
}

function BookCard({ b, size = "normal", onClick }) {
  const w = size === "small" ? "max-w-[100px]" : "max-w-[124px]";
  return (
    <div className={`group text-center ${w} mx-auto cursor-pointer`} onClick={onClick}>
      <div className="relative">
        <RankStamp rank={b.rank} />
        {b.isNew && <NewBadge />}
        <div className="aspect-[2/3] rounded-sm bg-[#FFFBF3] border border-[#E2D5BC] overflow-hidden shadow-[0_10px_22px_-10px_rgba(30,42,66,0.35)] transition-all duration-300 group-hover:-translate-y-2 group-hover:shadow-[0_18px_28px_-10px_rgba(216,71,47,0.28)]">
          <img src={b.cover} alt={b.title} className="h-full w-full object-cover" loading="lazy" />
        </div>
      </div>
      <p className="mt-3 font-body text-xs font-medium text-[#1E2A42] line-clamp-1">{b.title}</p>
      <p className="mt-0.5 font-body text-[11px] text-[#8A7F6B]">{b.author}</p>
    </div>
  );
}

export default function HomePage() {
  const [mounted, setMounted] = useState(false);
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quoteVisible, setQuoteVisible] = useState(true);
  const [apiBooks, setApiBooks] = useState([]);
  const [apiLoading, setApiLoading] = useState(false);
  const [apiError, setApiError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [searching, setSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [openingTitle, setOpeningTitle] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    setMounted(true);
    const id = setInterval(() => {
      setQuoteVisible(false);
      setTimeout(() => {
        setQuoteIndex((i) => (i + 1) % bookQuotes.length);
        setQuoteVisible(true);
      }, 400);
    }, 5000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    const testGoogleBooks = async () => {
      setApiLoading(true);
      setApiError(null);
      try {
        const result = await searchBooks('Harry Potter', 5);
        if (result.items && result.items.length > 0) {
          setApiBooks(result.items.slice(0, 4));
        } else {
          setApiError('No books found. Try a different search.');
        }
      } catch (error) {
        setApiError('Failed to fetch books. Check console for details.');
      } finally {
        setApiLoading(false);
      }
    };
    testGoogleBooks();
  }, []);

  async function handleSearch(e) {
    e.preventDefault();
    if (!searchQuery.trim()) return;
    setSearching(true);
    setShowResults(true);
    try {
      const result = await searchBooks(searchQuery, 6);
      setSearchResults(result.items || []);
    } catch {
      setSearchResults([]);
    } finally {
      setSearching(false);
    }
  }

  function closeSearch() {
    setShowResults(false);
    setSearchQuery("");
    setSearchResults([]);
  }

  // Tries several search variations before giving up, so real-world book
  // titles (with subtitles, punctuation, etc.) reliably resolve to a page.
  async function openBook(title, author = "") {
    if (!title) return;
    setOpeningTitle(title);

    const attempts = [
      `intitle:"${title}"${author ? ` inauthor:"${author}"` : ""}`,
      `${title} ${author}`.trim(),
      title,
      title.split(":")[0].trim(),
    ];

    for (const query of attempts) {
      if (!query) continue;
      try {
        const result = await searchBooks(query, 1);
        const book = result.items?.[0];
        if (book?.id) {
          navigate(`/book/${book.id}`);
          setOpeningTitle(null);
          return;
        }
      } catch {
        // try next fallback silently
      }
    }

    setOpeningTitle(null);
    alert(`Couldn't find "${title}" online. Try searching for it directly using the search bar.`);
  }

  const activeQuote = bookQuotes[quoteIndex];

  return (
    <div className="min-h-screen w-full bg-[#F6EFE3] text-[#1E2A42] overflow-x-hidden relative">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Newsreader:ital,wght@1,500;1,600&family=Work+Sans:wght@400;500;600&display=swap');
        .font-quote { font-family: 'Newsreader', serif; }
        .font-display { font-family: 'Fraunces', serif; }
        .font-body { font-family: 'Work Sans', sans-serif; }
        .paper-grain {
          background-image: radial-gradient(rgba(30,42,66,0.035) 1px, transparent 1px);
          background-size: 4px 4px;
        }
        @keyframes shelf-flicker { 0%, 100% { opacity: 1; } 50% { opacity: 0.92; } }
        .shelf-flicker { animation: shelf-flicker 4s ease-in-out infinite; }
      `}</style>

      <div className="pointer-events-none fixed inset-0 z-0 paper-grain opacity-60" />

      {openingTitle && (
        <div className="fixed inset-0 z-[200] bg-black/30 flex items-center justify-center">
          <div className="bg-[#FFFBF3] rounded-xl px-6 py-4 shadow-lg text-sm text-[#1E2A42] font-body">
            Opening "{openingTitle}"...
          </div>
        </div>
      )}

      <main className="font-body relative z-10 w-full px-4 sm:px-8 md:px-12 lg:px-16 xl:px-20 py-16 space-y-28">
        {/* HERO */}
        <section
          className={`grid lg:grid-cols-2 gap-12 items-center transition-all duration-1000 ease-out ${
            mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"
          }`}
        >
          <div>
            <div className="inline-flex items-center gap-1.5 rounded-full border border-[#E2D5BC] bg-[#FFFBF3] px-3 py-1 text-[10px] tracking-wide text-[#5B6478] mb-6 whitespace-nowrap">
              <Feather size={11} className="text-[#D8472F]" />
              A new line, every visit
            </div>

            <div className="min-h-[7.5rem] md:min-h-[8.5rem] mb-6 relative">
              <span className="absolute -top-6 -left-1 font-quote text-6xl text-[#D8472F]/15 select-none pointer-events-none" aria-hidden="true">&ldquo;</span>
              <p className={`font-quote italic text-3xl md:text-4xl leading-[1.15] text-[#1E2A42] relative transition-all duration-500 ${quoteVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-3"}`}>
                {activeQuote.text}
              </p>
              <p className={`font-body mt-3 text-xs tracking-[0.15em] uppercase text-[#8A7F6B] transition-all duration-500 delay-100 ${quoteVisible ? "opacity-100" : "opacity-0"}`}>
                <span className="inline-block w-5 h-px bg-[#D8472F] align-middle mr-2.5" />
                {activeQuote.author}
              </p>
            </div>

            <form onSubmit={handleSearch} className="relative mb-3">
              <div className="flex items-center gap-2.5 px-4 py-2.5 bg-[#FFFBF3] rounded-full border border-[#E2D5BC] focus-within:border-[#D8472F] transition-colors">
                <Search size={15} className="text-[#8A7F6B] shrink-0" />
                <input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search any book title or author..."
                  className="flex-1 bg-transparent text-sm text-[#1E2A42] placeholder:text-[#8A7F6B] outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={closeSearch} className="text-[#8A7F6B] hover:text-[#1E2A42]">
                    <X size={14} />
                  </button>
                )}
                <button type="submit" className="text-xs font-semibold text-[#D8472F] hover:underline shrink-0">
                  Search
                </button>
              </div>
            </form>

            {showResults && (
              <div className="bg-[#FFFBF3] border border-[#E2D5BC] rounded-xl p-3 max-h-56 overflow-y-auto space-y-2">
                {searching && <p className="text-xs text-[#8A7F6B]">Searching...</p>}
                {!searching && searchResults.length === 0 && (
                  <p className="text-xs text-[#8A7F6B]">No results found.</p>
                )}
                {searchResults.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => navigate(`/book/${item.id}`)}
                    className="flex items-center gap-2.5 cursor-pointer hover:bg-[#F6EFE3] rounded-lg p-1 -m-1 transition-colors"
                  >
                    <img
                      src={item.volumeInfo?.imageLinks?.thumbnail || ""}
                      alt=""
                      className="w-6 h-9 object-cover rounded-sm bg-[#E2D5BC] shrink-0"
                    />
                    <div className="min-w-0">
                      <p className="text-xs font-medium text-[#1E2A42] truncate">{item.volumeInfo?.title}</p>
                      <p className="text-[11px] text-[#8A7F6B] truncate">
                        {item.volumeInfo?.authors?.join(", ") || "Unknown author"}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div className="text-xs mt-2">
              {apiLoading && <span className="text-[#8A7F6B]">⏳ Loading books...</span>}
              {apiError && <span className="text-[#D8472F]">⚠️ {apiError}</span>}
              {!apiLoading && !apiError && apiBooks.length > 0 && (
                <span className="text-emerald-600">✅ Google Books API connected!</span>
              )}
            </div>
          </div>

          {/* RIGHT: bookshelf */}
          <div className={`relative transition-all duration-1000 delay-200 ease-out flex justify-center lg:justify-end ${mounted ? "opacity-100 scale-100" : "opacity-0 scale-95"}`}>
            <div
              className="relative rounded-2xl border border-[#3A2A18] p-6 md:p-7 w-full max-w-[720px] shelf-flicker"
              style={{
                background: "linear-gradient(180deg, #4A3423 0%, #2E2013 60%, #1E150C 100%)",
                boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.2), 0 20px 40px -20px rgba(30,42,66,0.45)",
              }}
            >
              {[shelfRowA, shelfRowB].map((row, ri) => (
                <div key={ri} className={ri > 0 ? "mt-5" : ""}>
                  <div className="flex justify-center gap-2.5 flex-wrap">
                    {row.map((book) => (
                      <div
                        key={book.title}
                        onClick={() => openBook(book.title)}
                        className="group relative w-14 md:w-[3.8rem] h-24 md:h-28 rounded-sm overflow-hidden shadow-[0_8px_16px_-6px_rgba(0,0,0,0.5)] transition-transform duration-300 hover:-translate-y-1.5 cursor-pointer"
                      >
                        <img src={book.cover} alt={book.title} className="absolute inset-0 h-full w-full object-cover" loading="lazy" />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      </div>
                    ))}
                  </div>
                  <div className="mt-3 h-2.5 rounded-full bg-gradient-to-r from-[#5A3E22] via-[#2A1B0E] to-[#5A3E22] shadow-inner" />
                </div>
              ))}
              <div className="mt-4 text-center text-[10px] tracking-[0.15em] uppercase text-[#D4A017]/60 font-body">
                📚 Your Digital Bookshelf
              </div>
            </div>
          </div>
        </section>

        {/* STATS STRIP */}
        <section className={`transition-all duration-1000 delay-200 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
          <div className="relative grid grid-cols-1 md:grid-cols-2 items-center rounded-2xl border border-[#E2D5BC] bg-[#FFFBF3] w-full px-6 md:px-10 py-6 md:py-7">
            <div className="flex items-center justify-center pb-4 md:pb-0 md:pr-6 border-b md:border-b-0 border-dashed border-[#D9C7A3]">
              <p className="text-center text-base md:text-lg font-quote italic text-[#1E2A42] leading-snug">
                Every shelf tells a story before you've turned a page.
              </p>
            </div>
            <div className="hidden md:block absolute left-1/2 top-5 bottom-5 -translate-x-1/2 border-l border-dashed border-[#D9C7A3]" />
            <div className="flex items-center justify-center pt-4 md:pt-0 md:pl-6">
              <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3">
                {stats.map(({ icon: Icon, value, label }) => (
                  <div key={label} className="flex items-center gap-2">
                    <Icon size={17} className="text-[#D8472F]" />
                    <div className="text-left leading-tight">
                      <p className="text-base font-display font-semibold text-[#1E2A42]">{value}</p>
                      <p className="text-[11px] text-[#8A7F6B]">{label}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* TRENDING / RECENTLY ADDED / FOR YOU */}
        <div className="space-y-24">
          <section className={`transition-all duration-1000 delay-300 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={Sparkles}>What everyone's reading</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">Trending Now</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10">
              {trending.map((b) => <BookCard key={b.title} b={b} onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-400 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={Library}>Fresh on the shelf</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">Recently Added</h2>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10">
              {recentlyAdded.map((b) => <BookCard key={b.title} b={b} onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>

          <section className={`transition-all duration-1000 delay-500 ease-out ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <SectionEyebrow icon={BookOpen}>Tuned to your shelf</SectionEyebrow>
            <div className="flex items-end justify-between mb-6">
              <h2 className="font-display font-semibold text-lg md:text-xl tracking-tight text-[#1E2A42]">For You</h2>
              <span className="font-body text-[11px] text-[#8A7F6B]">AI picks, tuned to your shelf</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-x-4 md:gap-x-6 gap-y-10">
              {forYou.map((b) => <BookCard key={b.title} b={b} size="small" onClick={() => openBook(b.title, b.author)} />)}
            </div>
          </section>
        </div>
      </main>

      <ChatPanel />
    </div>
  );
}