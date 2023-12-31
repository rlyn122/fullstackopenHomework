const Filter = ({searchValue,handleSearch}) => {
    return(
        <div>
             <p>filter by name: </p><input value={searchValue} onChange={handleSearch} />
        </div>
    )
}
export default Filter