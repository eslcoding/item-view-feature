import React, { useEffect, useState } from "react";
import mondaySdk from "monday-sdk-js";
import mondayService from "../services/mondayService";
import { DefaultButton, ButtonType } from "office-ui-fabric-react";
import { useNavigate } from "react-router-dom";
require("dotenv").config();
const domain =
  "https://27cd-2a0e-9cc0-2447-e900-142a-630b-5983-6007.eu.ngrok.io";
// process.env.NODE_ENV === "production"
//   ? "https://create-group-integration.herokuapp.com"
//   : "http://localhost:3030";
// import axios from "axios";
const monday = mondaySdk();
export default function Login({ context, slug, userEmail, userId, onSetUser }) {
  const [isUserExist, setIsUserExist] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    checkForUsers();
  }, [userEmail]);
  const checkForUsers = async () => {
    console.log(`checkForUsers -> userEmail`, userEmail);
    const user = await mondayService.getUserByEmail(userEmail);
    if (user) {
      console.log(`checkForUsers -> user`, user);
      onSetUser(user);
      setIsUserExist(true);
    }
  };
  const oAuthLogin = async () => {
    // const user = await mondayService.getUserToken(userEmail, userId);
    const popup = window.open(
      `${domain}/api/auth/authorization/${userEmail}, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800"`
    );
    let user;
    const interval = setInterval(async () => {
      if (popup.closed) {
        console.log("hey");
        clearInterval(interval);
        user = await mondayService.getUserByEmail(userEmail);
        console.log(`interval -> user`, user);
        onSetUser(user?.data);
        user && setIsUserExist(true);
      }
    }, 500);
  };
  return (
    <div className="login">
      {isUserExist && navigate("/controller")}
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
