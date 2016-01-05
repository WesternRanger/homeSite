/**
 * Created by WesternRanger on 15/12/28.
 */
var arr = [];

var Comment = React.createClass({
    render: function() {
        return (
            <div className="comment">
                <div className="commentAuthor">{this.props.author}</div>
                <div className="tip">{this.props.children}</div>
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

var CommentForm = React.createClass({
    handleClick: function(e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value;
        var text = this.refs.text.getDOMNode().value;
        if (author.length != 0 || text.length != 0) {
            this.handleCommentSubmit({author: author, text: text});
        }
        this.refs.author.value = '';
        this.refs.text.value = '';
        return;
    },
    handleCommentSubmit: function(comment) {
        $.ajax({
            url: '/commit?name='+comment.author+'&talk='+comment.text,
            type:'post',
            dataType: 'json',
            cache: false,
            success: function(data) {
                arr.push({
                    author:comment.author,
                    text:comment.text
                })
                React.render(
                    <CommentBox/>,
                    document.getElementById('commentList')
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        return (
            <div className="commentForm" ref="forms">
                <div className="commentTitle">发表评论</div>
                <label for="">用户名：</label><input className="username" type="text" placeholder="Your name" ref="author"/>
                <textarea className="saySome" type="text" placeholder="Say something..." ref="text"></textarea>
                <a href="javascript:;" className="postSays" ref="post" onClick={this.handleClick}>提交</a>
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
    loadCommentsFromServer: function() {
        $.ajax({
            url: '/comment',
            type:'post',
            dataType: 'json',
            cache: false,
            success: function(data) {
                arr = data.result;
                this.setState({data: data.result});
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },

    componentDidMount: function() {
        this.loadCommentsFromServer();
        //setInterval(,40000000000);
    },
    render: function() {
        return (
            <div className="commentBox" ref="commentbox">
                <div className="chartTitle">评论列表</div>
                <CommentList data={this.state.data} />
                <CommentForm />
            </div>
        );
    }
});

React.render(
    <CommentBox/>,
    document.getElementById('commentList')
);