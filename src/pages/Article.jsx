import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { fetchPostById } from "../api";
import Loader from "../components/Loader";
import "./Article.css";

export default function Article() {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let mounted = true;
    setLoading(true);
    fetchPostById(id)
      .then((p) => {
        if (!mounted) return;
        setPost(p);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to load article", err);
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, [id]);

  if (loading) return <Loader />;

  if (!post) {
    return (
      <div className="article">
        <h1>Article not found</h1>
        <p>
          We couldn't find this article. It may have been removed or is
          unavailable.
        </p>
        <Link to="/">← Back to home</Link>
      </div>
    );
  }

  const formatDate = (iso) => {
    if (!iso) return "";
    const d = new Date(iso);
    if (isNaN(d.getTime())) return "";
    return d.toLocaleString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
      hour: "numeric",
      minute: "numeric",
      hour12: true,
    });
  };

  return (
    <article className="article">
      <Link to="/" className="article-back">
        ← Back
      </Link>
      <h1>{post.title}</h1>
      {post.image && <img src={post.image} alt={post.title} />}
      <div className="article-meta">
        {post.publishedAt && (
          <span className="article-date">{formatDate(post.publishedAt)}</span>
        )}
        <span className="article-author">
          by {post.author || "Staff Writer"}
        </span>
      </div>
      <div className="article-body">
        {post.body ? (
          post.body.split("\n").map((line, i) => <p key={i}>{line}</p>)
        ) : (
          <p>No content available.</p>
        )}
      </div>

      {post.url && post.url !== "#" && /^https?:\/\//.test(post.url) && (
        <div className="article-source">
          <a
            href={post.url}
            target="_blank"
            rel="noopener noreferrer"
            className="source-link"
          >
            Read on source
          </a>
        </div>
      )}
    </article>
  );
}
