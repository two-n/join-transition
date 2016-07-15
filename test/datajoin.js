import { expect } from "chai"
import data from "./sample-data"


import datajoin from "../src/datajoin"

describe("datajoin", () => {
  it("should return union sets", () => {
    const { before, after } = datajoin(data.basic.from, data.basic.to)
    expect(before).to.deep.equal([
      {id: 0, value: 10},  // Exiting
      {id: 1, value: 10},
      {id: 3, value: 10},
      {id: 2, value: 10},  // Updating
      {id: 4, value: 30},  // Entering
    ])
    expect(after).to.deep.equal([
      {id: 0, value: 10},  // Exiting
      {id: 1, value: 10},
      {id: 3, value: 10},
      {id: 2, value: 20},  // Updating
      {id: 4, value: 30},  // Entering
    ])
  })
})
