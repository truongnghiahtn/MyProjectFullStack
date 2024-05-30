import React, { useEffect, useState } from "react";
import { Button, Modal, Row, Col, Form, Input, Select, Radio } from "antd";
import { FiUpload } from "react-icons/fi";
import ModalUpload from "../../../components/ModalUpload";
import { TimePicker } from "antd";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { IoIosCloseCircle } from "react-icons/io";
import { useImmer } from "use-immer";
import { v4 as uuidv4 } from "uuid";
import { CiSquarePlus, CiSquareMinus } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import {
  setIsLoadingQuestion,
  setDefaultQuestion,
  createQuestion,
  updateQuestion,
} from "../../../redux/question/question";
import file from "../../../redux/file/file";

// setup antd
const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 8,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 24,
    },
  },
};
const { TextArea } = Input;
dayjs.extend(customParseFormat);
const type = [
  {
    value: "selection",
    label: "select",
  },
  {
    value: "text",
    label: "text",
  },
];

const ModalCreQuestion = ({
  isModalOpen,
  setIsModalOpen,
  param,
  qUpdate,
  setQUpdate,
}) => {
  //hook
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  //redux
  const { listTopic } = useSelector((state) => state.topic);
  const { question } = useSelector((state) => state);

  useEffect(() => {
    init();
  }, listTopic);

  useEffect(() => {
    onUpdateQuestion();
    return () => {
      dispatch(setDefaultQuestion());
    };
  }, [isModalOpen, qUpdate]);

  useEffect(() => {
    if (isFetchData) {
      if (question.status) {
        onResetForm();
        setIsFetchData(false);
        setIsModalOpen(false);
      }
    }
  }, [question]);

  //state
  const [isUploadOpen, setIsUploadOpen] = useImmer(false);
  const [fileUpload, setFileUpload] = useState(null);
  const [answerOpt, setAnswerOpt] = useImmer({
    type: "selection",
    answerOpt: [
      {
        id: uuidv4(),
        aws: "cau hoi 1",
        isCorrect: true,
      },
    ],
  });
  const [answerText, setAnswerText] = useImmer({
    type: "text",
    answerText: "",
  });
  const [time, setTime] = useImmer("");
  const [typeAnswer, setTypeAnswer] = useImmer(type[0].value);
  const [topicAnswer, setTopicAnswer] = useImmer();
  const [selTopic, setSelTopic] = useImmer([]);
  const [isFetchData, setIsFetchData] = useImmer(false);
  //

  //fuc
  const init = () => {
    if (listTopic.length > 0) {
      const list = listTopic.map((item) => {
        return {
          value: item._id,
          label: item.name,
        };
      });
      setSelTopic(list);
      setTopicAnswer(list[0].value);
    }
  };
  const onUpdateQuestion = () => {
    if (qUpdate) {
      setTypeAnswer(qUpdate.answers.type);
      setAnswerText({
        type: "text",
        answerText: qUpdate.answers.answerText,
      });
      setAnswerOpt({
        type: "selection",
        answerOpt: qUpdate.answers.answerOpt,
      });

      qUpdate?.file && setFileUpload(qUpdate.file);
      const valOpt = {};
      if (qUpdate.answers.answerOpt.length > 0) {
        qUpdate.answers.answerOpt.forEach((element) => {
          valOpt[element.id] = element.aws;
        });
      }
      form.setFieldsValue({
        ...valOpt,
        question: qUpdate.question,
        description: qUpdate.description,
        time: dayjs(`${qUpdate.time}`, "HH:mm:ss"),
      });
    }
  };
  const onResetForm = () => {
    form.resetFields();
    setQUpdate(null);
    setTypeAnswer(type[0].value);
    setTopicAnswer(selTopic[0].value);
    setAnswerOpt({
      type: "selection",
      answerOpt: [
        {
          id: uuidv4(),
          aws: "cau hoi 1",
          isCorrect: true,
        },
      ],
    });
    setAnswerText({
      type: "text",
      answerText: "",
    });
    setFileUpload(null);
  };
  const handleCancel = () => {
    onResetForm();
    setIsModalOpen(false);
  };
  const onFinish = (values) => {
    const data = {
      question: values.question,
      description: values.description,
      file: fileUpload?._id,
      time: time,
    };
    if (typeAnswer === "selection") {
      const Opt = answerOpt.answerOpt.map((item) => {
        return {
          aws: item.aws,
          isCorrect: item.isCorrect,
        };
      });
      const answers = {
        type: "selection",
        answerOpt: Opt,
      };
      data.answers = answers;
    } else {
      data.answers = answerText;
    }
    setIsFetchData(true);
    dispatch(setIsLoadingQuestion());
    if (!qUpdate) {
      dispatch(createQuestion({ data, param }));
      console.log("create");
    } else {
      dispatch(updateQuestion({ id: qUpdate.id, data, param }));
      console.log("update");
    }
  };
  const onChangeSelect = (type,value) => {
    if(type==='topic'){
      setTopicAnswer(value);
    }else{
      setTypeAnswer(value);
    }
  };
  const onChangeTime = (time, timeString) => {
    setTime(timeString);
  };
  const onChangeRadio = (e) => {
    setAnswerOpt((draf) => {
      const index = draf.answerOpt.findIndex((opt) => {
        return opt.id === e.target.value;
      });
      draf.answerOpt.forEach((item) => (item.isCorrect = false));
      draf.answerOpt[index].isCorrect = !draf.answerOpt[index].isCorrect;
    });
  };
  const onchangeAnw = (e, name, type) => {
    if (type === "text") {
      setAnswerText((draf) => {
        draf.answerText = e.target.value;
      });
    } else {
      setAnswerOpt((draf) => {
        const index = draf.answerOpt.findIndex((item) => item.id === name);
        draf.answerOpt[index].aws = e.target.value;
      });
    }
  };

  // controller aws
  const createAnw = () => {
    setAnswerOpt((draf) => {
      draf.answerOpt.push({
        id: uuidv4(),
        aws: "",
        isCorrect: false,
      });
    });
  };
  const deleteAnw = (id) => {
    setAnswerOpt((draf) => {
      const data = draf.answerOpt.filter((item) => item.id !== id);
      draf.answerOpt = data;
    });
  };

  const renderAnwHtml = () => {
    let answer;
    if (answerOpt?.answerOpt?.length > 0) {
      answer = answerOpt.answerOpt.find((item) => item.isCorrect === true);
    }
    return (
      <>
        {typeAnswer === "selection" ? (
          <Radio.Group
            style={{ width: "100%" }}
            onChange={onChangeRadio}
            value={answer.id}
          >
            {typeAnswer === "selection" &&
              answerOpt.answerOpt.length > 0 &&
              answerOpt.answerOpt.map((item, index) => {
                return (
                  <Radio
                    value={item.id}
                    style={{ width: "100%", position: "relative" }}
                    key={item.id}
                  >
                    <Form.Item
                      label="Answer"
                      name={item.id}
                      style={{
                        display: "inline-block",
                        width: "500px",
                        marginRight: "8px",
                      }}
                      onChange={(e) => onchangeAnw(e, item.id, "selection")}
                      rules={[
                        {
                          required: true,
                          message: "Please input your answer!",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item>
                    {index === 0 ? (
                      <div
                        style={{
                          position: "absolute",
                          top: "34px",
                          right: "40px",
                        }}
                      >
                        <CiSquarePlus
                          className="icon__create"
                          onClick={createAnw}
                        />
                      </div>
                    ) : (
                      <div
                        style={{
                          position: "absolute",
                          top: "34px",
                          right: "40px",
                        }}
                      >
                        <CiSquareMinus
                          className="icon__delete"
                          onClick={() => deleteAnw(item.id)}
                        />
                      </div>
                    )}
                  </Radio>
                );
              })}
          </Radio.Group>
        ) : (
          <Form.Item
            required
            label="Answer"
            name="answer"
            rules={[
              {
                required: true,
                message: "Please input your answer!",
              },
            ]}
            onChange={(e) => onchangeAnw(e, "answer", "text")}
          >
            <Input />
          </Form.Item>
        )}
      </>
    );
  };

  return (
    <>
      <Modal
        title="Create question"
        open={isModalOpen}
        onOk={form.submit}
        onCancel={handleCancel}
        width={700}
        footer={[
          <Button className="btn" key="back" onClick={handleCancel}>
            Cancel
          </Button>,
          <Button
            className="btn"
            key="submit"
            type="primary"
            onClick={form.submit}
            loading={question.isLoading}
          >
            Submit
          </Button>,
        ]}
      >
        <div className="body__modal">
          <Row style={{ justifyContent: "center" }}>
            <Col span={24}>
              <Form
                {...formItemLayout}
                layout="vertical"
                form={form}
                onFinish={onFinish}
              >
                <Form.Item
                  required
                  label="Question"
                  name="question"
                  rules={[
                    {
                      required: true,
                      message: "Please input your question!",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  required
                  label="Description"
                  name="description"
                  rules={[
                    {
                      required: true,
                      message: "Please input your description!",
                    },
                  ]}
                >
                  <TextArea rows={3} />
                </Form.Item>
                <Form.Item
                  required
                  label="Type"
                  style={{
                    display: "inline-block",
                    width: "calc(35% - 8px)",
                    marginRight: "16px",
                  }}
                >
                  <Select
                    value={typeAnswer}
                    onChange={(e) => {
                      onChangeSelect('type',e);
                    }}
                    options={type}
                  />
                </Form.Item>
                <Form.Item
                  required
                  label="Topic"
                  style={{
                    display: "inline-block",
                    width: "calc(35% - 8px)",
                    marginRight: "16px",
                  }}
                >
                  <Select
                    value={topicAnswer}
                    onChange={(e) => {
                      onChangeSelect('topic',e);
                    }}
                    options={selTopic}
                  />
                </Form.Item>
                <Form.Item
                  required
                  style={{
                    display: "inline-block",
                    width: "calc(30% - 16px)",
                  }}
                  label="Time"
                  name="time"
                  rules={[
                    {
                      required: true,
                      message: "Please input your time!",
                    },
                  ]}
                >
                  <TimePicker
                    style={{ width: "100%" }}
                    onChange={onChangeTime}
                    defaultOpenValue={dayjs("00:00:00", "HH:mm:ss")}
                  />
                </Form.Item>
                <Form.Item label="file">
                  <div style={{ width: "15rem", height: "10rem" }}>
                    {fileUpload === null ? (
                      <div
                        className="upload__file"
                        onClick={() => {
                          setIsUploadOpen(true);
                        }}
                      >
                        <FiUpload />
                      </div>
                    ) : (
                      <div style={{ position: "relative" }}>
                        {fileUpload.type === "image" ? (
                          // eslint-disable-next-line jsx-a11y/alt-text
                          <img
                            src={
                              fileUpload.url.includes("https")
                                ? fileUpload.url
                                : `http://localhost:8100/${fileUpload.url}`
                            }
                            className="box__upload--file-item"
                          />
                        ) : (
                          <video className="box__upload--file-item" controls>
                            <source
                              src={`http://localhost:8100/${fileUpload.url}`}
                              width={250}
                              type="video/mp4"
                            />
                            Your browser is not supported!
                          </video>
                        )}
                        <IoIosCloseCircle
                          className="box__upload--file-icon box__upload--file-close"
                          onClick={() => {
                            setFileUpload(null);
                          }}
                        />
                      </div>
                    )}
                  </div>
                </Form.Item>
                {renderAnwHtml()}
              </Form>
            </Col>
          </Row>
        </div>
      </Modal>
      <ModalUpload
        isModalOpen={isUploadOpen}
        setIsModalOpen={setIsUploadOpen}
        onHandleUpload={setFileUpload}
      />
    </>
  );
};
export default ModalCreQuestion;
