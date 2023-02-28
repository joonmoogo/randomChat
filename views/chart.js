const data = {
  labels: [
    'ISTJ','ISFJ','INFJ','INTJ','ISTP','ISFP','INFP','INTP'
  ],
  datasets: [{
    label: '내향 MBTI',
    data: [ISTJ,ISFJ,INFJ,INTJ,ISTP,ISFP,INFP,INTP],
    backgroundColor: [
      'rgb(25,25,112)',
      'rgb(138,43,226)',
      'rgb(255,0,255)',
      'rgb(255,0,0)',
      'rgb(250,128,114)',
      'rgb(255,140,0)',
      'rgb(255,215,0)',
      'rgb(128,128,0)',
      'rgb(124,252,0)',
      'rgb(0,255,255)',
      'rgb(127,255,212)'
    ],
    hoverOffset: 4
  }]
};

const config = {
  type: 'bar',
  data: data,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

const data2 = {
  labels: [
    'ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'
  ],
  datasets: [{
    label: '외향 MBTI',
    data: [ESTP,ESFP,ENFP,ENTP,ESTJ,ESFJ,ENFJ,ENTJ],
    backgroundColor: [
      'rgb(255,0,0)',
      'rgb(250,128,114)',
      'rgb(255,140,0)',
      'rgb(255,215,0)',
      'rgb(128,128,0)',
      'rgb(124,252,0)',
      'rgb(0,255,255)',
      'rgb(127,255,212)',
      'rgb(25,25,112)',
      'rgb(138,43,226)',
      'rgb(255,0,255)',
    ],
    hoverOffset: 4
  }]
};

const config2 = {
  type: 'bar',
  data: data2,
  options: {
    scales: {
      y: {
        beginAtZero: true
      }
    }
  },
};

'ESTP','ESFP','ENFP','ENTP','ESTJ','ESFJ','ENFJ','ENTJ'

const data1 = {
    labels: [
      '여자',
      '남자',
      '중성',
    ],
    datasets: [{
      label: 'count',
      data: [female, male, animal],
      backgroundColor: [
        'rgb(255, 99, 132)',
        'rgb(54, 162, 235)',
        'rgb(255, 205, 86)',
      ],
      hoverOffset: 4
    }]
  };

  const config1 = {
    type: 'doughnut',
    data: data1,
    options: {
      plugins:{
        
      }
    }
  };

  
//   const date = new Date();
//   const day = date.getDate();
//   const month = date.getMonth()+1;