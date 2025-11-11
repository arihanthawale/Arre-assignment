import { useState, useEffect, useRef } from "react";
import "./Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaTimes } from "react-icons/fa";
import { searchPosts } from "../api";

export default function Navbar() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const searchInputRef = useRef(null);
  const searchTimeoutRef = useRef(null);

  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  useEffect(() => {
    if (searchQuery.trim()) {
      setIsLoading(true);
      // Clear previous timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      // Debounce search
      searchTimeoutRef.current = setTimeout(async () => {
        const results = await searchPosts(searchQuery);
        setSearchResults(results);
        setIsLoading(false);
      }, 300);
    } else {
      setSearchResults([]);
    }
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, [searchQuery]);

  const handleSearchOpen = () => {
    setIsSearchOpen(true);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchResults.length > 0) {
      handleSearchClose();
      navigate(`/article/${searchResults[0].id}`);
    }
  };

  const handleResultClick = (id) => {
    handleSearchClose();
    navigate(`/article/${id}`);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <div className="nav-left">
          <Link to="/" className="logo">
            Arré
          </Link>
        </div>

        <div className={`nav-center ${open ? "open" : ""}`}>
          <Link to="/">Articles</Link>
          <Link to="/listing">Studio</Link>
          <Link to="/">Voice</Link>
          <Link to="/">More</Link>
        </div>

        <div className="nav-right">
          <button
            className="search-btn"
            onClick={handleSearchOpen}
            aria-label="Open search"
          >
            <FaSearch className="search-icon" />
          </button>
          <button
            className="menu-btn"
            onClick={() => setOpen(!open)}
            aria-label="Open menu"
          >
            ☰
          </button>
        </div>

        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="search-overlay">
            <div className="search-container">
              <form onSubmit={handleSearch}>
                <div className="search-input-wrapper">
                  <FaSearch className="search-input-icon" />
                  <input
                    ref={searchInputRef}
                    type="text"
                    placeholder="Search articles..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                  />
                  <button
                    type="button"
                    className="search-close-btn"
                    onClick={handleSearchClose}
                    aria-label="Close search"
                  >
                    <FaTimes />
                  </button>
                </div>
              </form>

              {/* Search Results */}
              <div className="search-results">
                {isLoading ? (
                  <div className="search-message">Searching...</div>
                ) : searchQuery.trim() && searchResults.length === 0 ? (
                  <div className="search-message">No results found</div>
                ) : (
                  searchResults.map((result) => (
                    <div
                      key={result.id}
                      className="search-result-item"
                      onClick={() => handleResultClick(result.id)}
                    >
                      <img
                        src={result.image}
                        alt={result.title}
                        className="search-result-image"
                      />
                      <div className="search-result-content">
                        <h3>{result.title}</h3>
                        <p>{result.body.slice(0, 100)}...</p>
                      </div>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        )}

        {/* mobile dropdown */}
        <div className={`nav-links-mobile ${open ? "open" : ""}`}>
          <Link to="/">Articles</Link>
          <Link to="/listing">Studio</Link>
          <Link to="/">Voice</Link>
          <Link to="/">More</Link>
        </div>
      </div>
    </nav>
  );
}
