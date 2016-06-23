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

const fromNode = () => h('div', 'hello')
const toNode = () => h('div', 'hello')

suite.add('Simple nodiff isNodeEqual + morphdom', function () {
  const _fromNode = fromNode()
  const _toNode = toNode()
  if (!_fromNode.isEqualNode(_toNode)) {
    morphdom(_fromNode, _toNode)
  }
}).add('Simple nodiff morphdom', function () {
  morphdom(fromNode(), toNode())
}).on('cycle', function (event) {
  console.log(String(event.target))
}).on('complete', function () {
  console.log(`Fastest is ${this.filter('fastest').map('name')}`)
}).run({ async: true })

