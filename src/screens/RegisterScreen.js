import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import UserDetailsScreen from '../components/register/UserDetailsScreen'
import PaymentIntentScreen from '../components/register/PaymentIntentScreen'
import RegisterPaymentMethodScreen from '../components/register/RegisterPaymentMethodScreen'
import VerifyPhoneScreen from '../components/register/VerifyPhoneScreen'
import VerifyCodeScreen from '../components/register/VerifyCodeScreen'

const RegisterScreen = ({ history }) => {
   const [stage, setStage] = useState(0)
   const [phone, setPhone] = useState('')

   const { userInfo } = useSelector((state) => state.userLogin)

   useEffect(() => {
      // if (userInfo?.paymentMethod) history.push('/')
      if (userInfo) history.push('/')
   }, [userInfo])

   const router = (stage) => {
      switch (stage) {
         case 0:
            return (
               <VerifyPhoneScreen
                  setStage={setStage}
                  setGlobalPhone={setPhone}
               />
            )
         case 1:
            return <VerifyCodeScreen phone={phone} setStage={setStage} />
         case 2:
            return (
               <UserDetailsScreen
                  phone={phone}
                  setStage={setStage}
                  // registerDispatch={registerDispatch}
                  // registerState={registerState}
               />
            )
         case 3:
            return <PaymentIntentScreen setStage={setStage} />
         case 4:
            return <RegisterPaymentMethodScreen />
         default:
            return
      }
   }

   return <FormContainer>{router(stage)}</FormContainer>
}

export default RegisterScreen
