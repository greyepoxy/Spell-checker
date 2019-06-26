import test from 'ava';
import { HashMap } from '../src/hashMap';

test('should be able to add value to hash map and then look it up', t => {
  const hashMap = HashMap.fromArray([5], value => value.toString());
  t.deepEqual(hashMap.getBinForHashOfValue(5), [5]);
});

test('should return a bin of one value when items added have different hashes', t => {
  const hashMap = HashMap.fromArray([5, 10, 15], value => value.toString());
  t.deepEqual(hashMap.getBinForHashOfValue(5), [5]);
  t.deepEqual(hashMap.getBinForHashOfValue(10), [10]);
  t.deepEqual(hashMap.getBinForHashOfValue(15), [15]);
});

test('should return empty array when no items match item hash', t => {
  const hashMap = HashMap.fromArray([5, 10, 15], value => value.toString());
  t.deepEqual(hashMap.getBinForHashOfValue(-1), []);
});

test('should return multiple items if hashes match', t => {
  const hashMap = HashMap.fromArray([5, 10, 15], _ => '');
  t.deepEqual(hashMap.getBinForHashOfValue(5), [5, 10, 15]);
});
