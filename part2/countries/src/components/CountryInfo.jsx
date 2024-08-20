const CountryInfo= ({ countryInfo }) => {

    if (countryInfo == null){
        return null
    }


    return (
      <div>
        <h1>{countryInfo.name.official}</h1>
        capital {countryInfo.capital} <br/>
        area {countryInfo.area}
        <h2>languages:</h2>
        <ul>
        {Object.values(countryInfo.languages).map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        
        <img src={Object.values(countryInfo.flags)[0]} />
        
      </div>
    )
  }

  export default CountryInfo