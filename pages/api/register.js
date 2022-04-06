import axios from 'axios';
// nookies package is a collection of helper functions that handle cookies in Next.js
// setCookie takes the response object as the first arguement, name of cookie as second arguement
import { setCookie } from 'nookies'

export default async (req, res) => {
  const { username, password, email } = req.body;

  try {
    // If strapi app deployed to remote server, change localhost:1337 accordingly
    const response = await axios.post('http://localhost:1337/auth/local/register', {
      username,
      email,
      password,
    })

    // JWT token returned from request response as third arguement 
    setCookie({ res }, 'jwt', response.data.jwt, {
      // httpOnly: true = prevents the client (javascript running on browser) from accessing the cookie
      // Protects from cross-site scripting attacks
      httpOnly: true,
      // secure flag ensures cookie is only transmitted over secure https
      // set to false if application is in 'development'
      secure: process.env.NODE_ENV !== 'development',
      // maxAge determines how many seconds the cookie is valid (30 days)
      maxAge: 30 * 24 * 60 * 60,
      // path determines which path the cookie should be valid where / makes available for all the paths
      path: '/',
    });

    res.status(200).end();
  } catch (e) {
    // error message in case of a failed request
    console.log('error');
    res.status(400).send();
    //res.status(400).send(e.response.data.message[0].messages[0]);
  }
}