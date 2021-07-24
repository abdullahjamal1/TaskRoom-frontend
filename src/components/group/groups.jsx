import React, { Component } from "react";
import { paginate } from "../../utils/paginate";
import _ from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import {
  deleteGroup,
  getGroups,
  leaveGroup,
} from "../../services/groupService";
import Pagination from "../common/pagination";
import SearchBox from "../common/searchBox";
import GroupCard from "./GroupCard";
import LoadingScreen from "../loadingScreen";

import Container from "@material-ui/core/Container";
import Grid from "@material-ui/core/Grid";
import Fab from "@material-ui/core/Fab";
import AddIcon from "@material-ui/icons/Add";

class Groups extends Component {
  state = {
    groups: null,
    currentPage: 1,
    pageSize: 6,
    searchQuery: "",
  };

  getPageData = () => {
    const {
      pageSize,
      currentPage,
      searchQuery,
      groups: allgroups,
    } = this.state;

    let filtered = allgroups;

    if (!filtered) return { totalCount: 0, data: [] };

    if (searchQuery)
      filtered = allgroups.filter((g) =>
        g.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const groups = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: groups };
  };

  async componentDidMount() {
    // get user

    const { data: groups } = await getGroups();

    this.setState({ groups });
  }

  handleDelete = async (group) => {
    const originalgroups = this.state.groups;

    const groups = originalgroups.filter((g) => g._id !== group._id);
    this.setState({ groups });

    try {
      await deleteGroup(group._id);
    } catch (ex) {
      if (ex.response && ex.response.status === 404)
        toast.error("This group has already been deleted");

      this.setState({ groups: originalgroups });
    }
  };

  handlePageChange = (page) => {
    this.setState({ currentPage: page });
  };

  handleSort = (sortColumn) => {
    this.setState({ sortColumn });
  };

  handleSearch = (query) => {
    this.setState({ searchQuery: query, currentPage: 1 });
  };

  handleLeave = async (groupId) => {
    try {
      await leaveGroup(groupId);
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error(ex);
    }
  };

  handleGroupDelete = async (groupId) => {
    try {
      const res = await deleteGroup(groupId);
      if (res.status === 200) {
        let groups = [...this.state.groups];
        groups = groups.filter((group) => group._id !== groupId);
        this.setState({ groups });
      }
    } catch (ex) {
      if (ex.response && ex.response.status === 404) toast.error(ex);
    }
  };

  render() {
    const { pageSize, currentPage, searchQuery, groups } = this.state;
    const { user } = this.props;
    const { totalCount, data } = this.getPageData();

    if (!groups) {
      return <LoadingScreen />;
    }

    return (
      <Container>
        <Grid container direction="row" spacing={2} style={{ marginTop: 20 }}>
          <Grid item xs={3} sm={1}>
            <Link
              to="/groupForm/new"
              style={{ marginTop: 40, marginRight: 10 }}
            >
              <Fab
                color="primary"
                size="small"
                style={{ marginTop: 10 }}
                aria-label="add"
              >
                <AddIcon />
              </Fab>
            </Link>
          </Grid>
          <Grid item xs={9} sm={11}>
            <SearchBox value={searchQuery} onChange={this.handleSearch} />
          </Grid>
          <Grid item xs={12}>
            {" "}
            <small>
              Dont see your team ? Contact your team admin to send invite.
            </small>
          </Grid>
        </Grid>
        <Grid container direction="row" spacing={2}>
          {data.length >= 0 &&
            data.map((group) => (
              <GroupCard
                key={group._id}
                group={group}
                user={user}
                onDelete={this.handleGroupDelete}
                onLeave={this.handleLeave}
              />
            ))}
        </Grid>
        <div className="row">
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </Container>
    );
  }
}

export default Groups;
