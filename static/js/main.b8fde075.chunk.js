(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{107:function(e,t,a){},165:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(11),c=a.n(r),o=(a(88),a(63)),l=a(16),i=a(17),u=a(21),p=a(18),m=a(20),h=(a(90),a(24)),d=a.n(h);d.a.initializeApp({apiKey:"AIzaSyCUVExBS8-J9U458sNtB95fwzQNBPSl5Rk",authDomain:"mctracker-42d0f.firebaseapp.com",databaseURL:"https://mctracker-42d0f.firebaseio.com",projectId:"mctracker-42d0f",storageBucket:"mctracker-42d0f.appspot.com",messagingSenderId:"218378060918"});var f=new d.a.auth.GoogleAuthProvider,g=d.a.auth(),b=d.a,E=a(169),v=a(167),y=a(174),S=a(14),k=(a(107),a(64)),x=a.n(k),C=a(65),w=a.n(C),I=a(66),j=a.n(I),A=a(67),O=a.n(A),V=a(68),P=a.n(V),R=a(69),N=a.n(R),U=a(70),B=a.n(U),L=a(71),M=a.n(L),z=a(72),D=a.n(z),T=a(73),J=a.n(T),W=a(74),G=a.n(W),K=a(75),F=a.n(K),Q=a(168),$=a(175),q=a(170),H=a(172),X=function(e){return e&&e.cups&&e.cups.length?e.cups.map(function(t){return s.a.createElement(v.a,{xs:4,sm:2,key:t[1],onClick:function(){e.selectCup(t[1])},style:{padding:"1rem",borderRadius:"5px",backgroundColor:t[1]===e.selectedCup?"lightskyblue":"transparent",textAlign:"center",cursor:"pointer"}},s.a.createElement("img",{src:t[0],className:"cups"}))}):"null"},Y=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handlePointsChange=a.handlePointsChange.bind(Object(S.a)(Object(S.a)(a))),a.selectCup=a.selectCup.bind(Object(S.a)(Object(S.a)(a))),a.state={cupValue:null},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"saveScore",value:function(){var e=b.database().ref("scores/");this.state.pointsValue<=60&&this.state.cupValue&&(e.push({uid:this.props.userInfo.uid,points:this.state.pointsValue,cup:this.state.cupValue,date:new Date,username:this.props.userInfo.displayName,photoURL:this.props.userInfo.photoURL}),this.props.toggleAddScore())}},{key:"handlePointsChange",value:function(e){this.setState({pointsValue:e.target.value})}},{key:"selectCup",value:function(e){this.setState({cupValue:e})}},{key:"getPointsValidationState",value:function(){var e=parseInt(this.state.pointsValue);return e>60||e<4?"error":null!==e?"success":null}},{key:"render",value:function(){var e=this;return s.a.createElement("form",{style:{margin:"2rem 0"}},s.a.createElement(Q.a,null,s.a.createElement(E.a,null,s.a.createElement(v.a,{xs:12,sm:1},s.a.createElement($.a,{validationState:this.getPointsValidationState()},s.a.createElement(q.a,null,"Points"),s.a.createElement(H.a,{type:"text",value:this.state.prixPoints,placeholder:"",onChange:this.handlePointsChange,bsSize:"large"}))),s.a.createElement(v.a,{xs:12,sm:11},s.a.createElement(E.a,null,s.a.createElement(X,{selectCup:this.selectCup,selectedCup:this.state.cupValue,cups:[[B.a,"mushroom"],[O.a,"flower"],[J.a,"star"],[D.a,"special"],[F.a,"yoshi"],[j.a,"crossing"]]})),s.a.createElement(E.a,null,s.a.createElement(X,{selectCup:this.selectCup,selectedCup:this.state.cupValue,cups:[[M.a,"shell"],[x.a,"banana"],[P.a,"leaf"],[N.a,"lightning"],[G.a,"triforce"],[w.a,"bell"]]}))),s.a.createElement(v.a,{xs:12,style:{textAlign:"right",marginTop:"2rem"}},s.a.createElement(y.a,{bsStyle:"danger",onClick:function(){e.props.toggleAddScore()},style:{marginRight:"1rem"}},"Cancel"),s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.saveScore()}},"Add Score")))))}}]),t}(n.Component),Z=a(171),_=a(173),ee=function(e){return 0===e.length?"...loading":e.scores.map(function(e,t){return s.a.createElement(_.a,{trigger:["hover","focus"],placement:"bottom",overlay:function(e){return s.a.createElement(Z.a,{id:"popover-trigger-hover-focus",title:e.username+" score details"},"Top score: ",s.a.createElement("b",null,Math.max.apply(Math,e.scores)),s.a.createElement("br",null),"Games played: ",e.scores.length,s.a.createElement("br",null),"All scores:",s.a.createElement("ul",null,e.scores.map(function(e,t){return s.a.createElement("li",{key:t},e.replace(/^0+/,""))})))}(e),key:t},s.a.createElement("tr",null,s.a.createElement("th",{scope:"row"},t+1),s.a.createElement("td",null,e.username),s.a.createElement("td",null,e.avgScore.toFixed(1)),s.a.createElement("td",null,e.scores.length)))})},te=function(e){function t(e){var a;return Object(l.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this))).state={scores:[]},a}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.database().ref("scores/").on("value",function(t){var a=t.val(),n=Object.keys(a),s=[],r=[],c=[];n.forEach(function(e){s.push(a[e])}),s.map(function(e){-1===r.indexOf(e.username)&&r.push(e.username)}),r.map(function(e,t){var a={scores:[],cups:[],avgScore:0,username:r[t]};s.map(function(e){e.username===r[t]&&(a.scores.push(e.points),a.cups.push(e.cup))}),a.avgScore=a.scores.reduce(function(e,t){return parseInt(e)+parseInt(t)})/a.scores.length,c.push(a)}),e.setState({scores:c.sort(function(e,t){return e.avgScore>t.avgScore?-1:e.avgScore<t.avgScore?1:0})})})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("table",{class:"table table-striped"},s.a.createElement("thead",null,s.a.createElement("tr",null,s.a.createElement("th",{scope:"col"},"Rank"),s.a.createElement("th",{scope:"col"},"Player"),s.a.createElement("th",{scope:"col"},"Score"),s.a.createElement("th",{scope:"col"},"Total games"))),s.a.createElement("tbody",null,s.a.createElement(ee,{scores:this.state.scores}))))}}]),t}(n.Component),ae=function(e){function t(){var e;return Object(l.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).state=Object(o.a)({userInfo:null,showAddScore:!1},"userInfo",null),e}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;!this.state.userInfo&&g.onAuthStateChanged(function(t){t&&e.setUser(t)})}},{key:"login",value:function(){g.signInWithPopup(f)}},{key:"setUser",value:function(e){!this.state.userInfo&&this.setState({userInfo:e})}},{key:"toggleAddScore",value:function(){this.setState({showAddScore:!this.state.showAddScore})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"container"},s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement(E.a,null,s.a.createElement(v.a,{xs:12,sm:8},s.a.createElement("h1",null,"Mario Kart Tracker")),s.a.createElement(v.a,{xs:12,sm:4},!this.state.userInfo&&s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.login()}},"Log In"),this.state.userInfo&&s.a.createElement("div",{className:"pull-right"},s.a.createElement("img",{style:{margin:"1rem",width:"50px",height:"50px",borderRadius:"50%"},src:this.state.userInfo.photoURL}))))),this.state.userInfo&&s.a.createElement("div",null,!this.state.showAddScore&&s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.toggleAddScore()}},"Add Score"),this.state.showAddScore&&s.a.createElement(Y,{userInfo:this.state.userInfo,toggleAddScore:this.toggleAddScore.bind(this)})),s.a.createElement(te,null)))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},64:function(e,t,a){e.exports=a.p+"static/media/banana.b99b8ad2.png"},65:function(e,t,a){e.exports=a.p+"static/media/bell.fef4ae6e.png"},66:function(e,t,a){e.exports=a.p+"static/media/crossing.866816b0.png"},67:function(e,t,a){e.exports=a.p+"static/media/flower.b1b2b376.png"},68:function(e,t,a){e.exports=a.p+"static/media/leaf.c0c3172d.png"},69:function(e,t,a){e.exports=a.p+"static/media/lightning.673806fd.png"},70:function(e,t,a){e.exports=a.p+"static/media/mushroom.7d0b0a51.png"},71:function(e,t,a){e.exports=a.p+"static/media/shell.9e99f361.png"},72:function(e,t,a){e.exports=a.p+"static/media/special.09f43aed.png"},73:function(e,t,a){e.exports=a.p+"static/media/star.63ba072a.png"},74:function(e,t,a){e.exports=a.p+"static/media/triforce.bff35bea.png"},75:function(e,t,a){e.exports=a.p+"static/media/yoshi.2202dd48.png"},83:function(e,t,a){e.exports=a(165)},88:function(e,t,a){},90:function(e,t,a){}},[[83,2,1]]]);
//# sourceMappingURL=main.b8fde075.chunk.js.map