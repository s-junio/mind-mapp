import React, { useEffect, useState } from 'react';
import './SectionRoller.css';

let isScrolling = false;
const SectionRoller = () => {
  const sections = [
    {
      id: 'start',
      label: 'Start',
    },
    {
      id: 'motivation',
      label: 'Motivation',
    },
    {
      id: 'waw',
      label: 'Who are we?',
    },
  ];

  const [currentSelection, setCurrentSelection] = useState<number>(0);
  useEffect(() => {
    const elem = document.getElementById(sections[0].id);
    if (elem) {
      let options = {
        root: elem.parentElement,
        rootMargin: '0px',
        threshold: 0.7,
      };

      const callback: IntersectionObserverCallback = (entries, observer) => {
        console.log(isScrolling);
        if (!isScrolling) {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              sections.every((section, index) => {
                if (entry.target.id === section.id) {
                  setCurrentSelection(index);
                  return false;
                }
                return true;
              });
            }
          });
        }
      };

      let observer = new IntersectionObserver(callback, options);
      sections.forEach((section) => {
        const sectionElem = document.getElementById(section.id);
        if (sectionElem) {
          observer.observe(sectionElem);
        }
      });
    }
    return () => {};
  }, [currentSelection]);

  const handleClick = (event: React.MouseEvent, index: number) => {
    const parent = document.querySelector('.home-wrapper');
    if (parent) {
      let scrollTimeout: NodeJS.Timeout;

      isScrolling = true;
      const handleScroll = () => {
        if (scrollTimeout) {
          clearTimeout(scrollTimeout);
        }
        scrollTimeout = setTimeout(function () {
          isScrolling = false;
          parent.removeEventListener('scroll', handleScroll);
        }, 80);
      };
      parent.addEventListener('scroll', handleScroll);
    }
    setCurrentSelection(index);
  };
  return (
    <div className="section-roller">
      <div className="pointer">
        <svg
          width="34"
          height="15"
          viewBox="0 0 34 15"
          fill="blue"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="point-path">
            <circle id="outter" cx="7.05365" cy="7.05365" r="7.05365" />
            <circle id="connect" cx="30.6369" cy="7.12491" r="3.36295" />
            <circle id="inner" cx="7.05344" cy="7.05368" r="3.6052" />
            <rect
              id="link"
              x="13.167"
              y="5.32947"
              width="15.0478"
              height="3.44845"
            />
          </g>
        </svg>
      </div>
      <ul style={{ transform: `translateY(${currentSelection * -25}px)` }}>
        {sections.map((section, index) => (
          <li
            className={currentSelection === index ? 'selected' : ''}
            key={section.id}
          >
            <a
              href={'#' + section.id}
              onClick={(event) => {
                handleClick(event, index);
              }}
            >
              {section.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SectionRoller;
