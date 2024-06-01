import axios from "axios";


// const applicationId = '592563';
// const secretKey = 'ujXoRrlzdJryG9_F6vMv6Bpoh4WLdIUZvYivbxnAMnQ';
axios.defaults.baseURL = 'https://api.unsplash.com';


export default async function fetchPhotos (searchQuery, currentPage) {
const accessKey = 'QiugcvQQVcsIGV6774ugdpVRCz9wfeQOXUZwNzZlAlk';
const response = await axios.get('/search/photos', {
    params:{
    client_id: accessKey,
    query: searchQuery,
    page: currentPage,
    per_page: 12,
}});
return response.data;
}