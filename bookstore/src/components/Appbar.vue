<template>
    <div class="app-bar ">
        <v-app-bar
            color="#A03037"
            elevate-on-scroll
            fixed
            height="50"
        >
            <div class="logo">
                <router-link to="/dashboard/books"><v-img src="@/assets/BookImage.png" height=40 width=40></v-img></router-link>
            </div>
            <v-toolbar-title class="d-none d-sm-block ml-2 toolbar-title"> Bookstore </v-toolbar-title>
            <v-text-field label="Search..." solo dense filled class="search-bar ml-16 d-none d-sm-block" prepend-inner-icon="mdi-magnify">
            </v-text-field>
            <v-spacer class="d-md-none"></v-spacer>
            <v-divider vertical class="d-sm-none"></v-divider>
            <v-btn
                icon
                large
                class="d-sm-none"
                dark
            >
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-divider vertical class="divider"></v-divider>
            <v-btn
                icon
                large
                dark
                class="account-button"
            >
                <v-icon>mdi-account-outline</v-icon>
            </v-btn>
            <v-divider vertical class="divider2"></v-divider>
            <v-btn
                icon
                large
                dark
                class="cart-button"
                v-on:click: to= "/dashboard/cart"
            >
                <v-icon>mdi-cart-outline</v-icon>
            </v-btn>
            <v-divider vertical class="divider3"></v-divider>
        </v-app-bar>
    </div>
</template>

<script>
export default {
    // methods:{
    //     getCartItems: function(){
    //         EventBus.$emit('getCartItem')
    //     }
    // }
}
</script>

<style scoped>
.logo{
    margin-left: 80px;
}
.toolbar-title{
    color: white;
}
.search-bar{
    height: 38px;
    max-width: 500px;
}
.search-bar:hover{
    background-color: white;
}
@media only screen and (max-width: 767px){
    .logo{
        margin: 0px;
    }
}
@media only screen and (max-width: 767px){
    .logo{
        margin: 0px;
    }
}
@media only screen and (min-width:600px) and (max-width: 1023px){
    .search-bar{
        max-width: 250px;
    }
}
@media only screen and (min-width: 1024px){
    .divider{
        margin-left: 150px;
    }
    .account-button{
        margin: 0px 10px 0px 10px;
    }
    .cart-button{
        margin: 0px 10px 0px 10px;
    }
}

</style>