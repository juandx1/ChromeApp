$(document).ready(function($) {
	buscarJugador("larrylapija");
});

function buscarJugador(summoner) {
	$.ajax({
		url: 'https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/by-name/'+summoner+'?api_key=c23d24ee-d074-4000-a7f0-4711741570c4',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		var data1 = data[summoner];
		var idUsuario = data1["id"];
		buscarYactualizarPartida(idUsuario);
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
};

function buscarYactualizarPartida(idSummoner){
	$.ajax({
		url: 'https://lan.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA1/'+idSummoner+'?api_key=c23d24ee-d074-4000-a7f0-4711741570c4',
		type: 'GET',
		dataType: 'json',
		crossDomain : true
	})
	.done(function(data) {
		var participantes = data.participants;
		for(i = 0; i<participantes.length; i++){
			if(i<5)
			{
				var nombre = participantes[i].summonerName;
				var spell1 = participantes[i].spell1Id;
				var spell2 = participantes[i].spell2Id;
				$('.arriba > .team').first().append('<div class="summoner"><div class="champart-container"><img class="champart rojo" src="Champions/Equipo1_top.jpg"><div class="cortina"></div><img src="Tiers/PLATINUM.png" class="tier"><p class="tier-number">I</p><img src="Spells/Flash.png" class="spell uno"><img src="Spells/Teleport.png" class="spell dos"></div><p class="summoner-name">'+nombre+'</p></div>');
			}else{
				var nombre = participantes[i].summonerName;
				var spell1 = participantes[i].spell1Id;
				var spell2 = participantes[i].spell2Id;
				$('.abajo > .team').last().append('<div class="summoner"><div class="champart-container"><img class="champart rojo" src="Champions/Equipo1_top.jpg"><div class="cortina"></div><img src="Tiers/PLATINUM.png" class="tier"><p class="tier-number">I</p><img src="Spells/Flash.png" class="spell uno"><img src="Spells/Teleport.png" class="spell dos"></div><p class="summoner-name">'+nombre+'</p></div>');
			}
		}
	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});
	
}