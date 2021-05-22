import React from "react";
import Sidebar from "react-sidebar";
import SidebarContent from "../sidebarContent";

const mql = window.matchMedia(`(min-width: 800px)`);

class SidebarMenu extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sidebarDocked: mql.matches,
      sidebarOpen: true,
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
    this.onSetSidebarOpen = this.onSetSidebarOpen.bind(this);
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  onSetSidebarOpen(open) {
    this.setState({ sidebarOpen: open });
  }

  mediaQueryChanged() {
    this.setState({ sidebarDocked: mql.matches, sidebarOpen: false });
  }

  render() {
    return (
      <Sidebar
        sidebar={
          <b>
            <SidebarContent />
          </b>
        }
        open={this.state.sidebarOpen}
        onSetOpen={this.onSetSidebarOpen}
        styles={{
          root: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflow: "hidden",
          },
          sidebar: {
            zIndex: 5,
            position: "absolute",
            top: 0,
            bottom: 0,
            transition: "transform .3s ease-out",
            WebkitTransition: "-webkit-transform .3s ease-out",
            willChange: "transform",
            overflowY: "auto",
          },
          content: {
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: "auto",
            WebkitOverflowScrolling: "touch",
            transition: "left .3s ease-out, right .3s ease-out",
          },
          overlay: {
            zIndex: 1,
            position: "fixed",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            opacity: 0,
            visibility: "hidden",
            transition: "opacity .3s ease-out, visibility .3s ease-out",
            backgroundColor: "rgba(0,0,0,.3)",
          },
          dragHandle: {
            zIndex: 1,
            position: "fixed",
            top: 0,
            bottom: 0,
          },
        }}
      >
        {/* <button
          className="btn btn-info m-2"
          onClick={() => this.onSetSidebarOpen(true)}
        >
          <i class="fa fa-bars" aria-hidden="true"></i>
        </button> */}
      </Sidebar>
    );
  }
}

export default SidebarMenu;
