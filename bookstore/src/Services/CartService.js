import axiosService from './axiosServices.js'

class CartService{
    addItemToCart(product_id){
        return axiosService.post(`bookstore_user/add_cart_item/${product_id}`)
    }
    getItemFromCart() {
        return axiosService.get(`bookstore_user/get_cart_items`)
    }
    updateQuantityInCart(cartItem_id, quantityToBuy){
        return axiosService.put(`bookstore_user/cart_item_quantity/${cartItem_id}`, quantityToBuy)
    }
    deleteCartItem(cartItem_id){
        return axiosService.delete(`bookstore_user/remove_cart_item/${cartItem_id}`)
    }
}
export default new CartService