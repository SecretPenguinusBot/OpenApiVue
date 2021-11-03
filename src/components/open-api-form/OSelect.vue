<template>
  <div>
      <select :value='data' @input="onInput" >
          <option v-for="(option, index) of schema.options" :key="index">{{option}}</option>
      </select>
  </div>
</template>

<script>
export default {
    props:['schema', 'value'],
    data(){
        return{
            data:this.value
        }
    },
    methods:{
        onInput(e){
            console.log(e);
            this.data = e.target.value;
            this.$emit("input", this.data);
        }
    }

}
</script>

<style>

</style>