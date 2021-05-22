import React from "react";
import { ListGroup } from "react-bootstrap";

const Members = ({ members, admins, theme }) => {
  members = members.filter((m) => !admins.includes(m));
  return (
    <div className="row">
      <div className="col-sm-2"></div>

      <div className="col-sm-8">
        <h3 className={`text-${theme.toLowerCase()}`}>Admins</h3>
        <hr className={`bg-${theme.toLowerCase()}`} />
        {admins.map((admin) => (
          <>
            <div className="d-flex justify-content-between" key={admin}>
              {admin}{" "}
              <i className="fa fa-lg fa-envelope-o mr-4" aria-hidden="true"></i>
            </div>
            <hr />
          </>
        ))}

        <h3 className={`text-${theme.toLowerCase()} mt-4`}>Members</h3>
        <hr className={`bg-${theme.toLowerCase()}`} />

        {members.map((member) => (
          <>
            <div className="d-flex justify-content-between" key={member}>
              {member}{" "}
              <i className="fa fa-lg fa-envelope-o mr-4" aria-hidden="true"></i>
            </div>
            <hr />
          </>
        ))}
      </div>

      <div className="col-sm-2"></div>
    </div>
  );
};

export default Members;
