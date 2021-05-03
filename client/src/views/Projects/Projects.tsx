import React, { KeyboardEvent, useEffect, useState } from 'react';
import ListData from '../../components/ListData/ListData';
import { MInput } from '../../components/MInput/MInput';
import { MiniMap } from 'react-flow-renderer';
import './Projects.css';

interface Project {
  id: string;
  title: string;
}

const data: Project[] = [
  {
    title: 'Project Plans',
    id: 'ee-dd231',
  },
  {
    title: 'A new idea',
    id: 'ee-dd232',
  },
  {
    title: 'TDD',
    id: 'ee-dd233',
  },
  {
    title: 'Reviews',
    id: 'ee-dd234',
  },
  {
    title: 'Planing',
    id: 'ee-dd235',
  },
  {
    title: 'Planing2',
    id: 'ee-dd236',
  },
  {
    title: 'Planing3',
    id: 'ee-dd237',
  },
];

function Projects() {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [list, setList] = useState<Project[]>([]);

  /* todo remove this */
  const sleep = (time: number) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(data);
      }, time * 1000);
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      const result: any = await sleep(5);
      setIsLoading(false);
      setList(result);
    };

    fetchData();
  }, []);

  const handleSearch = (ev: KeyboardEvent) => {
    const target: any = ev.target;
    if (ev.target) {
      const value = target.value.toLowerCase();
      if (value) {
        const filteredList = data.filter((item) => {
          const term = item.title.toLowerCase();
          return term.indexOf(value) !== -1;
        });
        setList(filteredList);
      } else {
        setList(data);
      }
    }
  };
  return (
    <div className="projects">
      <div className="project-list">
        <MInput name="Search..." onKeyUp={handleSearch}></MInput>
        <ListData list={list} isLoading={isLoading}></ListData>
      </div>
      <h1>Projects</h1>
    </div>
  );
}

export default Projects;
