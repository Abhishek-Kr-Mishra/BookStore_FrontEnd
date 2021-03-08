import axiosService from './axiosServices.js'

class UserService{
    registerUser(signInData){
        return axiosService.post(`bookstore_user/registration`, signInData)
    }
    loginUser(logInData) {
        return axiosService.post(`bookstore_user/login`, logInData)
    }
    updateAddress(addressData){
        return axiosService.put(`bookstore_user/edit_user`, addressData)
    }
}
export default new UserService