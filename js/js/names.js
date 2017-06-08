var temp = true;

function generateInsult() {
	temp = ~temp;
	if (temp)
		return "Away, you starvelling, you elf-skin, you dried neat's-tongue, bull's-pizzle, you stock-fish!";
	else
		return "Thou art a boil, a plague sore.";
}