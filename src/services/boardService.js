import axios from "axios";
require("dotenv").config();
const jwt = require("jsonwebtoken");

// "https://7ab5-2a0e-9cc0-2411-3000-7912-989f-c26e-17ae.ngrok.io";
const domain =
  process.env.NODE_ENV === "production"
    ? "https://create-group-integration.herokuapp.com"
    : "http://localhost:3030";

async function getUserBoards(userId) {
  console.log(`getUserBoards -> userId`, userId);
  console.log(`getUserBoards -> `, `${domain}/getUserBoards`);
  const boardRelations = await axios.post(`${domain}/getUserBoards`, {
    userId,
  });
  return boardRelations;
}

async function add(mainBoard, subBoards, userId) {
  await axios.post(`${domain}/add`, { mainBoard, subBoards, userId });
  return { mainBoard, subBoards, userId };
}
async function update(mainBoard, subBoards, userId, id) {
  console.log(
    `update -> mainBoard, subBoards, userId, id`,
    mainBoard,
    subBoards,
    userId,
    id
  );
  await axios.post(`${domain}/update`, { mainBoard, subBoards, userId, id });
  return { mainBoard, subBoards, userId, id };
}
function decrypt(token) {
  console.log(
    `decrypt -> process.env.CLIENT_SECRET`,
    process.env.SIGNING_SECRET
  );
  const decryptedToken = jwt.verify(token, "642b0bb8bc50d1e365e9ba0a07e3dc21");
  console.log(`decrypt -> decryptedToken`, decryptedToken);
  return decryptedToken;
}
export default {
  getUserBoards,
  add,
  update,
  decrypt,
  update,
};
