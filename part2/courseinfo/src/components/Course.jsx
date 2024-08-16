
const Part = ({ name, exercises }) => {
    return (
        <div> {name} {exercises}  </div>
    )

}


const Course = ({ course }) => {

    const initialValue = 0;
    const total = course.parts.reduce(
        (accumulator, currentValue) => accumulator + currentValue.exercises,
        initialValue,
    );


    return (<div>
        <h1>{course.name}</h1>

        {course.parts.map(part =>
            <Part key={part.id} name={part.name} exercises={part.exercises} />
        )
        }

        <h3>total of {total} exercises</h3>

    </div>)
}


export default Course