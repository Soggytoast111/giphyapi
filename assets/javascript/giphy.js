$("body").backstretch("assets/images/background.gif")

//Append list options to dropdowns
var foods = ["pizza", "mashed potatoes", "hamburger", "apple pie", "roast beef", "scrambled eggs"]
var animals = ["sheep", "bear", "porcupine", "snake", "cat", "moose"]
var places = ["Eiffel Tower", "Statue of Liberty", "Grand Canyon", "Mount Everest", "Niagra Falls"]

var categories = [foods, animals, places]
var categoriesStr = ["foods", "animals", "places"]
var jq = ""

for (i=0; i<categories.length; i++) {
    var add = categories[i]
    jq = categoriesStr[i]
    console.log(add)
    for (j=0; j<add.length; j++) {
        var option = $("<a>")
        option.attr("class", "dropdown-item")
        option.text(add[j])
        option.attr("gif-link", "")
        $("#"+jq+"-menu").append(option)
        }
}

//On Click event for menu options
var gifPull = ""
$(document).on("click", "[gif-link]", function(){
    $("#gif-row").empty();
    gifPull = $(this).text()
    console.log(gifPull)
    grabGif()
})



//Giphy GIF Grabber

function grabGif() {
    
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=nuyjh4RM1RzY3Ca7xGVttTeF4Hvubkqk&limit=10&q=" + gifPull
    console.log(gifPull)    

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function(response) {
        for (i=0; i<response.data.length; i++) {
        var gifDiv = $("<div class='gifDiv col-md-4 -col-sm-6 col-xs-12'>")
        var gifImg = $("<img class='gifImg img-fluid'>")
        var rating = $("<div class='rating'>")
        
        rating.text(response.data[i].rating)
        gifImg.attr("id", response.data[i].id)
        gifImg.attr("state", 0)
        gifDiv.attr("rating", response.data[i].rating)
        gifImg.attr("src", "https://i.giphy.com/media/" + response.data[i].id + "/giphy_s.gif")
        gifDiv.append(gifImg)
        gifDiv.append(rating)
        gifDiv.prependTo("#gif-row")
        }
    })
}

//Add button
$("#add-button").click(function(event) {
    event.preventDefault();
    var option = $("<a>")
    var text = $("#text-input").val().trim()
    option.attr("class", "dropdown-item")
    option.attr("gif-link", "")
    option.text(text)
    $("#custom-menu").append(option)
})

//Animate images on click
$(document).on("click", ".gifImg", function(){
    if ($(this).attr("state") == 0) {    
        var animate = "https://i.giphy.com/" + $(this).attr("id") + ".gif"  
        console.log(animate)  
        $(this).attr("src", animate)
        $(this).attr("state", 1)
    }

    else if ($(this).attr("state") == 1) {    
        var stop = "https://i.giphy.com/media/" + $(this).attr("id") + "/giphy_s.gif"  
        console.log(animate)  
        $(this).attr("src", stop)
        $(this).attr("state", 0)
    }

})




