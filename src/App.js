import "./App.css";
import React, { lazy, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";

import mondaySdk from "monday-sdk-js";
import RelationController from "./views/RelationController";
import Login from "./views/Login";
import Close from "./cmps/Close";
const monday = mondaySdk();
// const RelationController = lazy(() => import("./cmps/RelationController"));

export default function App() {
  const [context, setContext] = useState();
  const [slug, setSlug] = useState();
  const [userId, setUserId] = useState();
  const [userEmail, setUserEmail] = useState();
  const [user, setUser] = useState();

  useEffect(() => {
    getContext();
  }, []);
  useEffect(() => {
    context && setUserId(Number(context?.user?.id));
  }, [context]);
  useEffect(() => {
    userId && getSlug();
  }, [userId]);

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
              <Login
                context={context}
                slug={slug}
                userEmail={userEmail}
                userId={userId}
                onSetUser={onSetUser}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}
