import { Col, Row } from "antd";

const Title = ({ children }) => {
  return (
    <>
      <Row className="header--admin__title">
        <Col span={24}>
          <h3 className="heading-second">{children}</h3>
        </Col>
      </Row>
    </>
  );
};

export default Title;
