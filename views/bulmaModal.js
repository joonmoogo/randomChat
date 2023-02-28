

// bulma 모달창 js 기본틀임

document.addEventListener('DOMContentLoaded', () => {
    // Functions to open and close a modal
    function openModal($el) {
      $el.classList.add('is-active');
    }
  
    function closeModal($el) {
      $el.classList.remove('is-active');
    }
  
    function closeAllModals() {
      (document.querySelectorAll('.modal') || []).forEach(($modal) => {
        closeModal($modal);
      });
    }
  
    // Add a click event on buttons to open a specific modal
    (document.querySelectorAll('.js-modal-trigger') || []).forEach(($trigger) => {
      const modal = $trigger.dataset.target;
      const $target = document.getElementById(modal);
  
      $trigger.addEventListener('click', () => {
        openModal($target);
      });
    });
  
    // Add a click event on various child elements to close the parent modal
    (document.querySelectorAll('.modal-background, .modal-close, .modal-card-head .delete, .modal-card-foot .button') || []).forEach(($close) => {
      const $target = $close.closest('.modal');
  
      $close.addEventListener('click', () => {
        closeModal($target);
      });
    });
  
    // Add a keyboard event to close all modals
    document.addEventListener('keydown', (event) => {
      const e = event || window.event;
  
      if (e.keyCode === 27) { // Escape key
        closeAllModals();
      }
    });
  });


  //my modal

  const modalButton1 = document.querySelector('#modalButton1'); // 회원가입 모달 버튼임
  const modalButton2 = document.querySelector('#modalButton2'); // 로그인 모달 버튼임
  const modal1 = document.querySelector('#modal1');
  const modal2 = document.querySelector('#modal2');
  const modalBg = document.querySelector('.modal-background');


  modalButton1.addEventListener('click',()=>{
    modal1.classList.add('is-active'); // is-active 클래스에 추가 =  모달 열어줌
    let nickName = document.querySelector("#nickName");
    nickName.setAttribute('value',changeNickName()); // changeNickName from randomName.js
  })
  modalBg.addEventListener('click',()=>{
    modal1.classList.remove('is-active'); // is-active 클래스에서 제거 = 모달 닫음
  })
  modalButton2.addEventListener('click',()=>{
    modal2.classList.add('is-active');
  })
  modalBg.addEventListener('click',()=>{
    modal2.classList.remove('is-active');
  })

