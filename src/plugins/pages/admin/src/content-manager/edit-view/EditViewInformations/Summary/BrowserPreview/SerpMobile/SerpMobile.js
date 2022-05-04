import React from 'react';
import './serpmobile.css';


const SerpMobile = ({ title, description }) => {
  return (
    <div className="google-snippet-preview">
      <div className="wrap-snippet snipcss-N3O8b snip-div">
        <div className="wrap-m-icon-permalink snip-div">
          <div className="snippet-permalink snip-div">
            https://url-of-your-website.io
          </div>
        </div>

        <div className="snippet-title-custom snip-div">
          {title && title.length > 60
            ? `${title.substring(0, 60)}...`
            : title}
        </div>

        <div className="snippet-description-default snip-div">
          {description && description.length > 160
            ? `${description.substring(0, 160)}...`
            : description}
        </div>
      </div>
    </div>
  );
};

export default SerpMobile;
