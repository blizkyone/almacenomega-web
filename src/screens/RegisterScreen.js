import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import FormContainer from '../components/FormContainer'
import UserDetailsScreen from '../components/register/UserDetailsScreen'
import PaymentIntentScreen from '../components/register/PaymentIntentScreen'
import RegisterPaymentMethodScreen from '../components/register/RegisterPaymentMethodScreen'

const RegisterScreen = ({ history }) => {
   const [stage, setStage] = useState(0)

   const { userInfo } = useSelector((state) => state.userLogin)

   useEffect(() => {
      if (userInfo?.paymentMethod) history.push('/')
   }, [userInfo])

   const router = (stage) => {
      switch (stage) {
         case 0:
            return (
               <UserDetailsScreen
                  setStage={setStage}
                  // registerDispatch={registerDispatch}
                  // registerState={registerState}
               />
            )
         case 1:
            return <PaymentIntentScreen setStage={setStage} />
         case 2:
            return <RegisterPaymentMethodScreen />
         default:
            return
      }
   }

   return <FormContainer>{router(stage)}</FormContainer>
}

export default RegisterScreen
