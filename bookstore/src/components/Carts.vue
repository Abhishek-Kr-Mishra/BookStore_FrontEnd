<template>
    <div class="cart-page">
        <Display-cart v-bind:allCartItems = "allCartItems" v-on:deletedCartItem="deletedCartItem($event)"></Display-cart>
    </div>
</template>

<script>
import CartService from '../Services/CartService'
import DisplayCart from '../components/DisplayCart.vue'
import DisplayBooks from './DisplayBooks.vue'
// import { EventBus } from '../components/eventBus'
export default {
    components:{
        'Display-cart': DisplayCart
    },
    data() {
        DisplayBooks
        return{
            allCartItems: []
        }
    },
    created(){
        this.getCartItems()
    },
    methods:{
        getCartItems: function(){
            CartService.getItemFromCart()
            .then((response) => {
                this.allCartItems = response.data.result
                console.log("result array", this.allCartItems)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        deletedCartItem: function(cartData){
            console.log(cartData)
            this.getCartItems()
        }
    }
}
</script>

<style scoped>

</style>