import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Booking = () => {
  // One state variable = an object holding title and body properties 
  // After setting the title and body objects, we can send these values as an booking
  // Add new fields in here!
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
    description: undefined,
    bookingstart: undefined,
    bookingend: undefined,
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    // Will make a POST call to /api/booking
    // Along with an object that contains title, body and slug 
    // Slug generated from the title variable using dashify package 
    // LINES THAT SET THE CONTENT!!
    const { title, body, description, bookingstart, bookingend } = content;
    await axios.post('/api/booking', { title, slug: dashify(title), body, description, bookingstart, bookingend });
  }
  return (
    <div>
      <label htmlFor="title">Title</label>
      <input
        type="text"
        name="title"
        value={content.title}
        onChange={onChange}
      />
      <label htmlFor="body">Body</label>
      <textarea
        name="body"
        value={content.body}
        onChange={onChange}
      />
      <label htmlFor="description">Description</label>
      <textarea
        name="description"
        value={content.description}
        onChange={onChange}
      />
      <label htmlFor="bookingstart">Booking Start Time</label>
      <input
        type="datetime"
        name="bookingstart"
        value={content.bookingstart}
        onChange={onChange}
      />
      <label htmlFor="bookingend">Booking End Time</label>
      <input
        type="datetime"
        name="bookingend"
        value={content.bookingend}
        onChange={onChange}
      />
      <button onClick={onSubmit}>POST BOOKING</button>
    </div>
  );
};

export default Booking;