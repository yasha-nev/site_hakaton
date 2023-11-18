var main_str;

function funonload() {
    main_str = document.body.innerHTML
}

function deleteAllItems(){
    quaery = document.querySelectorAll('.item')
    for (var i = 0; i < quaery.length; i++){
        quaery[i].remove();
    }
}

window.onload = funonload;

function readServerString(url, callback) {
    var req = new XMLHttpRequest()
    req.onreadystatechange = function() {
        if (req.readyState === 4) {
            callback(undefined, req.responseText); 
        } else {
            callback(new Error(req.status)); 
        }
    } 

    req.open("POST", url, true);
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded; charset=utf-8");
    req.send();
}

function findOnpage(){
    var input = document.getElementById("myfilter").value
    var table = document.getElementById("items")
    document.body.innerHTML = main_str
    if (input.length < 3 || input == ' '){
        return
    }
    quaery = document.querySelectorAll(".item")
    let reg = new RegExp(input);
    for (var i = 0; i < quaery.length; i++) {
        var flag = false;
        for (var child of quaery[i].children){                    
            if (String(child.textContent).search(reg) >= 0){
                flag = true;
                break;
            }
        }
        if (!flag){
                quaery[i].style.cssText = 'display: none'
        }
    }
}

function callByCategoria(categoria){
    if (categoria == ""){
        return
    }
    deleteAllItems()

    var url = "/?categoria=" + categoria;
    readServerString(url, function(err, response){
        var items = document.getElementById("items")
        objs = JSON.parse(response);
        for (let i in objs) {
            addItem(items, objs[i], objs.length - 1 != i)
        }
        funonload()
    });
}

function call() {
    var input = document.getElementById("myInput").value
    if (input == ""){
        return
    }
    var val = "/?search=" + input
    
    readServerString(val, function(err, response) {
        if (!err) {
            var items = document.getElementById("items")
            objs = JSON.parse(response);
            for (let i in objs) {
                addItem(items, objs[i], objs.length - 1 != i)
            }
            funonload()
        }
    });
}

function addItem(items, obj, border){
    console.log(items, obj)
    var item = document.createElement('div')
    item.className = "item"
    item.style.cssText = 'margin-left: 10px; margin-right: 10px;display: flex;justify-content: space-between; align-items: center;' 
    //'display: flex; justify-content: space-around;'

    console.log(border)
    if (border){
        item.style.cssText += 'border-bottom: solid;'
    }
    var name = document.createElement('h4')
    var value = document.createElement('h4')
    var param = document.createElement('h4')
    name.textContent = obj.name;
    value.textContent = obj.value;
    param.textContent = obj.params;
    
    item.appendChild(name)
    item.appendChild(value)
    item.appendChild(param)
    items.appendChild(item)
}