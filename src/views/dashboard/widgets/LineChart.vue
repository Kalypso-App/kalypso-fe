<script>
import {
    Line
} from 'vue-chartjs'
export default {
    extends: Line,
    name: 'LineChartComponent',
    data: () => ({
        options: {
            legend: {
                display: true,
            },
            scales: {
                yAxes: [{
                    scaleLabel: {
                        display: true,
                        labelString: "Views"
                    },
                    gridLines: {
                        display: true
                    },
                    display: true // this is the same key that was passed to the registerScaleType function
                }],
                xAxes: [{
                    ticks: {
                        maxRotation: 0,
                        minRotation: 0
                    },
                    scaleLabel: {
                        display: true,
                        labelString: 'Date'
                    },
                    gridLines: {
                        display: false
                    },
                    display: true // this is the same key that was passed to the registerScaleType function
                }]
            },

        },

    }),
    created() {
        window.Chart.defaults.global.responsive = true;
        window.Chart.defaults.global.maintainAspectRatio = false;
    },
    mounted() {
        this.renderChart(this.data, this.options)
    },
    props: {
        data: Object,
        label: String
    },
    watch: {
        'data': function () {
            this.options.scales.yAxes[0].scaleLabel.labelString = this.label;
            this.renderChart(this.data, this.options)
        }
    },
}
</script>

<style lang="scss">
#bar-chart {
    width: 100% !important;
}

.chart {
    width: 100% !important;
}
</style>
