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