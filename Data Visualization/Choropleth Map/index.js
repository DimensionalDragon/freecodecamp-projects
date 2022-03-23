async function getDataset() {
    const eduResponse = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json');
    const countyResponse = await fetch('https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json');
    const parsedResponses = {education: await eduResponse.json(), counties: await countyResponse.json()};
    return parsedResponses;
}

const width = 1080;
const height = window.innerHeight * 0.9;
const padding = 75;

const colorMap = bachelor => {
    if(bachelor < 12) return 'rgb(229, 245, 224)';
    if(bachelor >= 12 && bachelor < 21) return 'rgb(199, 233, 192)';
    if(bachelor >= 5.0 && bachelor < 30) return 'rgb(161, 217, 155)';
    if(bachelor >= 6.1 && bachelor < 39) return 'rgb(116, 196, 118)';
    if(bachelor >= 7.2 && bachelor < 48) return 'rgb(65, 171, 93)';
    if(bachelor >= 8.3 && bachelor < 57) return 'rgb(35, 139, 69)';
    return 'rgb(0, 109, 44)';
}

const svg = d3.select('.display')
.append('svg')
.attr('width', width)
.attr('height', height)

getDataset().then(({education, counties}) => {
    svg.append('g')
        .selectAll('path')
        .data(topojson.feature(counties, counties.objects.counties).features)
        .enter()
        .append('path')
        .attr('class', 'county')
        .attr('transform', 'scale(0.85, 0.85) translate(150, 40)')
        .attr('data-fips', d => d.id)
        .attr('data-education', d => {
            const [county] = education.filter(edu => edu.fips === d.id);
            if(!county) return 0;
            return county.bachelorsOrHigher;
        })
        .attr('fill', d => {
            const [county] = education.filter(edu => edu.fips === d.id);
            if(!county) return 0;
            return colorMap(county.bachelorsOrHigher);
        })
        .attr('d', d3.geoPath())
        .on('mouseover', event => {
            d3.select(event.target)
                .attr('stroke', 'black');
            d3.select('.data-info')
                .attr('class', 'data-info active')
                .attr('data-education', d3.select(event.target).attr('data-education'))
                .style('left', `${event.target.getBoundingClientRect().left + 10}px`)
                .style('top', `${event.target.getBoundingClientRect().top - 40}px`);
            d3.select('.county-info').text(() => {
                const fips = d3.select(event.target).attr('data-fips');
                const [county] = education.filter(edu => edu.fips == fips);
                if(!county) return 'County not Found';
                return `${county.area_name}, ${county.state}: ${county.bachelorsOrHigher}%`;
            });
        })
        .on('mouseout', event => {
            d3.select(event.target).attr('stroke', 'none');
            d3.select('.data-info').attr('class', 'data-info');
        });
    
    svg.append('g')
        .selectAll('path')
        .data(topojson.feature(counties, counties.objects.states).features)
        .enter()
        .append('path')
        .attr('transform', 'scale(0.85, 0.85) translate(150, 40)')
        .attr('stroke', 'white')
        .attr('fill', 'none')
        .attr('d', d3.geoPath());

    svg.append('g')
        .selectAll('path')
        .data(topojson.feature(counties, counties.objects.nation).features)
        .enter()
        .append('path')
        .attr('transform', 'scale(0.85, 0.85) translate(150, 40)')
        .attr('stroke', 'white')
        .attr('fill', 'none')
        .attr('d', d3.geoPath());

    const legend = svg.append('g')
        .attr('fill', 'red')
        .attr('id', 'legend');
    
    const legendXScale = d3.scaleLinear()
        .domain([3, 66])
        .range([padding + 760, padding + 985]);
    
    const legendTickValues = [3, 12, 21, 30, 39, 48, 57, 66]
    const legendXAxis = d3.axisBottom(legendXScale).tickValues(legendTickValues).tickFormat(d => `${d}%`);

    svg.append('g')
        .attr('transform', `translate(0, ${height - padding - 200})`)
        .call(legendXAxis);

    legend.selectAll('rect')
        .data(legendTickValues.slice(0, -1))
        .enter()
        .append('rect')
        .attr('x', d => legendXScale(d))
        .attr('y', 408)
        .attr('width', (_, i) => legendXScale(legendTickValues[i + 1]) - legendXScale(legendTickValues[i]))
        .attr('height', 28)
        .attr('fill', d => colorMap(d));
});