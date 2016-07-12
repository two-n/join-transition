JoinTransition
--------------

React Component that wraps `d3.transition().tween(...)` with a data join mechanism inspired by d3-selection but operating on generic data structures.

Sample:
```
<JoinTransition
  values={[value1, value2, etc]}  // *Required*
  // or: value={value}

  interpolate={(a, b, interpolate) => interpolate(a, b)}  // Default. Passes d3.interpolate as final argument
  shouldTransition={(a, b) => a !== b}  // Default. Required for mutable values

  identify={d => d.id}  // Default. Keys values for constancy (c.f. 2nd argument to d3-selection data method)

  enter={d => { ...d, etc }}
  exit={d => { ...d, etc }}
  // or: enterOrExit={d => { ...d, etc }}

  duration={500}  // Defaults to d3-transition default duration. Length of all values' transition (not each!)
  stagger={0}  // Default. Longest delay time. Must be smaller than duration
  orderBy={(d, i) => i}  // Default. Determines stagger delay time, relative to other values
>{
  // The child must be a function that renders the array of transitioning values (including those entering, updating, and exiting), e.g.:
  transitioningValues =>
    <g>{values.map(value => <circle {...value} />)}</g>
  // *Required*
}</JoinTransition>
```
