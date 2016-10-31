import one from './spaOne.vue';
import two from './spaTwo.vue';

new Vue({
    el:'.wrapper',
    data:{
        navbar:[
            {
                name:"第一列",
                cur:true,
                href:'#/one'
            },
            {
                name:'第二列',
                cur:false,
                href:'#/two'
            }
        ],
        currentView:'',
    },
    components: {
        one,
        two
    },
    methods:{
        //解析hash
        hashCheck(hash){
            var hashV = hash.slice(2);
            return hashV.split('/');
        },
        tabChange(){
            var curHash = this.hashCheck(location.hash)[0]||'one';
            this.navbar.forEach((rs)=>{
                rs.cur = false;
                if(this.hashCheck(rs.href)[0] == curHash) rs.cur = true;
            });
            this.currentView = curHash;
        },
        addToHistory(hash,noState){
            var obj = {
                hash : hash
            } ;
            if(noState){
                // _history.shift(obj) ;
                window.history.replaceState(obj,"",hash) ;
            }
            else{
                 window.history.pushState(obj,"",hash) ;
            }
            //  _history.unshift(obj) ;
        }
    },
    created(){
        // this.addToHistory('one',false);
        // this.tabChange();
        //hashchange 用来处理本页面的不同tab间跳转
        // window.addEventListener("hashchange",()=>{
        //     this.tabChange();
        // });
        // window.addEventListener("popstate",(e)=>{
        //     debugger;
        //     if(e.state && e.state.hash){
        //         var hash = e.state.hash ;
        //         var curHash = this.hashCheck(location.hash)[0]||'one';
        //         if(curHash == hash){
        //             this.tabChange();
        //         }
        //     }
        // },false);
    }
});
