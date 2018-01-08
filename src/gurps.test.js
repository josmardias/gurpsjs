import {
  createBattle,
} from './gurps/battle'

tests.skip('smoke: battle between two characters', () => {
  const battle = createBattle({
    entities: {
      john: createCharacter(),
      peter: createCharacter(),
    },
  })

  expect(battle).toBeDefined()

  // attack roll - success
  const johnAttackedPeterAction = createAction(
    battle,
    {
      entity: 'john',
      skill: 'knife',
      target: 'peter',
      diceRoll: [3, 3, 3],
    }
  )

  expect(johnAttackedPeterAction).toBeDefined()
  expect(johnAttackedPeterAction.status).toEqual(STATUS_SUCCESS)

  // defense roll - failure
  const peterDefenseAgainstJohnAction = createAction(
    battle,
    {
      entity: 'peter',
      skill: 'parrying',
      target: johnAttackedPeterAction,
      diceRoll: [5, 5, 5],
    }
  )

  expect(peterDefenseAgainstJohnAction).toBeDefined()
  expect(peterDefenseAgainstJohnAction.status).toEqual(STATUS_FAILURE)

  // consolidate action in battle
  const newBattleState = runAction(
    battle,
    peterDefenseAgainstJohnAction,
  )

  expect(newBattleState).toBeDefined()
  expect(getEntityAttribute('peter', 'HP')).toEqual('????')
})
