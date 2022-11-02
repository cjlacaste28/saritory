$(document).ready(function () {
    $('#sidebarCollapse').on('click', function () {
        $('#sidebar').toggleClass('active');
    });
});


//database setup
let adapter = new LocalStorage("SaritoryDB");
let SaritoryDB = low(adapter);

const baseurl = `${window.location.origin}/saritory`;
const usersDB = SaritoryDB.get('users');
const currLogin = SaritoryDB.get('currLogin');

// console.log(`userDB: ${usersDB}`);
console.log(`url: ${baseurl}`);

// Session Check
function check_session() {
    if (currLogin.value().length === 0) {
        Swal.fire({
            position: 'center',
            icon: 'error',
            title: 'Redirecting to login page...',
            showConfirmButton: false,
            timer: 1500
        }).then((result) => {
            location.replace(`${baseurl}/src/pages/login-signup.html`);
        })
    }
}
window.onload = check_session();

console.log(JSON.stringify(currLogin));

/********************* INITIALIZATION ***********************/
const usernameElement = document.getElementById('username');
const storeNameElement = document.getElementById('storeName');
const logoutBtn = document.getElementById('logout');

const usernameValue = currLogin.value()[0].username;
const storeNameValue = currLogin.value()[0].store;


/*****************  EVENT LISTENER  ******************/
logoutBtn.addEventListener('click', () => {
    logout();
    Swal.fire(
        'Goodbye!',
        'Logout Successful',
        'success'
    ).then((result) => {
        if (result.isConfirmed) {
            location.replace(`${baseurl}/src/pages/login-signup.html`);
        }
    })
});


/*****************  UTILITY FUNCTION  ******************/
//remove data from currLogin and back to login page
const logout = () => currLogin.remove({ username: usernameValue }).write();


function onload_Function() {

    //title init 
    usernameElement.innerHTML = usernameValue + '<span><img src="../images/SARITORY.png" width="50" alt="" /></span>' 
	storeNameElement.innerText = storeNameValue

}

window.onload = onload_Function();
