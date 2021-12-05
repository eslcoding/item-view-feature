import React, { useEffect, useState } from "react";
import Select from "react-select";
import boardService from "../services/boardService";

export default function Relation({ relation, boards, boardNames, userId }) {
  // console.log(`Relation -> relation`, relation);
  // const [edit, setEdit] = useState(false)
  const [boardRelation, setBoardRelation] = useState({
    mainBoard: { value: 0, label: "" },
    subBoards: [],
    userId,
    _id: relation._id,
  });
  // console.log(`Relation -> boardRelationId`, boardRelation._id);

  useEffect(() => {
    addBoardsNames();
  }, []);
  const editRelation = async () => {
    const simpSubBoards = boardRelation.subBoards.map((sub) =>
      Number(sub.value)
    );
    const res = await boardService.update(
      Number(boardRelation.mainBoard.value),
      simpSubBoards,
      userId,
      boardRelation._id
    );
    // setBoardRelation(res);
    addBoardsNames(res);
  };
  const addBoardsNames = (object = relation) => {
    const tempRelation = {
      mainBoard: { value: 0, label: "" },
      subBoards: [],
      _id: relation._id,
      userId: boardRelation.userId,
    };
    tempRelation.mainBoard = boards?.filter(
      (board) => board.value == object.mainBoard
    )[0];
    tempRelation.subBoards = object?.subBoards.map(
      (subBoard) =>
        boards?.filter((board) => Number(board.value) === subBoard)[0]
    );

    // console.log(`addBoardsNames -> tempRelation`, tempRelation);
    setBoardRelation(tempRelation);
  };
  const onSetRelation = (kind, newBoards) => {
    // console.log(`onSetRelation -> userId`, userId);
    // console.log(`onSetRelation -> newBoards`, newBoards);
    let newRelation = {
      userId: userId,
      mainBoard: boardRelation.mainBoard,
      subBoards: boardRelation.subBoards,
      _id: relation._id,
    };
    if (kind === "sub") {
      newRelation.subBoards = newBoards;
    } else {
      newRelation.mainBoard = newBoards;
    }
    setBoardRelation(newRelation);
    // console.log(`onSetRelation -> newRelation`, newRelation);
  };

  return (
    // <div className="relation">
    <div className="content">
      <Select
        placeholder="Choose a main board"
        value={boardRelation.mainBoard}
        options={boardNames}
        defaultValue={boardRelation.mainBoard}
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
    </div>
  );
}
