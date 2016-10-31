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
        }
    },
    created(){
        this.tabChange();
        //hashchange 用来处理本页面的不同tab间跳转
        window.addEventListener("hashchange",()=>{
            this.tabChange();
        });
    }
});
