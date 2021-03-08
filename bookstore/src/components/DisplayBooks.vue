<template>
    <div class="display-page v-app">
        <v-container class="container mt-10 mb-10" style="width: 75%">
            <v-subheader class="heading">Books<span class="books-count">({{allBooksData.length}} items)</span></v-subheader>
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        small
                        v-bind="attrs"
                        v-on="on"
                        class="select-menu d-none d-sm-block mt-n10"
                    >
                    Sort By Relevance
                    <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list flat nav rounded>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="lowToHigh">Price: Low To High</v-list-item-title>
                    </v-list-item>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="highToLow">Price: High To Low</v-list-item-title>
                    </v-list-item>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="newestArrivals">Newest Arrivals</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            
            <v-menu offset-y>
                <template v-slot:activator="{ on, attrs }">
                    <v-btn
                        
                        v-bind="attrs"
                        v-on="on"
                        class="select-menu d-sm-none mt-n10"
                    >
                        Sort
                    <v-icon>mdi-menu-down</v-icon>
                    </v-btn>
                </template>
                <v-list flat nav rounded>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="lowToHigh">Price: Low To High</v-list-item-title>
                    </v-list-item>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="highToLow">Price: High To Low</v-list-item-title>
                    </v-list-item>
                    <v-list-item link dense>
                        <v-list-item-title v-on:click="newestArrivals">Newest Arrivals</v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>

            <v-layout row wrap>
                <v-flex  v-for="booksData in allBooksData" :key="booksData.id">
                    <v-card
                        outlined
                        width="235px"
                        height="275px"
                        class="mt-3 book-cards"
                        rounded="sm"
                    >
                        <v-img
                            height="135"
                            width="83"
                            src="@/assets/Book.png"
                            class="book-image"
                        >
                        </v-img>
                        <v-card-title class="book-title mt-n3"> {{ booksData.bookName }} </v-card-title>
                        <v-card-text class="mt-n5">{{ booksData.author }}</v-card-text>
                        <v-card-title class="mt-n10">
                            <span class="discounted-price">Rs. {{ booksData.price - booksData.discountPrice }}</span>
                            <span class="original-price text-decoration-line-through">Rs. {{ booksData.price }}</span>
                        </v-card-title>
                        <v-card-actions>
                            <v-btn
                                color="#A03037"
                                class="mt-n7 white--text"
                                small
                                v-if=!addedTocart
                                v-on:click="addBookToCart(booksData)"
                            >
                                Add To Cart
                                <v-icon
                                    right
                                    dark
                                >
                                    mdi-heart-outline
                                </v-icon>
                            </v-btn>
                            <v-btn
                                v-if=addedTocart
                                color="#A03037"
                                class="mt-n7 white--text"
                                small
                                disabled
                            >
                                Added To Cart
                            </v-btn>
                            <v-btn
                                class="mt-n7"
                                small
                            >
                                Wishlist
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-flex>
            </v-layout>
        </v-container>
    </div>
</template>

<script>
import CartService from '../Services/CartService'
export default {
    data(){
        return{
            addedToCart: false,
        }
    },
    props:['allBooksData'],
    methods:{
        addBookToCart: function(booksData){
            // let product_id =  booksData._id
            // console.log(product_id)
            console.log(booksData._id)
            CartService.addItemToCart(booksData._id)
            .then((response) => {
                console.log(response)
                console.log("Item Added to the cart ", booksData)
                this.addedToCart=true
            })
            .catch((e) =>{
                console.log(e)
            })
        },
        lowToHigh: function(){
            console.log(this.allBooksData)
            this.allBooksData.sort((a, b) => (
                a.price > b.price ? 1 : b.price > a.price ? -1 : 0
            ))
            console.log(this.allBooksData)
        },
        highToLow: function(){
            this.allBooksData.sort((a ,b) =>(
                a.price > b.price ? -1 : b.price > a.price ? 1 : 0
            ))
        },
        newestArrivals: function(){
            this.allBooksData.sort((a ,b) =>(
                a.createdAt > b.createdAt ? -1 : b.createdAt > a.createdAt ? 1 : 0
            ))
            console.log(this.allBooksData)
        }
    }
}
</script>

<style scoped>
.container{
    position: relative
}
.heading{
    font-weight: bolder;
    font-size: medium;
}
.books-count{
    font-weight: lighter;
    font-size: x-small;
    color: grey;
    vertical-align: sub;
}
.select-menu{
    position: absolute;
    right: 0;
    max-height: 50px;
}
.book-cards{
    position: relative;
}
.book-cards:hover{
    box-shadow: 0 8px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.2);
}
.book-image{
    margin-left: 70px;
    margin-top: 30px
}
.book-title{
    font-weight: 600;
    font-size: medium;
}
.discounted-price{
    font-weight: 900;
    font-size: small;
    color: black;
}
.original-price{
    font-size: x-small;
}
@media only screen and(max-width: 616px) {
    .container{
        width: 80%;
    }
}
@media only screen and(max-width: 420px) {
    .select-menu{
        width: 50px;
    }
}
@media only screen and(max-width: 425px) {
    .container{
        width: 50%;
    }
}
</style>