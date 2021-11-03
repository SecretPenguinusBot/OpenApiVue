<template>
    <div class="schema-viewer">
        <table v-for="(key, index) of schema" :key="index">
        <tr>
            <td>
                <button @click="switchExpand(index)">{{expand[index] ? '-' : '+'}}</button>
            </td>
            <td>"{{index}}":</td>
        </tr>
        <tr v-show="expand[index]" class="child">
            <td></td>
            <td>
                <div v-if="isObject(index)">
                    <ObjectViewer class="row" :schema='schema[index]'/>
                </div>
                <div v-else>
                    {{schema[index]}}
                </div>
            </td>
         </tr>
        </table>
    </div>
</template>

<script>
export default {
    name:"ObjectViewer",
    props:['schema'],
    data(){
        const keys = Object.keys(this.schema);
        const expand = {};
        for(let key of keys){
            expand[key] = false;
        }
        return{
            expand
        }
    },
    methods:{
        switchExpand(key){
            if(this.expand[key]){
                this.expand[key] = false;
            }
            else{
                this.expand[key] = true
            }
            console.log(this.expand);
        },
        oValue(key){
            return this.schema[key];
        },
        isObject(key){
            const obj = this.schema[key];
            return Object.prototype.toString.call(obj) === '[object Object]';
        }
    }
}
</script>

<style>
.schema-viewer{
    margin: 5px;
}
.child{
    margin-left: 10px;
}
.row{
    width: 100%;
}
.row::after{
    display: table;
    content:'';
    widows: 100%;
}
</style>