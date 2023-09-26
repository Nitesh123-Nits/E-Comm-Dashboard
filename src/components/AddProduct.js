
import React,{useState} from 'react'

const AddProduct = () => {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const[error,setError]=useState(false);
    const nameHandler=(e)=>{
        setName(e.target.value)
    }
    const priceHandler=(e)=>{
        setPrice(e.target.value)
    }
    const categoryHandler=(e)=>{
        setCategory(e.target.value)
    }
    const companyHandler=(e)=>{
        setCompany(e.target.value)
    }
    const addProduct= async ()=>{
        if(!name || !price || !category || !company){
            // alert("Enter all details")
            setError(true)
            return false
        }
    const userId=JSON.parse(localStorage.getItem('user'))._id;
    let result=await fetch('http://localhost:5000/add-product',
    {
        method:'post',
        body:JSON.stringify({name,price,category,userId,company}),
        headers:{
            "Content-Type":"application/json"
        }
     }) ;
   result=await result.json();
   console.log(result)
        

        
        setName('')
        setPrice('')
        setCategory('')
        setCompany('')
    }
  return (
    <div className='product'>
    <h1>Product Added</h1>
    <input type="text" onChange={nameHandler} value={name} placeholder='Enter product name'/>
    {error && !name && <span className='invalid-input'>Enter valid name</span>}
    <input type="number" onChange={priceHandler} value={price} placeholder='Enter product price'/>
    {error && !price && <span className='invalid-input'>Enter valid price</span>}
    <input type="text" onChange={categoryHandler} value={category} placeholder='Enter product category'/>
    {error && !category && <span className='invalid-input'>Enter valid category</span>}
    <input type="text" onChange={companyHandler} value={company} placeholder='Enter company name'/>
    {error && !company && <span className='invalid-input'>Enter valid company</span>}

    <button onClick={addProduct}>Add Product</button>

    </div>
  )
}

export default AddProduct