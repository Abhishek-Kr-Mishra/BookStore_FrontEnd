import axiosService from './axiosServices.js'

class BookService{
    getBooks(){
        return axiosService.get(`bookstore_user/get/book`)
    }
}
export default new BookService