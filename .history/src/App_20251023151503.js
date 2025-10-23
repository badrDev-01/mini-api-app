// App.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';

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
    <div className="container mt-4">
      <h2>Utilisateurs & Posts</h2>
      <ul className="list-group">
        {users.map(user => (
          <li key={user.id} className="list-group-item">
            <div className="d-flex justify-content-between align-items-center">
              <span>{user.name}</span>
              <button className="btn btn-primary btn-sm" onClick={() => handleShowPosts(user.id)}>
                {selectedUserId === user.id ? 'Masquer les posts' : 'Afficher les posts'}
              </button>
            </div>
            {selectedUserId === user.id && (
              <div className="mt-2">
                {loadingPosts ? (
                  <p>Chargement...</p>
                ) : (
                  <ul>
                    {posts.map(post => (
                      <li key={post.id}><strong>{post.title}</strong></li>
                    ))}
                  </ul>
                )}
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;

