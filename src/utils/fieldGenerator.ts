import { Field } from '../types/Field'

export function fieldGenerator(): Field {
  const field: Field = { quadrants: [] }
  const fieldSize = 35

  for (let i = 0; i <= fieldSize; i++) {
    field.quadrants.push({ playersOnQuadrant: [] })
  }

  console.log('field', field)

  return field
}
