async function getDataset() {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json');
    const parsedResponse = await response.json();
    return parsedResponse;
}

const width = 1080;
const height = 540;
const padding = 75;

const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const colorMap = temp => {
    if(temp < 3.9) return 'rgb(69, 117, 180)';
    if(temp >= 3.9 && temp < 5.0) return 'rgb(116, 173, 209)';
    if(temp >= 5.0 && temp < 6.1) return 'rgb(171, 217, 233)';
    if(temp >= 6.1 && temp < 7.2) return 'rgb(224, 243, 248)';
    if(temp >= 7.2 && temp < 8.3) return 'rgb(255, 255, 191)';
    if(temp >= 8.3 && temp < 9.5) return 'rgb(254, 224, 144)';
    if(temp >= 9.5 && temp < 10.6) return 'rgb(253, 174, 97)';
    if(temp >= 10.6 && temp < 11.7) return 'rgb(244, 109, 67)';
    return 'rgb(215, 48, 39)';
}

const svg = d3.select('.display')
.append('svg')
.attr('width', width)
.attr('height', height)
.style('background-color', 'black')

getDataset().then(({baseTemperature, monthlyVariance}) => {
    const dataset = monthlyVariance.map(d => ({...d, temperature: baseTemperature + d.variance}));
    const barHeight = (height - 2 * padding) / (d3.max(dataset, d => d.month) - d3.min(dataset, d => d.month) + 1) + 1;
    const xScale = d3.scaleBand()
        .domain(dataset.map(data => data.year))
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(dataset, d => d.month) - 0.5, d3.max(dataset, d => d.month) + 0.5])
        .range([padding, height - padding]);
    
    const xAxis = d3.axisBottom(xScale).tickValues(xScale.domain().filter(year => year % 10 === 0));
    const yAxis = d3.axisLeft(yScale).tickFormat(d => months[d - 1]);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding - 60})`)
        .attr('id', 'x-axis')
        .call(xAxis.tickFormat(d => d));

    svg.append('g')
        .attr('transform', `translate(${padding}, -60)`)
        .attr('id', 'y-axis')
        .call(yAxis);

    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'cell')
        .attr('x', d => xScale(d.year))
        .attr('y', d => yScale(d.month - 0.5) - 60)
        .attr('height', barHeight)
        .attr('width', d => xScale.bandwidth(d.year))
        .attr('fill', d => colorMap(d.temperature))
        .attr('stroke-width', 2)
        .attr('data-month', d => d.month - 1)
        .attr('data-year', d => d.year)
        .attr('data-temp', d => d.temperature)
        .on('mouseover', event => {
            d3.select(event.target)
                .attr('stroke', 'black');
            d3.select('.data-info')
                .attr('class', 'data-info active')
                .attr('data-year', d3.select(event.target).attr('data-year'))
                .style('left', `${event.target.getBoundingClientRect().left - 75}px`)
                .style('top', `${event.target.getBoundingClientRect().top - 55}px`);
            d3.select('.time').text(() => {
                const cell = d3.select(event.target)
                return `${cell.attr('data-year')} - ${months[cell.attr('data-month')]}`;
            });
            d3.select('.temp').text(`${parseFloat(d3.select(event.target).attr('data-temp')).toPrecision(2)}°C`);           
            d3.select('.variance').text(() => {
                const cell = d3.select(event.target)
                const sign = cell.attr('data-temp') > baseTemperature ? '+' : '-';
                return `${sign}${parseFloat(cell.attr('data-temp') - baseTemperature).toPrecision(2)}°C`;
            });
        })
        .on('mouseout', event => {
            d3.select(event.target).attr('stroke', 'none');
            d3.select('.data-info').attr('class', 'data-info');
        });

    const legend = svg.append('g')
        .attr('fill', 'red')
        .attr('id', 'legend');
    
    const legendXScale = d3.scaleLinear()
        .domain([1.7, 13.9])
        .range([padding, padding + 300]);
    
    const legendTickValues = [2.8, 3.9, 5.0, 6.1, 7.2, 8.3, 9.5, 10.6, 11.7, 12.8]
    const legendXAxis = d3.axisBottom(legendXScale).tickValues(legendTickValues).tickFormat(d => d);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding - 5})`)
        .call(legendXAxis);
    
    for(let i = 0; i < 9; i++) {
        legend.append('rect')
            .attr('x', legendXScale(legendTickValues[i]))
            .attr('y', 432)
            .attr('width', legendXScale(legendTickValues[i + 1]) - legendXScale(legendTickValues[i]))
            .attr('height', 28)
            .attr('fill', colorMap(legendTickValues[i]));
    }
});