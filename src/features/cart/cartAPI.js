export function addToCart(item) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart',{
      method: 'POST',
      body : JSON.stringify(item),
      headers : {
        'content-type': 'application/json'
      }
    })
    const  data = await response.json()
    // tod : on serve only important info
    resolve({data})
}
  );
}

export function fetchItemsByUserId(userId) {
  return new Promise(async (resolve) =>{
    // todo : not hard coded
    const response = await fetch('http://localhost:8080/cart?user='+userId)
    const  data = await response.json()
    resolve({data})
}
  );
}



export function updateCart(update) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+ update.id,{
      method: 'PATCH',
      body : JSON.stringify(update),
      headers : {
        'content-type': 'application/json'
      }
    })
    const  data = await response.json()
    // tod : on serve only important info
    resolve({data})
}
  );
}


export function deleteItemFromCart(itemId) {
  return new Promise(async (resolve) =>{
    const response = await fetch('http://localhost:8080/cart/'+ itemId,{
      method: 'DELETE',
      
      headers : {
        'content-type': 'application/json'
      }
    })
    const  data = await response.json()
    // tod : on serve only important info
    resolve({data:{id:itemId}})
}
  );
}

export  function resetcart(userId) {
  // get all the items and delete items api both are using
  return new Promise(async(resolve)=>{

    const response = await fetchItemsByUserId(userId)
    const items = response.data;
    for(let item of items){
     await deleteItemFromCart((item.id))
    }
    resolve({status:'success'})
  })
  
  
}

