import React from "react";
import { Link } from "react-router-dom";
import style from './ListUsers.module.scss';

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
    <div className={style.container}>
      <div className={style.heading}>
        <span>S/N</span>
        <span>Name</span>
        <span>Phone &nbsp;</span>
        <span>Role</span>
        <span>Last Login</span>
        <span>Action</span>
      </div>
      {users.map((user, index) => ( 
        <div key={index} className={style.content}>
          <span>{index + 1}</span>
          <span>{user.name}</span>
          <span>{user.phone}</span>
          <span>{user.role}</span>
          <span>{user.login}</span>
          <span>
            <span className={style.one}>...</span>
            <span className={style.two}>
              <Link>Edit</Link>
              <Link>Delete</Link>
              <Link>View History</Link>
            </span>
          </span>          
        </div> 
        )
      )}
  </div>
)};

export default ListUsers;