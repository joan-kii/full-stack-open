import { CourseParts } from "../types";

const Total = (props: CourseParts) => {
  return (
    <>
      <p>
        Number of exercises{" "}
        {props.parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
      </p>
    </>
  )
};

export { Total };
