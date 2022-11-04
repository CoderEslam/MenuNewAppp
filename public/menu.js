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
            arrayMenu[c] = {
                id: menu[i].id,
                name: menu[i].name,
                image: menu[i].image,
                index: menu[i].index,
                image_bg: menu[i].image_bg
            }
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
            var div = document.createElement("div");
            div.style.backgroundImage = 'url(image/bye.jpeg)' /*new URL(arrayMenu[i].image_bg).href*/;
            div.style.width = '100%'
            div.style.marginTop = '230px'
            // table.setAttribute('background', new URL(arrayMenu[i].image_bg).href);
            for (let j in food) {
                if (food[j].classification !== "VIP") {
                    if (arrayMenu[i].id === food[j].idMenu) {
                        var div_row = document.createElement("div");
                        var nameSpan = document.createElement("span");
                        var _dots_Span = document.createElement("span");
                        var priceSpan = document.createElement("span");
                        nameSpan.innerHTML = food[j].name;
                        _dots_Span.innerHTML = "..................................................................";
                        ////////////////////////////////////Price//////////////////////////////////////////
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
                            priceSpan.appendChild(tablePrice)
                            // price.innerHTML = food[j].priceSmall + "" + "<sup>S</sup>" + "    " + food[j].priceMedium + "" + "<sup>M</sup>" + "    " + food[j].priceLarge + "" + "<sup>L</sup>";
                        }
                        // for no one done
                        else if (typeof food[j].priceSmall === 'undefined' && typeof food[j].priceMedium === 'undefined' && typeof food[j].priceLarge === 'undefined') {
                            priceSpan.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
                        }
                        // for no one done
                        else if ((food[j].priceSmall === 0 || typeof food[j].priceSmall === 'undefined') && (typeof food[j].priceMedium === 'undefined' || food[j].priceMedium === 0) && (typeof food[j].priceLarge === 'undefined' || food[j].priceLarge === 0)) {
                            priceSpan.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
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
                            priceSpan.appendChild(tablePrice)
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
                            priceSpan.appendChild(tablePrice)
                        } else if ((food[j].priceSmall !== 0 && typeof food[j].priceSmall !== 'undefined') && (food[j].priceMedium === 0 || typeof food[j].priceMedium === 'undefined') && (food[j].priceLarge === 0 || typeof food[j].priceLarge === 'undefined')) {
                            priceSpan.innerHTML = food[j].priceSmall + " " + "<sup>Dh</sup>";
                        } else if ((food[j].priceSmall === 0 || typeof food[j].priceSmall === 'undefined') && (food[j].priceMedium === 0 || typeof food[j].priceMedium === 'undefined') && (food[j].priceLarge === 0 || typeof food[j].priceLarge === 'undefined')) {
                            priceSpan.innerHTML = "there is no money" + " " + "<sup>Dh</sup>";
                        }
                        ////////////////////////////////////Price//////////////////////////////////////////
                        div_row.appendChild(nameSpan);
                        div_row.appendChild(_dots_Span);
                        div_row.appendChild(priceSpan);
                        div.appendChild(div_row);
                        // table_div.appendChild(div)
                        document.getElementById('table_div').appendChild(div);
                    }
                }

            }
        }

    });
}

