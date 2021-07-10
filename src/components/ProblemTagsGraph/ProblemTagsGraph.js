import { Doughnut } from 'react-chartjs-2';

const ProblemTagsGraph = ({userSubmissions}) => {
    
    let tag=new Map();
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
        let currTag=userSubmissions[i].problem.tags;
        
        for(let j=0;j<currTag.length;j++){
            if(!tag.has(currTag[j])){
                tag.set(currTag[j],1);
            }
            else{
                let temp=tag.get(currTag[j]);
                tag.set(currTag[j],temp+1)
            }
        }
        
    }
    
    var tagDsc = new Map([...tag.entries()].sort((a, b) =>  b[1]-a[1]));

    const data = {
        labels: [],
        datasets: [
          {
            label: '',
            data: [],
            backgroundColor: [
                "rgba(138, 216, 38, 0.8)",
                "rgba(228, 28, 28, 0.8)",
                "rgba(4, 119, 198, 0.8)",
                'rgba(198, 8, 140, 0.8)',
                'rgba(155, 159, 182, 0.8)',

                'rgba(63, 75, 172, 0.8)',
                'rgba(9, 135, 54, 0.8)',
                'rgba(6, 11, 110, 0.8)',
                'rgba(255, 206, 86, 0.8)',
                'rgba(75, 192, 192, 0.8)',
                'rgba(153, 102, 255, 0.8)',
                'rgba(255, 159, 64, 0.8)',
            ],
            borderColor: [
                "rgba(138, 216, 38, 1)",
                "rgba(228, 28, 28, 1)",
                "rgba(4, 119, 198, 1)",
                'rgba(198, 8, 140, 1)',
                'rgba(155, 159, 182, 1)',
                'rgba(63, 75, 172, 1)',
                'rgba(9, 135, 54, 1)',
                'rgba(6, 11, 110, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
            
          },
        ],
    };
    for(let[key,value] of tagDsc){
        data.labels.push(key);
        data.datasets[0].data.push(value);
    }

    const options={
        responsive: true,
        maintainAspectRatio: false,
        plugins:{   
            legend: {
            //   display: false
                position: "right",
                align:"center"
            },
            title: {
                display: true,
                text: 'Problem Tags'
            }
        }
    }
    return (
        <div>
            <Doughnut 
                data={data} 
                options={options}
                height={400}
                
                
            />
        </div>
    )
}

export default ProblemTagsGraph
