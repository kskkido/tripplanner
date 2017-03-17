const Sequelize = require('sequelize');
const db = new Sequelize('postgres://localhost:5432/tripplanner')

const Place = db.define('place', {
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  city: {
    type: Sequelize.STRING,
    allowNull: false
  },
  state: {
    type: Sequelize.STRING,
    allowNull: false
  },
  phone: {
    type: Sequelize.STRING

  },
  location: {
    type: Sequelize.ARRAY(Sequelize.FLOAT)
  }
});

const Hotel = db.define('hotel', {
  name: {
    type: Sequelize.STRING
  },
  num_stars: {
    type: Sequelize.FLOAT,
    validate: {
      max: 5,
      min: 1
    }
  },
  amenities: {
        type: Sequelize.ARRAY(Sequelize.TEXT),
        set: function(value){
            var arrayOfAmn;
            if(typeof value === 'string'){
                arrayOfAmn = value.split(",").map((str) => str.trim());
                this.setDataValue('amenities', arrayOfAmn);
            }
            else{
                this.setDataValue('amenities', value);
            }
        }
    }
});

const Activity = db.define('activity', {
  name: {
    type: Sequelize.STRING
  },
  age_range: {
    type: Sequelize.STRING
  }
});

const Restaurant = db.define('restaurant', {
  name: {
    type: Sequelize.STRING
  },
  cuisine: {
    type: Sequelize.ARRAY(Sequelize.TEXT),
        set: function(value){
            var arrayOfFood;
            if(typeof value === 'string'){
                arrayOfFood = value.split(",").map((str) => str.trim());
                this.setDataValue('cuisine', arrayOfFood);
            }
            else{
                this.setDataValue('cuisine', value);
            }
        }
    },
  price: {
    type: Sequelize.INTEGER
  }
});

Hotel.belongsTo(Place);
Restaurant.belongsTo(Place);
Activity.belongsTo(Place);

module.exports = {
  Place: Place,
  Hotel: Hotel,
  Activity: Activity,
  Restaurant: Restaurant,
  db: db
}
