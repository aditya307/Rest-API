const L_URL = 'http://localhost:3000/api/genres';

const form = document.getElementById('genre-form');

form.addEventListener("submit",(e)=> {
    const formData = new FormData(form);
    const name = formData.get("name");

    const payload = {
        name : name
    }

    fetch(L_URL, {
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
            'content-type': 'application/json'
        }
    });
    e.preventDefault();
});

fetch(L_URL)
.then((response)=> {
    return response.json();
})
.then((myJson) => {
    console.log(myJson.length);
    for(let i =0; i<myJson.length; i++ ){
        var  new_entry = document.createElement("tr");

        var name = document.createElement("td");
        name.id = "name";
        var name_node = document.createTextNode(myJson[i].name);
        name.appendChild(name_node);
        new_entry.appendChild(name);

        var date = document.createElement("td");
        date.id = "date";
        var date_node = document.createTextNode(myJson[i].create_date);
        date.appendChild(date_node);
        new_entry.appendChild(date);
        

        var table_row = document.getElementById('genre-list');
        table_row.appendChild(new_entry);
    }
})