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
                    ticks: {
                        callback: function(label, index, labels) {
                            var n = label;
                            if (n < 1e3) return n;
                            if (n >= 1e3 && n < 1e6) return +(n / 1e3).toFixed(1) + "K";
                            if (n >= 1e6 && n < 1e9) return +(n / 1e6).toFixed(1) + "M";
                            if (n >= 1e9 && n < 1e12) return +(n / 1e9).toFixed(1) + "B";
                            if (n >= 1e12) return +(n / 1e12).toFixed(1) + "T";
                        }
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
