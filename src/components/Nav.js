import React, { useState, useEffect } from 'react';
import { Link, Route, Routes } from 'react-router-dom';

import Page from '../Pages/Page';
import Post from '../Pages/Post';
import axios from 'axios';


export default function Nav() {
    const [pages, setPages] = useState([]);

    useEffect(() => {
        const fetchPages = async () => {
            try {
                const response = await axios.get('http://localhost:10003/wp-json/wp/v2/pages', {
                    params: { orderby: 'menu_order' },
                });
                setPages(response.data);
            } catch (error) {
                console.error('Error fetching pages:', error);
            }
        };

        fetchPages();

    }, []);

    return (
        <div>
            <div>
                <div style={{ display: 'flex', justifyContent: 'space-evenly', background: 'green', fontSize: '20px' }}>
                    {pages.map(page => (
                        <Link key={page.id} to={`/page/${page.slug}`} style={{ color: 'white' }}>{page.title.rendered}</Link>
                    ))}
                </div>
            </div>
            <Routes>
                <Route path="/page/:slug" element={<Page />} />
                <Route path="/post/:postTitle" element={<Post />} />
            </Routes>
        </div>
    );
}
