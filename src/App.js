import React from "react";
import { useState, useEffect } from "react";
import "./App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import boardService from "./services/boardService";
import Select from "react-select";
import Relation from "./cmps/Relation";
import Loader from "./cmps/Loader";

//Explore more Monday React Components here: https://style.monday.com/
// import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
// import Button from "monday-ui-react-core/dist/Button.js";
// import MenuButton from "monday-ui-react-core/dist/MenuButton.js";
// import { FontIcon } from "office-ui-fabric-react/lib/Icon";

const monday = mondaySdk();

export default function App() {
  const [boards, setBoards] = useState();
  const [fatherBoard, setFatherBoard] = useState();
  const [childBoards, setChildBoards] = useState([]);
  const [userId, setUserId] = useState();
  const [relations, setRelations] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    getContext();
  }, []);

  useEffect(() => {
    getBoard();
  }, [fatherBoard]);
  useEffect(() => {
    userId && boards && getBoardRelations();
  }, [userId, boards]);
  // useEffect(() => {}, []);
  const getContext = async () => {
    const context = await monday.get("context");
    setUserId(Number(context.data.user.id));
    try {
      const query = `query{
        boards(limit:2000){
          id
          name
        }
      }`;
      const res = await monday.api(query);
      // console.log(`getContext -> res`, res.data);
      const labeledBoards = res?.data?.boards?.map((board) => {
        return { value: board.id, label: board.name };
      });
      // console.log(`labeledBoards -> labeledBoards`, labeledBoards);
      setBoards(labeledBoards);
    } catch (err) {
      console.log(`getContext -> err`, err);
    }
  };

  const getBoardRelations = async () => {
    const boardRelations = await boardService.getUserBoards(userId);
    // console.log(`getBoardRelations -> boardRelations`, boardRelations);
    setRelations(boardRelations?.data);
    SetLoading(false);
  };
  const getBoard = async () => {
    const selected = boards?.find((board) => board.name === fatherBoard);
    // console.log(`getBoard -> selected`, selected);
  };
  const onSetFatherBoard = (board) => {
    setFatherBoard(board);
  };

  const onSetChildBoards = (chosenBoards) => {
    setChildBoards(chosenBoards);
  };
  const addBoardsRelations = async () => {
    const subIds = childBoards.map((board) => Number(board.value));
    // console.log(
    //   `addBoardsRelations -> fatherBoard, childBoards, userId`,
    //   fatherBoard.value,
    //   subIds,
    //   userId
    // );
    const newRelation = await boardService.add(
      Number(fatherBoard.value),
      subIds,
      userId
    );
    setRelations([...relations, newRelation]);
  };

  // const fatherBoardName = {
  //   value: fatherBoard?.value,
  //   label: fatherBoard?.label || "Choose a main board",
  // };
  const boardNames = boards?.filter(
    (board) => board?.value !== fatherBoard?.value
  );
  // console.log(`App -> boardNames`, boardNames);
  // const childBoardNames = childBoards?.filter((child) => {
  //   return { label: child.name, value: child.id };
  // });

  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content">
            <h1>Create new relation</h1>
            {boards && (
              <div>
                <Select
                  placeholder="Choose a main board"
                  value={fatherBoard}
                  options={boardNames}
                  onChange={(board) => onSetFatherBoard(board)}
                />
                <Select
                  isMulti
                  placeholder="Choose sub boards"
                  value={childBoards}
                  options={boardNames}
                  onChange={(board) => onSetChildBoards(board)}
                />
              </div>
            )}

            <button className="add-button" onClick={addBoardsRelations}>
              Add boards relation
            </button>
          </div>
          {/* <button onClick={addBoardsNames}>names</button> */}
          <div className="edit-boards">
            <h1> edit existing relations</h1>
            {relations &&
              relations?.map((relation, i) => (
                <Relation
                  key={i}
                  relation={relation}
                  boardNames={boardNames}
                  boards={boards}
                  userId={userId}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
}
