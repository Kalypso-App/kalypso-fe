<script>
	import {Bar} from 'vue-chartjs'
	export default {
		extends: Bar,
		name: 'BarChartComponent',
		data: () => {

			return {
				data: {
					labels: ['Th', 'Fr', 'Sa', 'Su', 'Mo', 'Tu', 'We'],
					datasets: [
						{
							label: '# of Votes',
							data: [20, 25, 30, 15, 23, 12, 20],
							backgroundColor: '#9165F7',

							barPercentage: 0.5,
							barThickness: 5,
							minBarLength: 2,
							borderWidth: 1
						},
						{
							label: '# of Votes',
							data: [10, 15, 20, 13, 44, 15, 10],
							backgroundColor: '#EF98D0',

							barPercentage: 0.5,
							barThickness: 5,
							minBarLength: 2,
							borderWidth: 1
						},
						{
							label: '# of Votes',
							data: [10, 15, 20, 13, 44, 15, 5],
							backgroundColor: '#2DB8E7',

							barPercentage: 0.5,
							barThickness: 5,
							minBarLength: 2,
							borderWidth: 1
						}
					],
				},
				options: {
					legend: {
						display: false,
					},
					scales: {
						yAxes: [{
							display: true // this is the same key that was passed to the registerScaleType function
						}],
						xAxes: [{
							gridLines: {
								offsetGridLines: true
							},
							display: true // this is the same key that was passed to the registerScaleType function
						}]
					},

				},
			}

		},
		created () {
			window.Chart.defaults.global.responsive = true;
			window.Chart.defaults.global.maintainAspectRatio = false;
		},
		mounted () {

			this.renderChart(this.data, this.options)
		}
	}
</script>

<style lang="scss">
#bar-chart{
    width: 100%!important;
}
</style>