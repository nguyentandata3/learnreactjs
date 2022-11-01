const array = [1,2,3,4];
const total = arr => {
    let tong = 0;
    arr.map((item) => {
        tong += item;
    });
    return tong;
}
console.log(total(array));

//Bài tập sử dụng map
const array2 = [
    {id:"1", name:"apple", type:"a" },
    {id:"2", name:"banana", type:"a" },
    {id:"3", name:"orange", type:"b" },
    {id:"4", name:"apple", type:"b" },
];
const output = arr2 => {
    newarr = arr2.map((item) => { 
        return `<li id=${item.id}>${item.name}</li>`;
    });
    return newarr;
};
console.log(output(array2));

//Bài tạp sử dụng filter
const output_type = (arr, type) => {
    newarr = arr.filter(function (item) {
        if(type == item.type) {
            return `<li id=${item.id}>${item.name}</li>`;
        }
    });
    newarr = newarr.map((item) => {
        return `<li id=${item.id}>${item.name}</li>`;
    });
    return newarr;
}
console.log(output_type(array2, 'a'));

//bai tap test
const array3 = [1,2,3,4,5,6,7];
const output2 = (arr) => {
    return arr.map((item) => {
        return (item + 2);
    });
}
console.log(output2(array3));