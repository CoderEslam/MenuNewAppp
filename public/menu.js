import {initializeApp} from "https://www.gstatic.com/firebasejs/9.6.6/firebase-app.js";
import {
    getDatabase,
    ref,
    set,
    onValue,
    get,
    child,
    query,
    orderByChild,
    onChildAdded,
    onChildChanged,
    onChildRemoved,
    limitToLast
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
var Menu = query(ref(databaseref, 'Menu'), orderByChild('index'));
var Food = ref(databaseref, 'Food')

var menu;
var food;
var arrayMenu = [];
gerAllMenus();

function gerAllMenus() {
    onValue(Menu, (snapshot) => {
        menu = snapshot.val();
        var c = 0;
        for (let i in menu) {
            arrayMenu[c] = {"id": menu[i].id, "name": menu[i].name, image: menu[i].image, index: menu[i].index}
            c++;
        }
        // to sort array by index of menu
        arrayMenu.sort((a, b) => a.index - b.index);
        getAllFood();
    });
}

function getAllFood() {
    onValue(Food, (snapshotFood) => {
        food = snapshotFood.val();
        for (let i = 0; i < arrayMenu.length; i++) {
            var h1 = document.createElement("h1");
            h1.innerHTML = arrayMenu[i].name;
            var table_div = document.getElementById("table_div");
            table_div.appendChild(h1);
            var bottom_r = document.getElementById("bottom-r");
            // bottom_r.setAttribute('src', arrayMenu[i].image);
            // var top_l = document.getElementById("top-l");
            // top_l.setAttribute('src', arrayMenu[i].image);
            var table = document.createElement("table");
            // table.setAttribute('background', 'image/bg2.jpg')
            var nameth = document.createElement("th");
            nameth.innerHTML = "Name"
            var decth = document.createElement("th");
            decth.innerHTML = "Details"
            var priceth = document.createElement("th");
            priceth.innerHTML = "Price"
            var imageth = document.createElement("th");
            imageth.innerHTML = "Image"
            table.appendChild(nameth);
            table.appendChild(decth);
            table.appendChild(priceth);
            table.appendChild(imageth);

            for (let j in food) {
                /*var childKeyFood = foodSnapshot.key;
                var childDataFood = foodSnapshot.val();
                var td = document.createElement("td");
                var cellText = document.createTextNode(childDataFood.name);
                td.appendChild(cellText);
                tr.appendChild(td);*/
                if (food[j].classification !== "VIP") {
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
                            summary.innerHTML = food[j].details.substring(0, 10) + "...";
                            p.innerHTML = food[j].details;
                            details.appendChild(SummaryDetails);
                        } else {
                            details.innerHTML = food[j].details;
                        }
                        var tdimg = document.createElement("td");
                        var price = document.createElement("td");
                        console.log(typeof food[j].priceSmall === 'undefined');
                        var tablePrice = document.createElement("table");
                        tablePrice.setAttribute('class', 'tablePrice');
                        var small = document.createElement("th");
                        small.setAttribute('class', 'thPrice');
                        small.innerHTML = "Small"
                        var Medium = document.createElement("th");
                        Medium.setAttribute('class', 'thPrice');
                        Medium.innerHTML = "Medium"
                        var Large = document.createElement("th");
                        Large.setAttribute('class', 'thPrice');
                        Large.innerHTML = "Large"
                        tablePrice.appendChild(small);
                        tablePrice.appendChild(Medium);
                        tablePrice.appendChild(Large);
                        var trPrice = document.createElement("tr");
                        var nameSmall = document.createElement("td");
                        nameSmall.setAttribute('class', 'tdPrice');
                        var nameMedium = document.createElement("td");
                        nameMedium.setAttribute('class', 'tdPrice');
                        var nameLarge = document.createElement("td");
                        nameLarge.setAttribute('class', 'tdPrice');

                        // for all
                        if ((food[j].priceSmall !== 0 && typeof food[j].priceSmall !== 'undefined') && (food[j].priceMedium !== 0 && typeof food[j].priceMedium !== 'undefined') && (food[j].priceLarge !== 0 && typeof food[j].priceLarge !== 'undefined')) {
                            nameSmall.innerHTML = food[j].priceSmall;
                            nameMedium.innerHTML = food[j].priceMedium;
                            nameLarge.innerHTML = food[j].priceLarge;
                            trPrice.appendChild(nameSmall);
                            trPrice.appendChild(nameMedium);
                            trPrice.appendChild(nameLarge);
                            tablePrice.appendChild(trPrice);
                            price.appendChild(tablePrice)
                            // price.innerHTML = food[j].priceSmall + "" + "<sup>S</sup>" + "    " + food[j].priceMedium + "" + "<sup>M</sup>" + "    " + food[j].priceLarge + "" + "<sup>L</sup>";
                        }
                        // for no one done
                        else if (typeof food[j].priceSmall === 'undefined' && typeof food[j].priceMedium === 'undefined' && typeof food[j].priceLarge === 'undefined') {
                            price.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
                        }
                        // for no one done
                        else if ((food[j].priceSmall === 0 || typeof food[j].priceSmall === 'undefined') && (typeof food[j].priceMedium === 'undefined' || food[j].priceMedium === 0) && (typeof food[j].priceLarge === 'undefined' || food[j].priceLarge === 0)) {
                            price.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
                        }
                        // for small and Medium
                        else if ((food[j].priceSmall !== 0 && typeof food[j].priceSmall !== 'undefined') && (food[j].priceMedium !== 0 && typeof food[j].priceMedium !== 'undefined') && (typeof food[j].priceLarge === 'undefined' || food[j].priceLarge === 0)) {
                            nameSmall.innerHTML = food[j].priceSmall;
                            nameMedium.innerHTML = food[j].priceMedium;
                            nameLarge.innerHTML = "--";
                            trPrice.appendChild(nameSmall);
                            trPrice.appendChild(nameMedium);
                            trPrice.appendChild(nameLarge);
                            tablePrice.appendChild(trPrice);
                            price.appendChild(tablePrice)
                        }
                        // for small and Large
                        else if ((food[j].priceSmall !== 0 && typeof food[j].priceSmall !== 'undefined') && (food[j].priceLarge !== 0 && typeof food[j].priceLarge !== 'undefined') && (typeof food[j].priceMedium === 'undefined' || food[j].priceMedium === 0)) {
                            nameSmall.innerHTML = food[j].priceSmall;
                            nameMedium.innerHTML = "--";
                            nameLarge.innerHTML = food[j].priceLarge;
                            trPrice.appendChild(nameSmall);
                            trPrice.appendChild(nameMedium);
                            trPrice.appendChild(nameLarge);
                            tablePrice.appendChild(trPrice);
                            price.appendChild(tablePrice)
                        } else if ((food[j].priceSmall !== 0 && typeof food[j].priceSmall !== 'undefined') && (food[j].priceMedium === 0 || typeof food[j].priceMedium === 'undefined') && (food[j].priceLarge === 0 || typeof food[j].priceLarge === 'undefined')) {
                            price.innerHTML = food[j].priceSmall + " " + "<sup>Dh</sup>";
                        } else if ((food[j].priceSmall === 0 || typeof food[j].priceSmall === 'undefined') && (food[j].priceMedium === 0 || typeof food[j].priceMedium === 'undefined') && (food[j].priceLarge === 0 || typeof food[j].priceLarge === 'undefined')) {
                            price.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
                        }


                        var img = document.createElement("img");
                        img.setAttribute('src', food[j].image);
                        tr.appendChild(name);
                        tr.appendChild(details);
                        tr.appendChild(price);
                        tr.appendChild(tdimg);
                        tdimg.appendChild(img)
                        table.appendChild(tr);
                        table_div.appendChild(table)
                        // console.log(menu[i].name + " => " + food[j].name);
                    }
                }

            }
        }

    });
}


/*const commentsRef = query(ref(databaseref, 'Menu'), orderByChild('index'))
onChildAdded(commentsRef, (data) => {
    // var c = 0;
    // for (let i in menu) {
    // arrayMenu[data.val().id] = {"id": data.val().id, "name": data.val().name}
    // c++;
    // console.log(arrayMenu)
    // }
    // getAllFood();
});

onChildChanged(commentsRef, (data) => {
    console.log(data.val());
});

onChildRemoved(commentsRef, (data) => {
    console.log(data.val());
});*/
