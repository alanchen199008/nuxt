import low from 'lowdb'
import LocalStorage from 'lowdb/adapters/LocalStorage'

const adapter = new LocalStorage('WOS_CONFIG')
const db = low(adapter)

db.defaults({}).write()

export default db
