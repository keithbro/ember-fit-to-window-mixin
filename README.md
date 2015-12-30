# ember-fit-to-window-mixin

Maintains the Ember.Component heights so that they fit vertically in the
viewport.

## Usage

`ember install ember-fit-to-window`

Elements that take up vertical space either above or below should have the
class `ignore` so that the mixin ignores them in the calculation.

### Basic Example

#### Component

    import Ember from 'ember';
    import FitToWindow from 'ember-fit-to-window-mixin/mixins/fit-to-window';

    export default Ember.Component.extend(FitToWindow)

#### Template

    <div class="header ignore">...</div>

    {{your-component}}

    <div class="footer ignore">...</div>

## Installation

* `git clone` this repository
* `npm install`
* `bower install`

## Running

* `ember server`
* Visit your app at http://localhost:4200.

## Running Tests

* `npm test` (Runs `ember try:testall` to test your addon against multiple Ember versions)
* `ember test`
* `ember test --server`

## Building

* `ember build`

For more information on using ember-cli, visit [http://www.ember-cli.com/](http://www.ember-cli.com/).
