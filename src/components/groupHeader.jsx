import React from "react";
import { Card, Col, Row, Dropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import { deleteGroup } from "../services/groupService";

const GroupHeader = ({ group, user }) => {
  const handleDelete = async (id) => {
    await deleteGroup(id);
  };
  return (
    <Card
      //   bg={group.theme.toLowerCase()}
      border={group.theme.toLowerCase()}
      key={group._id}
      //   text={group.theme.toLowerCase() === "light" ? "dark" : "white"}
      // style={{ width: "25rem" }}
      className="m-1"
    >
      <Card.Body>
        <Card.Title className={`text-${group.theme.toLowerCase()}`}>
          <Row>
            {" "}
            <Col md={6}>{group.title}</Col>
            <Col md={5}></Col>
            <Col md={{ span: 1, order: "last" }}>
              <Dropdown>
                <Dropdown.Toggle
                  variant={group.theme.toLowerCase()}
                  id="dropdown-basic"
                ></Dropdown.Toggle>

                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to={"groups/" + group._id}>View</Link>
                  </Dropdown.Item>
                  {user.sub === group.admin && (
                    <>
                      <Dropdown.Item>
                        <Link to={`/groupForm/${group._id}`}>Update</Link>
                      </Dropdown.Item>
                      <Dropdown.Item href="#/action-2">
                        <div onClick={() => handleDelete(group._id)}>
                          Delete
                        </div>
                      </Dropdown.Item>
                    </>
                  )}
                </Dropdown.Menu>
              </Dropdown>
            </Col>
          </Row>
        </Card.Title>
        <Link to={`/users/${group.admin}`}>
          <Card.Subtitle className="mb-2 text-muted">
            {group.admin}
          </Card.Subtitle>
        </Link>
        <Card.Text>{group.description}</Card.Text>
      </Card.Body>
      <Card.Footer>
        <small className="text-muted">
          <i class="fa fa-clock-o" aria-hidden="true"></i> Created On{" "}
          {(new Date(group.creationTime) + " ").substr(0, 21)}{" "}
        </small>{" "}
        <i class="fa fa-user ml-4" aria-hidden="true">
          {"  "}
          <Link to="#">
            <span className="ml-1 text-dark">{group.members.length}</span>
          </Link>
        </i>
      </Card.Footer>
    </Card>
  );
};

export default GroupHeader;
