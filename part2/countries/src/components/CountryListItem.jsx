const CountryListItem = ({ name,showHandler }) => {
    return (
      <div>{name} 
      <button onClick={showHandler} >show </button>
      </div>
    )
  }

  export default CountryListItem