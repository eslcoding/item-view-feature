(this["webpackJsonpmonday-integration-quickstart-app"]=this["webpackJsonpmonday-integration-quickstart-app"]||[]).push([[0],{151:function(e,n,t){e.exports=t(322)},156:function(e,n,t){},197:function(e,n){},199:function(e,n){},213:function(e,n){},215:function(e,n){},243:function(e,n){},245:function(e,n){},246:function(e,n){},252:function(e,n){},254:function(e,n){},272:function(e,n){},274:function(e,n){},286:function(e,n){},289:function(e,n){},322:function(e,n,t){"use strict";t.r(n);var a,r=t(0),o=t.n(r),c=t(36),u=t.n(c),i=(t(156),t(2)),s=t.n(i),l=t(6),d=t(7),p=(t(75),t(150)),f=t(5),v=t(16),b=t.n(v),m=t(73),h=t(149),g=(t(172),t(23)),O=t(20),E=t.n(O);t(88).config();var w=t(193),j=b()();console.log("process.env",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).CLIENT_ID);var x="https://d614-2a0e-9cc0-23d9-5700-9dc2-3d75-1056-3a26.eu.ngrok.io";function y(){return(y=Object(l.a)(s.a.mark((function e(n){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("getUserBoards -> userId",n),console.log("getUserBoards -> ","".concat(x,"/getUserBoards")),e.next=4,E.a.post("".concat(x,"/getUserBoards"),{userId:n});case 4:return t=e.sent,e.abrupt("return",t);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function _(){return(_=Object(l.a)(s.a.mark((function e(n,t,a){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.post("".concat(x,"/add"),{mainBoard:n,subBoards:t,userId:a});case 2:return e.abrupt("return",{mainBoard:n,subBoards:t,userId:a});case 3:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function k(e,n,t,a){return B.apply(this,arguments)}function B(){return(B=Object(l.a)(s.a.mark((function e(n,t,a,r){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("update -> mainBoard, subBoards, userId, id",n,t,a,r),e.next=3,E.a.post("".concat(x,"/update"),{mainBoard:n,subBoards:t,userId:a,id:r});case 3:return e.abrupt("return",{mainBoard:n,subBoards:t,userId:a,id:r});case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function S(){return(S=Object(l.a)(s.a.mark((function e(n,t){var a,r,o=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=o.length>2&&void 0!==o[2]?o[2]:"createGroup",r="\n  mutation{\n    create_webhook (board_id:".concat(n,", url:").concat(JSON.stringify(x+"/"+a),", event:change_specific_column_value, config: ").concat(JSON.stringify(JSON.stringify({columnId:t})),"){\n      id\n      board_id\n    }\n  }"),e.next=4,j.api(r);case 4:e.sent;case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(){return(C=Object(l.a)(s.a.mark((function e(n){var t,a,r,o=arguments;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=o.length>1&&void 0!==o[1]?o[1]:"mirrorItemKR",console.log("createMirrorWebHook -> boardIds",n),a="mutation{\n    create_webhook (board_id:".concat(n,", url:").concat(JSON.stringify(x+"/"+t),", event:create_item){\n      id\n      board_id\n    }\n  }"),console.log("createMirrorWebHook -> mutation",a),e.next=6,j.api(a);case 6:r=e.sent,console.log("createMirrorWebHook -> res",r);case 8:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function N(){return(N=Object(l.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.delete("".concat(x,"/deleteRelation/").concat(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var I=(a={getUserBoards:function(e){return y.apply(this,arguments)},add:function(e,n,t){return _.apply(this,arguments)},update:k,decrypt:function(e){console.log("decrypt -> process.env.CLIENT_SECRET",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).SIGNING_SECRET);var n=w.verify(e,"642b0bb8bc50d1e365e9ba0a07e3dc21");return console.log("decrypt -> decryptedToken",n),n}},Object(g.a)(a,"update",k),Object(g.a)(a,"createNewItemWebHook",(function(e,n){return S.apply(this,arguments)})),Object(g.a)(a,"createMirrorWebHook",(function(e){return C.apply(this,arguments)})),Object(g.a)(a,"deleteRelation",(function(e){return N.apply(this,arguments)})),a),T=t(21),R=b()();function W(e){var n,t,a,c,u=e.relation,i=e.boards,p=e.boardNames,f=e.userId,v=e.deleteRelation,b=Object(r.useState)({mainBoard:{board:{value:0,label:""},column:{value:"",label:""}},subBoards:[],userId:f,_id:u._id}),m=Object(d.a)(b,2),h=m[0],g=m[1],O=Object(r.useState)(),E=Object(d.a)(O,2),w=(E[0],E[1]);Object(r.useEffect)((function(){y()}),[]);var j=function(){var e=Object(l.a)(s.a.mark((function e(n){var t,a,r,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="query{\n      boards(ids:".concat(n,"){\n        columns{\n          type\n          title\n          id\n        }\n      }\n    }"),e.next=3,R.api(a);case 3:r=e.sent,o=[],null===(t=r.data.boards[0].columns)||void 0===t?void 0:t.forEach((function(e){"dropdown"===e.type&&o.push({value:e.id,label:e.title})})),w(o);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),x=function(){var e=Object(l.a)(s.a.mark((function e(){var n,t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=h.subBoards.map((function(e){return Number(e.value)})),e.next=3,I.update(h.mainBoard,n,f,h._id);case 3:t=e.sent,y(t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:u,n={mainBoard:{board:{value:0,label:""},column:{value:"",label:""}},subBoards:[],_id:u._id,userId:h.userId};n.mainBoard=e.mainBoard,n.subBoards=null===e||void 0===e?void 0:e.subBoards.map((function(e){return null===i||void 0===i?void 0:i.filter((function(n){return Number(n.value)===e}))[0]})),console.log("addBoardsNames -> tempRelation",n),g(n)},_=function(e,n){console.log("onSetRelation -> newBoards",n);var t={userId:f,mainBoard:h.mainBoard,subBoards:h.subBoards,_id:u._id};console.log("onSetRelation -> boardRelation",h),console.log("onSetRelation -> newRelation",t),"sub"===e?t.subBoards=n:t.mainBoard.board=n,g(t),j(t.mainBoard.board.value)};return o.a.createElement("div",{className:"content"},o.a.createElement(T.a,{placeholder:"Choose a main board",value:null===(n=h.mainBoard)||void 0===n?void 0:n.board,options:p,defaultValue:null===(t=h.mainBoard)||void 0===t?void 0:t.board,onChange:function(e){return _("main",e)}}),o.a.createElement(T.a,{placeholder:"Choose a dropdown",value:null===(a=h.mainBoard)||void 0===a?void 0:a.column,defaultValue:null===(c=h.mainBoard)||void 0===c?void 0:c.column,onChange:function(e){return _("main",e)}}),o.a.createElement(T.a,{isMulti:!0,placeholder:"Choose sub boards",value:h.subBoards,options:p,defaultValue:h.subBoards,onChange:function(e){return _("sub",e)}}),o.a.createElement("button",{className:"add-button",onClick:x},"Update"),o.a.createElement("button",{className:"add-button",onClick:function(){return v(u._id)}},"delete"))}function D(){return o.a.createElement("div",null,o.a.createElement("img",{src:"https://upload.wikimedia.org/wikipedia/commons/c/c7/Loading_2.gif",className:"loader"}))}var U=b()();function L(e){e.context;var n=e.userId,t=Object(r.useState)(),a=Object(d.a)(t,2),c=a[0],u=a[1],i=Object(r.useState)({}),p=Object(d.a)(i,2),f=p[0],v=p[1],b=Object(r.useState)(),g=Object(d.a)(b,2),O=g[0],E=g[1],w=Object(r.useState)([]),j=Object(d.a)(w,2),x=j[0],y=j[1],_=Object(r.useState)([]),k=Object(d.a)(_,2),B=k[0],S=k[1],C=Object(r.useState)(!0),N=Object(d.a)(C,2),R=N[0],L=N[1];Object(r.useEffect)((function(){H()}),[]),Object(r.useEffect)((function(){n&&c&&P()}),[n,c]);var H=function(){var e=Object(l.a)(s.a.mark((function e(){var n,t,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,"query{\n        boards(limit:2000){\n          id\n          name\n        }\n      }",e.next=4,U.api("query{\n        boards(limit:2000){\n          id\n          name\n        }\n      }");case 4:a=e.sent,r=null===a||void 0===a||null===(n=a.data)||void 0===n||null===(t=n.boards)||void 0===t?void 0:t.map((function(e){return{value:e.id,label:e.name}})),u(r),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.log("getContext -> err",e.t0);case 12:case"end":return e.stop()}}),e,null,[[0,9]])})));return function(){return e.apply(this,arguments)}}(),K=function(){var e=Object(l.a)(s.a.mark((function e(n){var t,a,r,o;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a="query{\n      boards(ids:".concat(n,"){\n        columns{\n          type\n          title\n          id\n        }\n      }\n    }"),e.next=3,U.api(a);case 3:r=e.sent,o=[],null===(t=r.data.boards[0].columns)||void 0===t?void 0:t.forEach((function(e){"dropdown"===e.type&&o.push({value:e.id,label:e.title})})),E(o);case 7:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),P=function(){var e=Object(l.a)(s.a.mark((function e(){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.getUserBoards(n);case 2:t=e.sent,console.log("getBoardRelations -> boardRelations",t),S(null===t||void 0===t?void 0:t.data),L(!1);case 6:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),q=function(){var e=Object(l.a)(s.a.mark((function e(){var t,a,r;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=x.map((function(e){return Number(e.value)})),e.next=3,I.add(f,t,n);case 3:return a=e.sent,e.next=6,I.createNewItemWebHook(Number(f.board.value),f.column.value);case 6:e.sent,r=x.map((function(e){return e.value})),null===r||void 0===r?void 0:r.forEach(function(){var e=Object(l.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,I.createMirrorWebHook(n);case 2:return e.abrupt("return",e.sent);case 3:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}()),S([].concat(Object(h.a)(B),[a])),v(),y();case 12:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),M=null===c||void 0===c?void 0:c.filter((function(e){var n;return(null===e||void 0===e?void 0:e.value)!==(null===f||void 0===f||null===(n=f.board)||void 0===n?void 0:n.value)})),A=function(){var e=Object(l.a)(s.a.mark((function e(n){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return console.log("deleteRelation -> _id",n),e.next=3,I.deleteRelation(n);case 3:t=B.filter((function(e){return e._id!==n})),console.log("deleteRelation -> filteredRelations",t),S(t);case 6:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}();return o.a.createElement("div",{className:"relation-controller"},R?o.a.createElement(D,null):o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"content new"},o.a.createElement("h1",null,"Create new relation"),c&&o.a.createElement("div",null,o.a.createElement(T.a,{placeholder:"Choose a main board",value:null===f||void 0===f?void 0:f.board,options:M,onChange:function(e){return function(e){var n=K(e.value);v({board:e,column:n})}(e)}}),o.a.createElement(T.a,{placeholder:"Choose a dropdown",options:O,value:null===f||void 0===f?void 0:f.column,onChange:function(e){return v(Object(m.a)(Object(m.a)({},f),{},{column:e}))}}),o.a.createElement(T.a,{isMulti:!0,placeholder:"Choose sub boards",value:x,options:M,onChange:function(e){y(e)}})),o.a.createElement("button",{className:"add-button",onClick:q},"Add boards relation")),o.a.createElement("div",{className:"edit-boards"},B.length>0&&o.a.createElement("h1",null," edit existing relations"),B&&(null===B||void 0===B?void 0:B.map((function(e,t){return o.a.createElement(W,{deleteRelation:A,key:t,relation:e,boardNames:M,boards:c,userId:n})}))))))}var H="https://d614-2a0e-9cc0-23d9-5700-9dc2-3d75-1056-3a26.eu.ngrok.io";function K(){return(K=Object(l.a)(s.a.mark((function e(n){var t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=n.toLowerCase(),e.next=3,E.a.get("".concat(H,"/users/").concat(n));case 3:return t=e.sent,e.abrupt("return",t);case 5:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function P(){return(P=Object(l.a)(s.a.mark((function e(n){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,E.a.get("".concat(H,"/api/auth/authorization/").concat(n));case 2:case"end":return e.stop()}}),e)})))).apply(this,arguments)}var q={getUserByEmail:function(e){return K.apply(this,arguments)},getUserToken:function(e){return P.apply(this,arguments)}};t(88).config();b()();function M(e){var n=e.context,t=e.slug,a=e.userEmail;console.log("Login -> slug",t),console.log("oAuthLogin -> process.env.CLIENT_ID",Object({NODE_ENV:"production",PUBLIC_URL:"",WDS_SOCKET_HOST:void 0,WDS_SOCKET_PATH:void 0,WDS_SOCKET_PORT:void 0}).CLIENT_ID);var r=function(){var e=Object(l.a)(s.a.mark((function e(){return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,q.getUserToken(a);case 2:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return console.log("Login -> context",n),o.a.createElement("div",{className:"login"},o.a.createElement("button",{onClick:r},"click me"))}var A=b()();function J(){var e=Object(r.useState)(),n=Object(d.a)(e,2),t=n[0],a=n[1],c=Object(r.useState)(),u=Object(d.a)(c,2),i=u[0],v=u[1],b=Object(r.useState)(),m=Object(d.a)(b,2),h=m[0],g=m[1],O=Object(r.useState)(),E=Object(d.a)(O,2),w=E[0],j=E[1];Object(r.useEffect)((function(){x()}),[]),Object(r.useEffect)((function(){var e;t&&g(Number(null===t||void 0===t||null===(e=t.user)||void 0===e?void 0:e.id))}),[t]),Object(r.useEffect)((function(){h&&y()}),[h]);var x=function(){var e=Object(l.a)(s.a.mark((function e(){var n;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,A.get("context");case 2:n=e.sent,a(null===n||void 0===n?void 0:n.data),console.log("getContext -> contextData",n);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),y=function(){var e=Object(l.a)(s.a.mark((function e(){var n,t;return s.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n="\n    query{\n      users(ids:".concat(h,"){\n        email\n        account{\n          slug\n        }\n      }\n    }"),console.log("getSlug -> query",n),e.next=4,A.api(n);case 4:t=e.sent,j(t.data.users[0].email),v(t.data.users[0].account.slug),console.log("getContext -> res.data.users[0].account.slug",t.data.users[0].account.slug);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return o.a.createElement("div",{className:"App"},o.a.createElement(p.a,null,o.a.createElement(f.c,null,o.a.createElement(f.a,{exact:!0,path:"/controller",element:o.a.createElement(L,{context:t})}),o.a.createElement(f.a,{exact:!0,path:"/",element:o.a.createElement(M,{context:t,slug:i,userEmail:w})}))))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));u.a.render(o.a.createElement(J,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},75:function(e,n,t){}},[[151,1,2]]]);
//# sourceMappingURL=main.e5509ae1.chunk.js.map