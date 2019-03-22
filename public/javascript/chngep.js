var seasonValue = document.getElementsByClassName("seasons");
var episodeValue = document.getElementsByClassName("episodes");
var videoFrame = document.getElementsByTagName("video");
console.log(seasonsInfo);

for(var i=0; i<seasonValue.length; ++i){
    seasonValue[i].addEventListener("change",function(){
        console.log(this);
        var selectedSeason = Number(this.value.match(/\d/g).join(""));
        var seasonShow = document.getElementById("seasonNum");
        console.log(seasonShow);
        seasonShow.textContent = selectedSeason;
        var epNum = seasonsInfo[selectedSeason-1];
        initialHTML = '<button class="btn btn-sm btn-outline-secondary text-light p-2 m-1 active" style="border: 0">Ep 1</button>';
        for(var j=1; j<epNum; ++j){
            initialHTML += '<button class="btn btn-sm btn-outline-secondary text-light p-2 m-1" style="border: 0">Ep '+ Number(j+1) +'</button>';
        }
        episodeValue[0].innerHTML = initialHTML;
    })
}