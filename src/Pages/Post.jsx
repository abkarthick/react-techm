import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function Post() {
  const { postTitle } = useParams();
  const [postContent, setPostContent] = useState('');

  useEffect(() => {
    const fetchPostContent = async () => {
      try {
        const encodedTitle = encodeURIComponent(postTitle);
        const response = await axios.get(`http://localhost:10003/wp-json/wp/v2/posts?slug=${encodedTitle}`);
        if (response.data.length > 0) {
          setPostContent(response.data[0].content.rendered);
        } else {
          setPostContent('Post not found');
        }
      } catch (error) {
        console.error('Error fetching post content:', error);
      }
    };

    fetchPostContent();
  }, [postTitle]);

  return (
    <div>
      <h2>{postTitle}</h2>
      <div dangerouslySetInnerHTML={{ __html: postContent }} />
    </div>
  );
}
