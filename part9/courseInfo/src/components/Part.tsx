import { CoursePart } from '../types';
import { assertNever } from '../helpers';

const Part = (props: CoursePart) => {
  if (props.kind === 'basic') {
    return (
      <div>
        <h3>{props.name} {props.exerciseCount}</h3>
        <p>{props.description}</p>
      </div>
    )
  } else if (props.kind === 'group') {
    return (
      <div>
        <h3>{props.name} {props.exerciseCount}</h3>
        <p>Project exercises: {props.groupProjectCount}</p>
      </div>
    )
  } else if (props.kind === 'background') {
    return (
      <div>
        <h3>{props.name} {props.exerciseCount}</h3>
        <p>{props.description}</p>
        <p>Submit to: {props.backgroundMaterial}</p>
      </div>
    )
  } else if (props.kind === 'special') {
    return (
      <div>
        <h3>{props.name} {props.exerciseCount}</h3>
        <p>{props.description}</p>
        <p>Required skills: {props.requirements.join(', ')}</p>
      </div>
    )
  } else {
    return assertNever(props);
  }
};

export { Part };
