import React, { Component, useEffect, useState } from "react";
import { deleteTask, getTasks } from "../services/taskService";
import {
  Card,
  Col,
  Row,
  Dropdown,
  ListGroup,
  ListGroupItem,
  Badge,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentContainer from "./commentContainer";

const Tasks = ({ theme, tasks, user, onDelete, onPost, status }) => {
  if (!tasks) return <div></div>;

  console.log(status);

  const renderStatus = (isCompleted, dueTime) => {
    if (isCompleted === true)
      return <Badge variant="success ml-2">completed</Badge>;
    if (new Date(dueTime) < new Date())
      return <Badge variant="danger ml-2">Missing</Badge>;
    else return <Badge variant="primary ml-2">ToDo</Badge>;
  };

  const onComplete = (task) => {
    task.completed = true;
    onPost(task);
  };

  const filterTasks = () => {
    let filteredTasks;
    if (status === "All") filteredTasks = tasks;
    else if (status === "completed")
      filteredTasks = tasks.filter((task) => task.completed === true);
    else if (status === "missing") {
      filteredTasks = tasks.filter(
        (tasks) => new Date(tasks.dueTime) < new Date()
      );
    } else filteredTasks = tasks.filter((task) => task.completed !== true);
    tasks = filteredTasks;
  };
  filterTasks();

  return (
    <>
      {tasks.map((task) => (
        <Card
          // bg={task.theme.toLowerCase()}
          key={task._id}
          border={theme.toLowerCase()}
          // text={task.theme.toLowerCase() === "light" ? "dark" : "white"}
          // style={{ width: "25rem" }}
          className="m-2"
        >
          <Card.Body>
            <Card.Title class>
              <Row>
                {" "}
                <Col md={7}>
                  <h5>
                    {task.title} {renderStatus(task.completed, task.dueTime)}
                  </h5>
                </Col>
                <Col md={4}>
                  <i class="fa fa-clock-o" aria-hidden="true">
                    {" "}
                    Due On {(new Date(task.dueTime) + " ").substr(0, 21)}
                  </i>
                </Col>
                <Col md={{ span: 1, order: "last" }}>
                  <small>
                    <Dropdown>
                      <Dropdown.Toggle
                        variant={theme.toLowerCase()}
                        className="btn btn-sm"
                        id="dropdown-basic"
                      ></Dropdown.Toggle>

                      <Dropdown.Menu>
                        <Dropdown.Item>
                          <Link to={"tasks/" + task._id}>View</Link>
                        </Dropdown.Item>
                        {user.sub === task.author && (
                          <>
                            <Dropdown.Item>
                              <Link to={`taskForm/${task._id}`}>Update</Link>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              <div onClick={() => onDelete(task._id)}>
                                Delete
                              </div>
                            </Dropdown.Item>
                            <Dropdown.Item href="#/action-2">
                              <div onClick={() => onComplete(task)}>
                                Mark Completed
                              </div>
                            </Dropdown.Item>
                          </>
                        )}
                      </Dropdown.Menu>
                    </Dropdown>
                  </small>
                </Col>
              </Row>
            </Card.Title>
            <Link to={`/users/${task.author}`}>
              <Card.Subtitle className="mb-2 text-muted">
                {task.author}{" "}
              </Card.Subtitle>
            </Link>
            <small className="text-muted">
              <i class="fa fa-clock-o" aria-hidden="true">
                {" "}
                Last Updated On{" "}
                {(new Date(task.updateTime) + " ").substr(0, 21)}
              </i>
            </small>
            <Card.Text>{task.description}</Card.Text>
          </Card.Body>
          <Card.Footer>
            <CommentContainer taskId={task._id} theme={theme} />
          </Card.Footer>
        </Card>
      ))}
    </>
  );
};

export default Tasks;
