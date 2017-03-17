const Sequelize = require('sequilize')
const db = new Sequelize('postgres://localhost:5432/tripplanner')

var Place = db.define('place', {
  address:
  city:
  state:
  phone:
  location:
}, {})

var Hotel = db.define('hotel' {
  name:
  num_stars:
  amenities:
}, {})

var Activity = db.define('activity' {
  name:
  age_range:
}, {})

var Restaurant = db.define('restaurant' {
  name:
  cuisine:
  price:
}, {})

module.export = {
  Tripplanner: Tripplanner
}
