(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{125:function(e,t,a){"use strict";a.r(t);var n=a(0),s=a.n(n),r=a(47),c=a.n(r),i=(a(70),a(48)),o=a(12),l=a(13),u=a(17),p=a(14),d=a(16),h=(a(72),a(21)),m=a.n(h);m.a.initializeApp({apiKey:"AIzaSyCUVExBS8-J9U458sNtB95fwzQNBPSl5Rk",authDomain:"mctracker-42d0f.firebaseapp.com",databaseURL:"https://mctracker-42d0f.firebaseio.com",projectId:"mctracker-42d0f",storageBucket:"mctracker-42d0f.appspot.com",messagingSenderId:"218378060918"});var f=new m.a.auth.GoogleAuthProvider,g=m.a.auth(),b=m.a,v=a(129),E=a(127),y=a(133),k=a(11),S=a(49),C=a.n(S),w=a(50),x=a.n(w),j=a(51),A=a.n(j),O=a(52),I=a.n(O),V=a(53),P=a.n(V),R=a(54),U=a.n(R),B=a(55),N=a.n(B),L=a(56),z=a.n(L),D=a(57),J=a.n(D),M=a(58),W=a.n(M),K=a(59),G=a.n(K),Q=a(60),T=a.n(Q),$=a(128),q=a(130),F=a(131),H=a(134),X=function(e){return e&&e.cups&&e.cups.length?e.cups.map(function(t){return s.a.createElement(E.a,{sm:2,key:t[1],onClick:function(){e.selectCup(t[1])},style:{padding:"1rem",borderRadius:"5px",backgroundColor:t[1]===e.selectedCup?"lightskyblue":"transparent",textAlign:"center"}},s.a.createElement("img",{src:t[0],style:{width:"8vw"}}))}):"null"},Y=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this,e))).handlePointsChange=a.handlePointsChange.bind(Object(k.a)(Object(k.a)(a))),a.selectCup=a.selectCup.bind(Object(k.a)(Object(k.a)(a))),a.state={cupValue:null},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"saveScore",value:function(){var e=b.database().ref("scores/");this.state.pointsValue<=60&&this.state.cupValue&&(e.push({uid:this.props.userInfo.uid,points:this.state.pointsValue,cup:this.state.cupValue,date:new Date,username:this.props.userInfo.displayName,photoURL:this.props.userInfo.photoURL}),this.props.toggleAddScore())}},{key:"handlePointsChange",value:function(e){this.setState({pointsValue:e.target.value})}},{key:"selectCup",value:function(e){this.setState({cupValue:e})}},{key:"getPointsValidationState",value:function(){return this.state.pointsValue>60?"error":null!==this.state.pointsValue?"success":null}},{key:"render",value:function(){var e=this;return s.a.createElement("form",null,s.a.createElement($.a,null,s.a.createElement(v.a,null,s.a.createElement(E.a,{xs:12,sm:1},s.a.createElement(q.a,{validationState:this.getPointsValidationState()},s.a.createElement(F.a,null,"Points"),s.a.createElement(H.a,{type:"number",value:this.state.prixPoints,placeholder:"",onChange:this.handlePointsChange,bsSize:"large"}))),s.a.createElement(E.a,{xs:12,sm:11},s.a.createElement(v.a,null,s.a.createElement(X,{selectCup:this.selectCup,selectedCup:this.state.cupValue,cups:[[N.a,"mushroom"],[I.a,"flower"],[W.a,"star"],[J.a,"special"],[T.a,"yoshi"],[A.a,"crossing"]]})),s.a.createElement(v.a,null,s.a.createElement(X,{selectCup:this.selectCup,selectedCup:this.state.cupValue,cups:[[z.a,"shell"],[C.a,"banana"],[P.a,"leaf"],[U.a,"lightning"],[G.a,"triforce"],[x.a,"bell"]]}))),s.a.createElement(E.a,{xs:12,style:{textAlign:"right"}},s.a.createElement(y.a,{bsStyle:"danger",onClick:function(){e.props.toggleAddScore()},style:{marginRight:"1rem"}},"Cancel"),s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.saveScore()}},"Add Score")))))}}]),t}(n.Component),Z=a(124),_=a(132),ee=function(e){return 0===e.length?void 0:e.scores.map(function(e,t){return s.a.createElement(Z.a,{key:t},e.username," ",e.date," ",s.a.createElement("span",{className:"pull-right"},e.points))})},te=function(e){function t(e){var a;return Object(o.a)(this,t),(a=Object(u.a)(this,Object(p.a)(t).call(this))).state={scores:[]},a}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;b.database().ref("scores/").on("value",function(t){var a=t.val(),n=Object.keys(a),s=[];n.forEach(function(e){s.push(a[e])}),e.setState({scores:s})})}},{key:"render",value:function(){return s.a.createElement("div",null,s.a.createElement("h2",null,"LeaderBoard"),s.a.createElement(_.a,null,s.a.createElement(ee,{scores:this.state.scores})))}}]),t}(n.Component),ae=function(e){function t(){var e;return Object(o.a)(this,t),(e=Object(u.a)(this,Object(p.a)(t).call(this))).state=Object(i.a)({userInfo:null,showAddScore:!1},"userInfo",null),e}return Object(d.a)(t,e),Object(l.a)(t,[{key:"componentDidMount",value:function(){var e=this;!this.state.userInfo&&g.onAuthStateChanged(function(t){t&&e.setUser(t)})}},{key:"login",value:function(){g.signInWithPopup(f)}},{key:"setUser",value:function(e){!this.state.userInfo&&this.setState({userInfo:e})}},{key:"toggleAddScore",value:function(){this.setState({showAddScore:!this.state.showAddScore})}},{key:"render",value:function(){var e=this;return s.a.createElement("div",{className:"App"},s.a.createElement("header",{className:"App-header"},s.a.createElement(v.a,null,s.a.createElement(E.a,{xs:12,sm:8},s.a.createElement("h1",null,"Mario Kart Tracker")),s.a.createElement(E.a,{xs:12,sm:4},!this.state.userInfo&&s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.login()}},"Log In"),this.state.userInfo&&s.a.createElement("div",{className:"pull-right"},s.a.createElement("img",{style:{margin:"1rem",width:"50px",height:"50px",borderRadius:"50%"},src:this.state.userInfo.photoURL}))))),this.state.userInfo&&s.a.createElement("div",null,!this.state.showAddScore&&s.a.createElement(y.a,{bsStyle:"primary",onClick:function(){e.toggleAddScore()}},"Add Score"),this.state.showAddScore&&s.a.createElement(Y,{userInfo:this.state.userInfo,toggleAddScore:this.toggleAddScore.bind(this)})),s.a.createElement(te,null))}}]),t}(n.Component);Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));c.a.render(s.a.createElement(ae,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then(function(e){e.unregister()})},49:function(e,t,a){e.exports=a.p+"static/media/banana.fe06ba3e.png"},50:function(e,t,a){e.exports=a.p+"static/media/bell.d6c861ea.png"},51:function(e,t,a){e.exports=a.p+"static/media/crossing.cd7cd63b.png"},52:function(e,t,a){e.exports=a.p+"static/media/flower.71b525b0.png"},53:function(e,t,a){e.exports=a.p+"static/media/leaf.1ea976bf.png"},54:function(e,t,a){e.exports=a.p+"static/media/lightning.fd7d3f13.png"},55:function(e,t,a){e.exports=a.p+"static/media/mushroom.ecfc2824.png"},56:function(e,t,a){e.exports=a.p+"static/media/shell.6620841d.png"},57:function(e,t,a){e.exports=a.p+"static/media/special.79ed74c0.png"},58:function(e,t,a){e.exports=a.p+"static/media/star.4a9ea677.png"},59:function(e,t,a){e.exports=a.p+"static/media/triforce.98c7c6d2.png"},60:function(e,t,a){e.exports=a.p+"static/media/yoshi.87334bad.png"},65:function(e,t,a){e.exports=a(125)},70:function(e,t,a){},72:function(e,t,a){}},[[65,2,1]]]);
//# sourceMappingURL=main.31a70864.chunk.js.map