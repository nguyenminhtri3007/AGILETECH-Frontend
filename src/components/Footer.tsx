import React, { useRef, useEffect } from 'react';
import './Footer.scss';
import chatIcon from '../assets/Group 62.png';

function useScrollReveal<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          node.classList.add('reveal-active');
        } else {
          node.classList.remove('reveal-active');
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return ref;
}

const Footer = () => {
  const revealRef = useScrollReveal<HTMLDivElement>();
  return (
    <footer className="homepage-footer">
      <div className="reveal" ref={revealRef}>
        <div className="footer-main">
          <div className="footer-col footer-brand">
            <div className="logo">
              <span className="dot dot1"></span>
              <span className="dot dot2"></span>
              <span className="brand">DataWarehouse</span>
            </div>
            <div className="footer-address">
              Warehouse Society, 234<br />
              Bahagia Ave Street PRBW 29281
            </div>
            <div className="footer-contact">
              info@warehouse.project<br />
              1-232-3434 (Main)
            </div>
          </div>
          <div className="footer-col footer-about">
            <div className="footer-title">About</div>
            <ul>
              <li>Profile</li>
              <li>Features</li>
              <li>Careers</li>
              <li>DW News</li>
            </ul>
          </div>
          <div className="footer-col footer-help">
            <div className="footer-title">Help</div>
            <ul>
              <li>Support</li>
              <li>Sign up</li>
              <li>Guide</li>
              <li>Reports</li>
              <li>Q&A</li>
            </ul>
          </div>
          <div className="footer-col footer-social">
            <div className="footer-title">Social Media</div>
            <div className="footer-socials">
              <span className="footer-social-dot"></span>
              <span className="footer-social-dot"></span>
              <span className="footer-social-dot"></span>
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copyright">
            © Datawarehouse™, 2020. All rights reserved.<br />
            Company Registration Number: 21479524.
          </div>
          <button className="footer-chat-btn" aria-label="Chat">
            <div className="footer-chat-img-wrapper">
              <img src={chatIcon} alt="Chat Icon" className="footer-chat-img" />
            </div>
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
