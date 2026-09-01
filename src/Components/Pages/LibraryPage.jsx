import React, { useState, useMemo, useEffect } from 'react';
import { searchBooks } from '../lib/googleBooks.js';
import { useNavigate } from 'react-router-dom';

const BOOKS_PER_ROW = 5;
const ROWS_PER_PAGE = 3;
const PAGE_SIZE = BOOKS_PER_ROW * ROWS_PER_PAGE;

const LibraryPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // 'name' | 'date'
  const [page, setPage] = useState(0);
  const [pageAnimKey, setPageAnimKey] = useState(0);
  const navigate = useNavigate();

  const books = [
    { id: 1, title: "Atomic Habits", author: "James Clear", coverImage: "https://covers.openlibrary.org/b/isbn/9780735211292-L.jpg", dateAdded: "2024-06-01" },
    { id: 2, title: "Deep Work", author: "Cal Newport", coverImage: "https://covers.openlibrary.org/b/isbn/9781455586691-L.jpg", dateAdded: "2024-01-15" },
    { id: 3, title: "Psychology of Money", author: "Morgan Housel", coverImage: "https://covers.openlibrary.org/b/isbn/9780857197689-L.jpg", dateAdded: "2024-03-22" },
    { id: 4, title: "Think and Grow Rich", author: "Napoleon Hill", coverImage: "https://covers.openlibrary.org/b/isbn/9781585424337-L.jpg", dateAdded: "2023-11-09" },
    { id: 5, title: "The Almanack of Naval", author: "Eric Jorgenson", coverImage: "https://covers.openlibrary.org/b/isbn/9780578680101-L.jpg", dateAdded: "2024-05-02" },
    { id: 6, title: "The 7 Habits", author: "Stephen R. Covey", coverImage: "https://covers.openlibrary.org/b/isbn/9781982137274-L.jpg", dateAdded: "2023-09-18" },
    { id: 7, title: "Can't Hurt Me", author: "David Goggins", coverImage: "https://covers.openlibrary.org/b/isbn/9781544512280-L.jpg", dateAdded: "2024-02-11" },
    { id: 8, title: "The Lean Startup", author: "Eric Ries", coverImage: "https://covers.openlibrary.org/b/isbn/9780307887894-L.jpg", dateAdded: "2023-12-30" },
    { id: 9, title: "Clean Code", author: "Robert C. Martin", coverImage: "https://covers.openlibrary.org/b/isbn/9780132350884-L.jpg", dateAdded: "2024-04-07" },
    { id: 10, title: "Ikigai", author: "Héctor García", coverImage: "https://covers.openlibrary.org/b/isbn/9780143130727-L.jpg", dateAdded: "2024-01-28" },
    { id: 11, title: "Wings of Fire", author: "Tui T. Sutherland", coverImage: "https://covers.openlibrary.org/b/isbn/9780545349185-L.jpg", dateAdded: "2023-10-05" },
    { id: 12, title: "Design of Everyday", author: "Don Norman", coverImage: "https://covers.openlibrary.org/b/isbn/9780465050659-L.jpg", dateAdded: "2024-06-19" },
    { id: 13, title: "The Mom Test", author: "Rob Fitzpatrick", coverImage: "https://covers.openlibrary.org/b/isbn/9781492180746-L.jpg", dateAdded: "2023-08-14" },
    { id: 14, title: "Zero to One", author: "Peter Thiel", coverImage: "https://covers.openlibrary.org/b/isbn/9780804139298-L.jpg", dateAdded: "2024-03-03" },
    { id: 15, title: "Rework", author: "Jason Fried", coverImage: "https://covers.openlibrary.org/b/isbn/9780307463746-L.jpg", dateAdded: "2023-07-21" },
    { id: 16, title: "Hooked", author: "Nir Eyal", coverImage: "https://covers.openlibrary.org/b/isbn/9781591847786-L.jpg", dateAdded: "2024-05-30" },
  ];

  async function openBook(title, author = "") {
    try {
      const result = await searchBooks(`${title} ${author}`.trim(), 1);
      const book = result.items?.[0];
      const link = book?.volumeInfo?.previewLink || book?.volumeInfo?.infoLink;
      if (link) {
        window.open(link, "_blank", "noopener,noreferrer");
      } else {
        alert("Couldn't find this book online. Try another title.");
      }
    } catch {
      alert("Something went wrong opening this book.");
    }
  }

  const filtered = useMemo(() => {
    let list = books.filter(b =>
      b.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.toLowerCase())
    );
    list = [...list].sort((a, b) =>
      sortBy === 'name'
        ? a.title.localeCompare(b.title)
        : new Date(b.dateAdded) - new Date(a.dateAdded)
    );
    return list;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchTerm, sortBy]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const clampedPage = Math.min(page, totalPages - 1);
  const pageBooks = filtered.slice(clampedPage * PAGE_SIZE, clampedPage * PAGE_SIZE + PAGE_SIZE);

  const rows = [];
  for (let i = 0; i < pageBooks.length; i += BOOKS_PER_ROW) {
    rows.push(pageBooks.slice(i, i + BOOKS_PER_ROW));
  }

  const goToPage = (next) => {
    if (next < 0 || next > totalPages - 1) return;
    setPage(next);
    setPageAnimKey(k => k + 1);
  };

  useEffect(() => { setPage(0); }, [searchTerm, sortBy]);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'radial-gradient(ellipse at top, #3a2a24 0%, #1c1310 60%, #120c0a 100%)',
      padding: '32px 20px',
      display: 'flex',
      justifyContent: 'center',
      fontFamily: "'Inter', sans-serif"
    }}>
      <style>{`
        @keyframes bookRise {
          from { opacity: 0; transform: translateY(18px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes shimmer {
          0%,100% { opacity: 0.55; }
          50% { opacity: 0.9; }
        }
      `}</style>

      <div style={{ width: '100%', maxWidth: '1140px' }}>

        <div style={{
          background: 'linear-gradient(180deg, #C9A88A 0%, #B08D68 100%)',
          borderRadius: '16px',
          padding: '14px 22px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          boxShadow: '0 6px 18px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.25)',
          marginBottom: '4px'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: '#4A342B',
            borderRadius: '999px',
            padding: '9px 16px',
            width: '230px',
            boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.4)'
          }}>
            <input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search"
              style={{
                background: 'transparent',
                border: 'none',
                outline: 'none',
                color: '#F1E4D6',
                fontSize: '13px',
                width: '100%'
              }}
            />
            <span style={{ color: '#D9C2AE', fontSize: '13px' }}>Search</span>
          </div>

          <h1 style={{
            color: '#3A2418',
            fontSize: '20px',
            fontWeight: 800,
            letterSpacing: '0.3px',
            margin: 0,
            textShadow: '0 1px 0 rgba(255,255,255,0.3)'
          }}>
            My Books
          </h1>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <button
              onClick={() => setSortBy('name')}
              style={sortPillStyle(sortBy === 'name')}
            >
              Name
            </button>
            <button
              onClick={() => setSortBy('date')}
              style={sortPillStyle(sortBy === 'date')}
            >
              Date
            </button>
            <button style={{
              width: '34px', height: '34px', borderRadius: '50%',
              background: '#4A342B', border: 'none', color: '#F1E4D6',
              cursor: 'pointer', fontSize: '14px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.4)'
            }}>
              &#8599;
            </button>
          </div>
        </div>

        <div style={{
          background: 'repeating-linear-gradient(180deg, #6B4A38 0px, #6B4A38 2px, #6f4d3a 2px, #6f4d3a 4px)',
          borderRadius: '0 0 16px 16px',
          padding: '10px 18px 18px',
          boxShadow: '0 12px 30px rgba(0,0,0,0.5)'
        }}>
          {rows.map((row, rowIdx) => (
            <div key={`${clampedPage}-${rowIdx}`} style={{ position: 'relative', marginBottom: '22px' }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                gap: '18px',
                paddingBottom: '14px',
                position: 'relative',
                zIndex: 2
              }}>
                {row.map((book, i) => (
                  <div
                   onClick={async () => {
  const result = await searchBooks(`${book.title} ${book.author}`.trim(), 1);
  const found = result.items?.[0];
  if (found?.id) navigate(`/book/${found.id}`);
}}
                    key={`${pageAnimKey}-${book.id}`}
                    style={{
                      textDecoration: 'none',
                      width: '150px',
                      animation: `bookRise 0.45s ease ${(rowIdx * BOOKS_PER_ROW + i) * 0.05}s both`
                    }}
                  >
                    <div
                      className="shelf-book"
                      style={{
                        width: '150px',
                        height: '196px',
                        borderRadius: '3px 6px 6px 3px',
                        overflow: 'hidden',
                        position: 'relative',
                        boxShadow: '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)',
                        transition: 'transform 0.25s ease, box-shadow 0.25s ease',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.transform = 'translateY(-10px)';
                        e.currentTarget.style.boxShadow = '4px 14px 22px rgba(0,0,0,0.55), -1px 0 0 rgba(0,0,0,0.25)';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.transform = 'translateY(0)';
                        e.currentTarget.style.boxShadow = '2px 6px 10px rgba(0,0,0,0.45), -1px 0 0 rgba(0,0,0,0.25)';
                      }}
                    >
                      <div style={{
                        position: 'absolute', left: 0, top: 0, bottom: 0, width: '5px',
                        background: 'linear-gradient(90deg, rgba(0,0,0,0.5), rgba(0,0,0,0))',
                        zIndex: 3
                      }} />
                      <img
                        src={book.coverImage}
                        alt={book.title}
                        style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                        onError={(e) => {
                          e.target.style.display = 'none';
                          e.target.parentNode.style.background =
                            'linear-gradient(135deg,#7a6252,#4d3a2d)';
                          e.target.parentNode.style.display = 'flex';
                          e.target.parentNode.style.alignItems = 'center';
                          e.target.parentNode.style.justifyContent = 'center';
                          const span = document.createElement('span');
                          span.textContent = 'Book';
                          span.style.fontSize = '13px';
                          span.style.color = '#eee';
                          e.target.parentNode.appendChild(span);
                        }}
                      />
                      <div style={{
                        position: 'absolute', inset: 0,
                        background: 'linear-gradient(115deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0) 30%)',
                        pointerEvents: 'none'
                      }} />
                    </div>
                  </div>
                ))}
              </div>

              <div style={{
                position: 'relative',
                height: '20px',
                background: 'linear-gradient(180deg, #8B5E3C 0%, #6E4726 55%, #5A381D 100%)',
                borderRadius: '3px',
                boxShadow: '0 6px 10px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.15)',
                zIndex: 1
              }}>
                <div style={{
                  position: 'absolute', top: '2px', left: '4%', right: '4%', height: '2px',
                  background: 'rgba(255,255,255,0.15)', borderRadius: '2px',
                  animation: 'shimmer 3.5s ease-in-out infinite'
                }} />
              </div>
            </div>
          ))}

          {pageBooks.length === 0 && (
            <p style={{ color: '#D9C2AE', textAlign: 'center', padding: '40px 0' }}>
              No books match "{searchTerm}"
            </p>
          )}
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '14px',
          marginTop: '20px',
          position: 'relative'
        }}>
          <button
            onClick={() => goToPage(clampedPage - 1)}
            disabled={clampedPage === 0}
            style={navBtnStyle(clampedPage === 0)}
          >
            Prev
          </button>

          <span style={{
            background: '#3A2418',
            color: '#F1E4D6',
            padding: '8px 18px',
            borderRadius: '999px',
            fontSize: '13px',
            fontWeight: 600,
            minWidth: '52px',
            textAlign: 'center',
            boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.5)'
          }}>
            {clampedPage + 1} / {totalPages}
          </span>

          <button
            onClick={() => goToPage(clampedPage + 1)}
            disabled={clampedPage >= totalPages - 1}
            style={navBtnStyle(clampedPage >= totalPages - 1)}
          >
            Next
          </button>

          <button style={{
            position: 'absolute',
            right: 0,
            width: '38px', height: '38px', borderRadius: '50%',
            background: 'linear-gradient(180deg,#C9A88A,#B08D68)',
            border: 'none', cursor: 'pointer', fontSize: '15px',
            boxShadow: '0 3px 8px rgba(0,0,0,0.4)'
          }}>
            &#8599;
          </button>
        </div>
      </div>
    </div>
  );
};

const sortPillStyle = (active) => ({
  padding: '7px 14px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '12px',
  fontWeight: 600,
  cursor: 'pointer',
  background: active ? '#3A2418' : '#4A342B',
  color: active ? '#F1E4D6' : '#C9B39F',
  boxShadow: active ? 'inset 0 1px 3px rgba(0,0,0,0.5)' : 'none',
  transition: 'all 0.2s ease'
});

const navBtnStyle = (disabled) => ({
  padding: '9px 18px',
  borderRadius: '999px',
  border: 'none',
  fontSize: '13px',
  fontWeight: 600,
  cursor: disabled ? 'default' : 'pointer',
  background: disabled ? '#5a4a3f' : 'linear-gradient(180deg,#C9A88A,#B08D68)',
  color: disabled ? '#8a7566' : '#3A2418',
  opacity: disabled ? 0.5 : 1,
  boxShadow: disabled ? 'none' : '0 3px 8px rgba(0,0,0,0.35)',
  transition: 'all 0.2s ease'
});

export default LibraryPage;