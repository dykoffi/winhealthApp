(this.webpackJsonpwin_health=this.webpackJsonpwin_health||[]).push([[14],{56:function(e,n,t){"use strict";t.d(n,"a",(function(){return l}));var a=t(0),r=new(t(15).a),o=r.get("user",{path:"/"}),l={theme:{primary:"#0a7ec2e5",primaryLight:"#0a7fc2a6",secondary:"#97bf0f",secondaryDark:"#87ac0f"},user:r.get("user",{path:"/"}),permissions:(null===o||void 0===o?void 0:o.permissionsprofil)?JSON.parse(r.get("user",{path:"/"}).permissionsprofil):null},i=Object(a.createContext)(l);n.b=i},768:function(e,n,t){"use strict";t.r(n);var a=t(0),r=t.n(a),o=t(1),l=t(15),i=t(56),c=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(9),t.e(13)]).then(t.bind(null,453))})),u=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(11)]).then(t.bind(null,736))})),p=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(6)]).then(t.bind(null,735))})),s=r.a.lazy((function(){return Promise.all([t.e(0),t.e(1),t.e(2),t.e(3),t.e(8)]).then(t.bind(null,737))})),m=r.a.lazy((function(){return Promise.all([t.e(0),t.e(2),t.e(10),t.e(12)]).then(t.bind(null,733))}));n.default=function(){return r.a.createElement("div",{id:"App",className:"row"},r.a.createElement(i.b.Provider,{value:i.a},r.a.createElement(o.b,{render:function(e){var n=new l.a;return"/qr"===e.location.pathname?r.a.createElement(o.a,{to:"/qr"}):n.get("user",{path:"/"})?r.a.createElement(o.a,{to:"/".concat(n.get("currentPage",{path:"/"}),"/")}):r.a.createElement(o.a,{to:"/connexion"})}}),r.a.createElement(o.b,{path:"/connexion",component:c}),r.a.createElement(o.b,{path:"/admin",component:u}),r.a.createElement(o.b,{path:"/gap",component:p}),r.a.createElement(o.b,{path:"/dpi",component:s}),r.a.createElement(o.b,{path:"/qr",component:m})))}}}]);