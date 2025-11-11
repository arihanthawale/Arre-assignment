import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { fetchPosts } from "../api";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";
import "./Home.css";

export default function Home() {
  const [stories, setStories] = useState([]);
  const [heroStories, setHeroStories] = useState([]);
  const [featured, setFeatured] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHeroHovered, setIsHeroHovered] = useState(false);
  const [isFallback, setIsFallback] = useState(false);

  // Fetch stories for both sections
  useEffect(() => {
    // Hero: top 5 headlines
    const fetchHeroStories = fetchPosts(1, 5);
    // Latest: next 6 headlines
    const fetchLatestStories = fetchPosts(2, 6);

    Promise.all([fetchHeroStories, fetchLatestStories])
      .then(([heroData, latestData]) => {
        setHeroStories(heroData || []);
        setStories(latestData || []);
        setFeatured((heroData && heroData[0]) || null);
        setLoading(false);
        // Fallback detection: if any story has url === '#', we're using fallback
        if (
          (heroData && heroData.length && heroData[0].url === "#") ||
          (latestData && latestData.length && latestData[0].url === "#")
        ) {
          setIsFallback(true);
        } else {
          setIsFallback(false);
        }
      })
      .catch((err) => {
        setIsFallback(true);
        setLoading(false);
      });
  }, []);

  // Rotate featured story every 5 seconds
  useEffect(() => {
    if (heroStories.length === 0) return;
    if (isHeroHovered) return;
    const interval = setInterval(() => {
      setCurrentIndex((current) => {
        const nextIndex = (current + 1) % heroStories.length;
        setFeatured(heroStories[nextIndex]);
        return nextIndex;
      });
    }, 5000); // Change every 5 seconds

    return () => clearInterval(interval);
  }, [heroStories, isHeroHovered]);

  if (loading) return <Loader />;
  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <div className="home">
      <section className="hero">
        {/* decorative shadow/background */}
        <div
          className="hero-decor"
          aria-hidden
          style={{
            backgroundImage: featured?.image
              ? `url(${featured.image})`
              : undefined,
          }}
        ></div>

        {/* hero card holds the image and will sit above the decor */}
        {(() => {
          const isExternal =
            featured?.url &&
            featured.url !== "#" &&
            /^https?:\/\//.test(featured.url);
          const img = (
            <>
              <img
                src={featured?.image || "https://picsum.photos/1200/500"}
                alt={featured?.title || "Featured story"}
                className="heroimg"
              />
              <div className="hero-content">
                <h1>{featured?.title}</h1>
                <div className="hero-meta">
                  <span>{formatDate(featured?.publishedAt)}</span>
                  <span>by {featured?.author}</span>
                </div>
              </div>
            </>
          );
          const eventProps = {
            onMouseEnter: () => setIsHeroHovered(true),
            onMouseLeave: () => setIsHeroHovered(false),
          };
          if (isExternal) {
            return (
              <a
                href={featured.url}
                target="_blank"
                rel="noopener noreferrer"
                className="hero-card"
                {...eventProps}
              >
                {img}
              </a>
            );
          }
          return (
            <Link
              to={`/article/${featured?.id || ""}`}
              className="hero-card"
              {...eventProps}
            >
              {img}
            </Link>
          );
        })()}
      </section>

      <section className="latest">
        <div className="grid">
          {stories.map(
            (story) => story && <StoryCard key={story.id} story={story} />
          )}
        </div>
      </section>
    </div>
  );
}
