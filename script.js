const body = document.querySelector("body"); 
const darkLight = document.querySelector("#darkLight"); 
const sidebar = document.querySelector(".sidebar"); 
const submenuItems = document.querySelectorAll(".submenu_item"); 
const sidebarOpen = document.querySelector("#sidebarOpen"); 
const sidebarClose = document.querySelector(".collapse_sidebar"); 
const sidebarExpand = document.querySelector(".expand_sidebar"); 
sidebarOpen.addEventListener("click", () => sidebar.classList.toggle("close")); 
 
sidebarClose.addEventListener("click", () => { 
  sidebar.classList.add("close", "hoverable"); 
  document.getElementById("mainer").style.marginLeft= "-180px";
  document.getElementById("imagesilders").style.marginLeft= "-180px";
}); 
sidebarExpand.addEventListener("click", () => { 
  sidebar.classList.remove("close", "hoverable"); 
  document.getElementById("mainer").style.marginLeft= "0px";
  document.getElementById("imagesilders").style.marginLeft= "0px";
}); 
 
// sidebar.addEventListener("mouseenter", () => { 
//   if (sidebar.classList.contains("hoverable")) { 
//     sidebar.classList.remove("close"); 
//   } 
// }); 
// sidebar.addEventListener("mouseleave", () => { 
//   if (sidebar.classList.contains("hoverable")) { 
//     sidebar.classList.add("close"); 
//   } 
// }); 
 
darkLight.addEventListener("click", () => { 
  body.classList.toggle("dark"); 
  if (body.classList.contains("dark")) { 
    document.setI
   darkLight.classList.replace("bx-sun", "bx-moon"); 
} else { 
   darkLight.classList.replace("bx-moon", "bx-sun"); 
} 
}); 
submenuItems.forEach((item, index) => { 
 item.addEventListener("click", () => { 
   item.classList.toggle("show_submenu"); 
   submenuItems.forEach((item2, index2) => { 
if (index !== index2) { 
       item2.classList.remove("show_submenu"); 
} 
}); 
}); 
}); 



if (window.innerWidth < 3000) { 
 sidebar.classList.add("open"); 
} else { 
 sidebar.classList.remove("close"); 
}
