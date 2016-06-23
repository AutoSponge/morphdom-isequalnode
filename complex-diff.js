import morphdom from 'morphdom'
import h from 'hyperscript'
import _ from 'lodash'
import 'platform'
import Benchmark from 'benchmark'
import window from 'global/window'
import process from 'global/process'

let benchmark

if (typeof window !== 'undefined') {
  benchmark = Benchmark.runInContext({_, process});
  window.Benchmark = benchmark;
}

const suite = new benchmark.Suite()

const fromNode = () => h('div#page',
  h('div#header',
    h('h1.classy', 'h')),
  h('div#menu', { style: { float: 'left', width: '200px' } },
    h('ul',
      h('li', 'one'),
      h('li', 'two'),
      h('li', 'three'))),
  h('div#content', {style: {float: 'left'} },
    h('h2', 'content title'),
    h('p',
      'so it\'s just like a templating engine,\n',
      'but easy to use inline with javascript\n'),
    h('p',
      'the intension is for this to be used to create\n',
      'reusable, interactive html widgets.')))

const toNode = () => h('div#page',
  h('div#header',
    h('h1.classy', 'h')),
  h('div#menu', { style: { float: 'left', width: '200px' } },
    h('ul',
      h('li', 'one'),
      h('li', 'two'),
      h('li', 'three'))),
  h('div#content', {style: {float: 'right'} },
    h('h2', 'content title'),
    h('p',
      'so it\'s just like a templating engine,\n',
      'but easy to use inline with javascript\n'),
    h('p',
      'the intension is for this to be used to create\n',
      'reusable, interactive html widgets. ')))

suite.add('Complex diff isNodeEqual + morphdom', function () {
  const _fromNode = fromNode()
  const _toNode = toNode()
  if (!_fromNode.isEqualNode(_toNode)) {
    morphdom(_fromNode, _toNode)
  }
}).add('Complex diff morphdom', function () {
  morphdom(fromNode(), toNode())
}).on('cycle', function (event) {
  console.log(String(event.target))
}).on('complete', function () {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`)
}).run({ async: true })

