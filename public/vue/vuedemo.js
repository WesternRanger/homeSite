/**
 * Created by WesternRanger on 16/9/18.
 */
import Box from './alert.vue';
import Swiper from './swiperdemo.vue';
// import Index from './index.vue';

var vm = new Vue({
    el: 'body',
    data: {
        name: 'hhhh'
    },
    components:{
        Box,
        Swiper,
        // Index
    },
    methods: {
        tapTest: function () {
            alert(444);
        }
    }
});
