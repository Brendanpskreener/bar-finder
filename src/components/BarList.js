import classes from './BarList.module.css'
import Bar from './Bar'

const BarList = (props) => {
  return (
    <div className={classes['bar-list']}>
      {props.bars.map((bar) => (
        <Bar
          key={bar.id} 
          name={bar.name} 
          street={bar.street} 
          city={bar.city} 
          state={bar.state} 
          zipcode={bar.postal_code} 
          phone={bar.phone} 
          site={bar.website_url}
        />
      ))}
    </div>
  )
}

export default BarList