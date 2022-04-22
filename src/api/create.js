import { client, q } from '../db'

const create = grid => client.query(
  q.Create(
    q.Collection('animals'),
    {
      data: {
        grid
      },
    },
  )
)
.then(ret => ret)
.catch(err => console.warn(err))


export default create;
