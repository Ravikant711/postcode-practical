
import React, { useEffect, useState } from "react";
import "./PostCodeInput.css";
import { fetchPostCode } from "../app/postCodeApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchAddressCollection } from "../app/addressCollectionApi";
import { removePostCode } from "../app/postCodeSlice";
import { removeAddressCollection } from "../app/addressCollectionSlice";


const PostCodeInput = () => {
  const [postCode, setPostCode] = useState("");
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const [addressesData, setAddressesData] = useState([])
  const [textValue, setTextValue] = useState('')
  const [toggle, setToggle] = useState(false)
  const addressData = useSelector((state) => state.postCode);
  
  const P_GUID = import.meta.env.VITE_P_GUID;
  const P_CLIENT_ID = import.meta.env.VITE_P_CLIENT_ID;
  const P_COUNCIL_ID = import.meta.env.VITE_P_COUNCIL_ID;

  
  useEffect(() => {
    setAddressesData(addressData?.postCode)
  }, [addressData?.postCode])

  const handlePostCode = (e) => {
    const newPostCode = e.target.value;
    setPostCode(newPostCode);
    
    const noSpacePostCode = newPostCode.trim(); 

    if (noSpacePostCode.length < 7 || noSpacePostCode.length > 7) {
      setError("Postcode must be 7 characters long.");
    } else {
      setError("");
    }

    if (noSpacePostCode.length === 0) {

      dispatch(removePostCode());
      dispatch(removeAddressCollection());
    }

    //dispatching postcode
    if (noSpacePostCode.length === 7) {
      dispatch(
        fetchPostCode({
          P_GUID: P_GUID,
          P_POSTCODE: noSpacePostCode,
        })
      );
    }
  };

  //selecting address
  const handleAddressChange = (e) => {
    const uprnValue = e.target.value;

    if (uprnValue) {
      dispatch(fetchAddressCollection({
        P_GUID: P_GUID,
        P_UPRN: uprnValue,
        P_CLIENT_ID: P_CLIENT_ID,
        P_COUNCIL_ID: P_COUNCIL_ID
      }))
    }
  }

  const handleClickAddress = (UPRN) => {
    // e.preventDefault();
    alert("hi")
    console.log(UPRN, "Uprn")
    if (UPRN) {
      dispatch(fetchAddressCollection({
        P_GUID: P_GUID,
        P_UPRN: UPRN,
        P_CLIENT_ID: P_CLIENT_ID,
        P_COUNCIL_ID: P_COUNCIL_ID
      }))
      setToggle(false)
    }
  }

  console.log(addressesData, "lets see addressData data filled")

  const handleFilterAddress = (e) => {
    const searchValue = e.target.value;
    console.log(searchValue)

    setTextValue(searchValue);
    // console.log(addressData?.postCode, "Checking value")
    const filteredData = addressData?.postCode?.filter((item) => item?.FULL_ADDRESS?.toLowerCase().includes(searchValue.toLowerCase()))

    setAddressesData(filteredData)
    console.log(filteredData, "Checking filtered Data")    
  }

  const handleCollapsedAddress = (e) => {
    e.preventDefault()
    setToggle(!toggle)
  }

  console.log(toggle, "Checking toggle")

  //clearing postcode and address
  const handleClick = (e) => {
    e.preventDefault()

    dispatch(removePostCode())
    dispatch(removeAddressCollection())
    setPostCode("")
  }

  return (
    <div className="container">
      <form className="postcode-container">
        <div className="field">
          <label htmlFor="postCode">Enter a postcode</label>
          <span>For example NP20 2PE</span>
          <input
            id="postCode"
            value={postCode}
            onChange={handlePostCode}
            type="text"
          />
          {error && <p style={{ color: "red", fontSize: "14px" }}>{error}</p>}
        </div>
        <div className="field">
          <label htmlFor="">Select an address</label>
          <div className="dropdown">
            <button onClick={handleCollapsedAddress} className="dropbtn">Dropdown</button>
            {
              toggle &&
              (
                <div className="dropdown-content">
                  <input type="text" value={textValue} id="myInput" onChange={handleFilterAddress}/>
                  {
                    addressesData?.length > 0 && (
                      addressesData?.map((item) => (
                        <a href="#" key={item.UPRN} onClick={() => handleClickAddress(item.UPRN)}>{item.FULL_ADDRESS}</a>
                      ))
                    )
                  }
                </div>
              )
            }
          </div>
          <select
            name="address"
            disabled={addressData?.postCode?.length === 0}
            id="address"
            onChange={handleAddressChange}
          >
            <option value="">Select address</option>
            {addressData?.postCode?.length > 0 &&
              addressData?.postCode?.map((item) => (
                <option key={item.UPRN} value={item.UPRN}>{item.FULL_ADDRESS}</option>
              ))}
          </select>
        </div>
        <button className="btn" onClick={handleClick}>Clear address and start again</button>
      </form>
    </div>
  );
};

export default PostCodeInput;
