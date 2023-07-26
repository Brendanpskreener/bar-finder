import classes from './Bar.module.css'

const Bar = (props) => {
  return (
    <div className={classes.bar}>
      <h2>{props.name}</h2>
      <h3>{props.street}</h3>
      <h3>{props.city}</h3>
      <h3>{props.state}</h3>
      <h3>{props.zipcode}</h3>
      <h3>{props.phone}</h3>
      <h3>{props.site}</h3>
    </div>
  )
}

export default Bar