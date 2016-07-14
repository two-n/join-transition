import { Component, PropTypes } from "react"
import { transition } from "d3-transition"
import { interpolate } from "d3-interpolate"

import datajoin from "./datajoin"


const extent = (collection, accessor) => {
  let min = Infinity, max = -Infinity
  for (let i = 0; i < collection.length; i++) {
    const value = accessor ? accessor(collection[i]) : collection[i]
    if (value < min) min = value
    if (value > max) max = value
  }
  return [min, max]
}

const zip = (a, b) => a.map((d, i) => [d, b[i]])


class JoinTransition extends Component {
  render() {
    return this.props.children(this.state.values, this.state.prevValues)
  }

  setValues(values) {
    this.setState({ values, prevValues: values })
  }

  componentWillMount() {
    this.setValues(this.props.values)
  }

  componentWillReceiveProps(nextProps) {
    if (typeof this.props.shouldTransition === "function" ? !this.props.shouldTransition(this.props.values, nextProps.values) : !this.props.shouldTransition) {
      return this.setValues(nextProps.values)
    }

    const plural = Array.isArray(nextProps.values)

    const newTransition = transition(`JoinTransition-${Date.now()}`)
    const defaultEase = newTransition.ease()
    if (nextProps.duration != null) newTransition.duration(nextProps.duration)
    if (plural) newTransition.ease(t => +t)
    else if (nextProps.ease != null) newTransition.ease(nextProps.ease)

    const enterValue = this.props.enter || this.props.enterOrExit
    const exitValue = this.props.exit || this.props.enterOrExit
    const enterFrom = typeof enterValue === "function" ? enterValue : d => ({ ...d, ...enterValue })
    const exitTo = typeof exitValue === "function" ? exitValue : d => ({ ...d, ...exitValue })

    let interpolator
    
    if (plural) {
      const { before, after } = datajoin(this.state.values, nextProps.values, {
        key: nextProps.identify, enterFrom, exitTo
      })
      const interpolators = zip(before, after).map(([from, to]) => nextProps.interpolate(from, to, interpolate))

      const staggerCoefficient = 1 / (1 - (this.props.stagger || 0) / newTransition.duration())
      const staggerRange = this.props.orderBy ? extent(after, this.props.orderBy) : [0, after.length - 1]
      const staggerScale = value => (value - staggerRange[0]) / (staggerRange[1] - staggerRange[0])
        
      interpolator = t =>
        after.map((d, i) => {
          const staggerValue = this.props.orderBy != null ? this.props.orderBy(d, i) : i
          const t_i = staggerCoefficient * t + (1 - staggerCoefficient) * staggerScale(staggerValue)
          const ease = nextProps.ease != null ? nextProps.ease : defaultEase
          return { ...d, ...interpolators[i](ease(Math.min(1, Math.max(0, t_i)))) }
        })
    }
    else if (this.state.values != null || nextProps.values != null) {
      interpolator = nextProps.interpolate(
        this.state.values == null ? enterFrom(nextProps.values) : this.state.values,
        nextProps.values == null ? exitTo(this.state.values) : nextProps.values,
        interpolate
      )
    }
    else return this.setValues(nextProps.values)

    newTransition
      .tween("values", () => t => {
        this.setState({ values: interpolator(t), prevValues: this.state.values })
      })
      .on("end", () => { this.setValues(nextProps.values) })
  }

}

JoinTransition.propTypes = {
  values: PropTypes.any.isRequired,

  interpolate: PropTypes.func,
  shouldTransition: PropTypes.func,
  identify: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),

  enter: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  exit: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),
  enterOrExit: PropTypes.oneOfType([PropTypes.any, PropTypes.func]),

  duration: PropTypes.number,
  ease: PropTypes.func,
  stagger: PropTypes.number,
  orderBy: PropTypes.func,
}

JoinTransition.defaultProps = {
  interpolate,
  shouldTransition: (a, b) => a !== b,
  identify: "id",
  enter: null,
  exit: null,

  duration: null,
  ease: null,
  stagger: 0,
  orderBy: null,
}

// export default JoinTransition
module.exports = JoinTransition
