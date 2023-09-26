import React,{useState,useEffect} from 'react'
import { Link } from 'react-router-dom';

const ProductList = () => {
    const [products,setProducts] = useState([])
    useEffect(()=>{
         getProducts();
    },[])
    const getProducts = async ()=>{
     let result= await fetch('http://localhost:5000/products',{
      headers:{
        authorization:JSON.parse(localStorage.getItem('token'))
      }
     })
     result= await result.json();
     setProducts(result)
     
    }
  const deleteProduct= async (id)=>{
    // console.log("ding")
    let result=await fetch(`http://localhost:5000/product/${id}`,{
      method:"Delete"
    })
    result=await result.json()
    if(result){
      getProducts();
    }
  }
  const searchHandle=async (e)=>{
  let key=e.target.value;
  if(key){
  let result = await fetch(`http://localhost:5000/search/${key}`)
  result =await result.json();
  if(result){
    setProducts(result)
  }
}
  else{
   getProducts()
  }
  }
  return (
    <div className='product-list'>
    <h1>Product List</h1>
    <input  type="text" 
    placeholder='Search products'
    onChange={searchHandle}
     />
    <ul>
        <li> S. No</li>
        <li>Name</li>
        <li>Price</li>
        <li>Category</li>
        <li>Company</li>
        <li>Delete Item</li>
    </ul>
      {
        products.length>0 ? products.map((item,i)=>
          <ul key={item._id}>
            <li>{i+1}</li>
            <li> {item.name}</li>
            <li> $ {item.price}</li>
            <li>{item.category}</li>
            <li>{item.company}</li>
            <li><button className="delete-btn" onClick={()=> deleteProduct(item._id)}>Delete</button>
            <Link to={`/update/${item._id}`}>Update</Link></li>
        </ul>
        ) : <h2>No Products to shows</h2>
      }
    </div>
  )
}

export default ProductList