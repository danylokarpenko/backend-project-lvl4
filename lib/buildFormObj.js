import _ from 'lodash';

export default (object, error = { errors: [] }) => {
  return {
    name: 'form',
    object,
    errors: _.groupBy(error.errors, 'path')
  }
}
