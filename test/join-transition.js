import { expect } from "chai"
import data from "./sample-data"

import { mount } from "enzyme"
import jsdom from "jsdom"
global.document = jsdom.jsdom("<!doctype html><html><body></body></html>")
global.window = global.document.defaultView

import React from "react"


import JoinTransition, { staggerInSeries } from "../src"

const wrapTransition = props => {
  const wrapper = mount(
    <JoinTransition values={data.basic.from} {...props}>{values =>
      <values>{
        values.map(({ id, value }) => <value key={id}>{value}</value>)
      }</values>
    }</JoinTransition>
  )
  wrapper.setProps({ values: data.basic.to })
  return wrapper
}

describe("<JoinTransition />", () => {
  it("should work with default props", done => {
    const wrapper = wrapTransition({
      duration: 100,
      onTransitionEnd: () => {
        expect(wrapper.find("value")).to.have.length(2)
        done()
      }
    })
    setTimeout(() => {
      expect(wrapper.find("value")).to.have.length(5)
    }, 50)
  })

  it("should facilitate staggering one at a time", onTransitionEnd => {
    const wrapper = wrapTransition({
      stagger: staggerInSeries(),
      enterOrExit: d => ({ ...d, value: 0 }),
      onTransitionEnd
    })
    setInterval(() => {
      expect(wrapper.text().replace(/[^\.]/g,"").length).to.be.at.most(1)
    }, 17)
  })

  it("should allow multiple transitions in parallel")
  it("should queue transitions if queue={true}")
})
