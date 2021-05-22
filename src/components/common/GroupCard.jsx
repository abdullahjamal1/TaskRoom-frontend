import React from "react";
import "../../App.css";
import {
  Card,
  Col,
  Row,
  Dropdown,
  ListGroup,
  ListGroupItem,
} from "react-bootstrap";
import { Link } from "react-router-dom";

const GroupCard = ({ groups, user, onDelete, onLeave }) => {
  return (
    <div className="row">
      {groups.map((group) => (
        <div className="col-sm-4 col-xs-10 mt-4">
          <Card
            // bg={group.theme.toLowerCase()}
            key={group._id}
            border={group.theme.toLowerCase()}
            // text={group.theme.toLowerCase() === "light" ? "dark" : "white"}
            // style={{ width: "25rem" }}
            className="shadow bg-body rounded"
          >
            <Card.Body>
              <Card.Title>
                <Row>
                  {" "}
                  <Col md={10}>
                    <Link
                      to={"groups/" + group._id}
                      className={`text-${group.theme.toLowerCase()}`}
                    >
                      {group.title}
                    </Link>
                  </Col>
                  <Col md={{ span: 1, order: "last" }}>
                    <Dropdown size="sm">
                      <Dropdown.Toggle
                        variant={group.theme.toLowerCase()}
                        id="dropdown-basic"
                        className="btn btn-sm"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to={"groups/" + group._id}>View</Link>
                        </Dropdown.Item>
                        {user.sub === group.admin && (
                          <>
                            <Dropdown.Item>
                              <Link to={`groupForm/${group._id}`}>Update</Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              <div onClick={() => onDelete(group._id)}>
                                Delete
                              </div>
                            </Dropdown.Item>
                          </>
                        )}
                        {user.sub !== group.admin && (
                          <>
                            <Dropdown.Item>
                              <div onClick={() => onLeave(group._id)}>
                                Unenroll
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
            </Card.Body>
            <Card.Footer>
              <small className="text-muted">
                <i class="fa fa-clock-o" aria-hidden="true"></i> Created On{" "}
                {(new Date(group.creationTime) + " ").substr(0, 21)}{" "}
              </small>{" "}
              <i class="fa fa-user ml-4" aria-hidden="true">
                {"  "}
                <span className="ml-1">{group.members.length}</span>
              </i>
            </Card.Footer>
          </Card>
        </div>
      ))}
    </div>
  );
};

export default GroupCard;
