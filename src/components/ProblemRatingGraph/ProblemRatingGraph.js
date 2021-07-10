import { Bar } from 'react-chartjs-2';

const ProblemRatingGraph = ({userSubmissions}) => {
    
    let rating = new Map();
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
        let currRating=userSubmissions[i].problem.rating;
        if(currRating===undefined){
            continue;
        }
        currRating=parseInt(currRating);
        if(!rating.has(currRating)){
            rating.set(currRating,1);
        }
        else{
            let temp=rating.get(currRating);
            rating.set(currRating,temp+1);
        }
    }
   
    var ratingAsc = new Map([...rating.entries()].sort(function order(key1, key2) {
        if (parseInt(key1) < parseInt(key2)) return -1;
        else if (parseInt(key1) > parseInt(key2)) return +1;
        else return 0;
    }));
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
    for(let[key,value] of ratingAsc){
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
              text: 'Problem Rating'
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

export default ProblemRatingGraph
