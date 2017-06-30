<%@ Language="c#"%>
<%@ Import Namespace="System" %>
<%@ Import Namespace="System.Data" %>
<%@ Import NameSpace="iesDBlib" %>
<%@ Import Namespace="iesJSONlib" %>
<%
string Command = Request.Form["cmd"];

string connString = "Persist Security Info=False;database=db1007762_wpl12;server=mysql.site.infoquest.com;user id=u1007762_wpl_s12;pwd=#orang3froG";
iesDB myDB=new iesDB();
myDB.setConnectString(connString); 
myDB.Open(); //this line takes 15s

if(Command=="getname") 
{
	string senTag = "[SEN]";
	
	Random r = new Random();
	if(r.Next()%8==1) //so that sometimes it starts with a question
	{
		senTag = "[SEN?]";
	}
	string sentence = a_an(replaceTags(senTag)); //a_an also capitalizes the first letter
	string punct = ".";
	if(r.Next()%8==1)
	{
		punct = "!";
	}
	
	if(sentence[sentence.Length - 1]!='?'&&sentence[sentence.Length - 1]!='!'&&sentence[sentence.Length - 1]!='.')
	{
		sentence += punct;
	}
	
	Response.Write(sentence);
}
else if(Command=="add")
{
	string WordType = Request.Form["wordtype"];
	string Word = Request.Form["word"];
	if(Word[Word.Length-1] == '?')
	{
		WordType = "question";
	}
	if(Word=="")
	{
		Response.Write("You can't add nothing");
	}
	else
	{
		string query = "SELECT * FROM schwabnames WHERE wordtype = '"+WordType+"' AND word = '" + Word + "'";
		
		iesJSON zew = new iesJSON();
		zew = myDB.GetFirstRow(query);

		if(zew._value==null)
		{
			string addQuery = "INSERT INTO schwabnames(wordtype, word) VALUES('" + WordType +"','"+ Word +"')";
			if(myDB.ExecuteSQL(addQuery))
			{
				Response.Write(Word + " successfully added to "+WordType+"s");
			}
			else
			{
				Response.Write("fail");
			}
		}
		else Response.Write(Word + " has already been added to " +WordType+"s"); 
	}
}
else if(Command=="delete")
{
	string WordType = Request.Form["wordtype"];
	string Word = Request.Form["word"];
	if(Word[Word.Length-1] == '?')
	{
		WordType = "question";
	}
	string query = "SELECT * FROM schwabnames WHERE wordtype = '"+WordType+"' AND word = '" + Word + "'";
	
	iesJSON zew = new iesJSON();
	zew = myDB.GetFirstRow(query);
	if(zew._value!=null)
	{
		string deleteQuery = "DELETE FROM schwabnames WHERE wordtype = '"+WordType+"' AND word = '" + Word + "'";
		if(myDB.ExecuteSQL(deleteQuery))
		{
			Response.Write(Word + " successfully deleted from " +WordType+"s");
		}
		else
		{
			Response.Write("fail");
		}
	}
	else 
	{
		string likeQuery = "SELECT * FROM schwabnames WHERE word like '%" + Word + "%'";
		iesJSON likezew = new iesJSON();
		likezew = myDB.GetFirstRow(likeQuery);
		if(likezew._value!=null)
		{
			Response.Write(Word + " isn't one of the "+ WordType +"s, dufus! did you mean '" + likezew["word"].CString() + "'?");
		}
		else Response.Write(Word + " isn't one of the "+ WordType +"s, dufus!");
	}
	
	
}
else Response.Write("Not a valid comman");
myDB.Close();
%>

<script language='c#' runat='server'>
public string parse(string tag)
{
	string connString = "Persist Security Info=False;database=db1007762_wpl12;server=mysql.site.infoquest.com;user id=u1007762_wpl_s12;pwd=#orang3froG";
	iesDB myDB=new iesDB();
	myDB.setConnectString(connString);
	myDB.Open();
	string wordType;
	if(tag.ToLower()=="name")
	{
		wordType = "name";
	}
	else if(tag.ToLower()=="adj")
	{
		wordType = "adjective";
	}
	else if(tag.ToLower()=="adv")
	{
		wordType = "adverb";
	}
	else if(tag.ToLower()=="noun")
	{
		wordType = "noun";
	}
	else if(tag.ToLower()=="pnoun")
	{
		wordType = "noun";
	}
	else if(tag.ToLower()=="phr")
	{
		wordType = "phrase";
	}
	else if(tag.ToLower()=="sen")
	{
		wordType = "sentence";
	}
	else if(tag.ToLower()=="sen?")
	{
		wordType = "question";
	}
	else
	{
		wordType = "adjective";
	}
	
	iesJSON json = new iesJSON();
	string word = "1";
	
	string wordQuery = "SELECT * FROM schwabnames where wordtype = '"+ wordType +"' ORDER BY RAND() LIMIT 1";
	
	
	json=myDB.GetFirstRow(wordQuery);
	word = json["word"].CString();
	
	myDB.Close();
	if(tag.ToLower()=="pnoun")
	{
		word = makePlural(word);
	}
	return word;
	//return "bro";
}
public string replaceTags(string sentence, int index = 0)
{
	string parsedString = "";
	bool inTag = false;
	string tag = "";
	for(int i = 0; i < sentence.Length; i++)
	{
		
		if(sentence[i]=='[')
		{
			inTag = true;
		}
		else if(sentence[i]==']')
		{
			inTag = false;
			if(index < 5)
			{
				parsedString += replaceTags(parse(tag), index + 1);
			}
			else parsedString += "nameless";
			tag = "";
		}
		else if(inTag)
		{
			tag += sentence[i];
		}
		else if(inTag==false)
		{
			parsedString += sentence[i]; 
		}
	}
	return parsedString;
	//return parse(parsedString);
}
public string a_an(string sentence)
{
	string finalSentence = "";
	finalSentence += Char.ToUpper(sentence[0]);
	for(int i = 1; i < sentence.Length - 3; i++)
	{
		if(sentence[i] == ' ' && sentence[i+1] == 'a' && sentence[i+2] == ' ')
		{
			if(sentence[i+3]=='a'||sentence[i+3]=='e'||sentence[i+3]=='i'||sentence[i+3]=='o'||sentence[i+3]=='u')
			{
				finalSentence += " an ";
				i+= 2;
			}
			else finalSentence += sentence[i];
		}
		else finalSentence += sentence[i];
	}
	finalSentence += sentence[sentence.Length - 3];
	finalSentence += sentence[sentence.Length - 2];
	finalSentence += sentence[sentence.Length - 1];
	return finalSentence;
}
public string makePlural(string noun)
{
	char last = noun[noun.Length - 1];
	char nlast = noun[noun.Length - 2];
	
	if(last=='s'||(nlast=='s'&&last=='h')||(nlast=='c'&&last=='h')||last=='x'||last=='z')
	{
		return noun + "es";
	}
	else if(nlast!='e'&&nlast!='o'&&nlast!='a'&&last=='y')
	{
		return noun.Substring(0,noun.Length-1) + "ies";
	}
	else return noun + "s";
}
</script>
