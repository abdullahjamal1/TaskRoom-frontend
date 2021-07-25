import React, { useState, useEffect } from "react";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import Typography from "@material-ui/core/Typography";
import GroupView from "./groupView";
import WorkFlow from "../task/workflow";
import Box from "@material-ui/core/Box";
import { getGroup } from "../../services/groupService";
import LoadingScreen from "../loadingScreen";
import FileView from "../file/fileView";
import MembersContext from "../../contexts/membersContext";
import { Container } from "@material-ui/core";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`wrapped-tabpanel-${index}`}
      aria-labelledby={`wrapped-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const AntTabs = withStyles({
  root: {
    borderBottom: "1px solid #e8e8e8",
  },
  indicator: {
    backgroundColor: "#1890ff",
  },
})(Tabs);

const AntTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 72,
    fontWeight: theme.typography.fontWeightRegular,
    marginRight: theme.spacing(4),
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
    "&:hover": {
      color: "#40a9ff",
      opacity: 1,
    },
    "&$selected": {
      color: "#1890ff",
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#40a9ff",
    },
  },
  selected: {},
}))((props) => <Tab disableRipple {...props} />);

const StyledTabs = withStyles({
  indicator: {
    display: "flex",
    justifyContent: "center",
    backgroundColor: "transparent",
    "& > span": {
      maxWidth: 40,
      width: "100%",
      backgroundColor: "#635ee7",
    },
  },
})((props) => <Tabs {...props} TabIndicatorProps={{ children: <span /> }} />);

const StyledTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    color: "#fff",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: theme.typography.pxToRem(15),
    marginRight: theme.spacing(1),
    "&:focus": {
      opacity: 1,
    },
  },
}))((props) => <Tab disableRipple {...props} />);

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  padding: {
    padding: theme.spacing(3),
  },
  demo1: {
    backgroundColor: theme.palette.background.paper,
  },
  demo2: {
    backgroundColor: "#2e1534",
  },
}));

export default function CustomizedTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState("one");
  const [group, setGroup] = useState(null);

  const loadData = async () => {
    const groupId = props.match.params.id;

    const { data: group } = await getGroup(groupId);
    setGroup(group);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  if (!group) {
    return <LoadingScreen />;
  }

  return (
    <Container>
      <div className={classes.root}>
        <h5>{group.title}</h5>
        <div className={classes.demo1}>
          <AntTabs
            value={value}
            onChange={handleChange}
            aria-label="ant example"
          >
            <AntTab label="Project" value="one" />
            <AntTab label="Workflows" value="two" />
            <AntTab label="Files" value="three" />
          </AntTabs>
          <TabPanel value={value} index="one">
            <GroupView props={props} group={group} />
          </TabPanel>
          <TabPanel value={value} index="two">
            <MembersContext.Provider
              value={group.members.filter((member) => member.isVerified)}
            >
              <WorkFlow props={props} />
            </MembersContext.Provider>
          </TabPanel>
          <TabPanel value={value} index="three">
            <FileView props={props} />
          </TabPanel>
          <Typography className={classes.padding} />
        </div>
        {/* <div className={classes.demo2}>
        <StyledTabs
          value={value}
          onChange={handleChange}
          aria-label="styled tabs example"
        >
          <StyledTab label="Project" value="one" />
          <StyledTab label="Workflows" value="two" />
          <StyledTab label="Files" value="three" />
        </StyledTabs>
        <TabPanel value={value} index="one">
          <GroupView props={props} />
        </TabPanel>
        <TabPanel value={value} index="two">
          <WorkFlow props={props} />
        </TabPanel>
        <TabPanel value={value} index="three">
          Files
        </TabPanel>
        <Typography className={classes.padding} />
      </div> */}
      </div>
    </Container>
  );
}
