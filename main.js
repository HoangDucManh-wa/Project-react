"use strict";
function check(a) {
  console.log(a);
  let arr = [];
  let arr1 = [];
  let l = 0;
  for (let i = 0; i < a.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (a[i] === arr[j]) {
        arr1.push(l);
        arr = [];
        l = 0;
      }
    }
    l++;
    arr.push(a[i]);
    console.log(arr);
    console.log(arr1);
  }
  arr1.push(l);
  let max = 0;
  for (let i = 0; i < arr1.length; i++) {
    if (arr1[i] > max) {
      max = arr1[i];
    }
  }
  return max;
}
console.log(check("duccmanh"));
