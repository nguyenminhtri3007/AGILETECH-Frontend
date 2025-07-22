import React, { useEffect, useRef } from 'react';
import './DataWarehouse.scss';
import illustrationImage from '../assets/image1 1.png';
import imageSearch from '../assets/image3.png';
import image24Hours from '../assets/image4.png';
import imagePrint from '../assets/image5.png';
import imageSecurity from '../assets/image6.png';
import TestimonialSection from './TestimonialSection';

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

interface DataWarehouseProps {
  isLoggedIn: boolean;
  onSignIn: () => void;
  onLogout: () => void;
  onProfile: () => void;
}

const DataWarehouse = ({ isLoggedIn, onSignIn, onLogout, onProfile }: DataWarehouseProps) => {
  const titleRef = useScrollReveal<HTMLHeadingElement>();
  const descRef = useScrollReveal<HTMLParagraphElement>();
  const illuRef = useScrollReveal<HTMLDivElement>();
  const featuresTitleRef = useScrollReveal<HTMLHeadingElement>();
  const featuresSubtitleRef = useScrollReveal<HTMLParagraphElement>();
  const featureCardRefs = [useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null), useRef<HTMLDivElement>(null)];
  const featureImgRefs = [useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>()];
  const featureContentRefs = [useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>(), useScrollReveal<HTMLDivElement>()];

  return (
    <>
      <div className="data-warehouse">
        <header className="header">
          <div className="logo">
            <div className="logo-dot purple" />
            <div className="logo-dot pink" />
          </div>
          <div>
            {isLoggedIn ? (
              <>
                <button className="sign-in-btn" style={{marginRight: 16}} onClick={onProfile}>Profile</button>
                <button className="sign-in-btn" onClick={onLogout}>Logout</button>
              </>
            ) : (
              <button className="sign-in-btn" onClick={onSignIn}>Sign In</button>
            )}
          </div>
        </header>
        <main className="main-content">
          <div className="content-left">
            <h1 className="main-title reveal" ref={titleRef}>
              Save your data<br />storage here.
            </h1>
            <p className="description reveal" ref={descRef}>
              Data Warehouse is a data storage area that <br />
              has been tested for security, so you can store <br />
              your data here safely but not be afraid of<br />
              being stolen by others.<br />
            </p>
            <button className="learn-more-btn">Learn more</button>
          </div>
          <div className="content-right">
            <div className="illustration reveal" ref={illuRef}>
              <img src={illustrationImage} alt="Data Storage Illustration" />
            </div>
          </div>
        </main>
      </div>
      <div className="features-section">
        <h2 className="features-title reveal" ref={featuresTitleRef}>Features</h2>
        <p className="features-subtitle reveal" ref={featuresSubtitleRef}>
          Some of the features and advantages that we provide for those of you<br />
          who store data in this Data Warehouse.
        </p>
        <div className="features-grid">
          <div className="feature-card blue feature-card-overlay" ref={featureCardRefs[0]}>
            <div className="feature-card-inner">
              <div className="feature-img-wrapper reveal" ref={featureImgRefs[0]}>
                <img src={imageSearch} alt="Search Data" />
              </div>
              <div className="feature-content-wrapper reveal" ref={featureContentRefs[0]} style={{ background: '#e0eeed' }}>
                <div className="feature-content-inner1">
                  <h3>Search Data</h3>
                  <p>
                    Don't worry if your data is very large, the Data Warehouse provides a search engine,
                    which is useful for making it easier to find data effectively saving time.
                  </p>
                  <a href="#">Learn more →</a>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-card purple feature-card-overlay" ref={featureCardRefs[1]}>
            <div className="feature-card-inner">
              <div className="feature-img-wrapper reveal" ref={featureImgRefs[1]}>
                <img src={image24Hours} alt="24 Hours Access" />
              </div>
              <div className="feature-content-wrapper reveal" ref={featureContentRefs[1]} style={{ background: '#eeeaf3' }}>
                <div className="feature-content-inner2">
                  <h3>24 Hours Access</h3>
                  <p>
                    Access is given 24 hours a full morning to night and meet again in the morning,
                    giving you comfort when you need data when urgent.
                  </p>
                  <a href="#">Learn more →</a>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-card pink feature-card-overlay" ref={featureCardRefs[2]}>
            <div className="feature-card-inner">
              <div className="feature-img-wrapper reveal" ref={featureImgRefs[2]}>
                <img src={imagePrint} alt="Print Out" />
              </div>
              <div className="feature-content-wrapper reveal" ref={featureContentRefs[2]} style={{ background: '#edd9e5' }}>
                <div className="feature-content-inner3">
                  <h3>Print Out</h3>
                  <p>
                    Print out service gives you convenience if someday you need print data, just edit it all and just print it.
                  </p>
                  <a href="#">Learn more →</a>
                </div>
              </div>
            </div>
          </div>
          <div className="feature-card gray feature-card-overlay" ref={featureCardRefs[3]}>
            <div className="feature-card-inner">
              <div className="feature-img-wrapper reveal" ref={featureImgRefs[3]}>
                <img src={imageSecurity} alt="Security Code" />
              </div>
              <div className="feature-content-wrapper reveal" ref={featureContentRefs[3]} style={{ background: '#cfe4f0' }}>
                <div className="feature-content-inner4">
                  <h3>Security Code</h3>
                  <p>
                    Data Security is one of our best facilities. Allows for your files to be safer.
                    The file can be secured with a code or password that you created.
                  </p>
                  <a href="#">Learn more →</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <TestimonialSection />
    </>
  );
};

export default DataWarehouse;