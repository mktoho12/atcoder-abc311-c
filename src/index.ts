import { readFileSync } from 'fs'
import { findLoop } from './find-it'

const parse = (inputs: string) =>
  inputs
    .split(/\n/)?.[1]
    .split(/\s+/g)
    .map(n => parseInt(n))

const format = (nums: number[]) => {
  const output = nums.join(' ')
  return `${nums.length}\n${output}`
}

const inputs = readFileSync('/dev/stdin', 'utf8')
const input = parse(inputs)
const answer = findLoop(input)
const output = format(answer)

console.log(output)
