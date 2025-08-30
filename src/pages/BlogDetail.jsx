import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import apiService from '../services/api';

const BlogDetail = () => {
  // Get the blog ID from the URL parameters
  const { id } = useParams();
  
  // State to store the blog post
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the blog post when component mounts
  useEffect(() => {
    fetchBlog();
  }, [id]);

  // Function to fetch individual blog post
  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const blogData = await apiService.getBlogById(id);
      setBlog(blogData);
    } catch (err) {
      setError('Failed to fetch blog post. It may have been deleted.');
      console.error('Error fetching blog:', err);
    } finally {
      setLoading(false);
    }
  };

  // Function to format date
  const formatDate = (dateString) => {
    const options = { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Show loading while fetching
  if (loading) {
    return <div className="loading">Loading blog post...</div>;
  }

  // Show error if blog not found or other error
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  // Show message if no blog found
  if (!blog) {
    return (
      <div className="error">
        <p>Blog post not found.</p>
        <Link to="/" className="btn btn-primary">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <div>
      {/* Blog post content */}
      <article className="blog-detail">
        <h1>{blog.title}</h1>
        
        <div className="blog-meta">
          <span>By <strong>{blog.author}</strong></span>
          <span> • </span>
          <span>Published {formatDate(blog.createdAt)}</span>
          {blog.updatedAt !== blog.createdAt && (
            <>
              <span> • </span>
              <span>Updated {formatDate(blog.updatedAt)}</span>
            </>
          )}
        </div>
        
        <div className="blog-content">
          {/* Split content by line breaks and render as paragraphs */}
          {blog.content.split('\n').map((paragraph, index) => (
            paragraph.trim() && <p key={index}>{paragraph}</p>
          ))}
        </div>
      </article>

      {/* Action buttons */}
      <div className="blog-actions">
        <Link to="/" className="btn btn-secondary">
          ← Back to Home
        </Link>

        <Link to={`/edit/${blog._id}`} className="btn btn-warning" state={{ blog }}>
          Edit Blog Post
        </Link>

      </div>

    </div>
  );
};

export default BlogDetail;