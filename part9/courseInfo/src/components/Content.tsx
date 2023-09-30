import { Part } from './Part';
import { CourseParts } from '../types';

const Content = (props: CourseParts) => {
  return (
    <>
      {props.parts.map((part, index) => <Part key={index} {...part} />)}
    </>
  )
};

export { Content };
