<template>
    <div>
        <display-books v-bind:allBooksData="allBooksData"></display-books>
    </div>
</template>

<script>
import BookService from '../Services/bookServices'
import DisplayBooks from './DisplayBooks.vue'
export default {
    components:{
        'display-books': DisplayBooks
    },
    data(){
        return{
            allBooksData: []
        }
    },
    mounted(){
        this.getBooks()
    },
    methods:{
        getBooks: function(){
            BookService.getBooks()
            .then((response) => {
                console.log(response)
                this.allBooksData = response.data.result
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>

</style>