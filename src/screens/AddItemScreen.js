import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { createProduct } from '../actions/productActions'
import FormContainer from '../components/FormContainer'
import NewItemDetails from '../components/NewItemFlow/NewItemDetails'
import NewItemPackaging from '../components/NewItemFlow/NewItemPackaging'
// import Message from '../components/Message'

const AddItemScreen = ({ history }) => {
   const [stage, setStage] = useState(0)

   const [barcode, setBarcode] = useState('')
   const [name, setName] = useState('')
   const [brand, setBrand] = useState('')
   const [condition, setCondition] = useState('')
   const [qty, setQty] = useState('')
   const [description, setDescription] = useState('')
   const [category, setCategory] = useState([])

   const [width, setWidth] = useState()
   const [height, setHeight] = useState()
   const [length, setLength] = useState()
   const [weight, setWeight] = useState()

   const dispatch = useDispatch()

   const userLogin = useSelector((state) => state.userLogin)
   const { userInfo } = userLogin

   const handleBarcodeSubmit = (e) => {
      e.preventDefault()
      alert('Barcode submitted')
   }

   const createItem = (e) => {
      e.preventDefault()
      dispatch(createProduct())
   }

   const newItemDetailsProps = {
      handleBarcodeSubmit,
      setStage,
      barcode,
      setBarcode,
      name,
      setName,
      brand,
      setBrand,
      category,
      setCategory,
      description,
      setDescription,
      condition,
      setCondition,
      qty,
      setQty,
   }

   const NewItemPackagingProps = {
      setStage,
      width,
      setWidth,
      height,
      setHeight,
      length,
      setLength,
      weight,
      setWeight,
   }

   const router = (stage) => {
      switch (stage) {
         case 0:
            return <NewItemDetails {...newItemDetailsProps} />
         case 1:
            return <NewItemPackaging {...NewItemPackagingProps} />
         default:
            return
      }
   }

   useEffect(() => {
      if (!userInfo) {
         history.push('/login')
      }
   }, [userInfo])

   return <FormContainer>{router(stage)}</FormContainer>
}

export default AddItemScreen
