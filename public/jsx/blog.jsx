/**
 * Created by WesternRanger on 16/01/05.
 */
var arr = [];// 评论数据

var Comment = React.createClass({
    render: function() {
        var css_comment = {
            marginBottom:20
        }
        var css_auth = {
            background: '#a8cc45',
            color: '#805f63',
            fontSize:14,
            textIndent:8,
            height:25,
            lineHeight:'25px',
            marginBottom:10
        }
        return (
            <div style={css_comment}>
                <div style={css_auth}>{this.props.author}</div>
                <div>{this.props.children}</div>
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
        var css_com = {
            marginTop:8
        }
        return (
            <div style={css_com}>
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
        var css_form = {
            width:400,
            margin:'auto'
        }
        var css_tit = {
            background: '#a5cc8c',
            height:30,
            lineHeight:"30px",
            fontSize:18,
            textIndent: 8,
            marginBottom:8
        }
        var css_say = {
            marginTop:8,
            display: 'block',
            width:400,
            height:200
        }
        var css_post = {
            display:'block',
            margin:'8px auto 0',
            width:150,
            height:30,
            lineHeight:"30px",
            textAlign:'center',
            textDecoration: 'none',
            color:'#000',
            background: '#a5cc8c',
            borderRadius: 5
        }
        return (
            <div ref="forms" style={css_form}>
                <div style={css_tit}>发表评论</div>
                <label for="">用户名：</label><input type="text" placeholder="Your name" ref="author"/>
                <textarea style={css_say} type="text" placeholder="Say something..." ref="text"></textarea>
                <a href="javascript:;" style={css_post} ref="post" onClick={this.handleClick}>提交</a>
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
        var css_com = {
            background: '#e5dfe5',
            margin:'20px auto'
        }
        var css_title = {
            background: '#a5cc8c',
            height:30,
            lineHeight:"30px",
            fontSize:18,
            textIndent: 8
        }
        return (
            <div ref="commentbox" style={css_com}>
                <div style={css_title}>评论列表</div>
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
