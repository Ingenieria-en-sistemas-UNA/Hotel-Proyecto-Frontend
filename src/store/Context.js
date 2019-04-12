import React, { createContext } from 'react'

export const HotelContext = createContext()

export const { Provider, Consumer } = HotelContext

export const withContext = Component => props => (
  <Consumer>
    {value =>
      <Component {...value} {...props} />
    }
  </Consumer>
)