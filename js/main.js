var clickbait_app = {
  init: function(){
    $("html").removeClass("no-js");
    this.detectFormSubmit()
    this.detectSection();
    this.addEventHandlers();
  },
  addEventHandlers: function(){
    var setActiveCharity = this.setActiveCharity.bind(this);
    $(".js-update-charity").on("click", function(){
      setActiveCharity(this.getAttribute("data-charity-name"))
    });

    $(".js-hover-update-charity").hover(function(){
      setActiveCharity(this.getAttribute("data-charity-name"))
    });

    var getShareContent = this.getShareContent.bind(this);
    $(".js-share-fb").on("click", function(event){
      // if Facebook SDK is defined
      if(FB !== undefined){

        // kill original anchor href
        event.preventDefault();

        // get share content
        var charity_name = this.getAttribute("data-charity-name");
        if(charity_name === "RAND"){
          charity_name = "water";
        }
        var share_content = getShareContent(charity_name);

        FB.ui({
          method: 'share',
          href: share_content.href,
          picture: share_content.img,
          title: share_content.title,
          description: share_content.description,
          caption: "clickbaitforgood.org"
        }, function(response){});
      }

    });

    $("form#form-add-charity").on("submit", this.submitForm.bind(this));
  },
  detectSection: function(){
    var charity_name = this.getQueryVariable("charity_name");
    if(charity_name){
      this.setActiveCharity(charity_name);
    }
  },
  detectFormSubmit: function(){
    var submitted = this.getQueryVariable("submitted");
    if(submitted){
      $(".form-submitted").removeClass("hide");
    }
  },
  getQueryVariable: function(variable) {
     var query = window.location.search.substring(1);
     var vars = query.split("&");
     for (var i=0;i<vars.length;i++) {
             var pair = vars[i].split("=");
             if(pair[0] == variable){return pair[1];}
     }
     return(false);
  },
  getShareContent: function(charity_name){
    var share_content = {};

    share_content.href = "http://www.clickbaitforgood.org?charity_name="+charity_name

    switch (charity_name) {

      case "water":
        share_content.title = "This guy’s monthly bill will shock you!";
        share_content.description = "This is how much will cost to...";
        share_content.img = "http://www.clickbaitforgood.org/img/share_water.jpeg";

        break;
      case "love":
        share_content.title = "She fell for Mr. Perfect.";
        share_content.description = "You won’t believe what happened next.";
        share_content.img = "http://www.clickbaitforgood.org/img/share_love.jpg";

        break;
      case "rescue":
        share_content.title = "Outrageous!";
        share_content.description = "You won’t believe the size of this guy’s boat.";
        share_content.img = "http://www.clickbaitforgood.org/img/share_rescue.jpg";

        break;
      case "trevor":
        share_content.title = "Shocking final words that will haunt you.";
        share_content.description = "They will never accept...";
        share_content.img = "http://www.clickbaitforgood.org/img/share_trevor.jpg";
        break;
      case "wwf":
        share_content.title = "This guy turned his cat into a rug.";
        share_content.description = "This is NOT what we expect from a pet owner.";
        share_content.img = "http://www.clickbaitforgood.org/img/share_wwf.jpg";

        break;
      default:
        //
    }

    return share_content;
  },
  setActiveCharity: function(charity_name){
    // update nav
    $(".charity__nav-item").removeClass("charity__nav-item--active");
    $(".charity__nav-item[data-charity-name='"+charity_name+"']").addClass("charity__nav-item--active");

    // update content
    $(".charity__item").removeClass("charity__item--active");
    $(".charity__item[data-charity-name='"+charity_name+"']").addClass("charity__item--active");
  },
  submitForm: function(e){
     e.preventDefault();

     $(".form-submitted-btn").attr("disabled", true)

     $.ajax({
        type: 'POST',
        url: 'php/mail.php',
        data: $("form#form-add-charity").serialize(),
        success: function (response) {
          if(JSON.parse(response).type === "success"){
            $(".form-submitted").removeClass("hide");
          } else {
            $(".form-error").removeClass("hide");
          }
        },
        error: function(){
          $(".form-error").removeClass("hide");
        },
        complete: function(){
          $(".form-submitted-btn").attr("disabled", false);
        }
      });
  }
}

$(document).ready(function(){
  clickbait_app.init();
});
