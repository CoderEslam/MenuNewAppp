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
        console.log(arrayMenu);
        // to sort array by index of menu
        arrayMenu.sort((a, b) => a.index - b.index);
        getAllFood();
    });
}

function getAllFood() {
    onValue(Food, (snapshotFood) => {
        food = snapshotFood.val();
        for (let i = 0; i < arrayMenu.length; i++) {
            var div_parent = document.createElement('div');
            var img = document.createElement('img');
            div_parent.setAttribute('class', 'container');
            img.setAttribute('src', arrayMenu[i].image_bg);
            var div_centered = document.createElement('div');
            div_centered.setAttribute('class', 'centered');
            if (arrayMenu[i].name === 'PÂTES') {
                div_centered.style.marginTop = '650px';
            }
            div_parent.append(div_centered)
            div_parent.append(img)
            for (let j in food) {
                if (food[j].classification !== "VIP") {
                    if (arrayMenu[i].id === food[j].idMenu) {
                        var spanName = document.createElement('span')
                        spanName.setAttribute('class', 'nameSpan')
                        var spanDot = document.createElement('span')
                        spanDot.setAttribute('class', 'dots');
                        var spanPrice = document.createElement('span')
                        var _div_ = document.createElement('div')
                        spanName.innerHTML = food[j].name + " : ......................................"
                        if (arrayMenu[i].name.toUpperCase() === 'PÂTES' || arrayMenu[i].name.toUpperCase() === 'PATES') {
                            spanName.innerHTML = food[j].name + '&ensp;' + ':......................................'
                            spanDot.style.width = '450px'
                            spanDot.style.maxWidth = '450px'
                            if (food[j].details.length > 0) {
                                spanDot.innerHTML = food[j].details + '.................................................................................. '
                            } else {
                                spanDot.innerHTML = '.................................................................................. '
                            }
                        } else {
                            spanDot.innerHTML = '.................................................. '
                        }
                        // for all
                        if (food[j].priceSmall !== 0 && food[j].priceMedium !== 0 && food[j].priceLarge !== 0) {
                            spanPrice.innerHTML = food[j].priceSmall + "<span><sup>S</sup>&ensp;&ensp;</span>" + food[j].priceMedium + "<span><sup>M</sup>&ensp;&ensp;</span>" + food[j].priceLarge + "<span><sup>L</sup>&ensp;&ensp;</span>"
                        }
                        // for small only
                        else if (food[j].priceSmall !== 0 && (food[j].priceMedium === 0 || food[j].priceMedium === 'undefined') && (food[j].priceLarge === 0 || food[j].priceLarge === 'undefined')) {
                            spanPrice.innerHTML = food[j].priceSmall + "<span><sup>Dh</sup</span>";
                        }
                        // for small and medium
                        else if (food[j].priceSmall !== 0 && (food[j].priceMedium !== 0 && food[j].priceMedium !== 'undefined') && (food[j].priceLarge === 0 || food[j].priceLarge === 'undefined')) {
                            spanPrice.innerHTML = food[j].priceSmall + "<span><sup>S</sup>&ensp;&ensp;</span>" + food[j].priceMedium + "<span><sup>M</sup>&ensp;&ensp;</span>" + '--' + "<span><sup>L</sup>&ensp;&ensp;</span>"
                        }
                        // for small and large
                        else if (food[j].priceSmall !== 0 && (food[j].priceMedium === 0 || food[j].priceMedium === 'undefined') && (food[j].priceLarge !== 0 && food[j].priceLarge !== 'undefined')) {
                            spanPrice.innerHTML = food[j].priceSmall + "<span><sup>S</sup>&ensp;&ensp;</span>" + '--' + "<span><sup>M</sup>&ensp;&ensp;</span>" + food[j].priceLarge + "<span><sup>L</sup>&ensp;&ensp;</span>"
                        }
                        div_centered.append(spanName);
                        div_centered.append(spanDot);
                        div_centered.append(spanPrice);
                        div_centered.append(_div_);
                        document.getElementById('parent').append(div_parent);
                    }
                }
            }
        }


    });
}

