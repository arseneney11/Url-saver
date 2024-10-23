let myLeads = [];
const inputEl = document.querySelector('#input-el');
const ulEl = document.getElementById('ul-el');


const inputBtn = document.getElementById('input-btn');

const deleteBtn = document.getElementById('delete-btn');
const leadFromLocalStorage = JSON.parse(localStorage.getItem("myLeads"));

const tabBtn = document.getElementById('save-tab');

if(leadFromLocalStorage){
    myLeads = leadFromLocalStorage;
    render(myLeads);
}

tabBtn.addEventListener("click", function(){
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        myLeads.push(tabs[0].url);
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
        
    })
});


function render(Leads){
    let listItems = "";
    for(let i = 0;i < myLeads.length; i ++){
        listItems += `
        <li>
            <a target='_blank' href='${Leads[i]}'>
                ${Leads[i]}
            </a>
        </li> `
        
        /*const li = document.createElement("li");
        li.textContent = myLeads[i];
        ulEl.append(li);*/
    }
        ulEl.innerHTML = listItems;
   
}


inputBtn.addEventListener("click", function(){
    myLeads.push(inputEl.value);
    inputEl.value = "";
    localStorage.setItem("myLeads", JSON.stringify(myLeads));
    render(myLeads);
});

deleteBtn.addEventListener("dblclick", function(){
    localStorage.clear();
    myLeads = [];
    render(myLeads);
})





