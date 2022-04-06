// How to use entries.js endpoint: 
// await axios.get('/api/entries');

// Import the database object to establish a connection with the database
// Firestore has collections, each collection with multiple documents
import db from '../../utils/db';

export default async (req, res) => {
  try {
    // Fetch all documents in the bookings collection 
    // Simultaneously order them with the created key added in POST method
    const bookings = await db.collection('bookings').orderBy('created').get();
    // Map through the returned value and return a new array of objects
    // Where we'll spread the booking data and also add the document id
    // Need this id in order to use with the GET, DELETE and PUT methods
    const bookingsData = bookings.docs.map(booking => ({
      id: booking.id,
      ...booking.data()
    }));
    res.status(200).json({ bookingsData });
  } catch (e) {
    res.status(400).end();
  }
}