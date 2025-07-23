import React, { useEffect, useRef, useState } from 'react';
import './TestimonialSection.scss';
import johnFangImage from '../assets/abc.jpg'; 

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
// em đã call api nhưng mà api trả ra đang bị lỗi => fix cứng

interface Testimonial {
  id: number;
  image: string;
  name: string;
  website: string;
  text: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    image: johnFangImage,
    name: 'John Fang',
    website: 'wordfaang.com',
    text: 'Suspendisse ultrices at diam lectus nullam. Nisl, sagittis viverra enim erat tortor ultricies massa turpis. Arcu pulvinar aenean nam laoreet nulla.',
  },
  {
    id: 2,
    image: johnFangImage, 
    name: 'Jane Doe',
    website: 'janedoe.com',
    text: 'This is another great testimonial from Jane Doe. It highlights the amazing features of the Data Warehouse.',
  },
  {
    id: 3,
    image: johnFangImage, 
    name: 'Peter Smith',
    website: 'petersmith.com',
    text: 'Data Warehouse has significantly improved my data management. Highly recommend it to everyone!',
  },
  {
    id: 4,
    image: johnFangImage, 
    name: 'Alice Johnson',
    website: 'alicejohnson.com',
    text: 'A truly secure and efficient solution for all your data storage needs. I am very satisfied!',
  },
];

const TestimonialSection = () => {
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0);
  const revealRef = useScrollReveal<HTMLDivElement>();

  const goToTestimonial = (index: number) => {
    setCurrentTestimonialIndex(index);
  };

  const nextTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevTestimonial = () => {
    setCurrentTestimonialIndex((prevIndex) =>
      prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1
    );
  };

  const currentTestimonial = testimonials[currentTestimonialIndex];

  return (
    <div className="testimonial-section reveal" ref={revealRef}>
      <div className="testimonial-title">Testimonials</div>
      <div className="testimonial-carousel">
        <button className="carousel-arrow left-arrow" onClick={prevTestimonial}>&larr;</button>
        <div className="testimonial-card">
          <div className="testimonial-header">
            <img src={currentTestimonial.image} alt={currentTestimonial.name} className="testimonial-image" />
            <div className="testimonial-info">
              <h4 className="testimonial-name">{currentTestimonial.name}</h4>
              <p className="testimonial-website">{currentTestimonial.website}</p>
            </div>
          </div>
          <p className="testimonial-text">{currentTestimonial.text}</p>
        </div>
        <button className="carousel-arrow right-arrow" onClick={nextTestimonial}>&rarr;</button>
      </div>
      <div className="carousel-dots">
        {testimonials.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentTestimonialIndex ? 'active' : ''}`}
            onClick={() => goToTestimonial(index)}
          ></button>
        ))}
      </div>
    </div>
  );
};

export default TestimonialSection;