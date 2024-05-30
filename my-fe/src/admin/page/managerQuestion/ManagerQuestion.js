import React, { useEffect, useState } from "react";
import {
  Col,
  Row,
  Table,
  Pagination,
  Button,
  Flex,
  Dropdown,
  Space,
  Modal,
} from "antd";
import Title from "../../../components/admin/Title";
import Search from "../../../components/admin/Search";
import { useSelector, useDispatch } from "react-redux";
import { DownOutlined, ExclamationCircleFilled } from "@ant-design/icons";
import {
  setIsLoadingQuestion,
  getAllQuestion,
  setDefaultQuestion,
  deleteQuestion
} from "../../../redux/question/question";
import ModalCreQuestion from "./ModalCreQuestion";

const sort = [
  {
    value: "question",
    label: "A -> Z",
  },
  {
    value: "-createdAt",
    label: "Date created",
  },
];

const fields = [
  {
    value: "question",
    label: "Name question",
  },
  {
    value: "description",
    label: "Description question",
  },
];

const PAGESIZE = 10;

//modal deltete
const { confirm } = Modal;

const ManagerQuestion = () => {
  const [pageSize, setpageSize] = useState(PAGESIZE);
  const [page, setPage] = useState(1);
  const [filter, setFilter] = useState("");
  const [data, setData] = useState([]);
  const [param, setParam] = useState(`?sort=question&limit=${PAGESIZE}&page=1`);
  const [qUpdate,setQUpdate]= useState(null);

  //collumn
  const columns = [
    {
      title: "No",
      width: 50,
      dataIndex: "index",
      key: "index",
      fixed: "left",
    },
    {
      title: "Question",
      width: 300,
      dataIndex: "question",
      key: "question",
      fixed: "left",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
      width: 400,
    },
    {
      title: "File",
      dataIndex: "file",
      key: "file",
      width: 250,
      align: "center",
      render: (key) => {
        return (
          <>
            {key === undefined ? (
              ""
            ) : key?.type === "image" ? (
              <img
                className="bg-video__content"
                src={
                  key.url.includes("https")
                    ? key.url
                    : `http://localhost:8100/${key.url}`
                }
              />
            ) : (
              <video className="bg-video__content" controls>
                <source
                  src={`http://localhost:8100/${key.url}`}
                  width={250}
                  type="video/mp4"
                />
                Your browser is not supported!
              </video>
            )}
          </>
        );
      },
    },
    {
      title: "Author",
      dataIndex: "user",
      key: "user",
      width: 250,
      render: (key) => {
        return key.userName;
      },
    },
    {
      title: "Action",
      key: "operation",
      fixed: "right",
      width: 100,
      render: (value) => {
        const items = [
          {
            key: "1",
            label: (
              <Button
                type="primary"
                onClick={() => {
                  handleAction("update", value);
                }}
              >
                Update
              </Button>
            ),
          },
          {
            key: "2",
            label: (
              <Button
                type="primary"
                danger
                onClick={() => {
                  handleAction("delete", value);
                }}
              >
                Delete
              </Button>
            ),
          },
          {
            key: "3",
            label: (
              <Button
                onClick={() => {
                  handleAction("detail", value);
                }}
              >
                Detail
              </Button>
            ),
          },
        ];
        return (
          <>
            <Dropdown menu={{ items }} trigger={["click"]}>
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Action
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        );
      },
    },
  ];

  //create
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useDispatch();
  const question = useSelector((state) => state.question);
  const { listQuestion } = useSelector((state) => state.question);

  useEffect(() => {
    if (filter !== "") {
      fetchData();
    }
    return () => {
      dispatch(setDefaultQuestion());
    };
  }, [filter, page, pageSize]);

  useEffect(() => {
    setData(listQuestion);
  }, [listQuestion]);

  //get data

  const onSearch = (value) => {
    setFilter(value);
  };
  const onShowSizeChange = (current, pageSize) => {
    setPage(current);
    setpageSize(pageSize);
  };
  const onChangePagination = (pageNumber) => {
    setPage(pageNumber);
  };
  const fetchData = () => {
    dispatch(setIsLoadingQuestion());
    const param = `${filter}&limit=${pageSize}&page=${page}`;
    setParam(param);
    dispatch(getAllQuestion({ param, pageSize, page }));
  };
  // create
  const onHandleCre = () => {
    setIsModalOpen(true);
  };
  // delete
  const showDeleteConfirm = (question) => {
    confirm({
      title: `Are you sure delete this question`,
      icon: <ExclamationCircleFilled />,
      content: (
        <>
          <h3 className="heading-four">{question.question}</h3>
          <p>{question.description}
          </p>
        </>
      ),
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        // send request
        console.log("OK");
        dispatch(setIsLoadingQuestion());
        dispatch(deleteQuestion({id:question._id,param:{param, pageSize, page}}))
      },
      onCancel() {
        console.log("Cancel");
      },
    });
  };
  //action
  const handleAction = (type, data) => {
    console.log(type, data);
    switch (type) {
      case "delete":
        showDeleteConfirm(data);
        break;
      case "update":
        setQUpdate(data);
        setIsModalOpen(true);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <div className="dashboard__admin">
        <Title>ManagerQuestion content</Title>
        <Search
          fields={fields}
          sort={sort}
          onHandleSearch={onSearch}
          onHandleCre={onHandleCre}
        />

        <Row style={{ padding: "2rem", marginTop: "10rem" }}>
          <Table
            columns={columns}
            dataSource={data}
            bordered
            loading={question.isLoading}
            pagination={false}
            scroll={{
              x: 1500,
            }}
            rowKey="index"
          />
        </Row>
        <Row
          style={{ padding: "2rem", marginTop: "5rem", justifyContent: "end" }}
        >
          <Pagination
            showSizeChanger
            onShowSizeChange={onShowSizeChange}
            onChange={onChangePagination}
            defaultCurrent={page}
            total={question.total}
            pageSize={pageSize}
          />
        </Row>
      </div>
      <ModalCreQuestion
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        param={{ param, pageSize, page }}
        qUpdate = {qUpdate}
        setQUpdate={setQUpdate}
      />
    </>
  );
};
export default ManagerQuestion;
