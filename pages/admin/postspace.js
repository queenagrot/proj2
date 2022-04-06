import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Space = () => {
  // One state variable = an object holding title and body properties 
  // After setting the title and body objects, we can send these values as an booking
  // Add new fields in here!
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
    description: undefined,
    rules: undefined,
    address: undefined,
    suburb: undefined,
    capacity: undefined,
    opening_time: undefined,
    closing_time: undefined,
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
    const { title, body, description, rules, address, suburb, capacity, opening_time, closing_time } = content;
    await axios.post('/api/space', { title, slug: dashify(title), body, description, rules, address, suburb, capacity, opening_time, closing_time });
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
      <label htmlFor="rules">Rules</label>
      <textarea
        name="rules"
        value={content.rules}
        onChange={onChange}
      />
      <label htmlFor="address">Address</label>
      <input
        type="text"
        name="address"
        value={content.address}
        onChange={onChange}
      />
      <label htmlFor="suburb">Suburb</label>
      <input
        type="text"
        name="suburb"
        value={content.suburb}
        onChange={onChange}
      />
      <label htmlFor="capacity">Capacity</label>
      <input
        type="text"
        name="capacity"
        value={content.capacity}
        onChange={onChange}
      />
      <label htmlFor="opening_time">Opening Time</label>
      <input
        type="text"
        name="opening_time"
        value={content.opening_time}
        onChange={onChange}
      />
      <label htmlFor="closing_time">Closing Time</label>
      <input
        type="text"
        name="closing_time"
        value={content.closing_time}
        onChange={onChange}
      />
      <button onClick={onSubmit}>POST SPACE</button>
    </div>
  );
};

export default Space;