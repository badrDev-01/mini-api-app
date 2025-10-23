// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './App.css';

function App() {
  const [users, setUsers] = useState([]);
  const [selectedUserId, setSelectedUserId] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loadingPosts, setLoadingPosts] = useState(false);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then(res => res.json())
      .then(data => setUsers(data));
  }, []);

  const handleShowPosts = (userId) => {
    if (selectedUserId === userId) {
      setSelectedUserId(null);
      setPosts([]);
      return;
    }

    setLoadingPosts(true);
    axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
      .then(res => {
        setPosts(res.data);
        setSelectedUserId(userId);
        setLoadingPosts(false);
      });
  };

  return (
    <div className="app-container">
      <h1>Utilisateurs & Posts</h1>
      <div className="user-list">
        {users.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h3>{user.name}</h3>
              <p>{user.email}</p>
            </div>
            <button
              className="toggle-button"
              onClick={() => handleShowPosts(user.id)}
            >
              {selectedUserId === user.id ? 'Masquer les posts' : 'Afficher les posts'}
            </button>

            {selectedUserId === user.id && (
              <div className="post-section">
                {loadingPosts ? (
                  <p className="loading">Chargement...</p>
                ) : (
                  posts.map(post => (
                    <div key={post.id} className="post-card">
                      <h4>{post.title}</h4>
                      <p>{post.body}</p>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;

