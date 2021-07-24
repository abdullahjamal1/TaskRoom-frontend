import React from "react";
import { Card, Col, Row, Dropdown, Badge } from "react-bootstrap";
import { Link } from "react-router-dom";
import CommentContainer from "../comment/commentContainer";

const Tasks = ({ theme, tasks, user, onDelete, onPost, status }) => {
  if (!tasks) return <div></div>;

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
    if (status === "All Tasks") filteredTasks = tasks;
    else if (status === "Completed")
      filteredTasks = tasks.filter((task) => task.completed === true);
    else if (status === "Missing") {
      filteredTasks = tasks.filter(
        (task) => new Date(task.dueTime) < new Date() && task.completed !== true
      );
    } else if (status === "ToDo") {
      filteredTasks = tasks.filter(
        (task) => new Date(task.dueTime) > new Date() && task.completed !== true
      );
    }

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
                <Col md={6}>
                  <h6>
                    {task.title} {renderStatus(task.completed, task.dueTime)}
                  </h6>
                </Col>
                <Col md={5}>
                  <i className="fa fa-clock-o" aria-hidden="true">
                    {"  "}
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
                        {user.name === task.author.name.name && (
                          <>
                            <Dropdown.Item>
                              <Link to={`taskForm/${task._id}`}>
                                <i
                                  className="fa fa-pencil-square-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                Update
                              </Link>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <div onClick={() => onDelete(task._id)}>
                                <i
                                  className="fa fa-trash-o"
                                  aria-hidden="true"
                                ></i>{" "}
                                Delete
                              </div>
                            </Dropdown.Item>

                            <Dropdown.Item>
                              <div onClick={() => onComplete(task)}>
                                <i
                                  className="fa fa-check-circle-o"
                                  aria-hidden="true"
                                ></i>{" "}
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
            <Link to={`/users/${task.author._id}`}>
              <Card.Subtitle className="mb-2 text-muted">
                {task.author.name}{" "}
              </Card.Subtitle>
            </Link>
            <small className="text-muted">
              <i className="fa fa-clock-o" aria-hidden="true">
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
