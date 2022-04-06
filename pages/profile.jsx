import { useRouter } from 'next/router';
import axios from 'axios';
import nookies from 'nookies';

const Profile = (props) => {
  const router = useRouter();
  const { user: { email, username } } = props;

  const logout = async () => {
    try {
      await axios.get('/api/logout');
      router.push('/');
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div>
      <div>Username: {username}</div>
      <div>Email: {email}</div>
      <button onClick={logout}>Logout</button>
    </div>
  )
}

// getServerSideProps is Next.js function that runs on the server on each request
export const getServerSideProps = async (ctx) => {
  // Get the cookies from the context object (ctx)
  const cookies = nookies.get(ctx)
  let user = null;

  // If cookie can access JWT token, make a request to strapi to fetch user data
  // Check for existence of cookies.jwt (name of cookie set is jwt)
  // If this specific cookie is here, send a request to /users/me endpoint of local strapi server
  // with the Authorization header containing the JWT token to fetch user data
  if (cookies?.jwt) {
    try {
      const { data } = await axios.get('http://localhost:1337/users/me', {
        headers: {
          Authorization:
            `Bearer ${cookies.jwt}`,
          },
      });
      user = data;
    } catch (e) {
      console.log(e);
    }
  }

  if (!user) {
    return {
      redirect: {
        permanent: false,
        destination: '/'
      }
    }
  }

  // If is a user, return props on the page
  return {
    props: {
      user
    }
  }
}

export default Profile;