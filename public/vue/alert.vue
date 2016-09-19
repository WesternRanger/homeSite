<style>
    @import '~vux/dist/vux.css';
</style>
<template>

    <alert :show.sync="show" title="恭喜您" button-text="好棒，去ATM转账">
      <p style="text-align:center;">中大奖了！99999元只要转4000元手续费</p>
    </alert>

</template>
<script>
    import Alert from 'vux/dist/components/alert'

    module.exports = {
        data(){
            return {
                show: true
            }
        },
        methods:{
            eqname(){
                this.boxname = !this.boxname;
            }
        },
        components:{
            Alert
        }
    }
</script>