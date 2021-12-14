
let url= ''
setUrl()
function setUrl(){
    if( window.location.protocol == 'file:' ){ return 0; }
    if( !window.location.host.replace( /localhost|127\.0\.0\.1/i, '' ) ){ 
        url = 'https://limitless-shore-03105.herokuapp.com'
     }
    const port =  9000;
     url = `http://localhost:${port}`
}
console.log(url);
//let url = "https://limitless-shore-03105.herokuapp.com"
if (sessionStorage.length <= 0) {
    window.location.href = `${url}/ui`
    if (alert("only registered users can access this.")) {
        console.log("here");
    }
}
let user_id = sessionStorage.getItem("user_id").trim()
let user = sessionStorage.getItem("user_name").trim()
let role = sessionStorage.getItem("role").trim()
let institute_id = sessionStorage.getItem("institute_id").trim()
$("#userName").html(sessionStorage.getItem("fullName"));
//==================================
//==Ui Elements like modal and menu==>
//==================================
let commonNav = `<a class="navbar-brand" href="${url}/ui/checkRequest">Maintenance Register</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
    <a class="nav-link" href="${url}/ui/checkRequest">Manage Requests</a>
    </li>`;
let adminNav = `<li class="nav-item">
    </li>
    <li class="nav-item">
    <a class="nav-link" href="${url}/ui/userMaster">Manage_User</a>
    </li>`;
let userNav = `<li class="nav-item">
    </li>  
    <li class="nav-item">
    <a class="nav-link" href="${url}/ui/newRequest">Make Request</a>
    </li>`;
let userDropDown = `
    <li class="nav-item dropdown">
    <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    <span id="userName"></span>
    </a>
    <div class="dropdown-menu" aria-labelledby="navbarDropdown">
    <!--<a class="dropdown-item" href="#">User Details</a>
    <div class="dropdown-divider"></div>-->
    <a class="dropdown-item" id="logout" onclick="userSignout()" href="#">Logout</a>
     </div>
    </li>
    </ul>
    </div>`;

let navBar = ''
if (role == "admin") {
    console.log("in for admin");
    navBar = commonNav + adminNav + userDropDown;
} else if(role == "user"){
    console.log("in for user");
    navBar = commonNav + userNav + userDropDown;
} else {
    console.log("in for technician");
    navBar = commonNav + userDropDown;
}


window.addEventListener("load", function() {
    let nav_bar = document.getElementById("navBar")
    nav_bar.innerHTML = nav_bar.textContent = navBar;
    let user_span = document.getElementById("userName")
    user_span.innerText = user_span.textContent = user;
});
//==================================
//==Ui Elements like modal and menu==>
//==================================

//let url = "https://x7ghgnav1j.execute-api.us-east-1.amazonaws.com/dev"

async function userSignout() {
    await sessionStorage.clear()
    await localStorage.clear()
    window.location.href = `${url}/ui`;
}
async function getInstitute(){
    console.log("in header");
    $(".institute_id").empty()
    $.ajax({
        type:"GET",
        dataType:"application/json",
        url:`${url}/master/getInstitute`,
        dataType:"json",
        success:async function(result){
          result.forEach(element => {
           $(".institute_id").append(`<option value=${element.id}>${element.alias}</option>`)
          });
        },
        error:async function(error){
          console.log(error);
        }
      })
}
async function getTechnician(){
    console.log("in header");
    $(".institute_id").empty()
    $.ajax({
        type:"GET",
        dataType:"application/json",
        url:`${url}/master/getTechnicians/technician`,
        dataType:"json",
        success:async function(result){
          result.forEach(element => {
           $(".technician_id").append(`<option value=${element.id}>${element.user_name}</option>`)
          });
        },
        error:async function(error){
          console.log(error);
        }
      })
}
async function getFormetedDate(date){
    let rawDate = new Date(date);
    let dateString = rawDate.getDate() +" / "+ (rawDate.getMonth()+1) +" / "+rawDate.getFullYear()
    return dateString;
}