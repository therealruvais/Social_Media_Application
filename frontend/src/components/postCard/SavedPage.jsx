import React from 'react'

const SavedPage = ({data}) => {
  return (
    <>
      <div className="editImgC">
        <img
          className="editImg"
          style={{ cursor: "pointer" }}
          src={data.image}
          alt="no image yet"
        />
      </div>
    </>
  );
}

export default SavedPage