/**
 * Created by WesternRanger on 15/12/28.
 */
var BlogList = React.createClass({displayName: "BlogList",
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
            React.createElement("div", {ref: "blogs", style: css_blogs}, 
                React.createElement("div", {style: css_title}, "博客列表")

            )
        );
    }
})
React.render(
    React.createElement(BlogList, null),
    document.getElementById('blogList')
);


var Hello = React.createClass({displayName: "Hello",
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
            React.createElement("div", {style: {opacity: this.state.opacity}}, 
                "Hello ", this.props.name
            )
        );
    }
});

React.render(
    React.createElement(Hello, {name: "world"}),
    document.getElementById('hello')
);


var Search = React.createClass({displayName: "Search",
    render: function() {
        return (
            React.createElement("div", null, 
                this.props.searchType, ":", React.createElement("input", {type: "text"}), 
                React.createElement("button", null, "Search")
            )
        );
    }
});
var Page = React.createClass({displayName: "Page",
    render: function() {
        return (
            React.createElement("div", null, 
                React.createElement("h1", null, "Welcome!"), 
                React.createElement(Search, {searchType: "Title"}), 
                React.createElement(Search, {searchType: "Content"})
            )
        );
    }
});
React.render(
    React.createElement(Page, null),
    document.getElementById('container')
);