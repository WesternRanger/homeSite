/**
 * Created by WesternRanger on 16/01/05.
 */
var arr = [];// 评论数据
var Article = React.createClass({displayName: "Article", // blog 页面
    render:function(){
        return(
            React.createElement("div", {ref: "article"}, 
                React.createElement(Blog, null), 
                React.createElement(CommentBox, null), 
                React.createElement(CommentForm, null)
            )
        )
    }
})
var Blog = React.createClass({displayName: "Blog",
    getInitialState: function() {
        return {
            data: {
                title: "bfc探秘",
                content: "为大家讲述sdafg哈舒服撒点撒地方还是啦感觉饿哦啊热噶老师的感觉了 十大收到啦将阿斯顿发 "
            }
        };
    },

    render:function(){
        var css_comment = {
            border:'#e5dfe5 solid 1px'
        }
        var css_auth = {
            background: '#a8cc45',
            color: '#805f63',
            fontSize:20,
            fontWeight:700,
            textAlign:'center',
            textIndent:8,
            height:60,
            lineHeight:'60px',
            marginBottom:10
        }
        var css_blog = {
            textIndent:'10px',
            lineHeight:'18px',
            fontSize:14
        }
        return(
            React.createElement("div", {style: css_comment}, 
                React.createElement("div", {style: css_auth}, this.state.data.title), 
                React.createElement("p", {style: css_blog}, this.state.data.content)
            )
        )
    }
})
var CommentBox = React.createClass({displayName: "CommentBox",
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
            success: function(data){
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
            margin:'20px auto',
            padding:'0 20px',
            border:'#e5dfe5 solid 1px'
        }
        var css_title = {
            padding:'10px 0',
            fontSize:18
        }
        return (
            React.createElement("div", {ref: "commentbox", style: css_com}, 
                React.createElement("div", {style: css_title}, "评论列表:"), 
                React.createElement(CommentList, {data: this.state.data})
            )
        );
    }
});
var CommentList = React.createClass({displayName: "CommentList",
    render: function() {
        var commentNodes = this.props.data.map(function (comment) {
            var css_comment = {
                marginBottom:20
            }
            var css_auth = {
                color: '#805f63',
                fontSize:14,
                width:200,
                height:25,
                lineHeight:'25px',
                marginBottom:10
            }
            var css_com = {
                background:'#e5e5e5',
                padding:10,
                fontSize:14,
                borderRadius:5
            }
            return (
                React.createElement("div", {style: css_comment}, 
                    React.createElement("div", {style: css_auth}, "用户：“", comment.author, "” 说到："), 
                    React.createElement("span", {style: css_com}, comment.text)
                )
            );
        });
        return (
            React.createElement("div", null, 
                commentNodes
            )
        );
    }
});

var CommentForm = React.createClass({displayName: "CommentForm",
    handleClick: function(e) {
        e.preventDefault();
        var author = this.refs.author.getDOMNode().value;
        var text = this.refs.text.getDOMNode().value;
        if (author.length != 0 || text.length != 0) {
            this.handleCommentSubmit({author: author, text: text});
        }
        else{
            alert("评论不为空！");
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
                    React.createElement(Article, null),
                    document.getElementById('article')
                );
            }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
        });
    },
    render: function() {
        var css_form = {
            margin:'auto',
            padding:'0 20px',
            border:'#e5dfe5 solid 1px'
        }
        var css_tit = {
            height:30,
            fontSize:18,
            padding:'10px 0'
        }
        var css_say = {
            marginTop:8,
            display: 'block',
            width:400,
            height:200
        }
        var css_post = {
            display:'block',
            margin:'10px 0 20px 125px',
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
            React.createElement("div", {ref: "forms", style: css_form}, 
                React.createElement("div", {style: css_tit}, "发表评论"), 
                React.createElement("label", {for: ""}, "用户名："), React.createElement("input", {type: "text", placeholder: "Your name", ref: "author"}), 
                React.createElement("textarea", {style: css_say, type: "text", placeholder: "Say something...", ref: "text"}), 
                React.createElement("a", {href: "javascript:;", style: css_post, ref: "post", onClick: this.handleClick}, "提交")
            )
        );
    }
});

React.render(
    React.createElement(Article, null),
    document.getElementById('article')
);
