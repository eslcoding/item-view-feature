import React, { useEffect, useState } from "react";
import Select from "react-select";
import boardService from "../services/boardService";
import mondaySdk from "monday-sdk-js";
const monday = mondaySdk();

export default function Relation({
  relation,
  boards,
  boardNames,
  userId,
  deleteRelation,
}) {
  console.log(`relation`, relation);
  const [boardRelation, setBoardRelation] = useState({
    mainBoard: {
      board: { value: 0, label: "" },
      column: { value: "", label: "" },
    },
    subBoards: [],
    userId,
    _id: relation._id,
  });
  const [mainBoardColumns, setMainBoardColumns] = useState();
  // console.log(`Relation -> boardRelationId`, boardRelation._id);

  useEffect(() => {
    addBoardsNames();
  }, []);
  const getMainBoardColumns = async (boardId) => {
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
      // return (arr[i] = { value: column.id, label: column.title });
    });
    setMainBoardColumns(columns);
    // const formattedColumns = columns.forEach(column);
    // console.log(`getFatherBoardColumns -> columns`, columns);
  };

  const editRelation = async () => {
    const simpSubBoards = boardRelation.subBoards.map((sub) =>
      Number(sub.value)
    );
    const res = await boardService.update(
      boardRelation.mainBoard,
      simpSubBoards,
      userId,
      boardRelation._id
    );
    // setBoardRelation(res);
    addBoardsNames(res);
  };
  const addBoardsNames = (object = relation) => {
    const tempRelation = {
      mainBoard: {
        board: { value: 0, label: "" },
        column: { value: "", label: "" },
      },
      subBoards: [],
      _id: relation._id,
      userId: boardRelation.userId,
    };
    tempRelation.mainBoard = object.mainBoard;
    tempRelation.subBoards = object?.subBoards?.map(
      (subBoard) =>
        boards?.filter((board) => Number(board.value) === subBoard)[0]
    );

    console.log(`addBoardsNames -> tempRelation`, tempRelation);
    setBoardRelation(tempRelation);
  };
  const onSetRelation = (kind, newBoards) => {
    console.log(`onSetRelation -> newBoards`, newBoards);
    // console.log(`onSetRelation -> userId`, userId);
    // console.log(`onSetRelation -> newBoards`, newBoards);
    let newRelation = {
      userId: userId,
      mainBoard: boardRelation.mainBoard,
      subBoards: boardRelation.subBoards,
      _id: relation._id,
    };
    console.log(`onSetRelation -> boardRelation`, boardRelation);
    console.log(`onSetRelation -> newRelation`, newRelation);
    if (kind === "sub") {
      newRelation.subBoards = newBoards;
    } else {
      newRelation.mainBoard.board = newBoards;
    }
    setBoardRelation(newRelation);
    getMainBoardColumns(newRelation.mainBoard.board.value);
    // console.log(`onSetRelation -> newRelation`, newRelation);
  };

  return (
    // <div className="relation">
    <div className="content">
      <Select
        placeholder="Choose a main board"
        value={boardRelation.mainBoard?.board}
        options={boardNames}
        defaultValue={boardRelation.mainBoard?.board}
        // isDisabled={edit}
        onChange={(boards) => onSetRelation("main", boards)}
      />
      <Select
        placeholder="Choose a dropdown"
        value={boardRelation.mainBoard?.column}
        // options={boardNames}
        defaultValue={boardRelation.mainBoard?.column}
        // isDisabled={edit}
        onChange={(boards) => onSetRelation("main", boards)}
      />
      <Select
        isMulti
        placeholder="Choose sub boards"
        value={boardRelation.subBoards}
        options={boardNames}
        defaultValue={boardRelation.subBoards}
        onChange={(boards) => onSetRelation("sub", boards)}
      />
      <button className="add-button" onClick={editRelation}>
        Update
      </button>
      <button
        className="add-button"
        onClick={() => deleteRelation(relation._id)}
      >
        delete
      </button>
    </div>
  );
}
