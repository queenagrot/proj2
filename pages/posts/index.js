// Page to list all entries = export getStaticProps - a Next.js specific function
// By exporting, Next.js server-side renders this page at build time
// Everything in getStaticProps is server-side rendered (not exposed to client)

// First import db object to make a request to the database 
// Then get entries and make available in the component 
// The object returned from getStaticProps become available as props in the component 
// It should always return an object with the props key

// However we need to trigger a build after new entries created
// Using Incremental Static Regeneration by adding revalidate key with a timeout value 
// Telling Next.js to regenerate the page when requested 

// <Link/> component provided by Next.js for client-side route transition 
import Link from 'next/link'
import db from '../../utils/db';

const Posts = (props) => {
  const { entriesData } = props;

  return (
    <div>
      <h1>Posts</h1>
      {entriesData.map(entry => (
        <div key={entry.id}>
          <Link href={`/posts/${entry.slug}`}>
            <a>{entry.title}</a>
          </Link>
          <br />
        </div>
      ))}
    </div>
  );
};

export const getStaticProps = async () => {
  const entries = await db.collection('entries').orderBy('created', 'desc').get();
  const entriesData = entries.docs.map(entry => ({
    id: entry.id,
    ...entry.data()
  }));
  return {
    props: { entriesData },
    revalidate: 10
  }
}

export default Posts;