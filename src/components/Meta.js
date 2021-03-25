import React from 'react'
import { Helmet } from 'react-helmet'

const Meta = ({ title, description, keywords }) => {
   return (
      <Helmet>
         <title>{title}</title>
         <meta name='description' content={description} />
         <meta name='keyword' content={keywords} />
      </Helmet>
   )
}

Meta.defaultProps = {
   title: 'AlmacenOmega',
   description: 'Servicio de Almacenamiento y Entrega de Mercancía y Objetos',
   keywords:
      'Almacenamiento, Servicio de Inventario, Inventario, comercio electronico, ecommerce',
}

export default Meta
