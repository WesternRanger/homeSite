var CommentList=React.createClass({displayName:"CommentList",render:function(){return React.createElement("div",{className:"commentList"},"Hello, world! I am a CommentList.")}}),CommentForm=React.createClass({displayName:"CommentForm",render:function(){return React.createElement("div",{className:"commentForm"},"Hello, world! I am a CommentForm.")}}),CommentBox=React.createClass({displayName:"CommentBox",render:function(){return React.createElement("div",{className:"commentBox"},React.createElement("h1",null,"Comments hello world!"),React.createElement(CommentList,null),React.createElement(CommentForm,null))}});React.render(React.createElement(CommentBox,null),document.getElementById("content"));