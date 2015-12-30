//var data = {id: "1", text: "This is one comment"}

var PerComment = React.createClass({
    render:function(){
        return(
            <li className="perComment">
                <span>hello</span>
            </li>
        )
    }
})

var CommentList = React.createClass({
    render: function() {
        return (
            <ul className="commentList">
                <PerComment/>
            </ul>
        );
    }
})

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
})

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
                <h1>hello world哈哈哈</h1>
                <CommentList/>
                <CommentForm />
            </div>
        );
    }
})

React.render(
    <CommentBox/>,
    document.getElementById('content')
);