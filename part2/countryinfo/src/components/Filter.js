const Filter = ({changeHandler, value}) => 
  <div>
    find countries <input onChange={changeHandler} value={value}/>
  </div>

export default Filter