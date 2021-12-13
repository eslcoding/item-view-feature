import mondaySdk from "monday-sdk-js";
import axios from "axios";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const monday = mondaySdk();
// "https://7ab5-2a0e-9cc0-2411-3000-7912-989f-c26e-17ae.ngrok.io";
const domain =
  "https://d614-2a0e-9cc0-23d9-5700-9dc2-3d75-1056-3a26.eu.ngrok.io";
// process.env.NODE_ENV === "production"
//   ? "https://create-group-integration.herokuapp.com"
//   : "http://localhost:3030";

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
async function createNewItemWebHook(
  boardId,
  columnId,
  endpoint = "createGroup"
) {
  const mutation = `
  mutation{
    create_webhook (board_id:${boardId}, url:${JSON.stringify(
    domain + "/" + endpoint
  )}, event:change_specific_column_value, config: ${JSON.stringify(
    JSON.stringify({
      columnId: columnId,
    })
  )}){
      id
      board_id
    }
  }`;
  const res = await monday.api(mutation);
}
async function createMirrorWebHook(boardIds, endpoint = "mirrorItemKR") {
  console.log(`createMirrorWebHook -> boardIds`, boardIds);
  const mutation = `mutation{
    create_webhook (board_id:${boardIds}, url:${JSON.stringify(
    domain + "/" + endpoint
  )}, event:create_item){
      id
      board_id
    }
  }`;
  console.log(`createMirrorWebHook -> mutation`, mutation);
  const res = await monday.api(mutation);
  console.log(`createMirrorWebHook -> res`, res);
}
async function deleteRelation(_id) {
  await axios.delete(`${domain}/deleteRelation/${_id}`);
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
  createNewItemWebHook,
  createMirrorWebHook,
  deleteRelation,
};
