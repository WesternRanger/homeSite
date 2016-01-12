/**
 * Created by WesternRanger on 15/12/28.
 */
var BlogList = React.createClass({
    getInitialState: function() {
        return {data: [
            {author: "西泊浪人", text: "晚上吃面条"},
            {author: "约翰逊", text: "中午吃多了。略撑"}
        ]};
    },

    render: function() {
        var css_blogs = {
            marginBottom:30
        }
        var css_title = {
            background: '#a5cc8c',
            height:30,
            lineHeight:"30px",
            fontSize:18,
            textIndent: 8
        }
        return (
            <div ref="blogs" style={css_blogs}>
                <div style={css_title}>博客列表</div>

            </div>
        );
    }
})
React.render(
    <BlogList/>,
    document.getElementById('blogList')
);


var Hello = React.createClass({
    getInitialState: function () {
        return {
            opacity: 1.0
        };
    },

    componentDidMount: function () {
        this.timer = setInterval(function () {
            var opacity = this.state.opacity;
            opacity -= .05;
            if (opacity < 0.1) {
                opacity = 1.0;
            }
            this.setState({
                opacity: opacity
            });
        }.bind(this), 400);
    },

    render: function () {
        return (
            <div style={{opacity: this.state.opacity}}>
                Hello {this.props.name}
            </div>
        );
    }
});

React.render(
    <Hello name="world"/>,
    document.getElementById('hello')
);


var Search = React.createClass({
    render: function() {
        return (
            <div>
                {this.props.searchType}:<input type="text" />
                <button>Search</button>
            </div>
        );
    }
});
var Page = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Welcome!</h1>
                <Search searchType="Title" />
                <Search  searchType="Content" />
            </div>
        );
    }
});
React.render(
    <Page />,
    document.getElementById('container')
);