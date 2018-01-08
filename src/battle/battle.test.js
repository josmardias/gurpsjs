import {
  createBattle,
  getEntity,
} from './battle'

test('should create a battle without options', () => {
  const battle = createBattle()
  expect(battle.entities).toEqual({})
})

test('should create a battle without initial entities', () => {
  const battle = createBattle({ entities: {} })
  expect(battle.entities).toEqual({})
})

test('should create battle with initial entities', () => {
  const entityA = { a: 1 }
  const entityB = { b: 2 }

  const battle = createBattle({
    entities: {
      aaaa: entityA,
      bbbb: entityB,
    },
  })

  expect(getEntity(battle, 'aaaa')).toEqual(entityA)
  expect(getEntity(battle, 'bbbb')).toEqual(entityB)
})
