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
  const [fatherBoard, setFatherBoard] = useState({});
  const [fatherBoardColumns, setFatherBoardColumns] = useState();
  const [childBoards, setChildBoards] = useState([]);
  const [userId, setUserId] = useState();
  const [relations, setRelations] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    getContext();
  }, []);

  useEffect(() => {
    userId && boards && getBoardRelations();
  }, [userId, boards]);
  // useEffect(() => {}, []);
  const getContext = async () => {
    // console.log("hi");
    const context = await monday.get("context");
    // console.log(`getContext -> context`, context);
    const token = await monday.get("sessionToken");
    // console.log(`getContext -> token`, token);
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
  const getFatherBoardColumns = async (boardId) => {
    const query = `query{
      boards(ids:${boardId}){
        columns{
          type
          title
          id
        }
      }
    }`;
    const res = await monday.api(query);
    // console.log(`getFatherBoardColumns -> res`, res);

    const columns = [];
    let columnData = res.data.boards[0].columns?.forEach((column) => {
      if (column.type === "dropdown")
        columns.push({ value: column.id, label: column.title });
      // return (arr[i] = { value: column.id, label: column.title });
    });
    setFatherBoardColumns(columns);
    // const formattedColumns = columns.forEach(column);
    // console.log(`getFatherBoardColumns -> columns`, columns);
  };
  const getBoardRelations = async () => {
    const boardRelations = await boardService.getUserBoards(userId);
    // console.log(`getBoardRelations -> boardRelations`, boardRelations);
    setRelations(boardRelations?.data);
    SetLoading(false);
  };

  const onSetFatherBoard = (board) => {
    const dropdown = getFatherBoardColumns(board.value);
    setFatherBoard({ board: board, column: dropdown });
  };

  const onSetChildBoards = (chosenBoards) => {
    setChildBoards(chosenBoards);
  };
  const addBoardsRelations = async () => {
    const subIds = childBoards.map((board) => Number(board.value));

    const newRelation = await boardService.add(fatherBoard, subIds, userId);
    // console.log(`addBoardsRelations -> newRelation`, newRelation);

    // console.log(`addBoardsRelations -> fatherBoard`, fatherBoard);
    const res2 = await boardService.createNewItemWebHook(
      Number(fatherBoard.board.value),
      fatherBoard.column.value
    );
    const subBoards = childBoards.map((board) => board.value);
    const res = subBoards?.forEach(
      async (board) => await boardService.createMirrorWebHook(board)
    );
    // console.log(`addBoardsRelations -> res`, res);
    // console.log(`addBoardsRelations -> res`, res);
    // console.log(`addBoardsRelations -> res2`, res2);
    setRelations([...relations, newRelation]);
  };

  // const fatherBoardName = {
  //   value: fatherBoard?.value,
  //   label: fatherBoard?.label || "Choose a main board",
  // };
  const boardNames = boards?.filter(
    (board) => board?.value !== fatherBoard?.board?.value
  );
  // console.log(`App -> boardNames`, boardNames);
  // const childBoardNames = childBoards?.filter((child) => {
  //   return { label: child.name, value: child.id };
  // });
  const deleteRelation = async (_id) => {
    console.log(`deleteRelation -> _id`, _id);
    await boardService.deleteRelation(_id);
    const filteredRelations = relations.filter(
      (relation) => relation._id !== _id
    );
    console.log(`deleteRelation -> filteredRelations`, filteredRelations);
    setRelations(filteredRelations);
  };
  return (
    <div className="App">
      {loading ? (
        <Loader />
      ) : (
        <>
          <div className="content new">
            <h1>Create new relation</h1>
            {boards && (
              <div>
                <Select
                  placeholder="Choose a main board"
                  value={fatherBoard.board}
                  options={boardNames}
                  onChange={(board) => onSetFatherBoard(board)}
                />
                <Select
                  placeholder="Choose a dropdown"
                  options={fatherBoardColumns}
                  value={fatherBoard?.column}
                  onChange={(column) =>
                    setFatherBoard({ ...fatherBoard, column })
                  }
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
            {relations.length > 0 && <h1> edit existing relations</h1>}
            {relations &&
              relations?.map((relation, i) => (
                <Relation
                  deleteRelation={deleteRelation}
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
