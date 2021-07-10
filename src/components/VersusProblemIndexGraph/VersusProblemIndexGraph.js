import { Bar } from 'react-chartjs-2';

const VersusProblemIndexGraph = ({userSubmissions1,userSubmissions2,username1,username2}) => {

    let index = new Map();
    let index1= new Map();
    let id1=new Map();
    for(let i=0;i<userSubmissions1.length;i++){
        if(userSubmissions1[i].verdict!=="OK"){
            continue;
        }
        let key1=userSubmissions1[i].contestId + userSubmissions1[i].problem.index;
        if(id1.has(key1)){
            continue;
        }
        id1.set(key1,true);
        let currIndex1=userSubmissions1[i].problem.index[0];
        if(currIndex1<'A' || currIndex1 > 'Z'){
            continue;
        }
        if(!index1.has(currIndex1)){
            index1.set(currIndex1,1);
        }
        else{
            let temp=index1.get(currIndex1);
            index1.set(currIndex1,temp+1);
        }
        index.set(currIndex1,1);
    }

    let index2= new Map();
    let id2=new Map();
    for(let i=0;i<userSubmissions2.length;i++){
        if(userSubmissions2[i].verdict!=="OK"){
            continue;
        }
        let key2=userSubmissions2[i].contestId + userSubmissions2[i].problem.index;
        if(id2.has(key2)){
            continue;
        }
        id2.set(key2,true);
        let currIndex2=userSubmissions2[i].problem.index[0];
        if(currIndex2<'A' || currIndex2 > 'Z'){
            continue;
        }
        if(!index2.has(currIndex2)){
            index2.set(currIndex2,1);
        }
        else{
            let temp=index2.get(currIndex2);
            index2.set(currIndex2,temp+1)
        }
        index.set(currIndex2,1);
    }

    const data = {
        labels: [],
        datasets: [
          {
            label: username1,
            data: [],
            backgroundColor: [
              'red',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
          },
          {
            label: username2,
            data: [],
            backgroundColor: [
              'blue',
            ],
            borderColor: [
              'rgba(255, 99, 132, 1)',
            ],
            borderWidth: 2,
          },
        ],
    };

    
    var indexAsc = new Map([...index.entries()].sort());

    for(let[key,value] of indexAsc){
        data.labels.push(key);
        data.datasets[0].data.push(index1.has(key)? index1.get(key) :0);
        data.datasets[1].data.push(index2.has(key)? index2.get(key) :0);  
    }
    
    const options = {
        // barValueSpacing: 20,
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
        plugins: {
          title: {
              display: true,
              text: 'Problem Index'
          }
        },
        responsive: true,
        maintainAspectRatio: false,
    };

    return (
        <div>
            <Bar 
                data={data} 
                options={options}	           
                height={400}
            />
        </div>
    )
}

export default VersusProblemIndexGraph
