
function changeNickName(){
    const arr1 = ['한경대','수상한','비열한','괘씸한','순박한','작은','거대한','졸렬한','귀여운','괜찮은','검은','대단한','중요한','특별한','경제적인','늙은','정치적인','강한','철부지','술고래','사기꾼','기요미','갤럭시','가난한','소박한','비겁한','야비한','구체적','마이웨이','중국집','근본','중2병'];
    const arr2 = ['너구리','오리','총각','할머니','말티즈','푸들','뱅갈고양이','인도인','기러기','스위스','토마토','별똥별','우영우','조랑말','대머리','중국인','노숙자','반란자','카뮈','니체','다오','무지','양배추','숟가락','차라투스트라','코로나'];

    var randNum1 = Math.round(Math.random()*arr1.length);
    var randNum2 = Math.round(Math.random()*arr2.length);
    var randNum3 = Math.round(Math.random()*1000);

    let nickName;
    nickName = arr1[randNum1]+" "+arr2[randNum2] +" #" +randNum3 ;
    console.log(nickName);
    return nickName;
}

// 랜덤 닉네임 생성기임
