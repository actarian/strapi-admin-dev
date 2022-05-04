import React from 'react';
import './serp.css';


const Serp = ({ title, description }) => {
  return (
    <div>
      <div className="hiRENg">
        <h3 className="gQjSOK">
          {title && title.length > 60
            ? `${title.substring(0, 57)}...`
            : title}
        </h3>
        <span className="fJUNil">https://url-of-your-website.io</span>
        <p className="fJDKvR">
          <span className="ckmTcA">Mar 16, 2019 - </span>
          {description && description.length > 160
            ? `${description.substring(0, 157)}...`
            : description}
        </p>
      </div>
    </div>
  );
};

export default Serp;
