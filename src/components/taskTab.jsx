import { React, useState } from "react";
import { Tabs, Tab } from "react-bootstrap";
import Tasks from "./tasks";

const TaskTab = ({ ...rest }) => {
  const [key, setKey] = useState("All");

  return (
    <Tabs
      id="controlled-tab-example"
      activeKey={key}
      onSelect={(k) => setKey(k)}
      className="mt-2"
    >
      <Tab eventKey="All" title="All Tasks">
        <Tasks {...rest} status="All" />
      </Tab>
      <Tab eventKey="missing" title="Missing">
        <Tasks {...rest} status="missing" />
      </Tab>
      <Tab eventKey="todo" title="ToDo">
        <Tasks {...rest} status="todo" />
      </Tab>
      <Tab eventKey="completed" title="completed">
        <Tasks {...rest} status="completed" />
      </Tab>
    </Tabs>
  );
};

export default TaskTab;
