import React, { useState } from 'react'
import axios from 'axios'
import './App.css';
import { FaSearch } from 'react-icons/fa';

const App = () => {

  const [name, setName] = useState("")
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(false);

  function fetchUser(event) {
    event.preventDefault();
    setLoading(true);  // loading start

    // fetching the user data from github api
    axios.get(`https://api.github.com/users/${name}`)
      .then(res => {
        setUser(res.data)    // set the fetched data
        setLoading(false);   // loading stop
        console.log(res.data);
      })
      .catch(err => {
        console.log(err)
        setUser("");
        setLoading(false);
      })
  }

  return (
    <div>
      <h1 className="title">GitHub Profile Viewer</h1>
      <form className="search-form" type="submit">
        <input type="text"
          placeholder='Enter Username'
          value={name}
          onChange={(e) => setName(e.target.value)}
          id="search-input"
          autoFocus required
        />
        <label htmlFor='submit' id="icon-box"><FaSearch id="icon" /></label>
        <button id="submit" type="submit" onClick={(event) => fetchUser(event)}>Search</button>
      </form>
      <div className="loader">
        {loading &&
          <div className="lds-facebook"><div></div><div></div><div></div></div>
        }
      </div>

      {
        // if we are having user then show the details else user not found and in starting nothing
        user ? (
          <div className="container">
            <div className='profile-upper'>
              <div className='pic'>
                <img className='img' src={user.avatar_url} alt="profile" style={{ width: "200px" }} />
                <h2>{user.name}</h2>
                <p>{user.bio}</p>
              </div>
              <div className='follow-box'>
                <div className='follow'>
                  <div className='follow-flex'>
                    <h2>{user.public_repos}</h2>
                    <p>Repos</p>
                  </div>
                  <div className='follow-flex'>
                    <h2>{user.followers}</h2>
                    <p>Followers</p>
                  </ div>
                  <div className='follow-flex'>
                    <h2>{user.following}</h2>
                    <p>Following</p>
                  </ div>
                </ div>
                <div className='link-profile'>
                  <a href={user.repos_url}>Find Repos</a>
                  <a href={user.html_url}>Visit Profile</a>
                </div>
              </div>

            </ div>
          </div>) :
          (user == null) ? "" :

            <h3 className='error'>User can't found...</h3>

      }

    </div>
  )
}

export default App;
