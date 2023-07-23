import { readFileSync } from 'fs'
import { findLoop } from './find-it'

const parse = (inputs: string) =>
  inputs
    .split(/\n/)?.[1]
    .split(/\s+/g)
    .map(n => parseInt(n))

const format = (nums: number[]) => `${nums.length}\n${nums.join(' ')}`

const input = readFileSync('/dev/stdin', 'utf8')
const nodes = parse(input)
const answer = findLoop(nodes)
const output = format(answer)

console.log(output)
