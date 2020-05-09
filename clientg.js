const L_URL = 'http://localhost:3000/api/genres';

const form = document.getElementById('genre-form');

form.addEventListener("submit",(e)=> {
    const formData = new FormData(form);
    const name = formData.get("name");

    const payload = {
        name
    }

    fetch(L_URL, {
        method:'POST',
        body:JSON.stringify(payload),
        headers:{
            'content-type': 'application/json'
        }
    });
    e.preventDefault();
    formData = '';

    e.preventDefault();
});

getData();
function getData(){

    const tbody = document.getElementById("genre-d");
    tbody.innerHTML = '';


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
            new_entry.id = i.toString();

            var date = document.createElement("td");
            date.id = "date";
            var date_node = document.createTextNode(myJson[i].create_date);
            date.appendChild(date_node);
            new_entry.appendChild(date);
            
            var del = document.createElement("td");
            var del_btn = document.createElement("button");
            var btn_node = document.createTextNode("X");
            del_btn.id = "del-"+i.toString();
            del_btn.appendChild(btn_node);
            del.appendChild(del_btn);
            new_entry.appendChild(del);
            var table_row = document.getElementById('genre-d');
            table_row.appendChild(new_entry);

            document.getElementById(`del-${i}`).addEventListener("click", (e) => {
                const td = e.target.parentElement;
                const tr = td.parentElement;;
                const name = tr.firstElementChild.innerText;
                fetch(`L_URL${name}`, {
                    method: "DELETE",
                    headers: {
                        'content-type': 'application/json'
                    }
                })
                .then(res => console.log(res));
                tr.remove();
            });

        };
    });

}