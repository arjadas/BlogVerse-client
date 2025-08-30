import {useParams, useLocation} from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import apiService from '../services/api';

const EditBlog = () => {

  const { id } = useParams();
  const location = useLocation();
  const blogFromState = location.state?.blog;

  const [blog, setBlog] = useState(blogFromState || null);
  const [loading, setLoading] = useState(!blogFromState);
  
  useEffect(() => {
    // Only fetch if we don't have blog data from navigation state
    if (!blogFromState) {
      fetchBlog();
    }
  }, [id, blogFromState]);

  const fetchBlog = async () => {
    try {
      setLoading(true);
      const blogData = await apiService.getBlogById(id);
      setBlog(blogData);
    } catch (error) {
      console.error('Error fetching blog:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div>
      <h1>Edit Blog Post</h1>
      <h2>Editing: {blog.title}</h2>
      {/* Form for editing blog post will go here */}
    </div>
  );
};

export default EditBlog;