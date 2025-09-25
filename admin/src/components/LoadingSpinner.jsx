
  import React from 'react'
  
  const LoadingSpinner = ({ message = "Loading..." }) => {
    return (
     <div className="flex items-center justify-center">
      <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
      <span>{message}</span>
    </div>
    )
  }
  
  export default LoadingSpinner
  

 