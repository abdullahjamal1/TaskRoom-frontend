import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import LoginContext from "../contexts/loginContext";

class TaskForm extends Form {
  state = {
    errors: {},
    data: {
      title: "",
      description: "",
      dueTime: "",
    },
    open: false,
    isCompleted: "",
  };

  schema = {
    title: Joi.string().required().label("description"),
    description: Joi.string().required().label("description"),
    dueTime: Joi.date().required().label("description"),
  };

  doSubmit = async () => {
    const { title, description, dueTime } = this.state.data;
    this.props.onPost({ title, description, dueTime });
  };

  setOpen = (open) => {
    this.setState({ open });
  };

  render() {
    const { open } = this.state;
    const { theme, user, group } = this.props;

    return (
      <>
        {(user.sub === group.admin || group.admins.includes(user.sub)) && (
          <Button
            onClick={() => this.setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
            className={`btn btn-${theme.toLowerCase()} mb-2`}
          >
            New Task
          </Button>
        )}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form onSubmit={this.handleSubmit}>
              <div className="row">
                <div className="col-6">
                  {this.renderInput("title", "title")}
                </div>
                <div className="col-6">
                  {this.renderInput("dueTime", "Due Time", "datetime-local")}
                </div>
              </div>
              <textarea
                name="description"
                className="form-control mb-2"
                placeholder="description"
                rows="4"
                onChange={this.handleChange}
              ></textarea>
              {this.renderButton("Post")}
            </form>
          </div>
        </Collapse>
      </>
    );
  }
}
export default TaskForm;
