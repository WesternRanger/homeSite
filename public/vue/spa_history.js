import one from './spaOne.vue';
import two from './spaTwo.vue';

new Vue({
    el:'.wrapper',
    data:{
        navbar:[
            {
                name:"第一列",
                cur:true,
                hash:'one',
                url:'/page/one'
            },
            {
                name:'第二列',
                cur:false,
                hash:'two',
                url:'/page/two'
            }
        ],
        currentView:'',
    },
    components: {
        one,
        two
    },
    methods:{
        //手动切换tab
        eqTab(item){
            // console.log(item.cur);
            if(item.cur) return;
            window.history.pushState({hash:item.hash},null,item.url);
            this.currentView = item.hash;
            // 处理 nav 高亮
            this.navbar.forEach( rs => rs.cur = (rs.hash == item.hash) ? true : false );
        }
    },
    created(){
        this.currentView = one;// 默认加载
        // 浏览器返回 历史记录
        window.addEventListener("popstate",(e)=>{
            if(!e.state) return;
            this.currentView = e.state.hash;
            //处理 nav 高亮
            this.navbar.forEach( rs => rs.cur = (rs.hash == e.state.hash) ? true : false );
        },false);
    }
});
