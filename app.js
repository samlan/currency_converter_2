
/*function IndexController(container)
{
    this._registerServiceWorker();
}

IndexController.prototype._registerServiceWorker = function(){
    navigator.serviceWorker.register('./sw.js')
    .then(()=>{console.log('Service Worker Registered!!!');})
    .catch(()=>{console.log('registration failed!');});
};
*/
navigator.serviceWorker.register('/service-worker.js')
.then((registration)=>{console.log('Service Worker Registered',registration)})
.catch((registration)=>{console.log('registration failed!',registration)});

function populateDropdown(currencies)
{
 
 let currencyFromSelect = document.getElementById("from");
 let currencyToSelect = document.getElementById("to");
 for(let i = 0; i <= currencies.length; i++)
 {
     
        let currency = currencies[i].currencyName;
        let currency_id = currencies[i].id;
        let el = document.createElement("option");
        let el2 = document.createElement("option");
        el.textContent = currency;
        el2.textContent = currency;
        el.value = currency_id;
        el2.value = currency_id;
        currencyFromSelect.appendChild(el);
        currencyToSelect.appendChild(el2);
    
    }
}  

function convert(){
let toConvert = [];
let from = document.getElementById("from");
let to = document.getElementById("to");
let amount = document.getElementById("amount").value;
if(amount)
{
    let fromIndex = from.selectedIndex;
    let fromVal = from.options[fromIndex].value;
    toConvert.push(fromVal);
    let toIndex = to.selectedIndex;
    let toVal = to.options[toIndex].value;
    toConvert.push(toVal);
    let searchFor = toConvert.join('_'); 
    return fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${searchFor}&compact=ultra`)
    .then(rate =>  rate.json())
    //.then(console.log)
    .then(json => amount * Object.values(json)[0])
    //.then(console.log)
    .then(displayRate); 
}


}

function displayRate(answer){
    //let ans = JSON.stringify(answer);
    let area = document.getElementById('display');
    let el = document.createElement('h1');
    areae.innerHTML = "";
    el.textContent = answer;
    area.appendChild(el);
    console.log(answer);
}

var dbPromise = idb.open("name_of_db",1,function(upgradeDb){
    
    var keyValStore = upgradeDb.createObjectStore("currencies",{keyPath:'id'});
    keyValStore.createIndex("currency","currencyName");



});
dbPromise.then(console.log("db created!"));
dbPromise.then((db)=>
{
  var tx = db.transaction("currencies","readwrite");
  var currencyStore = tx.objectStore("currencies");
  
  for(var currency_key in currenciesData){
      var currency_properties = currenciesData[currency_key];
      currencyStore.put(currency_properties);
  }
 
}).then(console.log("currency data entered"));

dbPromise.then((db) =>
{
  var index = db.transaction("currencies");
  var fullIndex = index.objectStore("currencies").index("currency");
  var listOfCurrencies = fullIndex.getAll();
  return listOfCurrencies
})
//.then(index => index.getAll())
.then(populateDropdown)
.then(console.log("dropdown populated"));
