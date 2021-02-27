import { React, useState } from "react";
import { Button, Collapse } from "react-bootstrap";
import CommentForm from "./commentForm";
import Comments from "./comments";

const CommentContainer = ({ taskId, theme }) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        onClick={() => setOpen(!open)}
        aria-controls="example-collapse-text"
        aria-expanded={open}
        className="btn btn-sm mb-2"
        variant={theme.toLowerCase()}
      >
        Comments
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <Comments taskId={taskId} parentId={-1} theme={theme} />
        </div>
      </Collapse>
    </>
  );
};

export default CommentContainer;
