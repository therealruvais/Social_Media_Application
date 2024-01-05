import React, { useEffect, useState } from 'react'
import './postEditModal.css'
import Modal from 'react-modal'

import axios from 'axios'

const PostEditModal = ({ openPostModal, setOpenPostModal,data, postId }) => {
  
  const [edit, setEdit] = useState(false)
  const[desc,setDesc] = useState(data.desc)
  const handleEditClick = () => {
    setEdit(!edit)
  }

  const updatePost = async () => {
    const { data } = await axios.put(`http://localhost:1900/api/post/update/${postId}`, {
      desc
    }).catch(err => console.log(err))
    return data;
  }

  const onClickHandle = () => {
    updatePost().then((data) => console.log(data))
    setTimeout(() => {
      setEdit(false)
    },2000)
 }


  return (
    <Modal
      className={`PostEditModal ${edit ? undefined : "active"} `}
      isOpen={openPostModal}
      onRequestClose={() => setOpenPostModal(false)}
    >
      <div className="postEditContainet">
        {edit ? (
          <>
            <div className="peditContainer">
              <div className="leftC">
                <div className="leftCHead">
                  <p onClick={handleEditClick} style={{ cursor: "pointer" }}>Cancel</p>
                  <p style={{ fontWeight: 700 }}>Edit info</p>
                </div>
                <div className="leftCImg">
                  <img
                    className="editpostMimg"
                    src={data.image}
                    alt=""
                  />
                </div>
              </div>
              <div className="RightC">
                <div className="rightCHead">
                  <p onClick={onClickHandle} style={{ color: "var(--color-blue)", cursor: "pointer" }}>
                    Done
                  </p>
                </div>
                <div className="rightInput">
                  <textarea
                    rows={10}
                    value={desc}
                    placeholder="caption"
                    onChange={(e)=> setDesc(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </>
        ) : (
          <>
            <div className="editC">
              <div className="editT">
                <button onClick={handleEditClick} className="ed-button">Edit</button>
              </div>
              <div className="editD">
                <button className="ed-button">Delete</button>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default PostEditModal