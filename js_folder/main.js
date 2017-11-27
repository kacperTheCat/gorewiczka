


// CSS scripts ----------------------------------------------------------

//use window.scrollY to mod your nav css
var nav = document.querySelector("nav");
var navElements = document.querySelector(".nav-link");
var fullLogo = document.querySelector('.nav-logo');
var logo = document.querySelector('.full-name');
var alias = document.querySelector('.full-name--lowercase')
var bigLetter = document.querySelector('.full-name--uppercase')

function changeCSS() {
  // nav.style.background = "#000";
  nav.style.transition = ".5s";
  nav.style.background = "none";
  nav.style.boxShadow = "none";
  nav.style.padding = "0";

  logo.style.display = "none";
  fullLogo.style.transition = ".5s";
  alias.style.fontSize = "2rem";
  alias.style.margin = "0";
  alias.style.position = "relative";
  alias.style.left = "-2rem";
  bigLetter.style.fontSize = "2.4rem";


  for (var i = 0; i < btns.length; i++) {
    btns[i].style.fontSize = ".9rem";
  }
}

function reChangeCSS() {
  fullLogo.style.width = null;
  nav.style.background = null;
  nav.style.boxShadow = null;
  nav.style.padding = null;
  nav.style.borderBottom = null;
  logo.style.fontSize = null;
  alias.style.fontSize = null;
  alias.style.padding = null;
  bigLetter.style.fontSize = null;
  alias.style.left = "0rem";
  logo.style.display = null;

  for (var i = 0; i < btns.length; i++) {
    btns[i].style.fontSize = null;
  }
}

var scrollpos = window.scrollY;
window.addEventListener('scroll', function() {
  //works only on screens bigger than 750px
  if (window.innerWidth >= 750) {
    scrollpos = window.scrollY;

    if (scrollpos > 400) {
      changeCSS();
    } else {
      reChangeCSS();
    }
  }

});






// gallery animation fade in and out


function fadeOut(el) {
  el.style.opacity = 1;
  el.style.display = "none";
};



function fadeIn(el, display) {
  el.style.opacity = 0;
  el.style.display = display || "block";
  setTimeout(function() {
    (function fade() {
      var val = parseFloat(el.style.opacity);
      if (!((val += .1) > 1)) {
        el.style.opacity = val;
        requestAnimationFrame(fade);
      }
    })();
  }, 50);

};

// end of CSS scripts ----------------------------------------------------------
// ------------ preloader------------------------------------------------------------------
// disable scrolling
// var page = document.querySelector('body');
  document.body.style.overflow = "hidden";
// preloader
var preLoader = document.querySelector('.preloader');
var preloading = function(){
  preLoader.style.transition = "1s";
  preLoader.style.opacity = "0";
  preLoader.style.zIndex = "-10";
  document.body.style.overflow = "visible";
}
setTimeout(function(){ preloading()}, 1500);





// reloadin js script after ajax request
var reLoadScript = function() {
  var scriptTag = document.createElement('script');
  var loadJS = function(url, implementationCode, location) {
    //url is URL of external file, implementationCode is the code
    //to be called from the file, location is the location to
    //insert the <script> element

    var scriptTag = document.createElement('script');
    scriptTag.src = url;

    scriptTag.onload = implementationCode;
    scriptTag.onreadystatechange = implementationCode;

    location.appendChild(scriptTag);
  };
  var yourCodeToBeCalled = function() {
    //your code goes here
  }
  loadJS('js_folder/pswp.js', yourCodeToBeCalled, document.body);
}

// -----------------
// Gallery ---------------------------------------------------
// gallery variables ----------------------------------------------
var tab = document.querySelectorAll('.tab');

var content = document.querySelectorAll('.content')
var photoGallery = document.querySelectorAll('.pswp');

// end of vars-------------------------------------------------
// ---------------------

document.addEventListener("DOMContentLoaded", function() {

  // should be changed to bem classes   .. . . . . . . ..
  for (var i = 0; i < tab.length; i++) {

    tab[i].addEventListener('click', function() {
      for (var i = 0; i < tab.length; i++) {
        // buttons activation

        if (tab[i].classList.contains('active')) {
        tab[i].classList.remove('active');

        this.classList.add('active');

        }
      }
      // changing panels
      for (var i = 0; i < content.length; i++) {
        if (content[i].dataset.content != this.dataset.content) {
          fadeOut(content[i]);
        } else {
          // loading second third and fourth panel
          if (this.dataset.content > 1) {
            // load ajax content
            var xmlhttp = new XMLHttpRequest();

            xmlhttp.onreadystatechange = function() {
              if (xmlhttp.readyState == XMLHttpRequest.DONE) {

                if (xmlhttp.status == 200) {
                  for (var i = 1; i < content.length; i++) {
                    // replace content
                    content[i].innerHTML = xmlhttp.responseText;
                    // and reload photoswipe script
                    reLoadScript();
                  }
                } else if (xmlhttp.status == 400) {
                  alert('ups... coś poszło nie tak');
                } else {
                  alert('ups... coś poszło nie tak');
                }
              }
            };

            xmlhttp.open("GET", "ajax_content/gallery" + this.dataset.content + ".html", true);
            xmlhttp.send();

            fadeIn(content[i]);

          }
          // load first panel
          else if (this.dataset.content = 1) {
            fadeIn(content[i]);

          }

        }
      }
    });
  }
});


// -------smooth scrolling function

// smooth scroll function
function scrollIt(element) {
  window.scrollTo({
    'behavior': 'smooth',
    'left': 0,
    'top': element.offsetTop
  });
}


// smooth variables
var btns = document.querySelectorAll('.link-js');
var sections = document.querySelectorAll('section');
var arrowLink = document.querySelectorAll('.teleport__down');
var homeBtn = document.querySelector('.link-home')


btns[0].addEventListener('click', function() {
  scrollIt(sections[0]);
});

btns[1].addEventListener('click', function() {
  scrollIt(sections[1]);
});

btns[2].addEventListener('click', function() {
  scrollIt(sections[2]);
});

btns[3].addEventListener('click', function() {
  scrollIt(sections[3]);
});
btns[4].addEventListener('click', function() {
  scrollIt(sections[4]);
});
arrowLink[0].addEventListener('click', function() {
  scrollIt(sections[1]);
});
arrowLink[1].addEventListener('click', function() {
  scrollIt(sections[2]);
});
arrowLink[2].addEventListener('click', function() {
  scrollIt(sections[3]);
});
arrowLink[3].addEventListener('click', function() {
  scrollIt(sections[4]);
});
homeBtn.addEventListener('click', function(){
  scrollIt(sections[0]);
})

// poprawic overflow dla bodz w photoswipe
