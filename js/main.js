var clickbait_app = {
  init: function(){
    $("html").removeClass("no-js");
    this.addEventHandlers();
  },
  addEventHandlers: function(){
    var setActiveCharity = this.setActiveCharity.bind(this);
    $(".js-update-charity").on("click", function(){
      setActiveCharity(this.getAttribute("data-charity-name"))
    });
    $(".js-share-href").on("click", function(e){

      // share to fb
      if(FB !== undefined){
        FB.ui({
          method: 'share',
          href: 'https://developers.facebook.com/docs/',
        }, function(response){});
      }

    })
  },
  setActiveCharity: function(charity_name){
    // update nav
    $(".charity__nav-item").removeClass("charity__nav-item--active");
    $(".charity__nav-item[data-charity-name='"+charity_name+"']").addClass("charity__nav-item--active");

    // update content
    $(".charity__item").removeClass("charity__item--active");
    $(".charity__item[data-charity-name='"+charity_name+"']").addClass("charity__item--active");
  }
}

$(document).ready(function(){
  clickbait_app.init();
});
