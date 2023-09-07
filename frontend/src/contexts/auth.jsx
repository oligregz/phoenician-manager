import { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [productsData, setProductsData] = useState({});

  return <AuthContext.Provider
    value={ 
      {
        productsData,
        setProductsData
      }
    }
  >{ children }</AuthContext.Provider>;
}

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
}