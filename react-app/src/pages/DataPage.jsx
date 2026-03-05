import { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import './DataPage.css';

const DataPage = () => {
  const [rides, setRides] = useState([]);
  const [users, setUsers] = useState([]);
  const [registrations, setRegistrations] = useState([]);
  const [error, setError] = useState(null);

  // helper to fetch from backend
  const fetchResource = async (path, setter) => {
    try {
      const res = await fetch(path);
      if (!res.ok) throw new Error(`fetch ${path} failed`);
      const json = await res.json();
      setter(json);
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  useEffect(() => {
    fetchResource('/api/rides', setRides);
    fetchResource('/api/users', setUsers);
    fetchResource('/api/registrations', setRegistrations);
  }, []);

  // simple table renderer
  const renderTable = (data) => {
    if (!data || data.length === 0) return <p>No records.</p>;
    const columns = Object.keys(data[0]);
    return (
      <table className="data-table">
        <thead>
          <tr>
            {columns.map(col => <th key={col}>{col}</th>)}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx}>
              {columns.map(col => <td key={col}>{row[col]}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };

  return (
    <div>
      <Navbar />
      <div className="data-page">
        <h1>Database Contents</h1>
        {error && <div className="error">{error}</div>}
        <section>
          <h2>Rides</h2>
          {renderTable(rides)}
        </section>
        <section>
          <h2>Users</h2>
          {renderTable(users)}
        </section>
        <section>
          <h2>Registrations</h2>
          {renderTable(registrations)}
        </section>
      </div>
    </div>
  );
};

export default DataPage;
