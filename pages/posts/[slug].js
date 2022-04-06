import { useRouter } from 'next/router'
import db from '../../utils/db';

// Capture slug from *context*.params in getStaticProps
const Post = (props) => {
  const { entry } = props;
  const router = useRouter()
  if (router.isFallback) {
    return (
      <div>loading</div>
    )
  } else {
    if (entry) {
      return (
        <div>
          <h1>{entry.title}</h1>
          <h4>{entry.created}</h4>
          <p>{entry.body}</p>
        </div>
      );
    } else {
      return (
        <div>not found</div>
      )
    }
  }
};

// When a page has dynamic routes and has getStaticProps
// Then it needs to use the getStaticPaths as well
// Where we define a list of paths that will be generated at build time 
export const getStaticPaths = async () => {
  // Fetch all the entries using the slug value of each entry 
  const entries = await db.collection("entries").get()
  console.log(entries);
  
  const paths = entries.docs.map(entry => ({
  
  // Create an array of objects with structure: 
    // Passed as paths key of object returned by getStaticPaths

    params: {
      slug: entry.data().slug
    }
  }));

  console.log(paths.filter(({ params }) => !params.slug))
  return {
    paths,
    // fallback:true key value pair must be set to trigger static generation in the bg
    // If false, Next.js returns 404 page for paths not generated during build time 
    fallback: true
    // router.isFallback = true during generation, = false once path generated 
    // To detect loading, and show loader 
  }
}

export const getStaticProps = async (context) => {
  const { slug } = context.params;
  const res = await db.collection("entries").where("slug", "==", slug).get()
  const entry = res.docs.map(entry => entry.data());
  if (entry.length) {
    return {
      props: {
        entry: entry[0]
      }
    }
  } else {
    return {
      props: {}
    }
  }
}

export default Post;