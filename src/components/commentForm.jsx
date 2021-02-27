import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import Button from "react-bootstrap/Button";
import Collapse from "react-bootstrap/Collapse";
import LoginContext from "../contexts/loginContext";

class CommentForm extends Form {
  state = {
    errors: {},
    open: false,
  };

  schema = {
    comment: Joi.string().required().label("comment"),
  };

  doSubmit = async () => {
    if (this.context.user === undefined) {
      this.context.onHandleShow();
      return;
    }
    this.props.onComment(
      this.state.data,
      this.props.taskId,
      this.props.parentId
    );
  };

  setOpen = (open) => {
    this.setState({ open });
  };

  render() {
    const { open } = this.state;
    let { parentId, theme } = this.props;
    console.log("theme", this.props);

    return (
      <>
        {parentId === -1 && (
          <Button
            onClick={() => this.setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            New Comment
          </Button>
        )}
        {parentId !== -1 && (
          <button
            className={`btn btn-${theme} m-2`}
            onClick={() => this.setOpen(!open)}
            aria-controls="example-collapse-text"
            aria-expanded={open}
          >
            <span className="fa fa-reply"></span>
            reply
          </button>
        )}
        <Collapse in={open}>
          <div id="example-collapse-text">
            <form onSubmit={this.handleSubmit}>
              <textarea
                name="comment"
                className="form-control m-2"
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

CommentForm.contextType = LoginContext;

export default CommentForm;
