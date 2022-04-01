// Import the database object to establish a connection with the database
// Firestore has collections, each collection with multiple documents
import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const entries = await db.collection('entries').get();
    const entriesData = entries.docs.map(entry => entry.data());

    // Use slug key's value to check if there is already another entry with the same slug value
    if (entriesData.some(entry => entry.slug === slug)) {
    // If so, end request 
      res.status(400).end();
    } else {
    // If the slug is unique, make another request to db to add request body
    // Which is an object containing title, slug & body
      const { id } = await db.collection('entries').add({
        ...req.body,
        // Add created key with current timestamp as a value 
        created: new Date().toISOString(),
      });
      res.status(200).json({ id });
    }
  } catch (e) {
    res.status(400).end();
  }
}

// Example POST request: 
// axios.post('/api/entry', { title: Foo Bar, slug: foo-bar, body: lorem ipsum });