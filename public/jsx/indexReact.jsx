var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                {this.props.children}
                <span className="commentAuthor">
                    --{this.props.author}
                </span>

            </div>
        );
    }
});


var CommentList = React.createClass({
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            return (
                <Comment author={comment.author}>
                    {comment.text}
                </Comment>
            );
        });
        return (
            <div className="commentList">
                {commentNodes}
            </div>
        );
    }
});

var CommentBox = React.createClass({
    getInitialState: function() {
        return {data: [
            {author: "西泊浪人", text: "晚上吃面条"},
            {author: "约翰逊", text: "中午吃多了。略撑"}
        ]};
    },
    componentDidMount: function() {
        $.ajax({
            url: this.props.url,
            type:'post',
            dataType: 'json',
            cache: false,
            success: function(data) {
                this.setState({data: data.result});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentBox">
                <h1>评论列表</h1>
                <CommentList data={this.state.data} />
            </div>
        );
    }
});

React.render(
    <CommentBox url="/comment" />,
    document.getElementById('content')
);