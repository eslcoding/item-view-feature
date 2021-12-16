import mondaySdk from "monday-sdk-js";
import axios from "axios";
import * as cryptoService from "./crypto.service";
require("dotenv").config();
const jwt = require("jsonwebtoken");
const monday = mondaySdk();

// "https://7ab5-2a0e-9cc0-2411-3000-7912-989f-c26e-17ae.ngrok.io";
const domain =
  "https://27cd-2a0e-9cc0-2447-e900-142a-630b-5983-6007.eu.ngrok.io";
// process.env.NODE_ENV === "production"
//   ? "https://create-group-integration.herokuapp.com"
//   : "http://localhost:3030";

async function getUserBoards(userDomain) {
  // const encryptedUserDomain = cryptoService.encrypt(userDomain);
  // console.log(`getUserBoards -> `, `${domain}/getUserBoards`);
  console.log(`getUserBoards -> userDomain`, userDomain);
  const boardRelations = await axios.get(`${domain}/api/monday/${userDomain}`);
  return boardRelations;
}
async function add(fatherBoard, subIds, userId, userDomain) {
  const relation = {
    relation: {
      mainBoard: fatherBoard,
      subBoards: subIds,
      userId,
      userDomain,
    },
  };
  console.log(`add -> relation`, relation);
  await axios.post(`${domain}/api/monday/add`, relation);
  return relation.relation;
}
async function update(mainBoard, subBoards, userId, id, userDomain) {
  const relation = {
    relation: { mainBoard, subBoards, userId, id, userDomain },
  };
  console.log(
    `update -> mainBoard, subBoards, userId, id`,
    mainBoard,
    subBoards,
    userId,
    id
  );
  await axios.post(`${domain}/api/monday/update`, {
    mainBoard,
    subBoards,
    userId,
    id,
  });
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
    domain + "/api/monday" + endpoint
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
    domain + "/api/monday" + endpoint
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
  await axios.delete(`${domain}/api/monday/deleteRelation/${_id}`);
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
