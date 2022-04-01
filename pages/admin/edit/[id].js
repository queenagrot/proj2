import { useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import dashify from 'dashify';
import axios from 'axios';

const EditEntry = () => {
  const router = useRouter()
  const [content, setContent] = useState({
    title: undefined,
    body: undefined,
  })

  // Use /api/entry/[id].js endpoint with GET method
  // to fetch the data of a specific id entry 
  useEffect(async () => {
    const { id } = router.query;
    if (id) {
      const res = await axios.get(`/api/entry/${id}`);
      const { title, body } = res.data;
      // Populate the page's title and body fields with the data fetched from database
      setContent({
        title,
        body
      })
    }
  }, [router])

  const onChange = (e) => {
    const { value, name } = e.target;
    setContent(prevState => ({ ...prevState, [name]: value }));
  }

  // Send requests to api/entry/[id].js
  const onSubmit = async (e) => {
    const { id } = router.query
    const { title, body } = content;
    console.log(id, title, body);
    await axios.put(`/api/entry/${id}`, {
      slug: dashify(title),
      title,
      body,
    });
  }

  // Send requests to api/entry/[id].js
  const onDelete = async () => {
    const { id } = router.query;
    await axios.delete(`/api/entry/${id}`);
    router.back();
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
      <button
        type="button"
        onClick={onSubmit}
      >
        Submit
      </button>
      <button
        type="button"
        onClick={onDelete}
      >
        Delete
      </button>
    </div>
  );
};

export default EditEntry;