import axios from 'axios'

const api = axios.create({
    baseURL: 'https://good-blue-newt-tam.cyclic.app/api/',
});
  
export const fetchContainer = (container_id) => {
  return api.get(`containers/${container_id}`).then(({data}) => {
    console.log(data, '<<< in api call')
      return data
    })
  }

  export const fetchUsers = () => {
    return api.get(`users`).then(({data}) => {  
      console.log(data)
      return data
    })
  };

  export const fetchImages = () => {
    return api.get(`images`).then(({data} ) => {

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

    return api.post('/image', formData,   {
      headers: {
          'enctype': 'multipart/form-data'
      }}).then(()=>{
      console.log("Upload successful")
    })
  }

  export const addContainer = (formData, parent_id) => {
    return api.post(`/containers/addcontainer/${parent_id}`, formData, {
      headers: {
        'enctype': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    }})
  }

  export const addItem = (formData, parent_id) => {
    return api.post(`/items/additem/${parent_id}`, formData, {
      headers: {
        'enctype': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    }})
  }

  export const deleteItem = (parent_id, id) => {
    return api.delete(`/item`, {
      headers: {'Content-Type': 'application/json'},
      data: {"parent_id": parent_id, "item_id": id}
    })
  }

  export const deleteContainer = (container_id) => {
    return api.delete(`/container/${container_id}`)
  }






  

  