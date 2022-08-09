export const storeData = async( label,data ) =>{
  try{
    let response = await localStorage.setItem(label,data.toString())
    return Promise.resolve(response);
  }catch(e){
    return Promise.reject(e);
  }
}


export const updateData = async(label,data) =>{
  try{
    let response = await localStorage.mergeItem(label,data.toString())
    return Promise.resolve(response);
  }catch(e){
    return Promise.reject(e);
  }
}

export const retrieveData = async(label)=>{
  try{
    let response = await localStorage.getItem(label);
    return Promise.resolve(response);
  }catch(e){
    return Promise.reject(e);
  }
}

export const removeData = async(label)=>{
  try{
    let response = await localStorage.removeItem(label);
    return Promise.resolve(response)
  }catch(e){
    return Promise.reject(e);
  }
}