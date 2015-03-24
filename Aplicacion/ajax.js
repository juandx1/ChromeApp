$(document).ready(function() {
	cerrarTodasLasVistas();

	chrome.storage.local.getBytesInUse(null, function(bytes){
		if(bytes == 0){
			$('.menu-toggle').addClass('desactivar');
			$('.startDiv').show();
			$('#startSumNameText').focus();
		}else{
			loadStorage();
		}
	});
});

function cargarSummonerView(summonerData, serverVersion){
	var xhr = new XMLHttpRequest();
	xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/'+serverVersion+'/img/profileicon/'+summonerData.idIcono+'.png', true);
	xhr.responseType = 'blob';
	xhr.onload = function(e) {
  		$('.summoner-icon').attr({
  			src: window.URL.createObjectURL(this.response)
  		});
		$('.welcomeImg').attr('src', window.URL.createObjectURL(this.response));
	};
	xhr.send();

	cerrarTodasLasVistasAnim('welcomeDiv');
	$('.menu-toggle').removeClass('desactivar');
	$('.owner-name').text(summonerData.nombreInvocador);
	$('.welcomeText').text('hello '+summonerData.nombreInvocador);
	$('.summoner-icon').removeClass('not-logged');
	$('.welcomeDiv').show(1000);
}

function iniciarSesion(summonerName){

	var summonerInfo=$.ajax({
		url: 'https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/by-name/'+summonerName+'?api_key=33b1e8e7-58e3-4e15-a8bb-157f50a879a5',
		type: 'GET',
		dataType: 'json'
	})
	.fail(function() {
		$('#informationText').fadeTo(0,1);
		if(summonerInfo.status == 400 || summonerInfo.status == 404){
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

        cargarSummonerView(infoInvocador,ver);

        chrome.storage.local.set({'sumInfo':infoInvocador,'svVersion': ver}, function() {
        	console.log('Saved');
        });
	});
}

function cerrarTodasLasVistas(){
	$('.currentMatch').hide();
	$('.startDiv').hide();
	$('.welcomeDiv').hide();
}

function cerrarTodasLasVistasAnim(vista){
	if(vista=='currentMatch'){
		$('.startDiv').hide(500);
		$('.welcomeDiv').hide(500);
	}else if(vista=='startDiv'){
		$('.currentMatch').hide(500);
		$('.welcomeDiv').hide(500);
	}else if(vista=='welcomeDiv'){
		$('.currentMatch').hide(500);
		$('.startDiv').hide(500);
	}
}

function abrirVista(vista){
	$('.'+vista).delay(1000).show(1000);
}

function loadStorage(){
	chrome.storage.local.get(function(info){
		cargarSummonerView(info.sumInfo,info.svVersion);
		console.log('logged in');
	});
}

function cerrarSesion(){
	chrome.storage.local.clear();
	$('#startSumNameText').val('');
	$('.owner-name').text('Not Logged');
	$('.summoner-icon').addClass('not-logged').attr('src', 'AppDesign/Perfil.png');
	$('#informationText').text('');
	$('#menu').removeClass('active');
	$('.menu-toggle').addClass('desactivar');
	cerrarTodasLasVistasAnim('startDiv');
	abrirVista('startDiv');
}


//Acciones de botones

$('#registerSummoner').submit(function( event ) {
	var summoner = $('#startSumNameText').val();
	console.log(summoner);
	$('#informationText').fadeTo(0,1);
	if(summoner==''){
		$('#informationText').text('Remember to fill the field!').fadeTo(3000, 0);
	}else{
		iniciarSesion(summoner);
	}
});

$( "#findLiveGame" ).click(function() {
	cerrarTodasLasVistasAnim('currentMatch');
	abrirVista('currentMatch');
	$('#menu').removeClass('active');
});

$('#home').click(function() {
	cerrarTodasLasVistasAnim('welcomeDiv');
	abrirVista('welcomeDiv');
	$('#menu').removeClass('active');
});

$('#logOut').click(function() {
	cerrarSesion();
});