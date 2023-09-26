import React,{useEffect, useState} from 'react'
import {useParams, useNavigate} from 'react-router-dom'
const UpdateProduct = () => {
    const[name,setName]=useState("");
    const[price,setPrice]=useState("");
    const[category,setCategory]=useState("");
    const[company,setCompany]=useState("");
    const params=useParams();
    const navigate=useNavigate();
    useEffect(()=>{
     getProductDetails();
    },[])
    const getProductDetails= async ()=>{
        console.log(params)
        let result= await fetch(`http://localhost:5000/product/${params.id}`)
        result =await result.json();
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)
        console.log(result)
    }
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
    const updateProduct= async ()=>{
        let result = await fetch(`http://localhost:5000/product/${params.id}`,{
            method:'Put',
            body:JSON.stringify({name,price,category,company}),
            headers:{
                'Content-Type':'application/json'
            }
    
        })
        result=await result.json();
        console.log(result)
        navigate('/')
        // alert("Updated")
    }

  return (
    <div className='product'>
    <h1>Update Product</h1>
    <input type="text" onChange={nameHandler} value={name} placeholder='Enter product name'/>
    <input type="number" onChange={priceHandler} value={price} placeholder='Enter product price'/>
    <input type="text" onChange={categoryHandler} value={category} placeholder='Enter product category'/>
    <input type="text" onChange={companyHandler} value={company} placeholder='Enter company name'/>
    <button onClick={updateProduct}>Update Product</button>

    </div>
  )
}

export default UpdateProduct