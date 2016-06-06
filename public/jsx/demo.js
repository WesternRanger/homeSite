/**
 * Created by WesternRanger on 16/5/27.
 */
var Article = React.createClass({ // blog 页面
    render:function(){
        var css_artBottom = {
            overflow:'hidden',
            width:'300',
            height:"300",
            background:"red"
        }
        return(
            <div style={css_artBottom}>
                hello world
            </div>
        )
    }
});
React.render(
<Article/>,
    document.getElementById('wrapper')
);