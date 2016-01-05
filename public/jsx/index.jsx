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