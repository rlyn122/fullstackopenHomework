const Persons = ({person, handleClick}) => {
    return(
        <div>
        <p>{person.name} {person.number}</p>
        <button onClick={handleClick}>Delete</button>
        </div>
        )
}
export default Persons