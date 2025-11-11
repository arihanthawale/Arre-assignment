import { Link } from "react-router-dom";
import "./StoryCard.css";

export default function StoryCard({ story = {} }) {
  const isExternal =
    story.url && story.url !== "#" && /^https?:\/\//.test(story.url);

  const content = (
    <>
      <img src={story.image} alt={story.title} />
      <div className="story-card-body">
        <h3>{story.title}</h3>
        <p>{story.body ? `${story.body.substring(0, 100)}...` : ""}</p>
        <div className="card-meta">
          <span>{story.author}</span>
          <span>
            {story.publishedAt
              ? new Date(story.publishedAt).toLocaleDateString()
              : ""}
          </span>
        </div>
      </div>
    </>
  );

  if (isExternal) {
    return (
      <a
        className="story-card"
        href={story.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {content}
      </a>
    );
  }

  return (
    <Link className="story-card" to={`/article/${story.id}`}>
      {content}
    </Link>
  );
}
