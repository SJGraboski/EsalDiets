// bring in axios
var axios = require('axios');

// set up an authentication object
var auth = {

  // check if the user is authenticated
  isAuthenticated () {
    const token = localStorage.getItem('token');
    if(token) {
      return axios.get("/api/session", {headers: {"Authorization": token}});
    } else {
      return new Promise(function(resolve, reject){ reject(); });
    }
  },

  login (email, password, cb) {
    const promise = axios.post("/api/session", {email: email,
                                                password: password});
    this.handleAuth(promise, cb);
  },

  // grab new user info, create new user, send a token
  register (newUser, cb) {
    const promise = axios.post("/api/register", newUser);
    this.handleAuth(promise, cb);
  },

  // log the user out by deleting the token, then send a success delete
  logout () {
    var token = localStorage.getItem('token');
    localStorage.removeItem('token');

    // grab the token again (though it won't grab a thing)
    var token = localStorage.getItem('token');

    axios.delete("/api/session", {headers: {"Authorization": token}});
    return true;
  },

  // save tokens to local storage
  handleAuth (promise, cb) {
    promise.then((resp) => {
      if (resp.data.token) {
        localStorage.setItem('token', resp.data.token);
        cb(true);
      }
    }).catch((error) => cb(false));
  }

}

module.exports = auth;