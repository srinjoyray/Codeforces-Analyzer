import { Bar } from 'react-chartjs-2';

const IndexGraph = ({userSubmissions}) => {
    let index= new Map();
    let id=new Map();
    for(let i=0;i<userSubmissions.length;i++){
        if(userSubmissions[i].verdict!=="OK"){
            continue;
        }
        let key=userSubmissions[i].contestId + userSubmissions[i].problem.index;
        if(id.has(key)){
            continue;
        }
        id.set(key,true);
        let currIndex=userSubmissions[i].problem.index[0];
        if(currIndex<'A' || currIndex > 'Z'){
          continue;
        }
        if(!index.has(currIndex)){
            index.set(currIndex,1);
        }
        else{
            let temp=index.get(currIndex);
            index.set(currIndex,temp+1)
        }
    }
    
    var indexAsc = new Map([...index.entries()].sort());
    const data = {
        labels: [],
        datasets: [
          {
            label: 'Problem Count',
            data: [],
            backgroundColor: [
              'rgba(228, 28, 28, 0.8)',
            ],
            borderColor: [
              'rgba(228, 28, 28, 1)',
            ],
            borderWidth: 2,
          },
        ],
    };
    for(let[key,value] of indexAsc){
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }
    

    const options = {
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
          },
          legend: {
            display: false
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

export default IndexGraph
