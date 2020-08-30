
import jsonp from 'jsonp';
import Axios from 'axios'

const API = {

    login : (data, callback)=>{
        Axios.post("http://localhost:8080/api/v1/login", data.body).then(response=>{

            callback(response.data, response.status)
        }).catch(error =>{

            callback(error, error.response.status)
        })
    },

    setWishList : (data, callback)=>{
        Axios.post("http://localhost:8080/api/v1/setWishList", data.body).then(response=>{

            callback(response.data, response.status)
        }).catch(error =>{

            callback(error, error.response.status)
        })

    },

    myWishList : (data, callback)=>{
        Axios.post("http://localhost:8080/api/v1/myWishList", data.body).then(response=>{

            callback(response.data, response.status)
        }).catch(error =>{

            callback(error, error.response.status)
        })

    },

    gallery : (callback)=>{
        jsonp("https://www.flickr.com/services/feeds/photos_public.gne?format=json", {name : 'jsonFlickrFeed'}, (error, data) => {
            if (error) {
                callback(error, 0)
                
            } else {
                callback(data.items, 1)
            }
        });
    },

    searchGallery : (data, callback)=>{
        jsonp("https://www.flickr.com/services/feeds/photos_public.gne?format=json&tags="+data.search, {name : 'jsonFlickrFeed'}, (error, data) => {
            if (error) {
                callback(error, 0)
                
            } else {
                callback(data.items, 1)
            }
        });
    }
}

export default API