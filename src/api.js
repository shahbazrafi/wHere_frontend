import axios from 'axios'

const api = axios.create({
    baseURL: 'https://good-blue-newt-tam.cyclic.app/api/',
});
  
export const fetchContainerById = (container_id) => {
  return api.get(`containers/${container_id}`).then(({data}) => {
      return data
    })
  }

  export const fetchItemById = (item_id) => {
    return api.get(`items/${item_id}`).then(({data}) => {
        return data
      })
    }
    

  export const fetchUsers = () => {
    return api.get(`users`).then(({data}) => {
      return data
    })
  };

  export const fetchImages = () => {
    return api.get(`images`).then(({data} ) => {
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

  export const patchContainer = (formData, id) => {
    return api.patch(`/editcontainer/${id}`, formData, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  export const addItem = (formData, id) => {
    return api.post(`/items/additem/${id}`, formData, {
      headers: {
        'enctype': 'multipart/form-data',
        'Content-Type': 'multipart/form-data'
    }})
  }

  export const patchItem = (formData, old_parent_id) => {
    return api.patch(`/edititem/${old_parent_id}`, formData, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  export const deleteItem = (parent_id, id) => {
    return api.delete(`/item`, {
      headers: {'Content-Type': 'application/json'},
      data: {"parent_id": parent_id, "item_id": id}
    })
  }

  export const deleteContainer = (container_id) => {
    return api.delete(`/container/${container_id}`, {
      headers: {'Content-Type': 'application/json'}
    })
  }

  export const getDirectory = () => {
    return api.get(`/containers`).then(data => data)
  }

  export const getSearch = (string) => {
    return api.get(`/allitems`).then(({data}) => {
      let newdata = data.filter(x => x.name.toLowerCase().includes(string.toLowerCase()))
      return newdata
    }).then(data => {
      const newdata = [...data]
      return Promise.all(newdata.map((x, index) => {
        return api.get(`/images/${x.image}`).then(({data}) => {x.img=data.img; return x})
      })).then(() => newdata)
    }).then((data)=> {
      return data
    })
  }





  

  