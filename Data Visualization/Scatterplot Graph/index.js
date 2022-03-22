async function getDataset() {
    const response = await fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json');
    const parsedResponse = await response.json();
    return parsedResponse;
}

const width = 900;
const height = 460;
const padding = 40;

const svg = d3.select('.display')
.append('svg')
.attr('width', width)
.attr('height', height)
.style('background-color', 'black')

function strToTime(timeString) {
    const [minutes, seconds] = timeString.Time.split(':');
    return parseInt(minutes) * 60 + parseInt(seconds);
}

getDataset().then(dataset => {
    const xScale = d3.scaleLinear()
        .domain([d3.min(dataset, d => d.Year) - 1, d3.max(dataset, d => d.Year) + 1])
        .range([padding, width - padding]);

    const yScale = d3.scaleLinear()
        .domain([d3.min(dataset, strToTime), d3.max(dataset, strToTime)])
        .range([padding, height - padding]);
    
    const xAxis = d3.axisBottom(xScale);
    const yAxis = d3.axisLeft(yScale)
        .tickFormat(d => d === 0  ? '' : `${parseInt(d / 60)}:${d % 60 === 0 ? '00' : d % 60}`);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding})`)
        .attr('id', 'x-axis')
        .call(xAxis.tickFormat(d => d));

    svg.append('g')
        .attr('transform', `translate(${padding}, 0)`)
        .attr('id', 'y-axis')
        .call(yAxis);

    svg.selectAll('circle')
        .data(dataset)
        .enter()
        .append('circle')
        .attr('class', 'dot')
        .attr('cx', d => xScale(d.Year))
        .attr('cy', d => yScale(strToTime(d)))
        .attr('r', 5)
        .attr('fill', d => d.Doping ? 'palevioletred' : 'lightseagreen')
        .attr('doping', d => d.Doping === '' ? false : true)
        .attr('data-name', d => d.Name)
        .attr('data-nation', d => d.Nationality)
        .attr('data-doping', d => d.Doping)
        .attr('data-xvalue', d => d.Year)
        .attr('data-yvalue', d => {
            const [minutes, seconds] = d.Time.split(':');
            return new Date(1970, 0, 1, 0, minutes, seconds).toISOString();
        })
        .on('mouseover', event => {
            d3.select(event.target)
                .attr('fill', 'lightsteelblue');
            d3.select('.data-info')
                .attr('class', 'data-info active')
                .attr('data-year', d3.select(event.target).attr('data-xvalue'))
                .style('height', d3.select(event.target).attr('doping') === 'true' ? 'auto' : '25px')
                .style('left', () => {
                    const dotX = d3.pointer(event)[0];
                    const svgX = document.querySelector('svg').getBoundingClientRect().left;
                    return `${dotX + svgX}px`;
                })
                .style('top', () => {
                    const dotY = d3.pointer(event)[1];
                    const svgY = document.querySelector('svg').getBoundingClientRect().top;
                    return `${dotY + svgY - 20}px`;
                });
            d3.select('.name-nation').text(() => {
                const dot = d3.select(event.target)
                return `${dot.attr('data-name')}: ${dot.attr('data-nation')}`;
            });
            d3.select('.year-time').text(() => {
                const year = d3.select(event.target).attr('data-xvalue');
                const time = new Date(d3.select(event.target).attr('data-yvalue')).toLocaleTimeString();
                const [_, minutes, seconds] = time.split(':');
                return `Year: ${year}, Time: ${minutes}:${seconds.split(' ')[0]}`;
            })
            
            d3.select('.doping-info').text(() => {
                const dopingInfo = d3.select(event.target).attr('data-doping');
                if(!dopingInfo) {
                    d3.select('.doping-info').style('display', 'hidden');
                    d3.select('.data-info br').style('display', 'hidden');
                    return '';
                }
                d3.select('.doping-info').style('display', 'block');
                d3.select('.data-info br').style('display', 'block');
                return dopingInfo;
            });
        })
        .on('mouseout', event => {
            d3.select(event.target).attr('fill', () => d3.select(event.target).attr('doping') === 'true' ? 'palevioletred' : 'lightseagreen');
            d3.select('.data-info').attr('class', 'data-info');
        });

    const legend = svg.append('g')
        .attr('fill', 'red')
        .attr('id', 'legend');
        
    legend.append('rect')
        .attr('x', 655)
        .attr('y', 187)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', 'lightseagreen');

    legend.append('rect')
        .attr('x', 655)
        .attr('y', 207)
        .attr('width', 15)
        .attr('height', 15)
        .attr('fill', 'palevioletred');
    
    legend.append('text')
        .attr('x', 675)
        .attr('y', 200)
        .attr('fill', 'white')
        .attr('class', 'info')
        .text('No doping allegations');

    legend.append('text')
        .attr('x', 675)
        .attr('y', 220)
        .attr('fill', 'white')
        .attr('class', 'info')
        .text('Riders with doping allegations');
});