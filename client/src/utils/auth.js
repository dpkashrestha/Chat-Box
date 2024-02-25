// use this to decode a token and get the user's information out of it
import { jwtDecode } from "jwt-decode";

// create a new class to instantiate for a user
class AuthService {
  // get user data
  getProfile() {
    return jwtDecode(this.getToken());
  }

  // check if user's logged in
  loggedIn() {
    // Checks if there is a saved token and it's still valid
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token); // handwaiving here
  }

  // check if token is expired
  isTokenExpired(token) {
    try {
      const decoded = jwtDecode(token);
      if (decoded.exp < Date.now() / 1000) {
        return true;
      } else return false;
    } catch (err) {
      return false;
    }
  }

  getToken() {
    // Retrieves the user token from localStorage
    return localStorage.getItem("id_token");
  }

  signUp(idToken, user) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.assign("/setAvatar");
  }

  login(idToken, user) {
    // Saves user token to localStorage
    localStorage.setItem("id_token", idToken);
    localStorage.setItem("user", JSON.stringify(user));
    window.location.assign("/chat");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem("user"));
  }

  logout() {
    // Clear user token and profile data from localStorage
    localStorage.removeItem("id_token");
    localStorage.removeItem("user");
    // this will reload the page and reset the state of the application
    window.location.assign("/");
  }
}

export default new AuthService();
