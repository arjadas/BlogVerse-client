import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const BlogDetail = () => {
  // Get the blog ID from the URL parameters
  const { id } = useParams();
  const navigate = useNavigate();
  const [deleting, setDeleting] = useState(false);

  // navigation handlers
  const handleBack = () => navigate('/');
  const handleEdit = () => navigate(`/edit/${blog._id}`, { state: { blog } });
  
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

  // Function to handle blog deletion
  const handleDelete = async () => {
    // Confirm before deleting
    const confirmDelete = window.confirm('Are you sure you want to delete this blog post? This action cannot be undone.');
    
    if (!confirmDelete) return;

    try {
      setDeleting(true);
      setError(null);
      await apiService.deleteBlog(id);
      // Navigate back to home page after successful deletion
      navigate('/');
    } catch (err) {
      //alert('Failed to delete blog post. Please try again.');
      console.error('Error deleting blog:', err);
      if (err.response) {
        console.error('Status:', err.response.status);
        console.error('Response data:', err.response.data);
        alert(`Failed to delete: ${err.response.status} ${err.response.data?.message || ''}`);
      } else {
        alert('Failed to delete blog post. Check console for details.');
      }
    } finally {
      setDeleting(false);
    }
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

        <button onClick={handleBack} className="btn btn-secondary">
          Back to Home
        </button>

        <button onClick={handleEdit} className="btn btn-warning" style={{ marginLeft: '0.5rem' }}>
          Edit Blog Post
        </button>

        <button onClick={handleDelete} className="btn btn-danger" style={{ marginLeft: '0.5rem' }}>
          {deleting ? 'Deleting...' : 'Delete Blog Post'}
        </button>

      </div>

    </div>
  );
};

export default BlogDetail;