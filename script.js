$(document).ready(function () {
  $('.parallax').parallax();
});


$("form").submit(function(e){
  e.preventDefault();
  let newSearch = $("#search").val();
  $("#search").val("");
  $("#search").blur();
  searchItunes(newSearch);
})



//ajax requests
//phase 1
//$ jQuery Ajax Library 
//$ {} templete strings
// inner html between the tags

function searchItunes(artist) {
  $.ajax({
    url: "https://itunes.apple.com/search?term=" + artist,
    dataType: 'JSONP'
  })
    .done(function (data) {
      console.log(data);
      $(".hidden").show();
      let songsArray = data.results;
      let limit = data.resultCount;
      $("#col0,#col1,#col2").html("");
      $("#main-parallax").attr("src",songsArray[0].artworkUrl100.replace("100x100","500x500"))

      $('html, body').animate({
        scrollTop: $("#result").offset().top
    }, 2000);

      for (let i = 0; i < limit; i++){
        $(`#col${i%3}`).append(`
        <div class="card blue-grey darken-1">
          <div class="card-image waves-effect waves-block waves-light">
          <img class="activator" src="${songsArray[i].artworkUrl100.replace("100x100","500x500")}">
        </div>
        <div class="card-content white-text">
          <span class="card-title">${songsArray[i].trackName}</span> 
         
        </div>
        <div class="card-reveal">
        <span class="card-title grey-text text-darken-4">${songsArray[i].trackName}<i class="material-icons right">close</i></span><p>Is from the album ${songsArray[i].collectionName}. It was released in ${songsArray[i].releaseDate}.The price is ${songsArray[i].trackPrice}</p> 
        <div class="card-action">
          <a href="#">Buy</a>
          <a href="#">Listen</a>
          <a href="">Artwork</a>
        </div>
      </div>
        
      </div>
        `)

        
      }
    })
  .fail(function (data) {
      console.log(data);
    })
}

//phase 2