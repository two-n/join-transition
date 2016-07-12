import { transition } from "d3-transition"
import { interpolate } from "d3-interpolate"
import { scaleLinear } from "d3-scale"
import { extent } from "d3-array"
import { isEqual, zip } from "underscore"
import React from "react"

import datajoin from "./datajoin"

const JoinTransition = React.createClass({
  getDefaultProps() {
    return {
      interpolate,
      enter: null,
      exit: null,
      orderBy: null,
      duration: null,
      stagger: null,
      ease: null,
      shouldTransition: (a, b) => a !== b,
    }
  },

  render() {
    return this.props.children(this.state.value, this.state.prevValue)
  },

  setValue(value) {
    this.setState({ value, prevValue: value })
  },

  componentWillMount() {
    this.setValue(this.props.value)
  },

  componentWillReceiveProps(nextProps) {
    if (typeof this.props.shouldTransition === "function" ? !this.props.shouldTransition(this.props.value, nextProps.value) : !this.props.shouldTransition) {
      return this.setValue(nextProps.value)
    }

    const plural = Array.isArray(nextProps.value)

    const newTransition = transition("transition")
    const defaultEase = newTransition.ease()
    if (nextProps.duration != null) newTransition.duration(nextProps.duration)
    if (plural) newTransition.ease("linear")
    else if (nextProps.ease != null) newTransition.ease(nextProps.ease)

    const enterFrom = typeof nextProps.enter === "function" ? nextProps.enter : d => ({ ...d, ...nextProps.enter })
    const exitTo = typeof nextProps.exit === "function" ? nextProps.exit : d => ({ ...d, ...nextProps.exit })

    let interpolator
    
    if (plural) {
      const join = datajoin(this.state.value, nextProps.value, { key: this.props.identify, enterFrom, exitTo })
      const interpolators = zip(join.before, join.after).map(([from, to]) => nextProps.interpolate(from, to, interpolate))

      const staggerCoefficient = 1 / (1 - (this.props.stagger || 0) / newTransition.duration())
      const staggerScale = scaleLinear().domain(this.props.orderBy ? extent(join.after, this.props.orderBy) : [0, b.length - 1])
        
      interpolator = t =>
        join.after.map((d, i) => {
          const y = Math.min(1, Math.max(0, t * staggerCoefficient + (1 - staggerCoefficient) * staggerScale(this.props.orderBy != null ? this.props.orderBy(d) : i)))
          return { ...d, ...interpolators[i]((nextProps.ease != null ? nextProps.ease : defaultEase)(y)) }
        })
    }
    else if (this.state.value != null || nextProps.value != null) {
      interpolator = nextProps.interpolate(
        this.state.value == null ? enterFrom(nextProps.value) : this.state.value,
        nextProps.value == null ? exitTo(this.state.value) : nextProps.value,
        interpolate
      )
    }
    else return this.setValue(nextProps.value)

    newTransition
      .tween("value", () => t => { this.setState({ value: interpolator(t), prevValue: this.state.value }) })
      .each("end", () => { this.setValue(nextProps.value) })
  }

})

module.exports = JoinTransition