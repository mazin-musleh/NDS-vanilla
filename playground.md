---
layout: home
title: "National Design System for Saudi Arabia"
hero_title: "National Design System for Saudi Arabia"
hero_description: "A comprehensive design system empowering consistent, accessible, and high-performance digital
government experiences across the Kingdom."
#hero_image: assets/img/riyadhcenter.webp
hero_image_pos: 50% 10%
lang: en
direction: ltr
---

<section class="nds-content-section">
    <div class="nds-section-wrapper">
        <div class="nds-section-head">
            <h2 class="nds-section-title">Playground</h2>
            <p class="nds-section-description">Component testing area</p>
        </div>
        <div class="nds-section-content">

            <h3>Bar Chart</h3>
            <div id="barChart" class="nds-chart" style="margin-bottom: 48px;"></div>

            <h3>Stacked Bar Chart</h3>
            <div id="stackedBarChart" class="nds-chart" style="margin-bottom: 48px;"></div>

            <h3>Line Chart</h3>
            <div id="lineChart" class="nds-chart" style="margin-bottom: 48px;"></div>

            <h3>Area Chart</h3>
            <div id="areaChart" class="nds-chart" style="margin-bottom: 48px;"></div>

            <h3>Pie Chart</h3>
            <div id="pieChart" class="nds-chart" style="max-width: 400px; margin-bottom: 48px;"></div>

            <h3>Donut Chart</h3>
            <div id="donutChart" class="nds-chart" style="max-width: 400px; margin-bottom: 48px;"></div>

        </div>
    </div>
</section>

<script>
document.addEventListener('DOMContentLoaded', function () {
    // Bar Chart
    NDSChart.create(document.getElementById('barChart'), {
        type: 'bar',
        series: [
            { name: 'Revenue', data: [44, 55, 57, 56, 61, 58] },
            { name: 'Expenses', data: [35, 41, 36, 26, 45, 48] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    });

    // Stacked Bar
    NDSChart.create(document.getElementById('stackedBarChart'), {
        type: 'bar',
        series: [
            { name: 'Completed', data: [44, 55, 41, 67, 22, 43] },
            { name: 'In Progress', data: [13, 23, 20, 8, 13, 27] },
            { name: 'Pending', data: [11, 17, 15, 15, 21, 14] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        bar: { stacked: true, borderRadius: 8 },
        dataLabels: { show: true },
    });

    // Line Chart
    NDSChart.create(document.getElementById('lineChart'), {
        type: 'line',
        series: [
            { name: 'Sessions', data: [10, 41, 35, 51, 49, 62, 69, 91, 80] },
            { name: 'Page Views', data: [23, 42, 35, 27, 43, 22, 17, 31, 48] },
        ],
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
        yaxis: { title: 'Active users' },
        xaxis: { title: 'Month' },
    });

    // Area Chart
    NDSChart.create(document.getElementById('areaChart'), {
        type: 'line',
        series: [
            { name: 'Users', data: [31, 40, 28, 51, 42, 109, 100] },
            { name: 'Sessions', data: [11, 32, 45, 32, 34, 52, 41] },
            { name: 'Bounces', data: [5, 18, 22, 10, 15, 30, 20] },
        ],
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        line: { area: true, smooth: true },
    });

    // Pie Chart
    NDSChart.create(document.getElementById('pieChart'), {
        type: 'pie',
        series: [44, 55, 13, 43],
        labels: ['Services', 'Products', 'Support', 'Other'],
    });

    // Donut Chart
    NDSChart.create(document.getElementById('donutChart'), {
        type: 'donut',
        series: [35, 25, 20, 20],
        labels: ['Completed', 'In Progress', 'Review', 'Pending'],
    });
});
</script>
