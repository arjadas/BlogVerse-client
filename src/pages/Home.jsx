import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import apiService from './../services/api';

const Home = () => {

  // State to hold the list of blogs
  const [blogs, setBlogs] = useState([]);

  // State to track loading status
  const [loading, setLoading] = useState(true);

  // State to handle errors
  const [error, setError] = useState(null);

  // Function to fetch all blogs
  const fetchBlogs = async () => {
    try {
      setLoading(true);
      setError(null);
      const blogsData = await apiService.getAllBlogs();
      setBlogs(blogsData);
    } catch (error) {
      setError('Failed to fetch blogs. Please try again later.');
      console.error('Error fetching blogs:', error);
    } finally {
      setLoading(false);
    }
  };

  
  // useEffect to fetch blogs when the component mounts
  useEffect(() => {
    fetchBlogs();
  }, []);

  // Show loading spinner while fetching data
  if (loading) {
    return <div className="loading">Loading blogs...</div>;
  }

  // Show error message if there's an error
  if (error) {
    return (
      <div className="error">
        <p>{error}</p>
        <button onClick={fetchBlogs} className="btn btn-primary">
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1 className="page-title">Welcome to BlogVerse</h1>
      
      {/* Show message if no blogs exist */}
      {blogs.length === 0 ? (
        <div className="no-blogs">
          <h2>No blog posts yet!</h2>
        </div>
      ):(
        <div className="blog-grid">
          <h2>All Blog posts</h2>
        </div>
      )}
    </div>
  );
};

export default Home;