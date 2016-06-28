/*
 * @Author: detailyang
 * @Date:   2016-02-18 14:07:19
* @Last modified by:   detailyang
* @Last modified time: 2016-06-28T15:09:40+08:00
 */


module.exports = (sequelize, DataTypes) => {
  const Pki = sequelize.define('pki', {
    id: {
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING(1024),
      allowNull: true,
      unique: true,
      defaultValue: '',
    },
    key: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: '',
    },
    csr: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: '',
    },
    crt: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: '',
    },
    pkcs12: {
      type: DataTypes.TEXT(),
      allowNull: true,
      defaultValue: '',
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: true, // assumeing it's deleted
    },
    uid: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0,
    },
  }, {
    associate: () => {
      // User.hasMany(models.Post);
    },
    freezeTableName: true,
    underscored: true,
  });
  return Pki;
};
