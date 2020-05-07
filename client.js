const POST_URL = 'http://localhost:3000/api/books';
const GET_URL = 'http://localhost:3000/api/books';

const form = document.getElementById('book-form');
const itemList = document.getElementById('books');
// var li = document.createElement('li');




form.addEventListener("submit", (e)=> {
    const formData = new FormData(form);
    const title = formData.get("title");
    const author = formData.get("author");
    const genre = formData.get("genre");
    const description = formData.get("description");
    const publisher = formData.get("publisher");
    const page = formData.get("page");

    const payload = {
        title,
        author,
        genre,
        description,
        publisher,
        page
    }

    fetch(POST_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: {
            'content-type': 'application/json'
        }
    })
    .then(getData());
    formData = '';
    
    e.preventDefault();
});

getData();
function getData(){

    const tbody = document.getElementById("book-list");
    tbody.innerHTML = '';

    fetch(GET_URL)
    .then((response) =>{
        return response.json();
    })
    .then((myJson) => {
        console.log(myJson.length);
        for(let i = 0; i<myJson.length; i++){
            var new_entry = document.createElement("tr");

            var title = document.createElement("td");
            title.id = "title";
            var title_node = document.createTextNode(myJson[i].title);
            // console.log(myJson[i].title)
            title.appendChild(title_node);
            new_entry.appendChild(title);

            var author = document.createElement("td");
            var author_node = document.createTextNode(myJson[i].author);
            author.appendChild(author_node);
            new_entry.appendChild(author);

            var genre = document.createElement("td");
            var genre_node = document.createTextNode(myJson[i].genre);
            genre.appendChild(genre_node);
            new_entry.appendChild(genre);

            var des = document.createElement("td");
            var des_node = document.createTextNode(myJson[i].description);
            des.appendChild(des_node);
            new_entry.appendChild(des);
            new_entry.id = i.toString();

            var pub = document.createElement("td");
            var pub_node = document.createTextNode(myJson[i].publisher);
            pub.appendChild(pub_node);
            new_entry.appendChild(pub);

            var pages = document.createElement("td");
            var pages_node = document.createTextNode(myJson[i].pages);
            pages.appendChild(pages_node);
            new_entry.appendChild(pages);

            var del = document.createElement("td");
            var del_btn = document.createElement("button");
            var btn_node = document.createTextNode("X");
            del_btn.id = "del-"+i.toString();
            del_btn.appendChild(btn_node);
            del.appendChild(del_btn);
            new_entry.appendChild(del);
            var table_row = document.getElementById('book-list');
            table_row.appendChild(new_entry);

            document.getElementById(`del-${i}`).addEventListener("click", (e) => {
                const td = e.target.parentElement;
                const tr = td.parentElement;
                const title = tr.firstElementChild.innerText;
                fetch(`GET_URL${title}`, {
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


