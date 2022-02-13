import { client, q } from '../db'

const fetchAll = () => client.query(
  q.Paginate(
    q.Match(
      q.Ref('indexes/all_animals')))
)
  .then(response => {
    const animalsRefs = response.data;
    // create new query out of notes refs. 
    // https://docs.fauna.com/fauna/current/api/fql/
    const getAllProductDataQuery = animalsRefs.map((ref) => {
      return q.Get(ref)
    })
    // query the refs
    return client.query(getAllProductDataQuery).then((data) => data)
  })
  .catch(error => console.warn('error', error.message))

export default fetchAll;
