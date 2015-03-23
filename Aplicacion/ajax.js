$(document).ready(function($) {
	$('.currentMatch').hide();
});

function buscarPartida(summoner) {
	$.ajax({
		url: 'https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/by-name/juandx1?api_key=c23d24ee-d074-4000-a7f0-4711741570c4',
		type: 'GET',
		dataType: 'json'
	})
	.done(function(data) {
		var data1 = data[summoner];
		$('#id').append(" id - " + data1.id);

	})
	.fail(function() {
		console.log("error");
	})
	.always(function() {
		console.log("complete");
	});

};

function actualizarDatosInvocador(summonerData, serverVersion){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/'+serverVersion+'/img/profileicon/'+summonerData.idIcono+'.png', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
  		$('.summoner-icon').attr({
  			src: window.URL.createObjectURL(this.response)
  		});
	};
	xhr.send();

	$('.owner-name').text(summonerData.nombreInvocador);
}

function obtenerInformacionPersonal(summonerName){

	var summonerInfo=$.ajax({
		url: 'https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/by-name/'+summonerName+'?api_key=33b1e8e7-58e3-4e15-a8bb-157f50a879a5',
		type: 'GET',
		dataType: 'json'
	})
	.fail(function() {
		$('#informationText').fadeTo(0,1);
		if(summonerInfo.status == 400){
			$('#informationText').text('Summoner not found!').fadeTo(2000, 0);
		}
	});
	

	var version=$.ajax({
		url: 'https://global.api.pvp.net/api/lol/static-data/lan/v1.2/versions?api_key=33b1e8e7-58e3-4e15-a8bb-157f50a879a5',
		type: 'GET',
		dataType: 'json',
	});
	$.when(summonerInfo, version).done(function(result1,result2){
		var data1 = result1[0][summonerName.replace(" ","").toLowerCase().trim()];
        var infoInvocador = {'nombreInvocador':data1.name,'idInvocador':data1.id,'idIcono':data1.profileIconId};
        var ver = result2[0][0];
        actualizarDatosInvocador(infoInvocador,ver);
        $('.summoner-icon').removeClass('not-logged')
        return true;
	});
}

$('#registerSummoner').submit(function( event ) {
	obtenerInformacionPersonal($('#startSumNameText').val());
	// $('.startDiv').hide('slow/500/fast');
	// $('.currentMatch').show('slow/500/fast');
	// $('#menu').addClass('active');
});

$( "#profile" ).click(function() {
	$('.startDiv').hide('slow/500/fast');
	$('.currentMatch').show('slow/500/fast');
});