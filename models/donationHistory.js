
module.exports = function (sequelize, DataTypes) {
    var DonationHistory = sequelize.define("DonationHistory", {
        donationDate: DataTypes.DATEONLY,
        donationPct: DataTypes.INTEGER,
        donationFrequency: {
            type: DataTypes.STRING(),
            values: ['Monthly', 'Bi-Monthly', '3 months', '6 months', 'Yearly']
        },
        amount: DataTypes.DECIMAL(10, 2)
    });

    DonationHistory.associate = function (models) {
        // We're saying that a Favorite entry belongs to a user
        // A Favorite can't be created without a User due to the foreign key constraint
        DonationHistory.belongsTo(models.User, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    DonationHistory.associate = function (models) {
        // We're saying that a Favorite entry belongs to a user
        // A Favorite can't be created without a User due to the foreign key constraint
        DonationHistory.belongsTo(models.Nonprofit, {
            foreignKey: {
                allowNull: false
            }
        });
    };

    return DonationHistory;
};
