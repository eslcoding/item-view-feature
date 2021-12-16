import axios from "axios";
const domain =
  "https://63bc-2a0e-9cc0-2447-e900-142a-630b-5983-6007.ap.ngrok.io";
// process.env.NODE_ENV === "production"
//   ? "https://create-group-integration.herokuapp.com"
//   : "http://localhost:3030";

/**
 *
 * @param {string} email
 * @returns {object} user
 */
async function getUserByEmail(email) {
  // email = email.toLowerCase();
  const user = await axios.get(`${domain}/api/user/${email}`);
  return user.data;
}
// async function getUserToken(email) {

// }
function sleep(ms = 0) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}
export default {
  getUserByEmail,
};
