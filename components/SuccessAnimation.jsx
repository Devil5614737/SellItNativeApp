import Lottie from 'lottie-react-native';
import { useEffect } from 'react';
import { useRef } from "react";



export const SuccessAnimation=()=>{

  const animationRef = useRef(null)
  useEffect(() => {
    animationRef.current.play()
  }, [])

  return (
    <Lottie
    style={{
      width: 100,
      height:100
    }}
    ref={animationRef}
    source={require('../assets/animations/success.json')}
    />
  )
}