/*
| url              | varchar(100)                 | YES  |     | NULL                |                             |
*/
module.exports = function(sequelize, DataTypes) {
    var Nonprofit = sequelize.define("Nonprofit", {
        //landLordId: DataTypes.INTEGER,
        orgName: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        mission: DataTypes.TEXT,
        address: {
            type: DataTypes.STRING(80),
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        state: {
            type: DataTypes.STRING(2),
            allowNull: false,
        },
        zip: {
            type: DataTypes.STRING(10),
            allowNull: false,
        },
        country: {
            type: DataTypes.STRING(60),
            allowNull: false,
        },
        orgFocus: {
            type: DataTypes.TEXT,
            allowNull: false,
        },
        url: {
            type: DataTypes.STRING(255),
            default: '',
        }
    });

    Nonprofit.associate = function(models) {
        // We're saying that a Post should belong to an Author
        // A Post can't be created without an Author due to the foreign key constraint
        Nonprofit.belongsTo(models.User, {
          foreignKey: {
            allowNull: false
          }
        });
      };
    

    return Nonprofit;
};