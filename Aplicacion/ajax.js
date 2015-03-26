$(document).ready(function() {
    buscarJugador("Richard Snow");
});

// function obtenerImagenesSummoner(idSummoner) {
//     var d1 = $.ajax({
//         url: 'https://lan.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA1/' + idSummoner + '?api_key=6cfb7ff9-3d77-44cb-b007-f6bdb2d4fdc1',
//         type: 'GET',
//         dataType: 'json'
//     });

//     var d2 = $.ajax({
//         url: 'http://ddragon.leagueoflegends.com/cdn/5.5.3/data/en_US/champion.json',
//         type: 'GET',
//         dataType: 'json'
//     });

//     $.when(d1, d2).done(function(result1, result2) {

//         var champions = result2[0].data;
//         var participants = result1[0].participants;
//         var urls = {};

//         for (i = 0; i < participants.length; i++) {
//             var participant = participants[i];

//             var keys = Object.keys(champions);

//             for (key in keys) {
//                 var champion = champions[keys[key]];
//                 var a = key;
//                 if (participant.championId == champion.key) {

//                     urls[participant.summonerId] = "http://ddragon.leagueoflegends.com/cdn/img/champion/loading/" + champion.id + "_0.jpg";

//                 }

//             }
//         }
//         console.log(urls);
//     });
// }

function buscarJugador(summoner) {
    $.ajax({
            url: 'https://lan.api.pvp.net/api/lol/lan/v1.4/summoner/by-name/' + summoner + '?api_key=c23d24ee-d074-4000-a7f0-4711741570c4',
            type: 'GET',
            dataType: 'json'
        })
        .done(function(data) {
            var str = summoner.replace(" ", "").toLowerCase();
            var data1 = data[str];
            var idUsuario = data1["id"];
            console.log(str);
            console.log(idUsuario);
            buscarYactualizarPartida(idUsuario);
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });
};

function buscarYactualizarPartida(idSummoner) {
    var queryP = $.ajax({
        url: 'https://lan.api.pvp.net/observer-mode/rest/consumer/getSpectatorGameInfo/LA1/' + idSummoner + '?api_key=c23d24ee-d074-4000-a7f0-4711741570c4',
        type: 'GET',
        dataType: 'json',
        crossDomain: true
    });

    var queryChamp = $.ajax({
        url: 'http://ddragon.leagueoflegends.com/cdn/5.5.3/data/en_US/champion.json',
        type: 'GET',
        dataType: 'json'
    });

    $.when(queryP, queryChamp).done(function(result1, result2) {
        var champions = result2[0].data;
        var participantes = result1[0].participants;
        var posArriba = 0;
        var posAbajo = 0;
        var j=1;
        for (var i = 0; i < participantes.length; i++) {

            var keys = Object.keys(champions);
            for (key in keys) {

                var champion = champions[keys[key]];
                var a = key;

                if (participantes[i].championId == champion.key) {
                    if (i < 5) {
                        var asd = $('.summoner-name1-' + (i + 1)).text(participantes[i].summonerName);
                        var xhr = new XMLHttpRequest();
                        xhr.open('GET', 'http://ddragon.leagueoflegends.com/cdn/img/champion/loading/' + champion.id + '_0.jpg', true);
                        xhr.responseType = 'blob';
                        xhr.onload = function(e) {
                            if (j<=5){
                                var usuario = $('.jugador1-' + j + ' .champart');
                                usuario.attr({
                                    src: window.URL.createObjectURL(this.response)
                                });
                                j++;
                            }else{
                                $('.jugador2-'+(j-4)+' .champart').attr({
                                    src: window.URL.createObjectURL(this.response)
                                });
                                j++;
                            }
                        };
                        xhr.send();
                    }
                }
            }
        }
    });
};
