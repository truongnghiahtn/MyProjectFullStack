import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col } from "antd";
import { FiUpload } from "react-icons/fi";
import {
  setIsLoadingFile,
  setDefaultFile,
  createFile,
  getAllFile,
  createFileDriver,
} from "../redux/file/file";
import { useSelector, useDispatch } from "react-redux";
import { FaCircleCheck } from "react-icons/fa6";
import ReactPlayer from "react-player";

const ModalUpload = ({ isModalOpen, setIsModalOpen, onHandleUpload }) => {
  const dispatch = useDispatch();
  const file = useSelector((state) => state.file);
  const [listFile, setListFile] = useState([]);
  const [fileCheck, setFileCheck] = useState(null);
  const URLCREATE =
    "https://script.google.com/macros/s/AKfycbxovFVOnsImrqugef_kCsEVvl8LeL_r7L1uOQEWgydS_J78CRQCO0XbQWlWn1yadcFk/exec";
  const URLDELETE =
    "https://script.google.com/macros/s/AKfycbz3ZkY3pWeMek7RdNYUqVGYEC5VQvtzaFZ0C5bYtvuegxrGVEGmTyeCygfZ4GAQ1HUD/exec";

  useEffect(() => {
    dispatch(setIsLoadingFile());
    dispatch(getAllFile());
    return () => {
      dispatch(setDefaultFile());
    };
  }, []);
  useEffect(() => {
    if (file && file.listFile.length > 0) {
      setListFile(file.listFile);
    }
  }, [file.listFile]);

  const handleOk = () => {
    // ban su kien
    onHandleUpload(fileCheck);
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setFileCheck(null);
    setIsModalOpen(false);
  };
  const onchangeFileImage = (e) => {
    if (e.target.files && e.target.files[0] && e.target) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.readAsDataURL(file);
      if (file.type.split("/")[0] === "image") {
        reader.addEventListener("load", async () => {
          const data = reader.result.split(",")[1];
          const postData = {
            name: file.name,
            type: file.type,
            data: data,
          };
          const result = await postFile(postData);
          const createFile = {
            filename: result.id,
            url: result.link,
            type: file.type.split("/")[0],
          };

          dispatch(setIsLoadingFile());
          dispatch(createFileDriver(createFile));
        });
      }else{
      const data = new FormData();
        data.append("file", e.target.files[0]);
        dispatch(setIsLoadingFile());
        dispatch(createFile(data));
      }
    }
  };
  const postFile = async (postData) => {
    try {
      const response = await fetch(URLCREATE, {
        method: "POST",
        body: JSON.stringify(postData),
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
    }
  };

  const deleteFile = async (deleteFile) => {
    try {
      const response = await fetch(URLCREATE, {
        method: "POST",
        body: JSON.stringify(deleteFile),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const onHandleFile = (file) => {
    if (fileCheck && fileCheck?._id === file._id) {
      setFileCheck(null);
      return;
    }
    setFileCheck(file);
  };

  return (
    <div className="box__upload">
      <Modal
        title="Basic Modal"
        width={800}
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <div className="box__upload--file">
          <Row gutter={[16, 16]}>
            <Col xs={12} sm={12} md={6}>
              <label
                htmlFor="uploadFile"
                className="upload__file"
                style={{ width: "100%", height: "100%" }}
              >
                <FiUpload />
              </label>
              <input
                type="file"
                hidden
                id="uploadFile"
                accept="video/*,image/*"
                onChange={(e) => onchangeFileImage(e)}
              />
            </Col>
            {listFile &&
              listFile.length > 0 &&
              listFile.map((item) => {
                return (
                  <Col xs={12} sm={12} md={6} key={item._id}>
                    {item.type === "image" ? (
                      // eslint-disable-next-line jsx-a11y/alt-text
                      <img
                        // src={`http://localhost:8100/${item.url}`}
                        src={
                          item.url.includes("https")
                            ? item.url
                            : `http://localhost:8100/${item.url}`
                        }
                        onClick={() => {
                          onHandleFile(item);
                        }}
                        className="box__upload--file-item"
                      />
                    ) : (
                      <video
                        className="box__upload--file-item"
                        controls
                        onClick={() => {
                          onHandleFile(item);
                        }}
                      >
                        <source
                          src={`http://localhost:8100/${item.url}`}
                          width="100%"
                          height="100%"
                          type="video/mp4"
                        />
                        Your browser is not supported!
                      </video>
                    )}
                    <FaCircleCheck
                      className={
                        fileCheck?._id === item._id
                          ? "box__upload--file-icon box__upload--file-check"
                          : "box__upload--file-icon"
                      }
                      onClick={() => {
                        onHandleFile(item);
                      }}
                    />
                  </Col>
                );
              })}
          </Row>
        </div>
      </Modal>
    </div>
  );
};

export default ModalUpload;

// import React, { useState, useEffect } from 'react';
// import ReactPlayer from 'react-player';

// function VideoPlayer() {
//   const [videoUrl, setVideoUrl] = useState('');

//   useEffect(() => {
//     const fetchVideoUrl = async () => {
//       const googleDriveFileId = 'YOUR_FILE_ID';
//       const apiKey = 'YOUR_API_KEY';
//       const url = `https://www.googleapis.com/drive/v3/files/${googleDriveFileId}?key=${apiKey}&alt=media`;

//       try {
//         const response = await fetch(url);
//         const data = await response.json();
//         setVideoUrl(data.webContentLink);
//       } catch (error) {
//         console.error('Lỗi:', error);
//       }
//     };

//     fetchVideoUrl();
//   }, []);

//   return (
//     <div>
//       {videoUrl && <ReactPlayer url={videoUrl} controls={true} width="100%" height="100%" />}
//     </div>
//   );
// }

// export default VideoPlayer;
