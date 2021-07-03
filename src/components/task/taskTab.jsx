import { React, useState } from "react";
import { Tabs, Tab, Badge } from "react-bootstrap";
import Tasks from "./tasks";

const TaskTab = ({ taskCounter, ...rest }) => {
  const [key, setKey] = useState("All");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-2"
    >
      {taskCounter &&
        taskCounter.map((task) => (
          <Tab
            eventKey={task.title}
            title={
              <div>
                {task.title} <Badge variant={task.theme}>{task.number}</Badge>
              </div>
            }
          >
            <Tasks {...rest} status={task.title} />
          </Tab>
        ))}
    </Tabs>
  );
};

export default TaskTab;
