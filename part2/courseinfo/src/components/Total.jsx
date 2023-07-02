const Total = ( { parts }) => {

  return (
    <div>
      <p>
        <strong>
          Total of {parts.reduce((acc, part) => acc += part.exercises, 0)} exercises
        </strong>
      </p>
    </div>
  )
}

export default Total
