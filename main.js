// My Contacts Basic

// HTML Elements
let goBtnEl = document.getElementById('go-btn');
let menuEl = document.getElementById('menu');
let outputEl = document.getElementById('output');

// Global Variables
let contacts = loadContacts();

// Display previously existing contacts
displayContacts();
if (contacts === []) {
  outputEl.innerHTML = "(No contacts added.)"
}  

// Go Btn - Menu Listener
goBtnEl.addEventListener('click', goBtnHandler);

function goBtnHandler() {
  // Get Menu Selection
  let selection = menuEl.value;

  if (selection === 'display-all') {
    displayContacts();
  } else if (selection === 'add') {
    addContact();
  } else if (selection === 'remove') {
    removeContact();
  } else if (selection === 'display-name') {
    displayByName();
  } else if (selection === 'display-country') {
    displayByCountry();
  } else if (selection === 'display-email') {
    displayByEmail();
  } else if (selection === 'add-random-contacts') {
    addRandomContacts();
  } else if (selection === 'clear-contacts') {
    clearFunctions();
  }
}

// MENU FUNCTIONS
function displayContacts() {
  let masterElement = "";
  for (let i = 0; i < contacts.length; i++) {
    masterElement += createContactStr(contacts[i], i);
  }
  outputEl.innerHTML = masterElement;
}

function addContact() {  
  let email = prompt("Enter contact email: ");
  let permissibleEmail = findByEmail(email);
  if (permissibleEmail === -1) {
  let name = prompt("Enter contact name: ");
  let phone = prompt("Enter contact phone number: ");
  let country = prompt("Enter current country of residence for the contact: ");
  contacts.push(newContact(name, email, phone, country));
  alert(`New contact "${name}" has been added.`)
  saveContacts();
  displayContacts();
} else {
  alert("Email is alreay in list.");
}
}

// Only works for index zero
function removeContact() {
  let email = prompt("Enter email of contact");
  let permissibleEmail = findByEmail(email);
    if (permissibleEmail === -1) {
    alert(`Invalid email ${email} inputted.`);
    return;
  } else {
    // Remove existing index
    contacts.splice(permissibleEmail, 1);
    saveContacts();
    displayContacts();
    alert(`Contact with email ${email} removed.`)
  }
}


function displayByName() {
  displayContacts();
  outputEl.innerHTML = "";
  let keywordName = prompt("Please enter the name to search for.");
  for (let i = 0; i < contacts.length; i++)
  if (contacts[i].name.includes(keywordName)) {
    outputEl.innerHTML += createContactStr(contacts[i], i)
    alert(`Name found: ${contacts[i].name}`)
  }
}

function displayByCountry() {
  displayContacts();
  outputEl.innerHTML = "";
  let keywordCountry = prompt("Please enter the country to search for.");
  for (let i = 0; i < contacts.length; i++)
  if (contacts[i].country.includes(keywordCountry)) {
    outputEl.innerHTML += createContactStr(contacts[i], i)
    alert(`Country found: ${contacts[i].country}`)
  }
}

function displayByEmail() {
  outputEl.innerHTML = "";
  let keywordEmail = prompt("Please enter the email to search for.");
  let emailIndex = findByEmail(keywordEmail);
  if (emailIndex > -1) {
  outputEl.innerHTML = "";
  alert(`Index found at ${emailIndex}.`);
  outputEl.innerHTML += createContactStr(contacts[emailIndex], emailIndex);
 } else {
  alert("Contact with that email could not be found.")
  displayContacts();
 }
}

function addRandomContacts() {
  let name = "Josephine Esquire";
  let email = "j.esquire@gmail.com";
  let phone = "780-476-2156";
  let country = "Australia";
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  displayContacts();

  name = "Terrence Smith";
  email = "t.smith@gmail.com";
  phone = "587-396-5296";
  country = "Germany";
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  displayContacts();

  name = "Aldous McMartin";
  email = "a.mcmartin@gmail.com";
  phone = "402-845-9396";
  country = "America";
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  displayContacts();

  name = "Joseph McCaw";
  email = "j.mccaw@gmail.com";
  phone = "673-455-7932";
  country = "Britain";
  contacts.push(newContact(name, email, phone, country));
  saveContacts();
  displayContacts();
}



// HELPER FUNCTIONS
function findByEmail(keywordEmail) {
  for (let i = 0; i < contacts.length; i++) {
    if (contacts[i].email.includes(keywordEmail)) {
      return i;
    } 
  }
  return -1;
}


function createContactStr(contactIn, i) {
  return `<div>
  <h3>${i}: ${contactIn.name}</h3>
  <p>${contactIn.email}<p>
  <p>${contactIn.phone} (${contactIn.country})</p></div>`
}

function newContact(contactName, contactEmail, contactPhone, contactCountry) {
  return {
    name: contactName,
    email: contactEmail,
    phone: contactPhone,
    country: contactCountry,
  };
}

function saveContacts() {
  localStorage.setItem("output", JSON.stringify(contacts));
}

function loadContacts() {
  let contactsStr = localStorage.getItem("output");
  return JSON.parse(contactsStr) ?? [];
}

function clearFunctions() {
  outputEl.innerHTML = "";
  contacts = [];
  localStorage.clear();
  displayContacts();
  saveContacts();

}
