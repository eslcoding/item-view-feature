import React from "react";
import { useState, useEffect } from "react";
import "../App.css";
import mondaySdk from "monday-sdk-js";
import "monday-ui-react-core/dist/main.css";
import boardService from "../services/boardService";
import Select from "react-select";
import Relation from "../cmps/Relation";
import Loader from "../cmps/Loader";

//Explore more Monday React Components here: https://style.monday.com/
// import AttentionBox from "monday-ui-react-core/dist/AttentionBox.js";
// import Button from "monday-ui-react-core/dist/Button.js";
// import MenuButton from "monday-ui-react-core/dist/MenuButton.js";
// import { FontIcon } from "office-ui-fabric-react/lib/Icon";

const monday = mondaySdk();

// export default function RelationController({ context }) {
export default function RelationController({ context, userId, user }) {
  console.log(`RelationController -> user`, user);
  const [boards, setBoards] = useState();
  const [fatherBoard, setFatherBoard] = useState({});
  const [fatherBoardColumns, setFatherBoardColumns] = useState();
  const [childBoards, setChildBoards] = useState([]);
  // const [userId, setUserId] = useState();
  const [relations, setRelations] = useState([]);
  const [loading, SetLoading] = useState(true);

  useEffect(() => {
    getContext();
  }, []);

  useEffect(() => {
    boards && user && getBoardRelations();
  }, [boards]);
  // useEffect(() => {}, []);
  const getContext = async () => {
    try {
      const query = `query{
        boards(limit:2000){
          id
          name
        }
      }`;
      const res = await monday.api(query);
      const labeledBoards = res?.data?.boards?.map((board) => {
        return { value: board.id, label: board.name };
      });

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

    const columns = [];
    let columnData = res.data.boards[0].columns?.forEach((column) => {
      if (column.type === "dropdown")
        columns.push({ value: column.id, label: column.title });
    });
    setFatherBoardColumns(columns);
  };
  const getBoardRelations = async () => {
    console.log("hey getboards");
    const boardRelations = await boardService.getUserBoards(user.userDomain);
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

    const newRelation = await boardService.add(
      fatherBoard,
      subIds,
      userId,
      user.userDomain
    );

    // console.log(`addBoardsRelations -> fatherBoard`, fatherBoard);
    const res2 = await boardService.createNewItemWebHook(
      Number(fatherBoard.board.value),
      fatherBoard.column.value
    );
    const subBoards = childBoards.map((board) => board.value);
    const res = subBoards?.forEach(
      async (board) => await boardService.createMirrorWebHook(board)
    );

    setRelations([...relations, newRelation]);
    setFatherBoard();
    setChildBoards();
  };

  const boardNames = boards?.filter(
    (board) => board?.value !== fatherBoard?.board?.value
  );
  const deleteRelation = async (_id) => {
    await boardService.deleteRelation(_id);
    const filteredRelations = relations.filter(
      (relation) => relation._id !== _id
    );
    setRelations(filteredRelations);
  };
  return (
    <div className="relation-controller">
      {loading ? (
        <Loader />
      ) : (
        // context && (
        <>
          <div className="content new">
            <h1>Create new relation</h1>
            {boards && (
              <div>
                <Select
                  placeholder="Choose a main board"
                  value={fatherBoard?.board}
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
        // )
      )}
    </div>
  );
}
