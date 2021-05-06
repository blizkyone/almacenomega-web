import React, { useEffect } from 'react'
import Barcode from 'react-barcode'

const BarcodeScreen = ({ match, history }) => {
   useEffect(() => {
      if (!match.params.barcode) history.push('/admin')
   }, [match, history])

   return <Barcode value={match.params.barcode} />
}

export default BarcodeScreen
