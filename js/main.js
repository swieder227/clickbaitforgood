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
          href: 'clickbaitforgood.org',
          picture: "clickbaitforgood.org/img/share_love.jpg",
          title: "custom title",
          description: "custom description",
          caption: "custom caption"
        }, function(response){});
      }

    })
  },
  getShareContent: function(charity_name){
    var share_content = {};

    share_content.href = "www.clickbaitforgood.org"

    switch (charity_name) {

      case "water":
        break;
      case "love":
        break;
      case "trevor":
        break;
      case "rescue":
        break;
      case "wwf":
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
  }
}

$(document).ready(function(){
  clickbait_app.init();
});
