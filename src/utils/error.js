import util from 'util';
const error = module.exports = {};

error.BaseError = function () {
  const tmp = Error.apply(this, arguments);
  tmp.name = this.name = 'cas error';

  this.message = tmp.message;
  if (Error.captureStackTrace) {
    Error.captureStackTrace(this, this.constructor);
  }
};
util.inherits(error.BaseError, Error);

error.PermissionError = function (message, errors) {
  error.BaseError.apply(this, arguments);
  this.name = 'no permission';
  this.message = 'no permission';
  this.errors = errors || [];

  if (message) {
    this.message = message;
  } else if (this.errors.length > 0 && this.errors[0].message) {
    this.message = this.errors.map((err) => `${err.type}: ${err.message}`).join(',\n');
  }
};
util.inherits(error.PermissionError, error.BaseError);

error.NotFoundError = function (message, errors) {
  error.BaseError.apply(this, arguments);
  this.name = 'not found';
  this.message = 'not found';
  this.errors = errors || [];

  if (message) {
    this.message = message;
  } else if (this.errors.length > 0 && this.errors[0].message) {
    this.message = this.errors.map((err) => `${err.type}: ${err.message}`).join(',\n');
  }
};
util.inherits(error.NotFoundError, error.BaseError);

error.ServerError = function (message, errors) {
  error.BaseError.apply(this, arguments);
  this.name = 'server error';
  this.message = 'server error';
  this.errors = errors || [];

  if (message) {
    this.message = message;
  } else if (this.errors.length > 0 && this.errors[0].message) {
    this.message = this.errors.map((err) => `${err.type}: ${err.message}`).join(',\n');
  }
};
util.inherits(error.ServerError, error.BaseError);

error.ParamsError = function (message, errors) {
  error.BaseError.apply(this, arguments);
  this.name = 'params not right';
  this.message = 'params not right';
  this.errors = errors || [];

  if (message) {
    this.message = message;
  } else if (this.errors.length > 0 && this.errors[0].message) {
    this.message = this.errors.map((err) => `${err.type}: ${err.message}`).join(',\n');
  }
};
util.inherits(error.ParamsError, error.BaseError);
