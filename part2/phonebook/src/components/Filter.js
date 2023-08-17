const Filter = ({changeHandler, value}) => 
  <div>
    filter shown with: <input onChange={changeHandler} value={value}/>
  </div>

export default Filter