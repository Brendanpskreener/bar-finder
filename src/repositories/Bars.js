import axios from "axios"

async function findBars(args) {
  const baseURL = new URL('https://api.openbrewerydb.org/v1/breweries')
  console.log(args)
  try {
    if (args.locationToggle && args.latitude) {
      const query = `${args.latitude},${args.longitude}`
      baseURL.searchParams.append("by_dist", query)
    } else if (!args.locationToggle && args.zipcode) {
      baseURL.searchParams.append("by_postal", args.zipcode)
    } 
    if (args.name) {
      baseURL.searchParams.append("by_name", args.name)
    }
    const response = await axios.get(baseURL)
    return response.data
  } catch (error) {
    console.log(error)
  }
}

export default findBars