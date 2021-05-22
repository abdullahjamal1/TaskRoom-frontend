import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import { Badge, Button, ProgressBar } from "react-bootstrap";
import Collapse from "react-bootstrap/Collapse";
import LoginContext from "../contexts/loginContext";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

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
    description: "",
  };

  schema = {
    title: Joi.string().required().label("title"),
    description: Joi.string().required().label("description"),
    dueTime: Joi.date().required().label("dueTime"),
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
    const { theme, user, group, taskCounter } = this.props;

    return (
      <>
                      <div className="row">
                        <div className="col-sm-2 col-12">
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
                        </div>
                        
                      </div>

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
              {/* <textarea
                name="description"
                className="form-control mb-2"
                placeholder="description"
                rows="4"
                onChange={this.handleChange}
              ></textarea> */}
              <CKEditor
                name="description"
                editor={ClassicEditor}
                data="<p>Hello from CKEditor 5!</p>"
                onReady={(editor) => {
                  // You can store the "editor" and use when it is needed.
                  console.log("Editor is ready to use!", editor);
                }}
                onChange={(event, editor) => {
                  const description = editor.getData();
                  const currentTarget = {
                    currentTarget: { name: "description", value: description },
                  };
                  console.log(currentTarget);
                  this.handleChange(currentTarget);
                  // this.setState({description});
                  // console.log( { event, editor, data } );
                }}
                onBlur={(event, editor) => {
                  console.log("Blur.", editor);
                }}
                onFocus={(event, editor) => {
                  console.log("Focus.", editor);
                }}
              />
              {this.renderButton("Post")}
            </form>
          </div>
        </Collapse>
      </>
    );
  }
}
export default TaskForm;
