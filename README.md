# JoinTransition

React Component wrapping [`d3.transition().tween(...)`](https://github.com/d3/d3-transition#transition_tween) with a data join mechanism [inspired by d3-selection](https://github.com/d3/d3-selection#joining-data), operating on generic data structures.

## Install
`npm install join-transition`

## Documentation
Sample element:
```jsx
<JoinTransition
  values={[value1, value2, etc]}  // *Required*
```

```
  interpolate={(a, b, interpolate) => interpolate(a, b)}
```
Default. Passes [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) as final argument
```
  shouldTransition={(a, b) => a !== b}
```
Default. Required for mutable values

```
  identify={d => d.id}
```
Default. Keys for constancy (c.f. *key* argument to [d3-selection data method](https://github.com/d3/d3-selection#selection_data))
```
  enter={d => { ...d, etc }}
  exit={d => { ...d, etc }}
  // or: enterOrExit={d => { ...d, etc }}
```

```
  duration={250}
```
Defaults to d3-transition default [duration](https://github.com/d3/d3-transition#transition_duration). Length of all values' transition (not each).

```
  ease={d3.easeCubic}
```
Defaults to d3-transition default [easing](https://github.com/d3/d3-transition#transition_ease)

```
  stagger={0}
```
Default. Longest delay time. Must be smaller than duration
```
  orderBy={(d, i) => i}
```
Default. Determines stagger delay time, relative to other values
```
>{
```
The child must be a function that renders the array of transitioning values (including those entering, updating, and exiting), e.g.:
```
  transitioningValues =>
    <g>{values.map(value => <circle {...value} />)}</g>
  // *Required*
}</JoinTransition>
```
