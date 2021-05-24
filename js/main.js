let $activityList;
let $inputTime;
let $inputWeight; 
let $textWarn;
let $btnAdd;
let $ulList;
let $liList; 
let $newActivity;
let $btnSum;
let $resultTxt;
let $allkcalTxt;

const main = () => {
 prepareDOMElements();
 prepareDOMEvents();
}

const prepareDOMElements = () => {
 $activityList = document.querySelector('#activity-list');
 $inputTime = document.querySelector('.input-time');
 $inputWeight = document.querySelector('.input-weight');
 $textWarn = document.querySelector('.warning-text');
 $btnAdd = document.querySelector('.btn-add');
 $ulList = document.querySelector('.kcal-list ul');
 $liList = $ulList.getElementsByTagName("li");
 $btnSum = document.querySelector('.btn-sum');
 $resultTxt = document.querySelector('.result-text');
 $allkcalTxt = document.querySelector('.kcal-sum');
};

const prepareDOMEvents = () => {
 $btnAdd.addEventListener('click', addNewActivity);
 $ulList.addEventListener('click', deleteActivity);
 $btnSum.addEventListener('click', sumAll);
 $inputTime.addEventListener('keyup', enterCheck);
 $inputWeight.addEventListener('keyup', enterCheck);
};


const addNewActivity = () => {
 if($inputTime.value !== '' && $inputWeight.value !== '' && $activityList.selectedIndex !== 0) {
  $newActivity = document.createElement('li');
  $ulList.appendChild($newActivity);
  $textWarn.style.display = 'none'
  createNewLi();
  $inputWeight.value = '';
  $inputTime.value = '';
  $activityList.options.selectedIndex = 0;
 } else {
  $textWarn.style.display = 'block'
  $textWarn.textContent = 'Wypełnij poprawnie wszystkie pola!'
 }
}

const enterCheck = () => {
 if(event.keyCode===13){
  addNewActivity();
 }
}

const createNewLi = () => {
 const spanActname = document.createElement('span');
 spanActname.classList.add('activity-name');
 spanActname.textContent = $activityList.options[$activityList.selectedIndex].text;
 $newActivity.appendChild(spanActname);
 
 const spankcalRes = document.createElement('span');
 spankcalRes.classList.add('kcal-result');
 const kcalSum = ($inputTime.value) * ($activityList.value * 3.5 * $inputWeight.value)/200;
 spankcalRes.textContent = Math.round(kcalSum) + ' kcal';
 $newActivity.appendChild(spankcalRes);

 const deleteBtn = document.createElement('button');
 deleteBtn.classList.add('btn-delete');
 deleteBtn.innerHTML='<i class="far fa-trash-alt"></i>';
 $newActivity.appendChild(deleteBtn);
}

const deleteActivity = (e) => {
 if(e.target.closest('button').classList.contains('btn-delete')){
  e.target.closest('li').remove();
 }
}

const sumAll = () => {
 const arr = [];
 for(let i=1; i < $liList.length; i++) {
 let score = parseInt($liList[i].children[1].innerText);
 console.log(score);
 arr.push(score);
 let score2 = arr.reduce((a,b) => a+b);
 console.log(score2)
  $resultTxt.style.display = 'block';
  $allkcalTxt.textContent = score2;
 }
}

const checkActivity = () => {
 for(let i=1; i < $liList.length; i++) {
  if($liList[i+1].firstElementChild.innerText == $liList[i].firstElementChild.innerText) {
   $textWarn.textContent = 'juz wybrales ta aktywnosc';
  }
 }
}

document.addEventListener('DOMContentLoaded', main);

