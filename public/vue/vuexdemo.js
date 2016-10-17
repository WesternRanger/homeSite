/**
 * Created by WesternRanger on 16/10/14.
 */
import Child from './children.vue';
var GLOBAL = '我是全局变量';

var vm = new Vue({
    el: '.vm',
    data: {
        name: 'WesternRanger'
    },
    components:{
        Child
    }
});
