import { Field, Row } from '../types/Field'

export function fieldGenerator(): Field {
  const emptyRow: Row = {
    0: { playersOnQuadrant: [] },
    1: { playersOnQuadrant: [] },
    2: { playersOnQuadrant: [] },
    3: { playersOnQuadrant: [] },
  }

  const field: Field = {
    0: emptyRow,
    1: emptyRow,
    2: emptyRow,
    3: emptyRow,
    4: emptyRow,
    5: emptyRow,
    6: emptyRow,
  }

  return field
}
