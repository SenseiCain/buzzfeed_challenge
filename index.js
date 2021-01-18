document.addEventListener("DOMContentLoaded", async () => {
	const repoJSON = await getRepos();
	const names = repoJSON.map(obj => obj.name)
	const counts = repoJSON.map(obj => obj.count)
	
	const ctx = document.getElementById('chart').getContext('2d');
	const myChart = new Chart(ctx, {
	    type: 'bar',
	    data: {
	        labels: names,
	        datasets: [{
	            label: 'Number of Languages',
	            data: counts,
	            backgroundColor: 'rgba(255, 99, 132, 0.2)',
	            borderColor: 'rgba(255, 99, 132, 1)',
	            borderWidth: 1
	        }]
	    },
	    options: {
		    scales: {
		        yAxes: [{
		            ticks: {
		                beginAtZero: true
		            }
		        }]
		    }
		}
	});

});

const getRepos = async () => {
		const url = 'repos.json'
		const headers = {
            'Content-Type': 'application/json'
        }

		return fetch(url, { headers })
			.then((response) => {
	            if (response.ok) {
		                return response.json();
		            } else {
		              throw new Error("Couldn't find repos!");
		            }
	        	})
			.then(json => {
				return json
			})
			.catch((error) => {
				console.log(error)
			});
	}