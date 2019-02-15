/*
 * LazyLoad Vimeo player(s)
 * Display Div with image from Vimeo. Load iframe when clicked
 */
function setVideoThumbnail(vidDiv) {

  var xhr = new XMLHttpRequest(),
      method = "GET",
      url = "http://vimeo.com/api/v2/video/" + vidDiv.dataset.embed + ".xml";

  // Initialize newly-created request using the variables above to create the url
  xhr.open(method, url, true);
  
  xhr.onreadystatechange = function(){

    if(xhr.readyState === 4 && xhr.status === 200){
      // The XMLHttpRequest.responseXML read-only property returns a Document containing the HTML or XML retrieved by the request
      var doc = xhr.responseXML;
      // Gets thumbnail_large url from Vimeo XML feed
      source = doc.getElementsByTagName("thumbnail_large")[0].innerHTML;
      // The Image() constructor creates a new HTMLImageElement instance
      var image = new Image();
      // Sets img src for thumbnail_large
      image.src = source;
      // Used to position image in div
      image.style.top = "0%";
      // Load image data
      image.addEventListener("load", function(){
        vidDiv.appendChild(image);
      });
    }

  }; // END onreadystatechange

  xhr.send(null);

} // END setVideoThumbnail

// Create response when image clicked
function setClickResponseFunction(vidDiv) {

  // Generate embed src url
  var embedSrc;
  embedSrc = "https://player.vimeo.com/video/" + vidDiv.dataset.embed + "?autoplay=1"; // on page use data-embed=""

  // Onclick use JS to generate the iframe including attributes
  vidDiv.addEventListener("click", function(){
    var iframe = document.createElement('iframe');
    iframe.setAttribute("frameborder", "0");
    iframe.setAttribute("allowfullscreen", "");
    iframe.setAttribute("src", embedSrc, "?autoplay=1&loop=1");
    this.innerHTML = "";
    this.appendChild(iframe);
  });

} // END setClickResponseFunction

// Lazy load content when page loaded
function lazyLoadVimeo() {

  // The Document method querySelectorAll() returns a static (not live) NodeList representing a list of the
  // document's elements that match the specified group of selectors.
  var vimeo = document.querySelectorAll(".player");

  // Loop though all players to run the same code over and over again, each time with a different value.
  for (var i = 0; i < vimeo.length; i++){
    setVideoThumbnail(vimeo[i]);
    setClickResponseFunction(vimeo[i]);
  }

} // END lazyLoadVimeo

lazyLoadVimeo();

/*
 * HTML to access the data
 * Replace {vimeo_id} with dynamic variable to get the video ID
 */

// <div class="player" data-embed="{vimeo_id}"><div class="play-button"></div></div>
