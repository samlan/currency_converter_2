import idb from 'idb';
import currenciesData from 'currencies.js'




function populateDropdown(currencies)
{
 
 var currencyFromSelect = document.getElementById('FromSelect');
 var currencyToSelect = document.getElementById('ToSelect');
 for(var i = 0; i <= currencies.length; i++)
 {
     
        var currency = currencies[i].currencyName;
        var currency_id = currencies[i].id;
        var el = document.createElement("option");
        var el2 = document.createElement("option");
        el.textContent = currency;
        el2.textContent = currency;
        el.value = currency_id;
        el2.value = currency_id;
        currencyFromSelect.appendChild(el);
        currencyToSelect.appendChild(el2);
    
    
 }

 
}  

function convert(){
var toConvert = [];
var from = document.getElementById('FromSelect');
var to = document.getElementById('ToSelect');
var amount = document.getElementById('amount').value;
if(amount)
{
    var fromIndex = from.selectedIndex;
    var fromVal = from.options[fromIndex].value;
    toConvert.push(fromVal);
    var toIndex = to.selectedIndex;
    var toVal = to.options[toIndex].value;
    toConvert.push(toVal);
    var searchFor = toConvert.join('_'); 
    return fetch(`https://free.currencyconverterapi.com/api/v5/convert?q=${searchFor}&compact=ultra`)
    .then(rate =>  rate.json())
    .then(json => amount * Object.values(json)[0])
    .then(displayRate); 
}

}

var dbPromise = idb.open('name_of_db',1,function(upgradeDb){
    
    var keyValStore = upgradeDb.createObjectStore('currencies',{keyPath:'id'});
    keyValStore.createIndex('currency','currencyName');



});
dbPromise.then(console.log('db created!'));
dbPromise.then((db)=>
{
  var tx = db.transaction('currencies','readwrite');
  var currencyStore = tx.objectStore('currencies');
  
  for(var currency_key in currenciesData){
      var currency_properties = currenciesData[currency_key];
      currencyStore.put(currency_properties);
  }
 
}).then(console.log('currency data entered'));

dbPromise.then((db) =>
{
  var index = db.transaction('currencies');
  var fullIndex = index.objectStore('currencies').index('currency');
  var listOfCurrencies = fullIndex.getAll();
  return listOfCurrencies
})
//.then(index => index.getAll())
.then(populateDropdown)
.then(console.log('dropdown populated'));
