function sort(arr) {
    for(let i=0; i<arr.length; i++) {
        let l = i;
        for(let x=i;x<arr.length;x++) {
            if(arr[x] < arr[l]) {
                l = x;
            }
        }
        let e = arr[i];
        arr[i] = arr[l];
        arr[l] = e;
        console.log(arr);
    }
    return arr;
}

let m = new Map();

m.set("111111", 12);
m.set("222222", 5);
m.set("333333", 0);

let entries = Array.from(m.entries());
console.log(entries);