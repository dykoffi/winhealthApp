(this.webpackJsonpwin_health=this.webpackJsonpwin_health||[]).push([[12],{138:function(e,t){},212:function(e,t,a){e.exports=a.p+"static/media/logo4.59ba5830.png"},47:function(e,t,a){"use strict";a.d(t,"a",(function(){return r})),a.d(t,"b",(function(){return c}));var l=a(137),n=a.n(l),r={timeout:1e3,url:"http://".concat("localhost:8000"),local:"http://".concat("localhost",":3000")},c=n()("http://localhost:8000")},733:function(e,t,a){"use strict";a.r(t);var l=a(52),n=a(0),r=a.n(n),c=a(196),m=a(212),s=a.n(m),u=a(734),i=a.n(u),o=a(47),E=a(420),p=a(53),b=a.n(p);t.default=function(){var e=Object(n.useState)(null),t=Object(l.a)(e,2),a=t[0],m=t[1],u=Object(n.useState)(null),p=Object(l.a)(u,2),f=(p[0],p[1],Object(n.useState)(null)),h=Object(l.a)(f,2),d=h[0],g=h[1];return Object(n.useEffect)((function(){o.b.on("project_facture",(function(e){console.log(e),g(e)}))}),[]),r.a.createElement("div",{className:"col-12 page grey darken-4",id:"qr"},d?r.a.createElement("div",{className:"row"},r.a.createElement("section",{style:{height:"100vh"},className:"col-6 offset-3 white"},r.a.createElement("h3",{className:"text-center mt-3"},"Facture N\xb0 ",d.numerofacture),r.a.createElement("div",{className:"row p-4"},r.a.createElement("div",{className:"col-4 p-2 bg-light"},r.a.createElement("h4",null,"Patient"),r.a.createElement("small",null,r.a.createElement("b",null,"IPP : ")," ",d.ipppatient),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Nom :")," ",d.nompatient),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Prenoms :")," ",d.prenomspatient),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Naissance :")," ",d.datenaissancepatient," \xe0 ",d.lieunaissancepatient),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Contact : ")," ",d.contactpatient),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Domicile : ")," ",d.habitationpatient),r.a.createElement("br",null),r.a.createElement("hr",{className:"bg-light"}),r.a.createElement("h4",null,"Assurance"),r.a.createElement("small",null,r.a.createElement("b",null,"Gestionnaire : ")," ",d.gestionnaire),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"B\xe9n\xe9ficiaire :")," ",d.beneficiaire),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Assur\xe9 principal :")," ",d.assureprinc),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Taux de couverture :")," ",d.taux),r.a.createElement("br",null),r.a.createElement("hr",{className:"bg-light"}),r.a.createElement("h4",null,"Compte sante"),r.a.createElement("small",null,r.a.createElement("b",null,"N\xb0 compte : ")," ",d.numerocompte),r.a.createElement("br",null),r.a.createElement("small",null,r.a.createElement("b",null,"Solde :")," ",d.montantcompte),r.a.createElement("br",null),r.a.createElement("div",{className:"white mt-5"},r.a.createElement("img",{src:i.a,alt:"",className:"col-8 offset-2 my-3"}))),r.a.createElement("div",{className:"col-8 px-4 text-center"},r.a.createElement("b",null,"Sejour N\xb0 ",d.numerosejoure," du ",d.datedebutsejour," au ",d.datefinsejour),r.a.createElement("br",null),r.a.createElement("h4",{className:"mt-5"},r.a.createElement("b",null,"Part du Patient : ")," ",d.restepatientfacture," F CFA ",r.a.createElement("br",null),r.a.createElement("b",null,"part de l'assurance :")," ",d.partassurancefacture," F CFA")))),r.a.createElement("section",{style:{height:"100vh"},className:"col-3 d-flex flex-column justify-content-center text-center"},r.a.createElement("i",{className:"mdi-navigation-fullscreen mdi-5x text-warning  animated infinite flash"}),r.a.createElement("p",{className:"text-white font-weight-bold"},"Scanner votre Qr code pour valider la transaction sur votre compte"),r.a.createElement(c.a,{delay:500,style:{width:"100%"},onError:function(e){console.log(e)},onScan:function(e){null!=e&&b()({url:"".concat(o.a.url,"/gap/verify/compte/").concat(e)}).then((function(e){0===e.data.rows.lenght?m("false"):(m("true"),o.b.emit("valid_paiement",d.numerofacture,d.restepatientfacture),g(!1),m("off"),new Audio("".concat(o.a.url,"/son.mp3")).play())}))}}),r.a.createElement("p",{className:"bg-warning p-2"},r.a.createElement("b",null,"Vous serai d\xe9bit\xe9 de ",d.restepatientfacture," F CFA sur votre compte")),"false"===a&&r.a.createElement(E.a,{variant:"filled",severity:"error"},"Erreur"),"true"===a&&r.a.createElement(E.a,{variant:"filled",severity:"success"},"Transaction reussie"))):r.a.createElement("div",{className:"row d-flex justify-content-center align-items-center",style:{height:"100vh"}},r.a.createElement("img",{src:s.a,className:"infinite animated pulse",alt:"",style:{height:150}})))}},734:function(e,t,a){e.exports=a.p+"static/media/qr.294d3e5c.png"}}]);