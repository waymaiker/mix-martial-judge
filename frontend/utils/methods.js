import { countriesList } from "./constants";

export const toastSuccess = (title, reason, position) => {
  return { 
    position: position !=undefined ? position : "bottom",
    title: "Success - "+title, 
    description: reason, 
    status: 'success', 
    duration: 5000, 
    isClosable: true 
  }
}

export const toastError = (title, reason) => {
  return { 
    title: "Error - "+title, 
    description: reason, 
    status: 'error', 
    duration: 5000, 
    isClosable: true 
  }
}

export function isEmail(val) {
  let regEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if(!regEmail.test(val)){
    return 'Invalid Email';
  }
}

export const isCountry = (val) => {
  let isCountryExist = countriesList.find(country => country.name.toLowerCase().includes(val.toLowerCase()))
  return isCountryExist == undefined ||  isCountryExist == false || val.length < 4 ? false : true;
}

export const dateToTimeStamp = (strDate) => { 
  const dt = Date.parse(strDate); 
  return dt / 1000; 
} 

export const timestampToDate = (timestamp) => {
  const timestampConvertion = timestamp * 1000 
  const date = new Date(timestampConvertion).toLocaleDateString()
  return date;
}