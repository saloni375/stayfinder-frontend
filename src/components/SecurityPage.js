import React, { useState } from 'react';
import { useAuth } from '../context/useAuth';

export default function SecurityPage() {
  const { changePassword, user } = useAuth();
  const [current, setCurrent] = useState('');
  const [next, setNext] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    changePassword(current, next);
  };

  return (
    <div className="container py-5">
      <div className="card p-4 mx-auto" style={{ maxWidth: '400px' }}>
        <h5>Change Password</h5>
        <form onSubmit={handleSubmit}>
          <input type="password" placeholder="Current" value={current} onChange={e => setCurrent(e.target.value)} className="form-control mb-3" />
          <input type="password" placeholder="New" value={next} onChange={e => setNext(e.target.value)} className="form-control mb-3" />
          <button className="btn btn-primary w-100">Save</button>
        </form>
        <p className="mt-3 text-muted"><small>Last login: {new Date(user.lastLogin).toLocaleString()}</small></p>
      </div>
    </div>
  );
}
