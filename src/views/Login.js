import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";
import mondayService from "../services/mondayService";
import { DefaultButton, ButtonType } from "office-ui-fabric-react";
import { useNavigate } from "react-router-dom";
require("dotenv").config();

const monday = mondaySdk();
export default function Login({ oAuthLogin, isUserExist }) {
  const navigate = useNavigate();
  // useEffect(() => {
  //   checkForUsers();
  // }, [userEmail]);

  return (
    <div className="login">
      {isUserExist && navigate("/controller")}
      <h1 className="login-header">Welcome to E.S.L's AutoLink</h1>
      <h3 className="login-sec-header">
        To continue, please click on the "connect to monday" button
      </h3>
      <DefaultButton
        className="add-button connect-btn"
        buttonType={ButtonType.hero}
        iconProps={{ iconName: "ChevronRight" }}
        onClick={oAuthLogin}
      >
        Connect to monday.com
      </DefaultButton>
    </div>
  );
}
