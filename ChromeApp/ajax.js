
$(document).ready(function() {
   


   var d1=$.ajax({
        url: 'https://lan.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA1/622509?api_key=6cfb7ff9-3d77-44cb-b007-f6bdb2d4fdc1',
        type: 'GET',
        dataType: 'json' 
    });
   

   var d2=$.ajax({
        url: 'http://ddragon.leagueoflegends.com/cdn/5.5.3/data/en_US/champion.json',
        type: 'GET',
        dataType: 'json' 
    });

   $.when(d1, d2).done(function(result1, result2) {
 	

 	var champions=result2[0].data;
 	var participants=result1[0].participants;

 	var urls={};

 	for(i=0;i<participants.length;i++){
 		var participant=participants[i];

 		var keys=Object.keys(champions);

 		for(key in keys){
 			var champion = champions[keys[key]];
 			var a=key;
 			if(participant.championId==champion.key){
 				
 				urls[participant.summonerId]="http://ddragon.leagueoflegends.com/cdn/img/champion/loading/"+champion.id+"_0.jpg";

 			}

 		}
 	}

 	console.log(urls);

	});
   

});




