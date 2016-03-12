/*
 * @Author: detailyang
 * @Date:   2016-02-18 14:07:19
 * @Last Modified by:   detailyang
 * @Last Modified time: 2016-03-09 16:08:39
 */

module.exports = (sequelize, DataTypes) => {
  const Oauth = sequelize.define('oauth', {
    name: {
      type: DataTypes.STRING(128),
      allowNull: false,
      defaultValue: '',
      unique: true,
      validate: {
        is: {
          args: /^[A-Za-z0-9-]+$/,
          msg: '必须为字母或者数字',
        },
        len: {
          args: [1, 128],
          msg: '长度必须为1-128位',
        },
      },
    },
    secret: {
      type: DataTypes.STRING(36),
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [36, 36],
          msg: '长度必须为36位',
        },
      },
    },
    domain: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [1, 512],
          msg: '长度必须为1-512位',
        },
      },
    },
    desc: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [1, 512],
          msg: '长度必须为1-512位',
        },
      },
    },
    callback_url: {
      type: DataTypes.STRING(512),
      allowNull: false,
      defaultValue: '',
      validate: {
        len: {
          args: [1, 512],
          msg: '长度必须为1-512位',
        },
      },
    },
    is_admin: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
    is_delete: {
      type: DataTypes.BOOLEAN,
      allowNull: true,
      defaultValue: false,
    },
  }, {
    associate: () => {
      // User.hasMany(models.Post);
    },
    freezeTableName: true,
    underscored: true,
  });

  return Oauth;
};
