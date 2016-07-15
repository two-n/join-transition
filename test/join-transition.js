import { expect } from "chai"
import { mount } from "enzyme"
import data from "./sample-data"

import jsdom from "jsdom"
const document = jsdom.jsdom("<!doctype html><html><body></body></html>")
global.document = document
global.window = document.defaultView

import React from "react"


import JoinTransition from "../src"

describe("<JoinTransition />", () => {
  it("should work with default props", done => {
    const wrapper = mount(
      <JoinTransition
        values={data.basic.from}
        duration={100}
      >{values =>
        <div className="values">{
          values.map(({value}) => <div className="value">{value.value}</div>)
        }</div>
      }</JoinTransition>
    )

    wrapper.setProps({ values: data.basic.to })

    setTimeout(() => {
      expect(wrapper.find(".value")).to.have.length(5)
    }, 50)
    setTimeout(() => {
      expect(wrapper.find(".value")).to.have.length(2)
      done()
    }, 150)
  })

  it("should allow multiple transitions in parallel")
  it("should queue transitions if queue={true}")
})
