import react, { useEffect, useState, useRef } from "react";
import { Col, Divider, Row } from "antd";
import { convertTime } from "../../../utils/utils";

const Quiz = () => {
  const [time, setTime] = useState(30);
  const [statusTime, setStatusTime] = useState(false);
  const keyTime = useRef(null);

  useEffect(() => {
    if (statusTime) {
      const key = setInterval(() => {
        setTime((preState) => {
          if (preState > 0) {
            return --preState;
          }
        });
      }, 1000);
      keyTime.current = key;
    } else {
      clearInterval(keyTime.current);
    }
  }, [statusTime]);
  useEffect(() => {
    if (time <= 0) {
      clearInterval(keyTime.current);
    }
    onHandleProcess();
  }, [time]);
  useEffect(()=>{
    if(!statusTime){
      const video = document.querySelector('.viewer');
      setTimeout(()=>{
        console.log('chay');
        setStatusTime(true);
        video['play']();
      },3000)
    }
  },[])

  const onHandleProcess = () => {
    const progressBar = document.querySelector(".progress__filled");
    const percent = (time / 15) * 100;
    progressBar.style.flexBasis = `${percent}%`;
    progressBar.classList.add("neon-green");
    if (percent < 50) {
      progressBar.classList.remove("neon-green");
      progressBar.classList.add("neon-yellow");
    }
    if (percent < 20) {
      progressBar.classList.remove("neon-yellow");
      progressBar.classList.add("neon-red");
    }
  };
  return (
    <>
      <div
        style={{
          minHeight: "80rem",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="content__quiz">
          <div className="content__quiz--title-time">
            <h3 className="heading-second" style={{ margin: "0" }}>
              15:00
            </h3>
          </div>
          <div className="content__quiz--title-question">
            <h4 className="heading-four">question 1 of 30</h4>
          </div>
          <div className="content__quiz--question">
            <div className="content__quiz--title-time time__question">
              <h3 className="heading-tertiary" style={{ margin: "0" }}>
                {convertTime(time, "minute")}
              </h3>
            </div>
            <div className="content__question">
              <video
                className="content__question--video viewer"
                src="http://localhost:8100/files/video-6627c4a8354ae25c39e3562b-1715420983421.mp4"
                width={"100%"}
              ></video>
            </div>
            {/* <div className="content__answers">
              <Row gutter={[16, 16]}>
                <Col style={{backgroundColor:"red"}} span={12} >1</Col>
                <Col style={{backgroundColor:"red"}} span={12} >2</Col>
                <Col style={{backgroundColor:"red"}} span={12} >3</Col>
                <Col style={{backgroundColor:"red"}} span={12} >4</Col>
                <Col style={{backgroundColor:"red"}} span={12} >5</Col>
                <Col style={{backgroundColor:"red"}} span={12} >6</Col>
                <Col style={{backgroundColor:"red"}} span={12} >7</Col>
              </Row>
            </div> */}
            <div  className="content__answers">
              <Row gutter={[16, 16]} style={{justifyContent:"center"}}>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">1dsadasdasaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa das d asd as sdas d asd asd as d readAsDataURL da sd asd as d asd</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer answer-active">2</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">3</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">4</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">4</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">4</div>
                </Col>
                <Col xs={24} sm={24} md={22}>
                  <div className="answer">4</div>
                </Col>
              </Row>
            </div>
            {/* <button onClick={() => setStatusTime(true)}>start</button>
            <button onClick={() => setStatusTime(false)}>pause</button> */}
            <div className="content__quiz--progress">
              <div className="progress">
                <div className="progress__filled neon-green"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Quiz;
