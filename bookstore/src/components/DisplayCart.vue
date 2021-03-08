<template>
    <v-container class="mt-13 mb-10">
        <!-- {{ allCartItems }} -->
        <v-container class="book-details-container mt-8 ml-3">
            <span class="myCart-text ml-3">My Cart ({{ allCartItems.length }})
                <v-col
                    cols="1"
                    sm="6"
                    md="5"
                    lg="5"
                >
                    <v-text-field
                        outlined
                        dense
                        readonly
                        class="location-box"
                        label="Use Current Location"
                    >
                        <v-icon slot="prepend-inner" color="#A03037">mdi-map-marker</v-icon>
                    </v-text-field>
                </v-col>
            </span>
            <v-container>
                    <v-row v-for="cartItem in allCartItems" :key="cartItem.id">
                            <v-col cols="5" sm="2" md="3" lg="2">
                                <v-img
                                height="100"
                                width="75"
                                src="@/assets/Book.png"
                                class="book-image mt-1"
                                >
                                </v-img>
                        </v-col>
                        <v-col cols="7" sm="4" md="4" lg="3">
                            <div class="book-name">{{ cartItem.product_id.bookName }}</div>
                            <div class="author-name">{{ cartItem.product_id.author }}</div>
                            <div class="author-name">{{ cartItem.product_id.author }}</div>
                            <span class="discounted-price">Rs. {{ cartItem.product_id.price - cartItem.product_id.discountPrice }} </span>
                            <span class="original-price text-decoration-line-through">Rs. {{ cartItem.product_id.price }}</span>
                            <div class="plus-minus-btn">
                                <span>
                                    <v-icon small 
                                        v-on:click="cartItem.quantityToBuy === 1 ? cartItem.quantityToBuy = 1 : cartItem.quantityToBuy--; updateQuantityInCart(cartItem)"
                                    >mdi-minus-circle-outline</v-icon>
                                </span>
                                <span class="quantity-value">
                                    {{ cartItem.quantityToBuy }} 
                                </span>
                                <span>
                                    <v-icon small v-on:click="cartItem.quantityToBuy === cartItem.product_id.quantity ? cartItem.product_id.quantity : cartItem.quantityToBuy++; updateQuantityInCart(cartItem)">mdi-plus-circle-outline</v-icon>
                                </span>
                                <span class="remove-btn">
                                    <v-btn
                                        plain
                                        x-small
                                        v-on:click="deleteCartItem(cartItem)"
                                    >
                                        Remove
                                    </v-btn>
                                </span>
                            </div>
                        </v-col>
                    </v-row>
            </v-container>
            <v-btn
                v-if="placeOrderBtn"
                color="primary"
                normal
                class="place-order-btn"
                v-on:click="placeOrderBtn = !placeOrderBtn; addressContainerValue()"
            >
                Place Order
            </v-btn>
        </v-container>
        <v-text-field
            outlined
            dense
            readonly
            value="Address Details"
            v-if="!addressContainer"
            class="address-text-field mt-8 ml-3"
        ></v-text-field>
        <v-container class="addressDetails-container mt-8 ml-3" v-if="addressContainer">
            <span class="address-text ml-3">Customer Details
                <v-btn
                    outlined
                    color="red"
                    class="new-address"
                    v-if="!orderContainer"
                >
                    Add New Address
                </v-btn>
            </span>
            <v-container>
                <v-container>
                    <label class="font-weight-bold">Full Name</label>
                    <v-row >
                        <v-col
                            cols="12" sm="5" md="5" 
                        >
                             <v-text-field
                                outlined
                                dense
                                readonly
                                class="userName-text"
                                v-model=allCartItems[0].user_id.fullName
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12" sm="5" md="5" 
                        >
                             <v-text-field
                                outlined
                                dense
                                readonly
                                class="userName-text"
                                v-model=allCartItems[0].user_id.phone
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                </v-container>
                <v-container style="position: relative">
                    <label class="address-text">Address</label>
                    <v-row>
                        <v-col cols="12" sm="9" md="10">
                            <v-textarea
                                outlined
                                dense
                                auto-grow
                                rows="2"
                                row-height="30"
                                v-model="userAddress.fullAddress"
                            >
                            </v-textarea>
                        </v-col>
                    </v-row>
                    <label class="city-text">City/Town</label>
                    <label class="state-text">State</label>
                    <v-row >
                        <v-col
                            cols="12" sm="5" md="5" 
                        >
                             <v-text-field
                                outlined
                                dense
                                class="city-field"
                                v-model="userAddress.city"
                            >
                            </v-text-field>
                        </v-col>
                        <v-col
                            cols="12" sm="5" md="5" 
                        >
                             <v-text-field
                                outlined
                                dense
                                class="state-field"
                                v-model="userAddress.state"
                            >
                            </v-text-field>
                        </v-col>
                    </v-row>
                    <label class="type-text">Type</label>
                    <v-radio-group
                        v-model="userAddress.addressType"
                        row
                        class="mt-n1"
                    >
                        <v-radio
                            label="Home"
                            color="#A03037"
                            value="Home"
                            class="font-weight-black"
                        >
                        </v-radio>
                        <v-radio
                            label="Work"
                            color="#A03037"
                            value="Office"
                            class="font-weight-black"
                        >
                        </v-radio>
                        <v-radio
                            label="Other"
                            color="#A03037"
                            value="Other"
                            class="font-weight-black"
                        >
                        </v-radio>
                    </v-radio-group>
                    <v-btn
                        v-if="continueBtn"
                        class="primary continue-btn"
                        v-on:click="updateAddress(); orderContainer = !orderContainer; continueBtn = !continueBtn"
                        large
                    >
                        CONTINUE
                    </v-btn>
                </v-container>
            </v-container>
        </v-container>
        <v-text-field
            outlined
            dense
            readonly
            value="Order Summary"
            v-if="!orderContainer"
            class="address-text-field mt-8 ml-3"
        ></v-text-field>
        <v-container class="orderSummary-container mt-8 ml-3" v-if="orderContainer">
            <v-row>
                <v-col cols="10" sm="7" md="8">
                    <label class="orderSummary-text">Order Summary</label>
                </v-col>
            </v-row>
            <v-container style="position: relative">
                <v-row v-for="cartItem in allCartItems" :key="cartItem.id">
                    <v-col cols="5" sm="2" md="3" lg="2">
                        <v-img
                            height="100"
                            width="75"
                            src="@/assets/Book.png"
                            class="order-image mt-1"
                        >
                        </v-img>
                    </v-col>
                        <v-col cols="7" sm="4" md="4" lg="3">
                            <div class="book-name">{{ cartItem.product_id.bookName }}</div>
                            <div class="author-name">{{ cartItem.product_id.author }}</div>
                            <span class="discounted-price">Rs. {{ (cartItem.product_id.price - cartItem.product_id.discountPrice) * cartItem.quantityToBuy}} </span>
                            <span class="original-price text-decoration-line-through">Rs. {{ cartItem.product_id.price * cartItem.quantityToBuy }}</span>
                        </v-col>
                </v-row>
                <v-btn
                    color="primary"
                    large
                    class="checkout-btn"
                    v-on:click="addOder()"
                >
                    CHECKOUT
                </v-btn>
            </v-container>
        </v-container>
    </v-container>
</template>

<script>
import usersService from '../Services/usersService'
import CartService from '../Services/CartService'
import OrderService from '../Services/orderService'
export default {
    props: ['allCartItems'],
    data() {
        return{
            copyProps: this.allCartItems,
            userAddress:{
                addressType: null,
                fullAddress: '',
                city: '',
                state: ''
            },
            purchaseDetails:{
                product_id: '',
                product_name: '',
                product_quantity: '',
                product_price: ''
            },
            addressContainer: false,
            orderContainer: false,
            placeOrderBtn: true,
            continueBtn: true,
            orders: []
        }
    },
    methods:{
        addressContainerValue: function(){
            if(this.addressContainer === false)
            {
                this.addressContainer = true
                console.log(this.addressContainer)
            }
            else{
                this.addressContainer = false
                console.log(this.addressContainer)
            }
        },
        updateQuantityInCart: function(cart){
            console.log("ID", cart._id)
            console.log("quantity", cart.quantityToBuy)
            let cartItem_id = cart._id
            let quantityToBuy= {
                quantityToBuy: cart.quantityToBuy
            }
            CartService.updateQuantityInCart(cartItem_id , quantityToBuy)
            .then((respone) => {
                console.log(("Response", respone))
            })
            .catch((e) => {
                console.log(e)
            })
        },
        updateAddress: function(){
            console.log("user Address", this.userAddress)
            let addressData = {
                addressType: this.userAddress.addressType,
                fullAddress: this.userAddress.fullAddress,
                city: this.userAddress.city,
                state: this.userAddress.state
            }
            usersService.updateAddress(addressData)
            .then((response) => {
                console.log("Response", response)
            })
            .catch((e) => {
                console.log(e)
            })
        },
        deleteCartItem: function(cart){
            let cartItem_id = cart._id
            console.log(cartItem_id)
            CartService.deleteCartItem(cartItem_id)

            .then((respone) =>{
                console.log("Response", respone)
                this.$emit('deletedCartItem')
            })
            .catch((e) => {
                console.log(e)
            })
        },
        addOder: function(){
            console.log("copy props ", this.copyProps)
            for(var item in this.copyProps){
                this.purchaseDetails = {
                    product_id: this.copyProps[item]._id,
                    product_name: this.copyProps[item].product_id.bookName,
                    product_quantity: this.copyProps[item].quantityToBuy,
                    product_price: this.copyProps[item].product_id.price - this.copyProps[item].product_id.discountPrice
                }
                console.log("Purchase", this.purchaseDetails)
                // this.orders.push(this.purchaseDetails)
                this.orders.splice(item, 1, this.purchaseDetails)
            }
            console.log("Order Array Details", this.orders)
            OrderService.addOrder(this.orders)
            .then((response) => {
                console.log(response)
                this.$router.push({ path: '/dashboard/orderSuccess', redirect: '/' })
            })
            .catch((e) => {
                console.log(e)
            })
        }
    }
}
</script>

<style scoped>
.book-details-container{
    position: relative;
    width: 70%;
    border: 1px solid grey;
    min-height: 250px;
}
.myCart-text{
    font-weight: bold;
}
.location-box{
    position: absolute;
    top: 12px;
    right: 20px;
}
.book-image{
    display: inline-block;
}
.book-name{
    font-weight: 600;
    font-size: larger;
    font-family: 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}
.author-name{
    font-size: small;
    color: grey;
}
.discounted-price{
    font-weight: 900;
    font-size: small;
    color: black;
}
.original-price{
    font-size: x-small;
}
.quantity-value{
    font-size: small;
}
.place-order-btn{
    position: absolute;
    right: 20px;
    bottom: 10px;
}
.address-text-field{
    width: 70%;
}
.addressDetails-container{
    position: relative;
    width: 70%;
    border: 1px solid lightgrey;
    min-height: 250px;
}
.address-text, .city-text, .state-text, .type-text, .orderSummary-text{
    font-weight: bold;
    font-style: Lato;
}
.new-address{
    position: absolute;
    right: 10px;
    overflow: hidden;
}
.state-text{
    position: absolute;
    left: 330px;
}
.continue-btn{
    position: absolute;
    right: 0px;
    bottom: 0px;
}
.orderSummary-container{
    position: relative;
    width: 70%;
    border: 1px solid lightgrey;
    min-height: 250px;
}
.order-image{
    display: inline-block;
}
.checkout-btn{
    position: absolute;
    bottom: 0px;
    right: 0px;
}
@media only screen and (max-width: 600px) {
    .book-details-container{
        width: 95%;
    }
    .address-text-field{
        width: 95%;
    }
    .addressDetails-container{
        width: 95%;
    }
    .new-address{
    width: 50px;
    }
    .orderSummary-container{
        width: 95%;
    }
}
@media only screen and (max-width: 450px) {
    .location-box{
        width: 100px;
    }
}
@media only screen and (max-width: 900px) {
    .name-flex{
        margin-left: 0;
    }
    .userName-text{
        margin-left: 0;
    }
}
@media only screen and (max-width: 900px) {
    .userName-text{
        max-width: 150px;
    }
    .phoneNumber-text{
        max-width: 150px;
    }
}
</style>