import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import apiService from '../services/api';

const CreateBlog = () => {
  const navigate = useNavigate();
  
  // State for form data
  const [formData, setFormData] = useState({
    title: '',
    content: '',
    author: ''
  });
  
  // State for form submission
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default form submission
    
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      setError('Please fill in all fields.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      // Create the blog post
      const newBlog = await apiService.createBlog({
        title: formData.title.trim(),
        content: formData.content.trim(),
        author: formData.author.trim()
      });

      // Navigate to the newly created post
      navigate(`/blog/${newBlog._id}`);
      
    } catch (err) {
      setError('Failed to create blog post. Please try again.');
      console.error('Error creating blog:', err);
      setLoading(false);
    }
  };

  return (
    <div>
      <h1 className="page-title">Write a New Blog Post</h1>
      
      <div className="form-container">
        {/* Show error message if any */}
        {error && (
          <div className="error">
            {error}
          </div>
        )}
        
        <form onSubmit={handleSubmit}>
          {/* Blog Title Input */}
          <div className="form-group">
            <label htmlFor="title">Blog Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Enter an engaging title for your blog post..."
              required
              disabled={loading}  // prevent multiple submissions while loading
            />
          </div>

          {/* Author Input */}
          <div className="form-group">
            <label htmlFor="author">Author Name *</label>
            <input
              type="text"
              id="author"
              name="author"
              value={formData.author}
              onChange={handleChange}
              placeholder="Your name..."
              required
              disabled={loading}
            />
          </div>

          {/* Blog Content Text area */}
          <div className="form-group">
            <label htmlFor="content">Blog Content *</label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              placeholder="Write your blog post content here... You can use line breaks to separate paragraphs."
              required
              disabled={loading}
            />
          </div>

          {/* Form Buttons */}
          <div className="form-actions">
            <button 
              type="submit" 
              className="btn btn-success"
              disabled={loading}
            >
              {loading ? 'Publishing...' : 'Publish Blog Post'}
            </button>
            
            <Link to="/" className="btn btn-secondary">
              Cancel
            </Link>
          </div>
        </form>
        
        {/* Note about Writing Tips for users*/}
        <div style={{ 
          marginTop: '2rem', 
          padding: '1rem', 
          backgroundColor: '#f8f9fa', 
          borderRadius: '4px',
          border: '1px solid #e9ecef'
        }}>
          <h3 style={{ marginBottom: '1rem', color: '#495057' }}>Writing Tips:</h3>
          <ul style={{ color: '#6c757d', lineHeight: '1.6' }}>
            <li>Write a clear, descriptive title that captures your main idea</li>
            <li>Break your content into paragraphs using line breaks</li>
            <li>Share your personal experiences and insights</li>
            <li>Keep your audience engaged with a conversational tone</li>
            <li>Proofread your post before publishing</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default CreateBlog;