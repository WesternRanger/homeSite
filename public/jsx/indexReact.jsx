var CommentList = React.createClass({
    render: function() {
        return (
            <div className="commentList">
                Hello, world! I am a CommentList.
            </div>
        );
    }
});

var CommentForm = React.createClass({
    render: function() {
        return (
            <div className="commentForm">
                Hello, world! I am a CommentForm.
            </div>
        );
    }
});

var CommentBox = React.createClass({
    render: function() {
        return (
            <div className="commentBox">
            <h1>Comments hello world!</h1>
            <CommentList />
            <CommentForm />
            </div>
        );
    }
});

React.render(
    React.createElement(CommentBox, null),
    document.getElementById('content')
);