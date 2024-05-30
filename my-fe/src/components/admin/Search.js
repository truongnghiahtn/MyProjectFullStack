import React, { useState, useEffect, useCallback } from "react";
import { Button, Form, Col, Row, Input, Select, DatePicker, Space } from "antd";
import { debounce } from "lodash";

const Search = ({ fields, sort, onHandleSearch, onHandleCre }) => {
  const [form] = Form.useForm();
  const { Search } = Input;
  const { RangePicker } = DatePicker;
  
  const [typefields, setTypeFields] = useState([fields[0].value]);
  const [typeSort, setTypeSort] = useState(sort[0].value);
  const [typeDate, setTypeDate] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    onHandleFilter();
  }, [typeDate, typeSort,typefields]);

  const debounceSearch = useCallback(
    debounce((nextValue) => onHandleFilter(nextValue), 1000),
    [typefields, typeDate]
  );
  const handleChange = (type, value) => {
    if (type === "type") {
      setTypeFields(value);
    } else {
      // bắn sự kiện filter
      setTypeSort(value);
    }
  };
  const onDateChange = (_, dateStr) => {
    // bắn sự kiện filter
    setTypeDate(dateStr);
  };
  const onSearch = (e) => {
    // bắn sư kiện filter
    setSearch(e.target.value);
    debounceSearch(e.target.value);
  };
  const onHandleFilter = (searchInput = search) => {
    let filter = `?sort=${typeSort}`;
    typefields &&
      typefields.length > 0 &&
      typefields.forEach((element) => {
        if (searchInput !== "") {
          filter = `${filter}&${element}[regex]=${searchInput}`;
        }
      });
    if (typeDate && typeDate.length > 0) {
      filter = `${filter}&createdAt[gte]=${typeDate[0]}&createdAt[lt]=${typeDate[1]}`;
    }
    console.log(filter);
    onHandleSearch(filter);
  };
  return (
    <>
      <Row style={{ justifyContent: "space-between" }}>
        <Col span={20}>
          <Form form={form}>
            <Select
              mode="multiple"
              size="large"
              placeholder="Please select"
              defaultValue={[fields[0]]}
              onChange={(e) => {
                handleChange("type", e);
              }}
              maxTagCount="responsive"
              style={{
                display: "inline-block",
                width: "calc(30% - 8px)",
              }}
              options={fields}
            />
            <Search
              placeholder="input search text"
              size="large"
              style={{
                display: "inline-block",
                width: "calc(30% - 8px)",
                margin: "0 8px",
              }}
              onChange={onSearch}
              enterButton
            />
            <Space
              direction="vertical"
              size={16}
              style={{
                display: "inline-block",
                width: "calc(25% - 8px)",
                margin: "0 8px 0 0",
              }}
            >
              <RangePicker size="large" onChange={onDateChange} />
            </Space>

            <Select
              size="large"
              defaultValue={sort[0]}
              onChange={(e) => {
                handleChange("sort", e);
              }}
              style={{
                display: "inline-block",
                width: "calc(15% - 8px)",
              }}
              options={sort}
            />
          </Form>
        </Col>
        <Col>
            <Button type="primary" size="large" onClick={()=>{onHandleCre()}} className="btn">
              Create
            </Button>
        </Col>
      </Row>
    </>
  );
};

export default Search;
