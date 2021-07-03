import { React, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import CommentForm from "./commentForm";
import Comments from "./comments";

const CommentContainer = ({ taskId, theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <a
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className={`text-${theme.toLowerCase()} mb-2`}
      >
        <i class="fa fa-comments" aria-hidden="true"></i> Comments
      </a>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Comments taskId={taskId} parentId={-1} theme={theme} />
        </div>
      </Collapse>
    </>
  );
};

export default CommentContainer;
