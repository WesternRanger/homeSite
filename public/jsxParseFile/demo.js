/**
 * Created by WesternRanger on 16/5/27.
 */
var Article = React.createClass({displayName: "Article", // blog 页面
    render:function(){
        var css_artBottom = {
            overflow:'hidden',
            width:'300',
            height:"300",
            background:"red"
        }
        return(
            React.createElement("div", {style: css_artBottom}, 
                "hello world"
            )
        )
    }
});
React.render(
React.createElement(Article, null),
    document.getElementById('wrapper')
);