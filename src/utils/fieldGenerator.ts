import { Field } from '../types/Field'

export function fieldGenerator(): Field {
  const field: Field = { rows: [] }
  const quantityOfRows = 6
  const quantityOfQuadrants = 4

  for (let i = 0; i <= quantityOfRows; i++) {
    field.rows.push({ quadrants: [] })
    for (let j = 0; j < quantityOfQuadrants; j++) {
      field.rows[i].quadrants.push({ playersOnQuadrant: [] })
    }
  }

  return field
}
