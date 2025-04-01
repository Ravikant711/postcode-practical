import React from "react";
import "./ColorCodedCollection.css";
import { useSelector } from "react-redux";

const ColorCodedCollection = () => {
  const collectionDay = useSelector(
    (state) => state.addressCollection.addressCollection
  );

  return (
    <div className="colorcoded__container">
      <p>Your next Collection</p>
      <div className="grid__container">
        {collectionDay ? (
          collectionDay.length > 0 ? (
            collectionDay?.map((item) => (
              <div
                key={item?.binColor}
                style={{ backgroundColor: item?.binColor }}
                className="grid__box"
              >
                <h6>{item?.binType}</h6>
                <p>{item?.collectionDay}</p>
              </div>
            ))
          ) : (
            // <p style={{ color: "red"}}>Please enter postcode and select address for collection of address</p>
            ""
          )
        ) : (
          <p style={{ color: "red"}}>
            No collection available for your address
          </p>
        )}
      </div>
    </div>
  );
};

export default ColorCodedCollection;
