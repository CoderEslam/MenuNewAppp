import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase, ref, set, onValue, get, child, query
} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyCOfDEZ53HCsYGncgrKKKjh4GUKBNOlhZU",
    authDomain: "menuapp-a9ad6.firebaseapp.com",
    databaseURL: "https://menuapp-a9ad6-default-rtdb.firebaseio.com",
    projectId: "menuapp-a9ad6",
    storageBucket: "menuapp-a9ad6.appspot.com",
    messagingSenderId: "996949732005",
    appId: "1:996949732005:web:f8e2dcd5ad261d9a49fb4c",
    measurementId: "G-B5519WKM3F"
};

const app = initializeApp(firebaseConfig);
var databaseref = getDatabase(app);
var Menu = ref(databaseref, 'Menu')
var Food = ref(databaseref, 'Food')

var divTable = document.getElementById("table");
var table = document.createElement("table");
var menu;
var food;
var arrayMenu = [];
var arrayFood = [];
gerAllMenus();

function gerAllMenus() {
    onValue(Menu, (snapshot) => {
        menu = snapshot.val();
        var c = 0;
        for (let i in menu) {
            arrayMenu[c] = {"id": menu[i].id, "name": menu[i].name}
            c++;
            console.log(arrayMenu);
        }
        getAllFood();
    });
}

function getAllFood() {
    onValue(Food, (snapshotFood) => {
        food = snapshotFood.val();
        for (let i = 0; i < arrayMenu.length; i++) {
            var h1 = document.createElement("h1");
            h1.innerHTML = arrayMenu[i].name;
            document.getElementById("table").appendChild(h1)
            var table = document.createElement("table");
            for (let j in food) {
                /*var childKeyFood = foodSnapshot.key;
                var childDataFood = foodSnapshot.val();
                var td = document.createElement("td");
                var cellText = document.createTextNode(childDataFood.name);
                td.appendChild(cellText);
                tr.appendChild(td);*/
                if (arrayMenu[i].id === food[j].idMenu) {
                    var tr = document.createElement("tr");
                    var name = document.createElement("td");
                    name.innerHTML = food[j].name;
                    var details = document.createElement("td");
                    // details.innerHTML = food[j].details;
                    if (food[j].details.length > 20) {
                        var SummaryDetails = document.createElement("details");
                        var summary = document.createElement("summary");
                        var p = document.createElement("p");
                        SummaryDetails.appendChild(summary);
                        SummaryDetails.appendChild(p);
                        summary.innerHTML = food[j].details.substring(0, 15)+"...";
                        p.innerHTML = food[j].details;
                        details.appendChild(SummaryDetails);
                    } else {
                        details.innerHTML = food[j].details;
                    }
                    var tdimg = document.createElement("td");
                    var price = document.createElement("td");
                    price.innerHTML = food[j].price + " " + "<sup>€</sup>";
                    var img = document.createElement("img");
                    img.setAttribute('src', food[j].image);
                    tr.appendChild(name);
                    tr.appendChild(details);
                    tr.appendChild(price);
                    tr.appendChild(tdimg);
                    tdimg.appendChild(img)
                    table.appendChild(tr);
                    document.getElementById("table").appendChild(table)
                    // console.log(menu[i].name + " => " + food[j].name);
                }
            }
        }

    });
}
