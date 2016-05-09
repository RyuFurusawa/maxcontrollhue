//autowatch = 1;
 inlets = 4;
 outlets = 2;
var method="put";
var key="newdeveloper"
var id=1;
var lightSwitch=[1,1,1,1,1,1,1];  //on off　
var bri =10;
var sat =100;
var hue =2000;
var ip ="192.168.11.2";
var address ="http://"+ip+"/api/"+key+"/lights/"+id+"/state";
var dictName =jsarguments[1];//jsファイル名のあとのAurguments
var rDict= "response_"+dictName ; 
var ajaxreq; 
var postdata;

function setip(_ip)
{
	ip = _ip;
	 post();
}
function setkey(_key)
{
	key = _key;
	post(key);
	 post();
}
 function authorize()
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("POST",'http://' + ip  +'/api/' );
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send('{“devicetype”: “test user”,“username”: '+key+'}');
} 
function getlights()
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("GET",'http://' + ip + '/api/' + key );
	ajaxreq.onreadystatechange = readystatechange_outlet1out;
	ajaxreq.send();
}
 
function on(id, state)
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	if (state == 1)
		ajaxreq.send('{"on": true}');
	if (state == 0)
		ajaxreq.send('{"on": false}');
}
 
function brightness(id, _bri)
{
	post(id);
	post(_bri);
	
  if (_bri==0 && lightSwitch[id]==1) {
	post("oFF");
    lightSwitch[id]=0;
    on(id,0);
  }else if (_bri > 0 && lightSwitch[id]==0){
		post("ON");
    lightSwitch[id]=1;
    on(id,1);

  }else{
	post("new Value lightSwitch="+ lightSwitch[id]);
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send('{"bri": ' + _bri + '}');
 
  };
}
function satulation(id, _sat)
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send('{"sat": ' + _sat + '}');
}
function hueness(id, _hue)
{
	ajaxreq = new XMLHttpRequest();
	ajaxreq.open("PUT",'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send('{"hue": ' + _hue + '}');
}
//hueValurセット
var valueset = function list()
  {
    post("the list contains",arguments.length,  arguments[0],  "valueSet");
       post();
id = arguments[0];
address ="http://"+ip+"/api/"+key+"/lights/"+id+"/state";
post( "ID:"+lightSwitch[id]);
method="put";

if (arguments[1]==0 && lightSwitch[id]==1) {
  post(": OFF" );
  lightSwitch[id]=0;
  postdata='{"on": false}';
  bang();

  }else if (arguments[1] > 0 && lightSwitch[id]==0) {
   post(": ON" );
  lightSwitch[id]=1;
  bri =arguments[1];
  sat =arguments[2];
  hue =arguments[3];
  postdata='{"on": true,"bri":'+ bri + ',"hue":'+hue+',"sat":'+sat+'}';
  bang();
  }else{
  post();
  bri =arguments[1];
  sat =arguments[2];
  hue =arguments[3];
  postdata='{"bri": ' + bri + ',"hue":'+hue+',"sat":'+sat+'}';
   post("bri :"+bri);
	post();
   post("sat :"+sat);
	post();
	post("hue :"+hue);  
bang();
};
post();
}

var msg_int = function(r){
    switch(this.inlet){
        case 0:
        post("inlet_0\n");
       id = r;
       address ="http://"+ip+"/api/"+key+"/lights/"+id+"/state";

       //bang();
      break;

        case 1:
        post("inlet_1\n");
        brightness(id,r) 
       
        break;
         case 2:
        post("inlet_2\n");
        satulation(id,r) 
        break;
          case 3:
        post("inlet_3\n");
       	hueness(id,r) 
        break;

        default:
        break;
    }
}

function bang()
{

ajaxreq = new XMLHttpRequest();
	ajaxreq.open(method,'http://' + ip + '/api/' + key +'/lights/' + id + '/state');
	ajaxreq.onreadystatechange = readystatechange_parsejson;
	ajaxreq.send(postdata);

}
	
// Here we fetch data and use javascript's internal JSON.parse method to read
// individual elements from and array of objects (aka dictionaries)
function readystatechange_parsejson()
{
	if (this.readyState ==4){
		post(this.responseText);
		post();
	}
}
function readystatechange_outlet1out()
{
	if (this.readyState ==4){
	
		outlet(1,this.responseText);
	}
}
 
 