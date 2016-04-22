export default function(sequelize, DataTypes) {
  const File = sequelize.define('File', {
    name: DataTypes.STRING
  });

  return File;
}