import React from "react";
import './AddUser.scss';

const AddUser = (props) => (
  <form className="form add-user-form">
    <label>
      <span>Firstname</span>
      <input type="text" />      
    </label>
    <label>
      <span>Lastname</span>
      <input type="text" />      
    </label>    
    <label>
      <span>Phone Number</span>
      <input type="text" />      
    </label>    
    <label>
      <span>Email</span>
      <input type="text" />      
    </label>    
    <label>
      <span>Firstname</span>
      <input type="text" />      
    </label>    
    <label>
      <span>Firstname</span>
      <input type="text" />      
    </label>    
    <button type="submit">Submit</button>
  </form>
)

export default AddUser;