import { Layout } from "antd";
import React from "react";
const { Footer } = Layout;
const FooterLayout = () => {
  return (
    <>
      <Footer id="picassoFooter">
        <div className="footer-navigation">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="#home">Home</a>
            </li>
            <li>
              <a href="#about">News</a>
            </li>
            <li>
              <a href="#services">Quiz</a>
            </li>
            <li>
              <a href="#contact">Video</a>
            </li>
          </ul>
        </div>
        <div className="footer-contact">
          <h3>Contact Us</h3>
          <p>Email: truongnghiahtn@gmail.com</p>
          <p>Phone: 0346251700</p>
        </div>
        <div className="footer-social">
          <h3>Follow Us</h3>
          <div className="social-icons">
            <a href="https://facebook.com" target="_blank" className="social-icon">
              FB
            </a>
            <a href="https://twitter.com" target="_blank" className="social-icon">
              TW
            </a>
            <a href="https://instagram.com" target="_blank" className="social-icon">
              IG
            </a>
          </div>
        </div>
      </Footer>
    </>
  );
};

export default FooterLayout;
