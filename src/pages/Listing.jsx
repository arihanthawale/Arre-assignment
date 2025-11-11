import { useEffect, useState } from "react";
import { fetchPosts } from "../api";
import StoryCard from "../components/StoryCard";
import Loader from "../components/Loader";
import "./Listing.css";

export default function Listing() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts().then((data) => {
      setStories(data);
      setLoading(false);
    });
  }, []);

  if (loading) return <Loader />;

  return (
    <div className="listing">
      <h2>All Stories</h2>
      <div className="grid">
        {stories.map((story) => (
          <StoryCard key={story.id} story={story} />
        ))}
      </div>
    </div>
  );
}
