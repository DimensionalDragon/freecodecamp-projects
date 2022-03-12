async function getDataset() {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json');
    const parsedResponse = await response.json();
    return parsedResponse.data;
}

const width = 900;
const height = 460;
const padding = 40;

const svg = d3.select('.display')
.append('svg')
.attr('width', width)
.attr('height', height)
.style('background-color', 'black')

getDataset().then(dataset => {
    const xScale = d3.scaleLinear()
        .domain([0, dataset.length])
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([0, d3.max(dataset, d => d[1])])
        .range([height - padding, padding]);
    
    const xAxis = d3.axisBottom().scale(xScale)
        .tickValues(dataset.map((_, i) => i).filter(data => data === 0 || data % 20 === 12))
        .tickFormat(d => d/4 + 1947);
    const yAxis = d3.axisLeft(yScale);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding})`)
        .attr('id', 'x-axis')
        .call(xAxis);

    svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis);

    d3.select('.data-info').style('top', `${height + 25}px`);

    svg.selectAll('rect')
        .data(dataset)
        .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr('index', (_, i) => i)
        .attr('x', (_, i) => xScale(i))
        .attr('y', d => yScale(d[1]))
        .attr('width', (_, i) => xScale(i) - xScale(i - 1))
        .attr('height', d => height - padding - yScale(d[1]))
        .attr('fill', 'white')
        .attr('period', (d, i) => {
            const year = d[0].split('-')[0];
            const quarter = ['Q1', 'Q2', 'Q3', 'Q4'];
            return `${year} ${quarter[i % 4]}`;
        })
        .attr('value', d => {
            const parsedCurrency = Intl.NumberFormat().format(d[1]);
            return `$${parsedCurrency} Billion`
        })
        .attr('data-date', d => d[0])
        .attr('data-gdp', d => d[1])
        .on('mouseover', event => {
            d3.select(event.target)
                .attr('fill', 'lightsteelblue');
            d3.select('.data-info')
                .attr('class', 'data-info active')
                .attr('data-date', d3.select(event.target).attr('data-date'))
                .style('left', () => {
                    const barWidth = d3.select(event.target).attr('width');
                    const svgX = document.querySelector('svg').getBoundingClientRect().left;
                    const index = d3.select(event.target).attr('index');
                    return `${barWidth * index + svgX + 60}px`;
                });
            d3.select('.period').text(d3.select(event.target).attr('period'));
            d3.select('.value').text(d3.select(event.target).attr('value'));
        })
        .on('mouseout', event => {
            d3.select(event.target).attr('fill', 'white');
            d3.select('.data-info').attr('class', 'data-info');
        });
        
    svg.append('text')
        .attr('x', 520)
        .attr('y', 455)
        .attr('fill', 'white')
        .attr('class', 'info')
        .text('More Information: http://www.bea.gov/national/pdf/nipaguid.pdf');
});