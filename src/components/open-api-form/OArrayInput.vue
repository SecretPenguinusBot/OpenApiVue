<template>
  <div>
    <button @click="addItem">Add</button>
    <div v-for="(item, index) in data" :key="index">
      <button>Remove</button>
      <component :is="componentResolver[schema.items.type]" :value='data[index]' :schema='schema.items' @input="(n) => onPropertyChanged(n, index)"/>
    </div>
  </div>
</template>

<script>

import componentResolver from './componentResolver'
import objectBuilder from '../../utils/formObjectBuilder'

export default {
    props:['schema', 'value'],
    data(){
      const data = [];
      if(Array.isArray(this.value)){
        data.push(...this.value);
      }
      return {
        data,
        componentResolver
      }
    },
    methods:{
      addItem(){
        if(this.schema.items.type === 'form-array'){
          this.data.push([]);
        }
        else if(this.schema.items.type ==='form'){
          const item = objectBuilder(this.schema.items);
          console.log(item);
          this.data.push(item);
        }
        else{
          this.data.push(null);
        }
      },
      onPropertyChanged(n, index){
        console.log(n);
        console.log(index);
        this.data[index] = {...n};
        this.$emit('input', this.data);
      }
    }

}
</script>

<style>

</style>