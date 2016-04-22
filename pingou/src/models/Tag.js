export default function(sequelize, DataTypes) {
  const Tag = sequelize.define('Tag', {
    name: DataTypes.STRING
  });

  return Tag;
}
