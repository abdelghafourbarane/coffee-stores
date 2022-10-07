import { useContext, useState } from "react";

import { ACTION_TYPE, CoffeeStoresContext } from "../store/store-context";

const useTrackLocation = () => {
  // const [latLong,setLatLong]=useState("")
  const [isLocationLoading, setIsLocationLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const { dispatch } = useContext(CoffeeStoresContext);
  const handleGetCurrentLocation = () => {
    if (!navigator.geolocation) {
      setErrorMsg("Geolocation is not supported in your browser");
      setIsLocationLoading(false);
    } else {
      setIsLocationLoading(true);
      navigator.geolocation.getCurrentPosition(success, error);
    }
  };

  const success = (positions) => {
    const {latitude,longitude}=positions.coords
    dispatch({
      type: ACTION_TYPE.SET_LAT_LONG,
      payload: `${latitude},${longitude}`,
    });
    setIsLocationLoading(false);
    setErrorMsg("");
  };
  const error = () => {
    setErrorMsg("Unable to retrieve your location");
    setIsLocationLoading(false);
  };
  return {
    // latLong,
    isLocationLoading,
    errorMsg,
    handleGetCurrentLocation,
  };
};

export default useTrackLocation;
