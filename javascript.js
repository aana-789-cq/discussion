const subm = document.getElementById("sub1");
const gcntnt = document.getElementById("content");
const uetxt = document.getElementById("quetxt");
const qtxt = document.getElementById("tex");
const bt = document.getElementById("newq");
const btd = document.getElementById("portal");
const unique = document.getElementById("txt");
const res = document.getElementById("response");
const sub2 = document.getElementById("sub2");
const resl = document.getElementById("resl");
const qres = document.getElementById("qres");
const qcmnt = document.getElementById("qcmnt");

let id = JSON.parse(localStorage.getItem("id")) || 0;
let arr = [];
let responses = JSON.parse(localStorage.getItem("data2")) || [];

bt.addEventListener("click", function() {
    btd.style.visibility = "visible";
});

subm.addEventListener("click", function() {
    const creat = document.createElement("div");
    
    if (uetxt.value === "" || qtxt.value === "") {
        alert("Write again");
    } else {
        const txt = document.createElement("h2");
        txt.setAttribute("id", "kk");
        txt.style.fontSize = "25px";
        txt.innerHTML = qtxt.value;

        const questxt = document.createElement("p");
        questxt.setAttribute("id", "kkk");
        questxt.innerHTML = uetxt.value;
        
        let obj = {
            sub: qtxt.value,
            question: uetxt.value,
            id: id,
            responses: [],
        };
        
        creat.setAttribute("id", id);
        id++;
        arr.push(obj);
        localStorage.setItem("id", id);
        localStorage.setItem("data1", JSON.stringify(arr));

        creat.appendChild(txt);
        creat.appendChild(questxt);
        gcntnt.appendChild(creat);

        // Clear input fields
        uetxt.value = "";
        qtxt.value = "";
    }
});

gcntnt.addEventListener("click", function(event) {
    if (event.target.tagName === "H2" || event.target.tagName === "P") {
        res.style.display = "block";
        btd.style.display = "none";

        const ser = event.target.parentNode.id;
        const index = arr.findIndex((element) => element.id == ser);

        if (index !== -1) {
            const question = arr[index];
            const heading = document.getElementById("hd");
            const para = document.getElementById("pr");
            const resl = document.getElementById("resl");

            heading.innerHTML = question.sub;
            para.innerHTML = question.question;
            
            // Clear previous responses
            resl.innerHTML = "";
            question.responses.forEach(response => {
                const rhd = document.createElement("h2");
                const rpr = document.createElement("p");
                rhd.innerHTML = response.name;
                rpr.innerHTML = response.comment;
                resl.appendChild(rhd);
                resl.appendChild(rpr);
            });
        }
    }
});

const resolvebtn = document.getElementById("resolve-btn");
resolvebtn.addEventListener("click", function() {
    resolvefunction();
});

function resolvefunction() {
    const ser = document.getElementById("hd").innerText;
    const idToDelete = arr.find(item => item.sub === ser).id;
    
    if (idToDelete !== undefined) {
        arr = arr.filter(item => item.id != idToDelete);
        localStorage.setItem("data1", JSON.stringify(arr));
        
        // Clear responses
        responses = responses.filter(response => response.questionId != idToDelete);
        localStorage.setItem("data2", JSON.stringify(responses));
        
        // Reload the page to reflect changes
        location.reload();
    }
}

sub2.addEventListener("click", function() {
    if (qres.value !== "" && qcmnt.value !== "") {
        const heading = document.getElementById("hd").innerText;
        const questionIndex = arr.findIndex(item => item.sub === heading);
        
        if (questionIndex !== -1) {
            const response = {
                name: qres.value,
                comment: qcmnt.value,
                questionId: arr[questionIndex].id
            };

            arr[questionIndex].responses.push(response);
            localStorage.setItem("data1", JSON.stringify(arr));
            
            responses.push(response);
            localStorage.setItem("data2", JSON.stringify(responses));
            
            const rhd = document.createElement("h2");
            const rpr = document.createElement("p");
            rhd.innerHTML = response.name;
            rpr.innerHTML = response.comment;
            resl.appendChild(rhd);
            resl.appendChild(rpr);
            
            qres.value = "";
            qcmnt.value = "";
        }
    }
});

window.onload = function() {
    arr = JSON.parse(localStorage.getItem("data1")) || [];
    arr.forEach((element) => {
        const creat = document.createElement("div");
        creat.setAttribute("id", element.id);
        const txt = document.createElement("h2");
        txt.setAttribute("id", "kk");
        txt.style.fontSize = "25px";
        txt.innerHTML = element.sub;
        const questxt = document.createElement("p");
        questxt.setAttribute("id", "kkk");
        questxt.innerHTML = element.question;
        creat.appendChild(txt);
        creat.appendChild(questxt);
        gcntnt.appendChild(creat);
    });
}