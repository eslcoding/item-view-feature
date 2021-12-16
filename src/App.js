import "./App.css";
import React, { lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import mondaySdk from "monday-sdk-js";
import RelationController from "./views/RelationController";
import Login from "./views/Login";
import Close from "./cmps/Close";
import mondayService from "./services/mondayService";
import Footer from "./cmps/Footer";

const domain =
  "https://63bc-2a0e-9cc0-2447-e900-142a-630b-5983-6007.ap.ngrok.io";
// process.env.NODE_ENV === "production"
//   ? "https://create-group-integration.herokuapp.com"
//   : "http://localhost:3030";
const monday = mondaySdk();
// const RelationController = lazy(() => import("./cmps/RelationController"));

export default function App() {
  const [context, setContext] = useState();
  const [slug, setSlug] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [user, setUser] = useState();
  const [isUserExist, setIsUserExist] = useState(false);

  useEffect(() => {
    getContext();
  }, []);
  useEffect(() => {
    context && setUserId(Number(context?.user?.id));
  }, [context]);
  useEffect(() => {
    userId && getSlug();
  }, [userId]);
  useEffect(() => {
    console.log(`useEffect -> userEmail`, userEmail);
    userEmail && checkForUsers();
  }, [userEmail]);
  useEffect(() => {
    user && setIsUserExist(true);
  }, [user]);
  const checkForUsers = async () => {
    console.log(`checkForUsers -> userEmail`, userEmail);
    const user = await mondayService.getUserByEmail(userEmail);
    if (user) {
      console.log(`checkForUsers -> user`, user);
      onSetUser(user);
    }
  };
  const getContext = async () => {
    const contextData = await monday.get("context");
    setContext(contextData?.data);
    console.log(`getContext -> contextData`, contextData);
  };
  const onSetUser = (dbUser) => {
    setUser(dbUser);
  };
  const getSlug = async () => {
    const query = `
    query{
      users(ids:${userId}){
        email
        account{
          slug
        }
      }
    }`;
    console.log(`getSlug -> query`, query);
    const res = await monday.api(query);
    setUserEmail(res.data.users[0].email);
    console.log(`getSlug -> res.data.users[0].email`, res.data.users[0].email);
    setSlug(res.data.users[0].account.slug);
    console.log(
      `getContext -> res.data.users[0].account.slug`,
      res.data.users[0].account.slug
    );
  };
  const oAuthLogin = async () => {
    const popup = window.open(
      `${domain}/api/auth/authorization/${userEmail}, "_blank", "toolbar=yes,scrollbars=yes,resizable=yes,top=500,left=500,width=800,height=800"`
    );
    let DBuser;
    const interval = setInterval(async () => {
      if (popup.closed) {
        console.log("hey");
        clearInterval(interval);
        DBuser = await mondayService.getUserByEmail(userEmail);
        console.log(`interval -> user`, DBuser);
        user || onSetUser(DBuser?.data);
      }
    }, 500);
  };

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route
            exact
            path="/controller"
            element={<RelationController context={context} user={user} />}
          />
          <Route exact path="/close" element={<Close />} />
          <Route
            exact
            path="/"
            element={
              <Login oAuthLogin={oAuthLogin} isUserExist={isUserExist} />
            }
          />
        </Routes>
      </BrowserRouter>
      <Footer />
    </div>
  );
}
