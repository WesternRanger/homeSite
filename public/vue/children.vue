<style>
  .aa{
    color:red;
  }
</style>
<template>

    <h2 class="aa">hello world</h2>

</template>
<script>
// console.log(GLOBAL);
    module.exports = {
        data(){
            return {

            }
        },
        created(){
          //访问不到全局变量
          // console.log(GLOBAL);
        }
    }
</script>
