// PUT, GET and DELETE endpoints 
// Example requests: 
//await axios.get(`/api/entry/${id}`);
//await axios.delete(`/api/entry/${id}`);
//await axios.put(`/api/entry/${id}`, {
//  slug: 'foo-bar',
//  title: 'Foo Bar',
//  body: 'Lorem ipsum'
//});

// Import the database object to establish a connection with the database
// Firestore has collections, each collection with multiple documents
import db from '../../../utils/db';

export default async (req, res) => {
  // id variable used in the endpoint path 
  // Since we use square brackets with the id filename
  // it becomes available in req.query 
  const { id } = req.query;

  // Use request object's method key to determine the request type 
  try {
    if (req.method === 'PUT') {
      // Find the document in the entries collection by id and update with an object
      await db.collection('bookings').doc(id).update({
        ...req.body,
        updated: new Date().toISOString(),
      });
    } else if (req.method === 'GET') {
      // Find the document by id and return doc.data() as a response 
      const doc = await db.collection('bookings').doc(id).get();
      if (!doc.exists) {
        res.status(404).end();
      } else {
        res.status(200).json(doc.data());
      }
    } else if (req.method === 'DELETE') {
      // Find the document by id and then delete the document 
      await db.collection('bookings').doc(id).delete();
    }
    res.status(200).end();
  } catch (e) {
    res.status(400).end();
  }
}
