```jsx
import JoinTransition from 'join-transition'

<JoinTransition
```
React Component wrapping [`d3.transition().tween(...)`](https://github.com/d3/d3-transition#transition_tween) with a data join mechanism [inspired by d3-selection](https://github.com/d3/d3-selection#joining-data) but operating on generic data structures. `npm install join-transition`

```jsx
  values={[value1, value2, etc]}
```
**Required**. Values to render, transitioning from previous values on subsequent renders. For transitioning a set, `values` should be an array, but otherwise it will be treated as a single value.

```jsx
  interpolate={(a, b, interpolate) => interpolate(a, b)}
```
Default. Expect [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) as final argument.
```jsx
  shouldTransition={(a, b) => a !== b}
```
Default. (Effectively required for mutated values.)

```jsx
  duration={250}
```
Defaults to d3-transition default [duration](https://github.com/d3/d3-transition#transition_duration). Length of all values' transition (not each).

```jsx
  ease={d3.easeCubic}
```
Defaults to d3-transition default [easing](https://github.com/d3/d3-transition#transition_ease).


### Props applicable for transitioning sets (i.e. arrays)

```jsx
  identify={d => d.id}
```
Default. Keys for constancy (c.f. *key* argument to [d3-selection data method](https://github.com/d3/d3-selection#selection_data))
```jsx
  enter={d => { ...d, etc }}
  exit={d => { ...d, etc }}
  // or: enterOrExit={d => { ...d, etc }}
```
Values to transition from/to when entering/exiting.

```jsx
  stagger={0}
```
Default. Longest delay time (ms). Must be less than `duration`.
```jsx
  orderBy={(d, i) => i}
>
```
Default. Determines stagger delay time (relative to other values).

### Render

```jsx
{
  transitioningValues =>
    <g>{transitioningValues.map(value => <circle {...value} />)}</g>  // ... for example
}
```
**Required**. Child must be a function that renders the array of transitioning values (including those entering, updating, and exiting).

```jsx
</JoinTransition>
```
