const lodash = require("lodash");

function mapProperties(configuration) {
  return (data) => {
    if (data) {
      return Object.entries(data).reduce((accumulator, [key, value]) => {
        return lodash.set(accumulator, configuration[key] || key, value);
      }, {});
    }
    console.log(`Mapping property ${key} to ${configuration[key] || key}`);
    return data;
  };
}

module.exports = mapProperties;
