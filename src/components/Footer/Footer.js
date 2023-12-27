import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <div className="footer">
      <span className="name">
        NewsQuotient made by -{" "}
        <a href="https://www.linkedin.com/in/shivam-jain-93534b246" target="__blank">
          Shivam Jain
        </a>
      </span>
      <hr style={{ width: "90%" }} />
      <div className="iconContainer">
        <a href="https://www.instagram.com/shivamjain4059/" target="__blank">
          <i className="fab fa-instagram-square fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com/in/shivam-jain-93534b246" target="__blank">
          <i className="fab fa-linkedin fa-2x"></i>
        </a>
        <a href="https://www.linkedin.com/in/shivam-jain-93534b246" target="__blank">
          <i className="fas fa-link fa-2x"></i>
        </a>
      </div>
    </div>
  )
}
