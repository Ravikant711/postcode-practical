import React, { useState } from "react";
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
  const addressData = useSelector((state) => state.postCode);
  
  const P_GUID = import.meta.env.VITE_P_GUID;
  const P_CLIENT_ID = import.meta.env.VITE_P_CLIENT_ID;
  const P_COUNCIL_ID = import.meta.env.VITE_P_COUNCIL_ID;

  const handlePostCode = (e) => {
    const newPostCode = e.target.value;
    setPostCode(newPostCode);
    
    const noSpacePostCode = newPostCode.replace(/\s+/g, "").trim(); 

    if (noSpacePostCode.length < 7 || noSpacePostCode.length > 7) {
      setError("Postcode must be 7 characters long.");
    } else {
      setError("");
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
