
const API_ENDPOINT = 'https://jsonplaceholder.typicode.com/users';


const main = async () => {
    try {
        const data = await axios.get(API_ENDPOINT)
        render(data.data)
        
    } catch (error) {
        console.error(error)
    }
}

const render = users => {
    const tableEl = document.createElement('table')
    const headerElString = `<tr>
              <th>ID</th>
              <th>Name</th>
              <th>Phone</th>
              <th>Action</th>
             </tr>`
    tableEl.innerHTML = headerElString


    users.forEach(u => {
        const rowEl = document.createElement('tr')

        const dataString = `
            <td>${u.id}</td>
            <td>
                <span>${u.name}</span>
                <input class='hidden' name='name' value='${u.name}'/>
            </td>
            <td>
                <span>${u.phone}</span>
                <input class='hidden' name='phone' value='${u.phone}'/>
            </td>
        `
        rowEl.innerHTML = dataString


        // handle delete button
        const actionEl = document.createElement('td')
        const deleteBtnEl = document.createElement('button')
        deleteBtnEl.innerText = "Delete"
        deleteBtnEl.style.color = 'blue'

        deleteBtnEl.onclick = () => rowEl.remove()
        
        const editBtnEl = document.createElement('button')
        editBtnEl.innerText = 'Edit'
        editBtnEl.style.color = 'red'

        actionEl.appendChild(deleteBtnEl)
        actionEl.appendChild(editBtnEl)

            editBtnEl.onclick = () => {
                if ( editBtnEl.innerText == 'Edit') {
                    const inputEls = rowEl.querySelectorAll('input')
                    const spanEls = rowEl.querySelectorAll('span')
                    spanEls.forEach(el => el.classList.toggle('hidden'))
                    inputEls.forEach(el => el.classList.toggle('hidden'))
                    editBtnEl.style.color = 'green'
                    editBtnEl.innerText = 'Save'
                }
                else {
                    const inputEls = rowEl.querySelectorAll('input')
                    const spanEls = rowEl.querySelectorAll('span')
                    spanEls.forEach(el => el.classList.toggle('hidden'))
                    inputEls.forEach(el => {
                        el.classList.toggle('hidden');
                        valueName = document.querySelector('input[name="name"]').value;
                        valuePhone = document.querySelector('input[name=phone]').value;
                    })
                    spanEls[0].innerText = valueName;
                    spanEls[1].innerText = valuePhone;
                    console.log(spanEls);
                    editBtnEl.style.color = 'red'
                    editBtnEl.innerText = 'Edit'
                }
        }




        rowEl.appendChild(actionEl)
        
        tableEl.appendChild(rowEl)
    });

    document.querySelector('#root').appendChild(tableEl)
}
main()
