import { DataTypes } from "sequelize";

const RandomWordsModel = (db) => {
	return db.define("randomword", {
		id: {
			type: DataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true,
		},
		clerkId: DataTypes.STRING,
		randomWord: DataTypes.STRING,
	});
};

export default RandomWordsModel;
