import React from "react";
import "./ContentServices.css";

const ContentServices = ({ title, list }) => {
  return (
    <div className="wrapper__container">
      <h6 className="content__heading">{title}</h6>
      <div className="content__link">
        {list?.length > 0 &&
          list?.map((item, i) => (
            <a href="" key={i}>
              {item}
            </a>
          ))}
      </div>
    </div>
  );
};

export default ContentServices;
