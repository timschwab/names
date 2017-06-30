$(document).ready(function() {
	var names = ['Biffy','Daniel','Adam','Corrie'];
	var advectives = ['fat','googly','freakish','jaundiced'];
	var nouns = ['lard','wizard','molecule','turd'];
	//insert after head a li 
	var spewNames = false;
	
	setInterval(function(){
		if(spewNames)
		{
			$.post("names.aspx", { cmd: 'getname'}, function (data) {
				
				$('h1').after('<li class="spewing" style="color: rgb('+ (Math.floor(Math.random() * 200 + 56)).toString() +','+ (Math.floor(Math.random() * 200 + 56)).toString() +','+ (Math.floor(Math.random() * 200 + 56)).toString() +');">'+ data +'</li>');
				
			});
		}
	}, 2000);
	
	$('#spewnames').click(function() {
		if($(this).hasClass('spewon')) {
			$(this).removeClass('spewon');
			spewNames = false;
		}
		else {
			$(this).addClass('spewon');
			spewNames = true;
		}
	});
	
	$('input.cmd').click( function () {
		$('form').submit( function(e) {
			e.preventDefault();
		});
		var wordType = $('input[type=radio]:checked').val();
		var Word = $('#word').val();
		var command = $(this).val();
		$.post("names.aspx",{cmd:command,wordtype:wordType,word:Word}, function (data) {
			$('h1').after('<li class="spewing" style="color: white;">'+ data +'</li>');
				
		});
		$('#word').val("");
	});
	$('input[value=sentence]').click( function() {
		if($('#word').val()=='') {
			$('#word').val('ex: [NAME] is a [ADJ] [NOUN]');
		}
		
		$('#word').click( function() {
			if($('#word').val()=='ex: [NAME] is a [ADJ] [NOUN]') {
				$(this).val('');
			}
			});
		$('input[value=sentence]').siblings().click( function() {
			if($('#word').val()=='ex: [NAME] is a [ADJ] [NOUN]') {
				$('#word').val('');
			}
		});
	});
		$('input[value=phrase]').click( function() {
		if($('#word').val()=='') {
			$('#word').val('ex: but don`t tell [NAME]');
		}
		
		$('#word').click( function() {
			if($('#word').val()=='ex: but don`t tell [NAME]') {
				$(this).val('');
			}
			});
		$('input[value=phrase]').siblings().click( function() {
			if($('#word').val()=='ex: but don`t tell [NAME]') {
				$('#word').val('');
			}
		});
	});
	
	//Math.floor(Math.random() * 256)
});