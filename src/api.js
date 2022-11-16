import axios from 'axios'

const myApi = axios.create({
    baseURL: 'http://localhost:5000',
  });



  export const fetchUsers = () => {
    return myApi.get(`/users`).then(({data}) => {  
      console.log(data)
    })
  };

  export const fetchImages = () => {
    return myApi.get(`/images`).then(({data} ) => {

      console.log(data)


      return data


    }).catch((err)=>{

      console.log("There has been an error", err)
    })
  };

  export const addImage = (formData)=>{

    // for (const pair of formData.entries()) {
    //   console.log(`${pair[0]}, ${pair[1]}`);
    // }

    return myApi.post('/image', formData,   {
      headers: {
          'enctype': 'multipart/form-data'
      }}).then(()=>{
      console.log("Upload successful")
    })
  }






  

  