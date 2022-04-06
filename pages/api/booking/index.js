// Import the database object to establish a connection with the database
// Firestore has collections, each collection with multiple documents
import db from '../../../utils/db';

export default async (req, res) => {
  try {
    const { slug } = req.body;
    const bookings = await db.collection('bookings').get();
    const bookingsData = bookings.docs.map(booking => booking.data());

    // Use slug key's value to check if there is already another booking with the same slug value
    if (bookingsData.some(booking => booking.slug === slug)) {
    // If so, end request 
      res.status(400).end();
    } else {
    // If the slug is unique, make another request to db to add request body
    // Which is an object containing title, slug & body
      const { id } = await db.collection('bookings').add({
        ...req.body,
        // Add created key with current timestamp as a value 
        created: new Date().toISOString(),
      });
      console.log('added id worked for booking');
      res.status(200).json({ id });
    }
  } catch (e) {
    console.log('added booking failed');
    res.status(400).end();
  }
}

// Example POST request: 
// axios.post('/api/booking', { title: Foo Bar, slug: foo-bar, body: lorem ipsum });