import { assert } from 'chai'

import datajoin from "../src/datajoin"

describe('datajoin', () => {
  it('should union the sets in transition', () => {
    const { before } = datajoin(
      [
        {id: 0, value: 10},
        {id: 1, value: 10},
        {id: 2, value: 10},
        {id: 3, value: 10},
      ],
      [
        {id: 2, value: 20},
        {id: 4, value: 30},
      ]
    )
    assert.equal(before, [
      {id: 0, value: 10},
      {id: 1, value: 10},
      {id: 3, value: 10},
      {id: 2, value: 10},
      {id: 4, value: 30},
    ])
  })
})
