//database setup
let adapter = new LocalStorage("SaritoryDB");
let SaritoryDB = low(adapter);

//db init
SaritoryDB.defaults({ 
  users: [], category: [], products: [], transactions: [], currLogin: [] }).write();

// const baseurl = window.location.origin;
const baseurl = `${window.location.origin}/saritory`;
console.log(baseurl);
console.log(window.location.href);


/********************* INITIALIZATION ***********************/
const sign_in_btn = document.querySelector("#sign-in-btn");
const sign_up_btn = document.querySelector("#sign-up-btn");
const container = document.querySelector(".portal-container");

const registerForm = document.getElementById('registerForm');
const store = document.getElementById('storeNameInput');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

const loginForm = document.getElementById('loginForm');
const usernameLogin = document.getElementById('usernameLogin');
const passwordLogin = document.getElementById('passwordLogin');

const usersDB = SaritoryDB.get('users')
const currLoginDB = SaritoryDB.get('currLogin')


/********************* FORM BUTTON EVENTLISTENER  ***********************/
//registration mode
sign_up_btn.addEventListener("click", () => {
  container.classList.add("sign-up-mode");
  loginForm.children[1].classList.remove("error");
  loginForm.children[2].classList.remove("error");
  loginForm.children[1].classList.remove("success");
  loginForm.children[2].classList.remove("success");
  loginForm.reset();
});
//login mode
sign_in_btn.addEventListener("click", () => {
  container.classList.remove("sign-up-mode");
  regArr = registerForm.querySelectorAll('div')
  regArr.forEach(element => {
      element.classList.remove("error");
      element.classList.remove("success");
  });
  registerForm.reset();
});

/*****************  UTILITY FUNCTION  ******************/
//checks username at the storage
const hasUsername = (x) => usersDB.find({ username: x }).has('username').value();
//checks if credentials is correct
const checkAccount = (usernameVal, pw) => usersDB.find({ username: usernameVal }).value().password === pw
//set current account login
const setSession = (currLoginObj) => currLoginDB.push(currLoginObj).write();
//create account
const createAccount = (regObj) => usersDB.push(regObj).write();

/*****************  LOGIN & REGISTRATION  ******************/
//REGISTER
registerForm.addEventListener('submit', e => {
  console.log(`Registration for was clicked!`);
  e.preventDefault();
  const regObj = checkInputsRegister()
  if (regObj.success) {
      //push the data to local storage
      createAccount(regObj.data)
      Swal.fire(
          'Congratulations!',
          regObj.msg,
          'success'
      ).then((result) => {
          if (result.isConfirmed) {
              location.reload();
          }
      })
  }/*
   else {
      Swal.fire(
          'Oops...',
          regObj.msg,
          'warning'
      )
  }*/
});

//LOGIN
loginForm.addEventListener('submit', e => {
  e.preventDefault();
  const regObj = checkInputsLogin();
  if (regObj.success) {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Login Successful!',
          showConfirmButton: false,
          timer: 2000
      }).then((result) => {
          location.replace(`${baseurl}/src/pages/dashboard.html`);
      })
  }
});

/**REGISTER VALIDATION */
function checkInputsRegister() {
  // trim to remove the whitespaces
  const storeValue = store.value.trim();
  const usernameValue = username.value.trim();
  const emailValue = email.value.trim();
  const passwordValue = password.value.trim();
  const password2Value = password2.value.trim();

  let ctr = 0;

  //validate store name
  if (storeValue === '') {
      setErrorFor(store, 'Store name cannot be blank');
  } else {
      setSuccessFor(store);
      ctr++;
  }
  //validate username
  if (usernameValue === '') {
      setErrorFor(username, 'Username cannot be blank');
  } else if (usernameValue.indexOf(' ') !== -1) {
      setErrorFor(username, 'Username must not have white spaces');
  } else if (hasUsername(usernameValue)) {
      setErrorFor(username, 'Username already exist');
  } else {
      setSuccessFor(username);
      ctr++;
  }

  if(emailValue === '') {
    setErrorFor(email, 'Email cannot be blank');
  } else if (!isEmail(emailValue)) {
    setErrorFor(email, 'Not a valid email');
  } else {
    setSuccessFor(email);
    ctr++;
  }

  //validate password
  if (passwordValue === '') {
      setErrorFor(password, 'Password cannot be blank');
  } else if (passwordValue.indexOf(' ') !== -1) {
      setErrorFor(password, 'Password must not have white spaces');
  } else if (passwordValue.length < 6) {
      setErrorFor(password, 'Password must be at least 6 characters');
  } else {
      setSuccessFor(password);
      ctr++;
  }
  //confirm password
  if (password2Value === '') {
      setErrorFor(password2, 'Confirm password cannot be blank');
  } else if (passwordValue !== password2Value) {
      setErrorFor(password2, 'Password does not match');
  } else {
      setSuccessFor(password2);
      ctr++;
  }

  //checks if all field are okay
  if (ctr === 5) {
      return {
          success: true,
          msg: "Account successfully created",
          data: { username: usernameValue, password: passwordValue, store: storeValue }
      }
  } else {
      return {
          success: false,
          msg: "Please check the input fields"
      }
  }
}

/**LOGIN VALIDATION */
function checkInputsLogin() {
  // trim to remove the whitespaces
  const usernameLoginValue = usernameLogin.value.trim();
  const passwordLoginValue = passwordLogin.value.trim();
  let ctr = 0;

  //login
  if (usernameLoginValue === '') {
      setErrorFor(usernameLogin, 'Username cannot be blank');
  } else if (!hasUsername(usernameLoginValue)) {
      setErrorFor(usernameLogin, 'Username does not exist');
  } else {
      setSuccessFor(usernameLogin);
      if (passwordLoginValue === '') {
          setErrorFor(passwordLogin, 'Password cannot be blank');
      } else {

          if (checkAccount(usernameLoginValue, passwordLoginValue)) {
              setSession(usersDB.find({ username: usernameLoginValue }).value())
              return {
                  success: true,
                  msg: "Login Successful"
              }
          } else {
              setErrorFor(passwordLogin, 'Incorrect Password');
              return {
                  success: false,
                  msg: "Login Failed."
              }
          }
      }
  }
  // if (passwordLoginValue === '') {
  //     setErrorFor(passwordLogin, 'Password cannot be blank');
  // } else {
  //     setSuccessFor(passwordLogin);
  // }
}


function setErrorFor(input, message) {
  const formControl = input.parentElement;
  const small = formControl.querySelector('small');
  formControl.className = 'input-field error';
  small.innerText = message;
}

function setSuccessFor(input) {
  const formControl = input.parentElement;
  formControl.className = 'input-field success';
}

function isEmail(email) {
return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(email);
}


function my_code() {
  if (currLoginDB.value().length !== 0) {
      Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'You are still logged in..',
          showConfirmButton: false,
          timer: 3000
      }).then((result) => {
          location.replace(`${baseurl}/src/pages/dashboard.html`);
      })
  }
}
window.onload = my_code();



