/**
 * Creates a new battle between entities,
 * @entities: a map of entities, each key is the entity id in the battle
 */
export const createBattle = (options = {}) => {
  const entities = options.entities || {}

  return ({
    entities,
  })
}

/**
 * Get an entity from a battle, by entity id
 */
export const getEntity = (battle, key) => (
  battle.entities[key]
)
