import axiosService from './axiosServices.js'

class OrderService{
    addOrder(orders){
        return axiosService.post(`bookstore_user/add/order`, {orders})
    }
}
export default new OrderService