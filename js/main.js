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
          href: share_content.href,
          picture: share_content.img,
          title: share_content.title,
          description: share_content.description,
          caption: "clickbaitforgood.org"
        }, function(response){});
      }

    })
  },
  getShareContent: function(charity_name){
    var share_content = {};

    share_content.href = "www.clickbaitforgood.org?charity="+charity_name

    switch (charity_name) {

      case "water":
        share_content.title = "Wow!";
        share_content.description = "This guy’s monthly bill will shock you!";
        share_content.img = "clickbaitforgood.org/img/share_water.jpg";

        break;
      case "love":
        share_content.title = "She fell for Mr. Perfect.";
        share_content.description = "You won’t believe what happened next.";
        share_content.img = "clickbaitforgood.org/img/share_love.jpg";

        break;
      case "trevor":
        share_content.title = "Outrageous!";
        share_content.description = "You won’t believe the size of this guy’s boat.";
        share_content.img = "clickbaitforgood.org/img/share_trevor.jpg";

        break;
      case "rescue":
        share_content.title = "Unheard of!";
        share_content.description = "Shocking final words that will haunt you.";
        share_content.img = "clickbaitforgood.org/img/share_rescue.jpg";

        break;
      case "wwf":
        share_content.title = "That is unreal!";
        share_content.description = "This guy turned his cat into a rug.";
        share_content.img = "clickbaitforgood.org/img/share_wwf.jpg";

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
