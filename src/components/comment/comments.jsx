import React, { Component } from "react";
import CommentForm from "./commentForm";
import { Link } from "react-router-dom";
import {
  getComments,
  postComment,
  voteComment,
} from "../../services/commentService";
import { getAvatar, getDefaultAvatar } from "../../services/userService";

class Comments extends Component {
  state = {
    comments: [],
  };

  async componentDidMount() {
    const { taskId, parentId } = this.props;
    const { data: comments } = await getComments(taskId, parentId);
    if (comments.length > 0) {
      this.setState({ comments });
    }
  }

  handleComment = async (data, taskId, parentId) => {
    const { data: comment } = await postComment(data, taskId, parentId);
    const comments = [...this.state.comments, comment];
    this.setState({ comments });
  };

  render() {
    const { comments } = this.state;
    const { taskId, parentId, theme } = this.props;

    if (!comments) return <></>;

    return (
      <div>
        {parentId === -1 && (
          <h6 className="m-2">Comments ({this.state.comments.length})</h6>
        )}
        <CommentForm
          taskId={taskId}
          parentId={parentId}
          onComment={this.handleComment}
          theme={theme}
        />
        {comments.map((c) => (
          <div className="media bg-light row m-2" key={c._id}>
            <div className="col-2">
              <div className="row justify-content-center mt-2"></div>
              <Link to={"/user/" + c.author}>
                <div className="row justify-content-center">{c.author}</div>
              </Link>
            </div>
            <div className="media-body col-sm-10 col-8">
              <div className="row">
                <div className="col">
                  <p className="card-text col-12 m-2">
                    <p>{c.comment}</p>
                    <small className="text-muted col-12">
                      commented on{" "}
                      {(new Date(c.creationTime) + " ").substr(0, 21)}
                    </small>
                    <Reply
                      parentId={c._id}
                      taskId={taskId}
                      onComment={this.handleComment}
                    />
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

const Reply = ({ parentId, taskId, onComment }) => {
  return (
    <>
      <Comments taskId={taskId} parentId={parentId} />
    </>
  );
};

export default Comments;
