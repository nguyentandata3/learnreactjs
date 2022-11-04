const APIUSER = 'https://jsonplaceholder.typicode.com/users';
// axios.get(APIUSER);
async function data() {
    showdata = await axios.get(APIUSER);
    showdata = showdata.data;
    arr = showdata.map((item) => {
        console.log( `<li id = ${item.id}> ${item.name} </li>`);
        return `<li id = ${item.id}> ${item.name} </li>`;
    });
    return arr;
}
const output = data().then(function (a) {
    console.log(a);
});
document.getElementById('root').innerHTML = output;