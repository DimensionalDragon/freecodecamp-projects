async function getDataset() {
    const response = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json');
    const parsedResponse = await response.json();
    return parsedResponse;
}

const width = 1080;
const height = 720;
const padding = 100;

const colorMap = {Action: 'red', Drama: 'blue', Adventure: 'green', Family: 'orange', Animation: 'purple', Comedy: 'yellow', Biography: 'magenta'};

const svg = d3.select('.display')
    .append('svg')
    .attr('width', width)
    .attr('height', height)

const [svgWidth, svgHeight] = [+svg.attr('width'), +svg.attr('height')];

svg.on('mousemove', event => {
    const [mouseX, mouseY] = [event.pageX, event.pageY];
    d3.select('.data-info')
        .style('left', `${mouseX}px`)
        .style('top', `${mouseY}px`)
})

getDataset().then(dataset => {
    const treemap = d3.treemap().size([svgWidth, svgHeight].map(len => 0.75 * len)).paddingInner(2);
    const root = d3.hierarchy(dataset).sum(d => d.value).sort((a, b) => {
        if(b.height - a.height) return b.height - a.height;
        return b.value - a.value;
    })
    treemap(root);

    const cell = svg.selectAll('g')
        .data(root.leaves())
        .enter()
        .append('g')
        .attr('transform', d => `translate(${d.x0 + 50}, ${d.y0 + 25})`)
    
    cell.append('rect')
        .attr('id', d => d.data.id)
        .attr('class', 'tile')
        .attr('width', d => d.x1 - d.x0)
        .attr('height', d => d.y1 - d.y0)
        .attr('fill', d => colorMap[d.data.category])
        .attr('data-name', d => d.data.name)
        .attr('data-category', d => d.data.category)
        .attr('data-value', d => d.data.value)
        .on('mouseover', event => {
            d3.select(event.target)
                .attr('stroke', 'black');
            d3.select('.data-info')
                .attr('class', 'data-info active')
                .attr('data-value', d3.select(event.target).attr('data-value'))
            d3.select('.movie-name').text(`Name: ${d3.select(event.target).attr('data-name')}`);
            d3.select('.movie-category').text(`Category: ${d3.select(event.target).attr('data-category')}`);
            d3.select('.movie-value').text(`Value: ${d3.select(event.target).attr('data-value')}`);
        })
        .on('mouseout', event => {
            d3.select(event.target).attr('stroke', 'none');
            d3.select('.data-info').attr('class', 'data-info');
        });
    
    cell.append('text')
        .selectAll('tspan')
        .data(d => {
            const splitted = d.data.name.split(' ');
            // Handle multiwords that has dash as separator
            for(let i = 0; i < splitted.length; i++) {
                if(splitted[i].includes('-')) {
                    const [first, second] = splitted[i].split('-');
                    splitted[i] = first + '-';
                    splitted.splice(i + 1, 0, second);
                }
            }
            // Combine words that are short enough (less than 8 characters if combined)
            for(let i = 0; i < splitted.length - 1; i++) {
                if(!splitted[i]) continue;
                if(splitted[i].length + splitted[i + 1].length <= 7) {
                    splitted[i] = splitted[i] + ' ' + splitted[i + 1];
                    splitted[i + 1] = null;
                }
            }
            return splitted.filter(str => str);
        })
        .enter()
        .append('tspan')
        .attr('x', 5)
        .attr('y', (_, i) => i * 20 + 15)
        .style('font-size', '0.7em')
        .text(d => d);

    const legend = svg.append('g')
        .attr('fill', 'red')
        .attr('id', 'legend');
    
    const legendYScale = d3.scaleLinear()
        .domain([0, Object.keys(colorMap).length])
        .range([padding, height - 2 * padding]);
    
    const genres = Object.keys(colorMap);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding})`);

    legend.selectAll('rect')
        .data(genres)
        .enter()
        .append('rect')
        .attr('x', 900)
        .attr('y', d => legendYScale(genres.indexOf(d)))
        .attr('width', 30)
        .attr('height', 30)
        .attr('fill', d => colorMap[d])
        .attr('class', 'legend-item');

    legend.selectAll('text')
        .data(genres)
        .enter()
        .append('text')
        .attr('x', 940)
        .attr('y', d => legendYScale(genres.indexOf(d)) + 20)
        .attr('fill', 'white')
        .text(d => d);
});