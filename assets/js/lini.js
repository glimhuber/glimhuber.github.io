let tablasli={};
let factoMomentos=[];
function run(){
    fetch('Libro4.json')
    .then(function(res) {return res.json();})
    .then(function(data){tablasli=data;})

   /*var abecedario = "";
    for (var i = 65; i <= 90; i++) {
      console.log(String.fromCharCode(i));
    }*/
}
function redondear(x,decimales){
	var texto=x+""
	var poco=texto.search("e-")
	if(poco>=0)
	{
		var decimales_salida=texto.slice(poco+2)*1
		return decimales<decimales_salida?0:x
	}
	var mucho=texto.search("e+")
	if(mucho>=0)
	{
		return x
	}
	var punto=texto.search("\\.")
	var cortado=texto.slice(0,punto+decimales+2)
	var longitud=cortado.length
	var decimales_ingresado=longitud-punto-1
	for(var i=decimales_ingresado;i<=decimales;i++)
	{
		cortado+="0"
	}
	longitud=cortado.length
	var último=cortado.slice(longitud-1)
	var anteúltimo=cortado.slice(longitud-2,longitud-1)
	if(último*1>=5)
	{
		anteúltimo=(anteúltimo*1)+1
	}
	cortado=cortado.slice(0,longitud-2)+""+anteúltimo
	return cortado*1
}
function NumeroTramos(){
    let NumTramos = document.getElementById("NumTramos").value;
    if((NumTramos <=8) && (NumTramos>=2)){
        if(NumTramos != ""){
            AsignarTramos(NumTramos);
        }else{
            document.getElementById("NumTramos").value=1;
            AsignarTramos(1);
        }
    }else{
        document.getElementById("NumTramos").value=2;
        AsignarTramos(2);
    }
   
}
function ponerHtml(id,html){
    document.getElementById(id).innerHTML = html;
}
function AsignarTramos(tramos){
    //AlturaViga
    let PlantiAltViga =`
                <table>
                <tbody>
                    <tr>
                        <td>h<sub>c</sub></td>
                        <td><input type="number" class="inputTramo" id="hc" min="1" pattern="^[0-9]+" value="1"></td>
                    </tr>
    `;
    for (let i = 1; i < tramos; i++) {
        let letra=String.fromCharCode(64+i);
        PlantiAltViga +=`
                <tr>
                <td>r<sub>${letra}</sub>h<sub>c</sub></td>
                <td><input type="number" class="inputTramo" id="r${letra}hc" min="1" pattern="^[0-9]+" value="1.5"></td>
                </tr>`;
    }
    PlantiAltViga +=`</tbody></table>`;
    ponerHtml('AlturaViga',PlantiAltViga);
    //************************************************** */

    let plantiTabla=`<table><tbody><tr><td>Tramo N°</td>`;
    for (let i = 1; i <= tramos; i++) {
        plantiTabla +=`<td>${i}</td>`;
    }
    plantiTabla +=`</tr><tr><td>Long.Viga(m)</td>`;
    for (let i = 1; i <= tramos; i++) {
        plantiTabla +=`<td><input type="number" class="inputTramo" id="inTramo${i}" 
        onkeyup="inputDato()" min="1" pattern="^[0-9]+" value="15"></td>`;
    }
    plantiTabla +=`</tr><tr><td>a<sub>n</sub>L<sub>n</td>`;
    for (let i = 1; i+1 <= tramos; i++) {
        plantiTabla +=`<td>a<sub>B</sub>L<sub>${i}</sub>||a<sub>A</sub>L<sub>${i+1}<sub></td>`;
    }
    plantiTabla +=`</tr><tr><td>Cartela</td>
    <input type="hidden" id="aAL1" value="0">
    `;
    for (let i = 1; i+1 <= tramos; i++) {
        plantiTabla +=`<td>
        <input type="number" class="inputTramo" id="aBL${i}" placeholder=""
        onkeyup="inputDato()" min="1" pattern="^[0-9]+" value="3">

        <input type="number" class="inputTramo" id="aAL${i+1}" placeholder=""
        onkeyup="inputDato()" min="1" pattern="^[0-9]+" value="3">
        </td>`;
    }
    plantiTabla +=`<input type="hidden" id="aBL${tramos}" value="0"></tr></tbody></table>`;
    ponerHtml('tablaTramo',plantiTabla);
    //************************************************** */

    let plantiResult =`<tr><td class="result">tramo Nº</td>`;
    for (let i = 1; i <= tramos; i++) {
        plantiResult +=`<td class="result">${i}-${i+1}</td>`;
    }
    plantiResult +=`</tr>`;

    plantiResult +=`<tr><td class="result">a<sub>A</sub></td>`;
    for (let i = 1; i <= tramos; i++) {
        plantiResult +=`<td class="result">${i}</td>`;
    }
    plantiResult +=`</tr>`;

    plantiResult +=`<tr><td class="result">a<sub>B</sub></td>`;
    for (let i = 1; i <= tramos; i++) {
        plantiResult +=`<td class="result">${i}</td>`;
    }
    plantiResult +=`</tr>`;

    
    for (let i = 1; i <= tramos-1; i++) {
        let letra=String.fromCharCode(64+i);
        plantiResult +=`</tr><td class="result">r<sub>${letra}</sub></td>`;
        for (let j = 1; j <= tramos; j++) {
        plantiResult +=`<td class="result">${j}</td>`;
        }
        plantiResult +=`</tr>`;
    }
    ponerHtml('resultadoTramos',plantiResult);
    inputDato();
}
function inputDato(){
    let NTramo = document.getElementById("NumTramos").value;
    //console.log(id);
    let resultadoTramos =`<tr><td class="result">tramo Nº</td>`;
    for (let i = 1; i <= NTramo; i++) {
        resultadoTramos +=`<td class="result">${i}-${i+1}</td>`;
    }
    resultadoTramos +=`</tr>`;

    resultadoTramos +=`<tr><td class="result">a<sub>A</sub></td>`;
    for (let i = 1; i <= NTramo; i++) {
        let aA=document.getElementById("aAL"+i).value/document.getElementById("inTramo"+i).value;
        resultadoTramos +=`<td class="result" id="aA${i}">${aA}</td>`;
    }
    resultadoTramos +=`</tr>`;

    resultadoTramos +=`</tr><td class="result">r<sub>A</sub></td>`;
    for (let j = 1; j <= NTramo; j++) {
        let rAhc=0;
        let hc=document.getElementById("hc").value;
        if(j==1){rAhc=hc;}
        else{rAhc=document.getElementById("rAhc").value;}
        let rA= (rAhc-hc)/(hc);
        resultadoTramos +=`<td class="result" id="rA${j}">${rA}</td>`;
    }
    resultadoTramos +=`</tr>`;

    resultadoTramos +=`<tr><td class="result">a<sub>B</sub></td>`;
    for (let i = 1; i <= NTramo; i++) {
        let aB=document.getElementById("aBL"+i).value/document.getElementById("inTramo"+i).value;
        resultadoTramos +=`<td class="result" id="aB${i}">${aB}</td>`;
    }
    resultadoTramos +=`</tr>`;

    if(NTramo>=3){
        resultadoTramos +=`</tr><td class="result">r<sub>B</sub></td>`;
        for (let j = 1; j <= NTramo; j++) {
            let rBhc=0;
            let hc=document.getElementById("hc").value;
            if(j==NTramo){rBhc=hc;}
            else{rBhc=document.getElementById("rBhc").value;}
            let rB= (rBhc-hc)/(hc);
            resultadoTramos +=`<td class="result" id="rB${j}">${rB}</td>`;
        }
        resultadoTramos +=`</tr>`;
    }else{
        resultadoTramos +=`</tr><td class="result">r<sub>B</sub></td>`;
        for (let j = 1; j <= NTramo; j++) {
            let rAhc=0;
            let hc=document.getElementById("hc").value;
            if(j==NTramo){rAhc=hc;}
            else{rAhc=document.getElementById("rAhc").value;}
            let rB= (rAhc-hc)/(hc);
            resultadoTramos +=`<td class="result" id="rB${j}">${rB}</td>`;
        }
        resultadoTramos +=`</tr>`;
    }
    ponerHtml('resultadoTramos',resultadoTramos);
    //buscarTabla(NTramo);
}
function buscarTabla(id){
    console.log(id);
    factoMomentos=[];
    let tramos = document.getElementById("NumTramos").value;
    if(tramos==""){console.log("ingrese los tramos");}
    else{
        let busTbTramo=[];
        let aA=0;let rA=0;let aB=0;let rB=0;
        for (let i = 1; i <= tramos; i++) {
            if(i==tramos){
                aA=(redondear(parseFloat(document.getElementById("aB"+i).innerHTML),1))*10;
                rA=(redondear(parseFloat(document.getElementById("rB"+i).innerHTML),1))*10;
                aB=(redondear(parseFloat(document.getElementById("aA"+i).innerHTML),1))*10;
                rB=(redondear(parseFloat(document.getElementById("rA"+i).innerHTML),1))*10;
                console.log(aA+":"+rA+":"+aB+":"+rB);
            }else{
                aA=(redondear(parseFloat(document.getElementById("aA"+i).innerHTML),1))*10;
                rA=(redondear(parseFloat(document.getElementById("rA"+i).innerHTML),1))*10;
                aB=(redondear(parseFloat(document.getElementById("aB"+i).innerHTML),1))*10;
                rB=(redondear(parseFloat(document.getElementById("rB"+i).innerHTML),1))*10;
                console.log(aA+":"+rA+":"+aB+":"+rB);
            }
            busTbTramo[i]=id+aA.toString()+rA.toString()+aB.toString()+rB.toString();
            let resultado=tablasli.filter((item) => item.codli == busTbTramo[i]);
            factoMomentos.push(resultado);
        }
        //*************************************************************** */
        let factoresDat =`<tr><td>Factores</td>`;
        factoMomentos.forEach(fam => {
            factoresDat +=`<td>tabla${fam[0].TABLA}</td>`;
        });
        factoresDat +=`</tr>`;

        let i=0;
        factoresDat +=`<tr><td>de Rigidez</td>`;
        factoMomentos.forEach(fam => {
            i++;
            if(tramos==i){
                factoresDat +=`<td>K<sub>AB</sub>=${fam[0].KBA}<br>K<sub>BA</sub>=${fam[0].KAB}</td>`;
            }else{
                factoresDat +=`<td>K<sub>AB</sub>=${fam[0].KAB}<br>K<sub>BA</sub>=${fam[0].KBA}</td>`;
            }
            
        });
        factoresDat +=`</tr>`;
        i=0;

        factoresDat +=`<tr><td>de Transporte</td>`;
        factoMomentos.forEach(fam => {
            i++;
            if(tramos==i){
                factoresDat +=`<td>C<sub>AB</sub>=${fam[0].CBA}<br>C<sub>BA</sub>=${fam[0].CAB}</td>`;
            }else{
                factoresDat +=`<td>C<sub>AB</sub>=${fam[0].CAB}<br>C<sub>BA</sub>=${fam[0].CBA}</td>`;
            }
            
        });
        factoresDat +=`</tr>`;
        ponerHtml('factores',factoresDat);

        let RigidezModf =`<tr><td>Rigidez Modif.</td>`;
        let mfKAB=0;let mfKBA=0;let colorRM="";
        i=0;
        factoMomentos.forEach(fam => {
            i++;
            if(i==1){
                colorRM="background: #62ff004d;";
                //mfKBA=KBA(1-(CAB*CBA));
                mfKAB=0;
                mfKBA=(fam[0].KBA)*(1-((fam[0].CAB)*(fam[0].CBA)))
            }else{
                if(i==tramos){
                    colorRM="background: #62ff004d;";
                    //mfKAB=KAB(1-(CAB*CBA));
                    mfKAB=(fam[0].KBA)*(1-((fam[0].CAB)*(fam[0].CBA)))
                    mfKBA=0;
                }else{
                    
                    if(i % 2 === 0){colorRM="background: #00c4ff4d;";}else{colorRM="background: #00c4ff78;";}
                    //mfKAB=1*KAB;
                    mfKAB=1*(fam[0].KBA);
                    //mfKBA=1*KBA;
                    mfKBA=1*(fam[0].KAB);
                }
            }
            RigidezModf +=`<td style="${colorRM}">K<sub>AB</sub>=${mfKAB}::K<sub>BA</sub>=${mfKBA}</td>`;
        });
        RigidezModf +=`</tr>`;
        ponerHtml('rigidezModif',RigidezModf);
        /*for (let i = 0; i <= tramos; i++) {
            if(i==0){let factoresDat =``;}
            factoresDat +=`<td>tablaX</td>`;
        }*/
        console.log("::::::::::::::::::::::::::::::::::::::::::::::::");
        console.log(factoMomentos);
    }
}