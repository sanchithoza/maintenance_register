let url= "http://localhost:9000/maintenance"
console.log("here",url);
$("#userName").html(sessionStorage.getItem("fullName"));
//==================================
//==Ui Elements like modal and menu==>
//==================================
let navBar = `<a class="navbar-brand" href="index.html">OPD Entry Management</a>
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#collapsibleNavbar">
    <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="collapsibleNavbar">
    <ul class="navbar-nav ml-auto">
    <li class="nav-item">
    <a class="nav-link" href="index.html">New Entry</a>
    </li>
    <li class="nav-item">
    <a class="nav-link" href="reports.html">Reports</a>
    </li>
    </ul>
    </div>`;



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
    window.location.href = `index.html`;
}
async function getInstitute(){
    console.log("in get institute");
    $(".institute_id").empty()
    await $.ajax({
        type:"GET",
        dataType:"application/json",
        url:`${url}/master/getInstitute`,
        dataType:"json",
        success:async function(result){
            console.log(result);
         await result.forEach(element => {
           $(".institute_id").append(`<option value=${element.id}>${element.name}</option>`)  
          });
          $(".institute_id").val(`${institute_id}`)
          
        },
        error:async function(error){
          console.log(error);
        }
      })
}
async function getTechnician(){
    $(".institute_id").empty()
    $.ajax({
        type:"GET",
        dataType:"application/json",
        url:`${url}/master/getTechnicians/supervisior`,
        dataType:"json",
        success:async function(result){
          result.forEach(element => {
           $(".technician_id").append(`<option value=${element.id}>${element.name}</option>`)
          });
        },
        error:async function(error){
          console.log(error);
        }
      })
}
async function getFormetedDate(date){
    let rawDate = new Date(date);
    let dateString = rawDate.getDate() +"/"+ (rawDate.getMonth()+1) +"/"+rawDate.getFullYear() +" at "+rawDate.getHours()+":"+rawDate.getMinutes()
    return dateString;
}