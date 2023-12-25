const Header = ({name}) => {
    return (
    <div>
        <h1>{name}</h1>
    </div>
    )

}

const Content = ({course}) => {
    return (
    <div>
        {course.parts.map( c => 
            <p>
            {c.name} {c.exercises}
            </p>
        )}
        </div>
    )
}

const Sum = ({course}) => {

    let parts = course.parts
    
    let sum = parts.reduce((total,p) => 
    {
        return total+p.exercises
    },0)


    return(
        <div>
            <p><strong>total exercises {sum} </strong></p>
        </div>
    )
}

const Courses = ({courses}) =>{
    return(
        <div>
            {courses.map(course => (
                <div key={course.id}>
                    <Header name={course.name} />
                    <Content course={course} />
                    <Sum course={course} />
                </div>
            ))}
        </div>
    );
}
export default Courses