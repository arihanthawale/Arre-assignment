const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?auto=format&fit=crop&w=1200&h=500";

// In-memory cache for articles by id
const _articleCache = {};

// Normalize articles to a common shape used by the app.
const normalize = (article, index, page, pageSize) => {
  const obj = {
    id:
      article.id !== undefined ? article.id : index + 1 + (page - 1) * pageSize,
    title: article.title || article.headline || "Untitled",
    body: article.description || article.body || "",
    userId: article.userId || 1,
    image: article.urlToImage || article.image || FALLBACK_IMAGE,
    author: article.author || article.source?.name || "Staff Writer",
    publishedAt: article.publishedAt || article.published || null,
    url: article.url || article.source?.url || "#",
  };
  _articleCache[obj.id] = obj;
  return obj;
};

export const fetchPosts = async (skip = 0, limit = 30) => {
  const res = await fetch(
    `https://dummyjson.com/posts?skip=${skip}&limit=${limit}`
  );
  const data = await res.json();
  return data.posts.map((post) => ({
    ...post,
    image: `https://picsum.photos/seed/${post.id}/1200/500`,
    author: "Staff Writer",
    publishedAt: null,
    url: "#",
  }));
};

export const fetchPostById = async (id) => {
  const res = await fetch(`https://dummyjson.com/posts/${id}`);
  const data = await res.json();
  return {
    ...data,
    image: `https://picsum.photos/seed/${data.id}/900/400`,
    author: "Staff Writer",
    publishedAt: null,
    url: "#",
  };
};

export const searchPosts = async (query) => {
  try {
    const res = await fetch(
      `https://dummyjson.com/posts/search?q=${encodeURIComponent(query)}`
    );
    const data = await res.json();
    return data.posts.map((post) => ({
      ...post,
      image: `https://picsum.photos/seed/${post.id}/1200/500`,
      author: "Staff Writer",
      publishedAt: null,
      url: "#",
    }));
  } catch (error) {
    console.error("Search error:", error);
    return [];
  }
};
