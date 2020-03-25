import React from "react";
import './ListUsers.scss';

const ListUsers = (props) => {
  const users = [];
  users.length = 20;
  users.fill({
    name: "John Cross",
    phone: "08064829451",
    role: "Admin",
    login: "12th, March 2019",
  }, 0, 20);

  return (
    <div className="list-users">
      <div className="list-users__heading">
        <span>S/N</span>
        <span>Name</span>
        <span>Phone &nbsp;</span>
        <span>Role</span>
        <span>Last Login</span>
        <span>Action</span>
      </div>
      {users.map((user, index) => ( 
        <div key={index} className="list-users__content">
          <span>{index + 1}</span>
          <span>{user.name}</span>
          <span>{user.phone}</span>
          <span>{user.role}</span>
          <span>{user.login}</span>
          <span>. . .</span>          
        </div> 
        )
      )}
  </div>
)};

export default ListUsers;