// Import the database object to establish a connection with the database
// Firestore has collections, each collection with multiple documents
import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const spaces = await db.collection('spaces').get();
    const spacesData = spaces.docs.map(space => space.data());

    // Use slug key's value to check if there is already another space with the same slug value
    if (spacesData.some(space => space.slug === slug)) {
    // If so, end request 
      res.status(400).end();
    } else {
    // If the slug is unique, make another request to db to add request body
    // Which is an object containing title, slug & body
      const { id } = await db.collection('spaces').add({
        ...req.body,
        // Add created key with current timestamp as a value 
        created: new Date().toISOString(),
      });
      console.log('added id worked for space');
      res.status(200).json({ id });
    }
  } catch (e) {
    console.log('added space failed');
    res.status(400).end();
  }
}

// Example POST request: 
// axios.post('/api/space', { title: Foo Bar, slug: foo-bar, body: lorem ipsum });