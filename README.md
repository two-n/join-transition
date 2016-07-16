# JoinTransition

```jsx
import JoinTransition from 'join-transition'

<JoinTransition
```
React Component wrapping [`d3.transition().tween(...)`](https://github.com/d3/d3-transition#transition_tween) with a data join mechanism [inspired by d3-selection](https://github.com/d3/d3-selection#joining-data) but operating on generic data structures. `npm install join-transition`

* **values**
```jsx
  values={[value1, value2, etc]}
```
**Required**. Values to render, transitioning from previous values on subsequent renders. For transitioning a set, `values` should be an array, but otherwise it will be treated as a single value.

* **interpolate**
```jsx
  interpolate={(a, b, interpolate) => interpolate(a, b)}
```
Default. Expect [d3.interpolate](https://github.com/d3/d3-interpolate#interpolate) as final argument.

To pick a set of properties from each object to interpolate, `import { interpolatedPicked } from 'join-transition'` and pass `interpolate={interpolatedPicked(key1, key2, etc)}`. The rest of the keys will be transferred directly from latest `values`.

* **shouldTransition**
```jsx
  shouldTransition={(a, b) => a !== b}
```
Default. (Effectively required for mutated values.)

* **queue**
```jsx
  queue={false}
```
Default. If the previous transition is still in progress, `queue={true}` will wait for it to end, rather than interrupting.

* **duration**
```jsx
  duration={250}
```
Defaults to d3-transition default [duration](https://github.com/d3/d3-transition#transition_duration). Length of all values' transition (not each).

* **ease**
```jsx
  ease={d3.easeCubic}
```
Defaults to d3-transition default [easing](https://github.com/d3/d3-transition#transition_ease).

* **onTransitionEnd**
```jsx
  onTransitionEnd={null}
```


### Props applicable for transitioning sets (i.e. arrays)

* **identify**
```jsx
  identify="id"
```
Default. String or function. Key for constancy (c.f. *key* argument to [d3-selection data method](https://github.com/d3/d3-selection#selection_data))

* **enter/exit**
```jsx
  enter={d => { ...d, etc }}
  exit={d => { ...d, etc }}
  // or: enterOrExit={d => { ...d, etc }}
```
Values to transition from/to when entering/exiting.

* **stagger**
```jsx
  stagger={0}
```
Default. (0 <= `stagger` < 1). As a proportion of the duration, values' delays range from 0 to this value.

To transition values one after another, `import { staggerInSeries } from 'join-transition'` and pass `stagger={staggerInSeries()}`. Optionally pass a fractional overlap amount (defaults to 0).

* **orderBy**
```jsx
  orderBy={(d, i) => i}
```
Default. Determines stagger delay time (relative to other values).

```jsx
>
```

### Render

* **children**
```jsx
{
  transitioningValues =>
    <g>{transitioningValues.map(value => <circle {...value} />)}</g>  // ... for example
}
```
**Required**. Child must be a function that renders the array of transitioning values, which is a union of previous and current `values` in order of: exiting, updating, entering.

```jsx
</JoinTransition>
```
