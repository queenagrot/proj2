import { useEffect, useState } from 'react';
import Link from 'next/link'
import axios from 'axios';

// List all entries by fetching from the api/entries endpoint
const List = () => {
  const [entries, setEntries] = useState([]);
  useEffect(async () => {
    const res = await axios.get('/api/entries');
    setEntries(res.data.entriesData);
  }, []);

  return (
    <div>
      <h1>Entries</h1>
      {entries.map(entry => (
        // Use the id key to link to that specific entry, matched by admin/edit/[id].js
        <div key={entry.id}>
          <Link href={`/admin/edit/${entry.id}`}>
            <a>{entry.title}</a>
          </Link>
          <br/>
        </div>
      ))}
    </div>
  );
};

export default List;