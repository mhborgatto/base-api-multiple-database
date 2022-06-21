'use strict'

module.exports = {
  up: (queryInterface) => queryInterface.bulkInsert('Samples',
    [{
      id: 1,
      description: 'Primeira Descricao',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 2,
      description: 'Segunda Descricao',
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      id: 3,
      description: 'Terceira Descricao',
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Samples', null, {}),
}