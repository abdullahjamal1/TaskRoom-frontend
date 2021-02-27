import React, { Component } from "react";
import { paginate } from "../utils/paginate";
import _, { filter } from "lodash";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { deleteGroup, getGroup } from "../services/groupService";
import { getUser } from "../services/userService";
import Pagination from "./common/pagination";
import SearchBox from "./common/searchBox";
import GroupCard from "./common/GroupCard";
import authService from "../services/authService";

class Groups extends Component {
  state = {
    groups: [],
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

    if (searchQuery)
      filtered = allgroups.filter((g) =>
        g.title.toLowerCase().startsWith(searchQuery.toLowerCase())
      );

    const groups = paginate(filtered, currentPage, pageSize);

    return { totalCount: filtered.length, data: groups };
  };

  async componentDidMount() {
    // get user
    const response = await getUser(authService.getCurrentUser().sub); // username

    if (response.status === 200) {
      const { groups: groupList } = response.data;

      let groups = [];

      if (response.data.length <= 0 || groupList === null) return;
      for (let g = 0; g < groupList.length; g++) {
        const { data: groupInfo, status } = await getGroup(groupList[g]);
        if (status === 200) {
          groups.push(groupInfo);
        }
      }
      if (groups.length === groupList.length) {
        this.setState({ groups });
      }
    }
    // this.setState({ groups });
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

  handleGroupDelete = async (groupId) => {
    await deleteGroup(groupId);
    const { groups } = this.state.groups.filter(
      (group) => group._id !== groupId
    );
    this.setState(groups);
  };

  render() {
    const { length: count } = this.state.groups;
    const { pageSize, currentPage, searchQuery, groups } = this.state;
    const { user } = this.props;
    const { totalCount, data } = this.getPageData();

    return (
      <div>
        <div className="row m-1">
          <Link
            to="/groupForm/new"
            className="btn btn-info"
            style={{ marginBottom: 20 }}
          >
            New group
          </Link>
          <p className="ml-4">showing {totalCount} groups in the database</p>
        </div>
        <div className="row">
          <SearchBox value={searchQuery} onChange={this.handleSearch} />
        </div>
        <small>
          Dont see your teams group ? Contact your team admin to send invite
        </small>
        <GroupCard
          groups={data}
          user={user}
          onDelete={this.handleGroupDelete}
        />
        <div className="row">
          <Pagination
            itemsCount={totalCount}
            pageSize={pageSize}
            currentPage={currentPage}
            onPageChange={this.handlePageChange}
          />
        </div>
      </div>
    );
  }
}

export default Groups;
