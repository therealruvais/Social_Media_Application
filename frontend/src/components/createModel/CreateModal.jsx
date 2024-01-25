import React, { useContext, useEffect, useRef, useState } from "react";
import "./createModal.css";
import Modal from "react-modal";
import { CiImageOn } from "react-icons/ci";
import { PacmanLoader,ClipLoader } from "react-spinners";
import axios from 'axios'
import { UserDataContext } from "../../context/UserDataContext";

const CreateModal = ({ modalIsOpen, setModalIsOpen }) => {
  const fileRef = useRef();
  const [image, setImage] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(true)
  const [imgloading, setImgloading] = useState(false)
  
  const { userData } = useContext(UserDataContext)

  useEffect(() => {
    if (userData) {
      setLoading(false)
    }
  },[userData])

  const uploadToCloudinary = async (imageFile) => {
    setImgloading(true)
    const data = new FormData();
    data.append("file", imageFile);
    data.append("upload_preset", "socialmedia");
    data.append("cloud_name", "ddwuuorpm");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/ddwuuorpm/image/upload",
        data,
        { withCredentials: false }
      );
      setImgloading(false)
      return response.data.url;
    } catch (error) {
      setImgloading(false)
      console.error("Error uploading image to Cloudinary:", error);
      throw new Error("Failed to upload image to Cloudinary");
    }
  };
  const postToBackend = async () => {
      try {
         const { data } = await axios.post(
           `https://encouraging-erin-neckerchief.cyclic.app/api/post/create`,
           {
             desc,
             image,
           }
         );
        console.log(data)
        return data

      } catch (error) {
        console.error("Error posting image URL:", error);
      }
  }
  const onImageChange = async (e) => {
    const selectedImage = e.target.files[0];
    try {
      const imageUrl = await uploadToCloudinary(selectedImage);
      setImage(imageUrl);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };
  const onShare = () => {
    postToBackend()
    setTimeout(() => {
      setImage(null)
      setNext(false)
      setDesc('')
    },[2000])
  }
  const [next, setNext] = useState(false);
  const handleNext = () => {
    setNext(!next);
  };

  return (
    <Modal
      style={{ overlay: { backgroundColor: "#2e2b2bc7", zIndex: 2 } }}
      isOpen={modalIsOpen}
      onRequestClose={() => setModalIsOpen(false)}
      className={`modalForCreate ${next ? undefined : "active"}`}
    >
      <div className="createContainer">
        {image == null ? (
          <>
            <div className="createHead">
              <p
                style={{
                  color: "var(--color-dark)",
                  fontSize: 18,
                  fontWeight: 600,
                }}
              >
                Create New Post
              </p>
            </div>
            <div className="createIcons">
              <div>
                <CiImageOn style={{ fontWeight: 100 }} />
              </div>
            </div>
            <div className="create-btn">
              <button onClick={() => fileRef.current.click()}>
                Select from Device
              </button>
              <input
                type="file"
                className="fileInput"
                ref={fileRef}
                onChange={onImageChange}
              />
            </div>
          </>
        ) : (
          <>
            <div className="createimageContainer">
              <div className="leftC">
                <div className="createimageHead">
                  <div
                    style={{
                      fontSize: 30,
                      cursor: "pointer",
                    }}
                    onClick={() => {
                      setImage(null);
                      setNext(false);
                    }}
                  >
                    ←
                  </div>
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      color: "var(--color-blue)",
                      cursor: "pointer",
                    }}
                    onClick={handleNext}
                  >
                    {next ? "" : "Next"}
                  </p>
                </div>
                <div className="createdImage">
                  {imgloading ? (
                    <div className="loading-spinner">
                      <ClipLoader
                        color="#36d7b7"
                        size={15}
                        loading={!userData}
                      />
                    </div>
                  ) : (
                    <img
                      src={image} /* image url sets here  */
                      alt=""
                    />
                  )}
                </div>
              </div>
              <div className={`rightC ${next ? undefined : "active"}`}>
                <div className="rightChead">
                  <p
                    style={{
                      fontSize: 18,
                      fontWeight: 400,
                      color: "var(--color-blue)",
                      cursor: "pointer",
                    }}
                    onClick={onShare}
                  >
                    Share
                  </p>
                </div>
                <div className="rightCimg">
                  {loading ? (
                    <div className="loading-spinner">
                      <PacmanLoader
                        color="#36d7b7"
                        size={15}
                        loading={!userData}
                      />
                    </div>
                  ) : (
                    <>
                      <img
                        src={userData.image}
                        alt=""
                      />
                      <p>{userData.username}</p>
                    </>
                  )}
                </div>
                <div className="caption">
                  <textarea
                    rows={10}
                    placeholder="Wite a caption"
                    value={desc}
                    onChange={(e) =>
                      setDesc(e.target.value)
                    } /* here is the description */
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </Modal>
  );
};

export default CreateModal;
