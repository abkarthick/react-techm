import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Page() {
  const { slug } = useParams();
  const [pageContent, setPageContent] = useState('');
  const [posts, setPosts] = useState('');

  useEffect(() => {
    const fetchPageContent = async () => {
      try {
        const response = await axios.get(`http://localhost:10003/wp-json/wp/v2/pages?slug=${slug}`);
        if (response.data.length > 0) {
          setPageContent(response.data[0].content.rendered);
          console.log('response.data[0].content.rendered', response.data[0].content.rendered)
        } else {
          setPageContent('Page not found');
        }
      } catch (error) {
        console.error('Error fetching page content:', error);
      }
    };

    fetchPageContent();

    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:10003/wp-json/wp/v2/posts', {
          params: { orderby: 'date' },
        });

        setPosts(response.data ?? []);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    if (slug === 'blog') {
      fetchPosts();
    }
  }, [slug]);

  return (
    <div>
    <h2>{slug}</h2>
    <div dangerouslySetInnerHTML={{ __html: pageContent }} />
    {slug === 'blog' && (
      <div>
        <div style={{ display: 'flex', justifyContent: 'space-evenly', background: 'green', fontSize: '20px' }}>
          {posts.length > 0 &&
            posts.map(post => (
              <p key={post.id}>
                <Link to={`/post/${post.slug}`}>{post.title.rendered}</Link>
              </p>
            ))}
        </div>
      </div>
    )}
  </div>
  );
}
