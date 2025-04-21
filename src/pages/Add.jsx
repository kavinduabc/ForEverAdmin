import React, { useState } from 'react'
import { assets } from '../assets/adminAssets/assets'
import { backendUrl } from '../App'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Add = () => {
  const [key, setKey] = useState('')
  const [image, setImage] = useState('')
  const [name, setName] = useState('')
  const [discription, setDiscription] = useState('')
  const [catrgory, setCategory] = useState('')
  const [subCategory, setSubCategory] = useState('')
  const [price, setPrice] = useState('')

  const navigate = useNavigate()
  //const file =e.target.files[0]

  async function addProduct() {
    console.log(key, name, discription, catrgory, subCategory, price)

    const token = localStorage.getItem('token')
    if (!token) {
      toast.error('You are not authorized to perform this task')
      return
    }

    try {
      const product = await axios.post(
        backendUrl + '/api/product',
        {
          key,
          name,
          discription,
          category: catrgory,
          subCategory,
          price,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        }
      )
      toast.success(product.data.message)
      navigate('/list')
    } catch (error) {
      if(error.response?.data?.error?.includes('expired')){
        toast.error('session expired.plese log in again.')
        localStorage.removeItem('token')
        navigate('/login')
      }
      else{
        toast.error(error.response?.data?.error || 'something went wrong')
      }
    }
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        addProduct()
      }}
      className="flex flex-col w-full items-start gap-3"
    >
      <div>
        <p className="mb-2">Upload Image</p>

        <div className="flex gap-2">
          <label htmlFor="image1">
            <img className="w-20" src={assets.upload_area} alt="upload" />
            <input
              onChange={(e) => setImage(e.target.value)}
              value={image}
              type="file"
              id="image1"
              hidden
            />
          </label>

          <label htmlFor="image2">
            <img className="w-20" src={assets.upload_area} alt="upload" />
            <input type="file" id="image2" hidden />
          </label>

          <label htmlFor="image3">
            <img className="w-20" src={assets.upload_area} alt="upload" />
            <input type="file" id="image3" hidden />
          </label>

          <label htmlFor="image4">
            <img className="w-20" src={assets.upload_area} alt="upload" />
            <input type="file" id="image4" hidden />
          </label>
        </div>
      </div>

      <div className="w-full">
        <p className="mb-2">Product Key</p>
        <input
          onChange={(e) => setKey(e.target.value)}
          value={key}
          className="w-full max-w-[500px] px-3 py-2 border-1"
          type="text"
          placeholder="product key"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product name</p>
        <input
          onChange={(e) => setName(e.target.value)}
          value={name}
          className="w-full max-w-[500px] px-3 py-2 border-1"
          type="text"
          placeholder="product name"
          required
        />
      </div>
      <div className="w-full">
        <p className="mb-2">Product Discription</p>
        <textarea
          onChange={(e) => setDiscription(e.target.value)}
          value={discription}
          className="w-full max-w-[500px] px-3 py-2 border-1"
          placeholder="product discription"
          required
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:gap-8">
        <div>
          <p className="mb-2">Product category</p>
          <select
            onChange={(e) => setCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">Select</option>
            <option value="men">Men</option>
            <option value="women">Women</option>
            <option value="kid">Kids</option>
          </select>
        </div>
        <div>
          <p className="mb-2">Sub category</p>
          <select
            onChange={(e) => setSubCategory(e.target.value)}
            className="w-full px-3 py-2"
          >
            <option value="">Select</option>
            <option value="topwear">Topwear</option>
            <option value="bottomwear">Bottomwear</option>
            <option value="winterwear">Winterwear</option>
          </select>
        </div>

        <div>
          <p className="mb-2">Product Price</p>
          <input
            onChange={(e) => setPrice(e.target.value)}
            value={price}
            className="w-full px-3 py-2 sm:w-[120px]"
            type="number"
            placeholder="price"
          />
        </div>
      </div>

      <div>
        <p className="mb-2">Product Sizes</p>
        <div className="flex gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div key={size}>
              <p className="bg-slate-200 px-3 py-1 cursor-pointer">{size}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="flex gap-2 mt-2">
        <input type="checkbox" id="bestseller" />
        <label className="cursor-pointer" htmlFor="bestseller">
          Add to bestseller
        </label>
      </div>

      <button type="submit" className="w-28 py-3 mt-4 bg-black text-white">
        ADD
      </button>
    </form>
  )
}

export default Add
