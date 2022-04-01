import { useState } from 'react';
import dashify from 'dashify';
import axios from 'axios';

const Post = () => {
  // One state variable = an object holding title and body properties 
  // After setting the title and body objects, we can send these values as an entry
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
  })
  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }
  const onSubmit = async () => {
    // Will make a POST call to /api/entry
    // Along with an object that contains title, body and slug 
    // Slug generated from the title variable using dashify package 
    const { title, body } = content;
    await axios.post('/api/entry', { title, slug: dashify(title), body });
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
      <button onClick={onSubmit}>POST</button>
    </div>
  );
};

export default Post;