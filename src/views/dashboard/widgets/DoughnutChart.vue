<script>
	import {Doughnut} from 'vue-chartjs'
	export default {
		extends: Doughnut,
		name: 'DoughnutChartComponent',
		data: () => {
			return {
				data: {
				datasets: [
					{
					label: "My First Dataset",
					data: [300, 50, 100],
                        barThickness: 5,
					backgroundColor: ["#6A4EE1", "#2DB8E7", "#EF98D0"]
				}
            ],
                    labels: ["Shares to Story", "Post Saves", "Taps on stickers"],

		}
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
    #doughnut-chart{
        width: 100%!important;
    }
</style>