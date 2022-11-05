const getdata = () => {
    return new Promise((reslove) => {
        setTimeout( () => {
            reslove({a:1});
        },2000)
    })
}

// getdata().then( res => console.log(res));

async function main () {
    a = await getdata();
    console.log(a);
}
main();