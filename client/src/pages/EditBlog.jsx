import {useParams, useLocation, useNavigate} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const EditBlog = () => {

  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const blogFromState = location.state?.blog;

  const [blog, setBlog] = useState(blogFromState || null);
  const [loading, setLoading] = useState(!blogFromState);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState(null);

    // form fields
  const [title, setTitle] = useState(blogFromState?.title || '');
  const [author, setAuthor] = useState(blogFromState?.author || '');
  const [content, setContent] = useState(blogFromState?.content || '');

  
  useEffect(() => {
    // Only fetch if we don't have blog data from navigation state
    if (!blogFromState) {
      fetchBlog();
    }
  }, [id, blogFromState]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      setError(null);
      const blogData = await apiService.getBlogById(id);
      setBlog(blogData);

      // populate form fields
      setTitle(blogData.title || '');
      setAuthor(blogData.author || '');
      setContent(blogData.content || '');

    } catch (error) {
      console.error('Error fetching blog:', error);
      setError('Failed to load blog for editing.');

    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    if (!title.trim()) {
      setError('Title is required.');
      return false;
    }
    if (!content.trim()) {
      setError('Content is required.');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    if (!validate()) return;

    try {
      setSaving(true);
      const updated = {
        title: title.trim(),
        author: author.trim(),
        content: content,
      };
      await apiService.updateBlog(id, updated);
      // navigate back to the blog detail page after save
      navigate(`/blog/${id}`);
    } catch (err) {
      console.error('Error updating blog:', err);
      setError('Failed to save changes. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancel = () => {
    navigate(-1); // go back to previous page
  };

  if (loading) {
    return <div>Loading blog for edit...</div>;
  }

  if (!blog) {
    return (
      <div className="error">
        <p>Blog not found.</p>
        <button onClick={() => navigate('/')} className="btn btn-primary">Back to Home</button>
      </div>
    );
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <p>Editing: {blog?.title}</p>
        </div>
      )}

      {/* Form for editing blog post will go here */}

      {error && <div className="error" role="alert">{error}</div>}

      <form onSubmit={handleSubmit} className="edit-blog-form">
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="form-control"
            required
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="author">Author</label>
          <input
            id="author"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            className="form-control"
            disabled={saving}
          />
        </div>

        <div className="form-group">
          <label htmlFor="content">Content</label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="form-control"
            rows={12}
            required
            disabled={saving}
          />
        </div>

        <div className="form-actions" style={{ marginTop: '1rem' }}>
          <button type="submit" className="btn btn-primary" disabled={saving}>
            {saving ? 'Saving...' : 'Save Changes'}
          </button>

          <button type="button" onClick={handleCancel} className="btn btn-secondary" style={{ marginLeft: '0.5rem' }} disabled={saving}>
            Cancel
          </button>
        </div>
      </form>

    </div>
  );
};

export default EditBlog;