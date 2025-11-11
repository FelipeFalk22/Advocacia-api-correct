module.exports = (models) => {
  const { AdvogadoModel, ProcessoModel } = models;

  if (!AdvogadoModel || !ProcessoModel) {
    console.warn('⚠️ Models não carregados corretamente em relations.js');
    return;
  }

  // Evita duplicar associação
  if (!AdvogadoModel.associations.processos) {
    AdvogadoModel.hasMany(ProcessoModel, {
      foreignKey: 'id_advogado',
      as: 'processos',
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE',
    });
  }

  if (!ProcessoModel.associations.advogado) {
    ProcessoModel.belongsTo(AdvogadoModel, {
      foreignKey: 'id_advogado',
      as: 'advogado',
    });
  }
};
