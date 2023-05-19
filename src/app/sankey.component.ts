import { Component, OnInit } from '@angular/core';
import * as d3 from 'd3';
import * as d3Sankey from 'd3-sankey';

@Component({
  selector: 'sankey',
  template: `<svg id="sankey" width="960" height="500"></svg>`,
})
export class SankeyComponent implements OnInit {
  ngOnInit(): void {
    this.DrawChart();
  }
  private DrawChart() {
    // d3.json('./sankey.json', function (error, data) {
    //   console.log(data);
    // });
    //fetch('./sankey.json').then(res => res.text()).then(text => console.log(text));
    var svg = d3.select('#sankey'),
      width = +svg.attr('width'),
      height = +svg.attr('height');

    var color = d3.scaleOrdinal(d3.schemeCategory10);

    var sankey = d3Sankey
      .sankey()
      .nodeWidth(15)
      .nodePadding(0.5)
      .extent([
        [1, 1],
        [width - 1, height - 1],
      ]);

    var link = svg
      .append('g')
      .attr('class', 'links')
      .attr('fill', 'none')
      .attr('stroke', '#000')
      .attr('stroke-opacity', 0.3)
      .selectAll('path');

    var node = svg
      .append('g')
      .attr('class', 'nodes')
      .attr('font-family', 'sans-serif')
      .attr('font-size', 12)
      .attr('font-weight', 'bold')
      .selectAll('g');

    var formatNumber = d3.format(',.0f'),
      format = function (d: any) {
        return formatNumber(d) + ' Units';
      };

    const energy = {
      data: {
        nodes: [
          {
            id: 'energy',
            name: 'Energy',
          },
          {
            id: 'resource',
            name: 'Resource',
          },
          {
            id: 'cutting',
            name: 'Cutting',
          },
          {
            id: 'product1',
            name: 'Product1',
          },
          {
            id: 'product2',
            name: 'Product2',
          },
          {
            id: 'product3',
            name: 'Product3',
          },
          {
            id: 'packaging',
            name: 'Packaging',
          },
          {
            id: 'painting',
            name: 'Painting/Gluing',
          },
          {
            id: 'pressing',
            name: 'Steel Pressing',
          },
          {
            id: 'moulding',
            name: 'Injection Moulding',
          },
        ],
        links: [
          {
            source: 0,
            target: 2,
            value: 30,
          },
          {
            source: 0,
            target: 9,
            value: 15,
          },
          {
            source: 0,
            target: 6,
            value: 15,
          },
          {
            source: 0,
            target: 8,
            value: 20,
          },
          {
            source: 0,
            target: 7,
            value: 10,
          },
          {
            source: 1,
            target: 2,
            value: 10,
          },
          {
            source: 1,
            target: 9,
            value: 10,
          },
          {
            source: 1,
            target: 8,
            value: 5,
          },
          {
            source: 1,
            target: 7,
            value: 10,
          },
          {
            source: 2,
            target: 3,
            value: 20,
          },
          {
            source: 2,
            target: 4,
            value: 20,
          },
          {
            source: 9,
            target: 3,
            value: 10,
          },
          {
            source: 9,
            target: 5,
            value: 15,
          },
          {
            source: 6,
            target: 3,
            value: 3.75,
          },
          {
            source: 6,
            target: 5,
            value: 3.75,
          },
          {
            source: 6,
            target: 4,
            value: 7.5,
          },
          {
            source: 8,
            target: 3,
            value: 5,
          },
          {
            source: 8,
            target: 4,
            value: 20,
          },
          {
            source: 7,
            target: 3,
            value: 5,
          },
          {
            source: 7,
            target: 4,
            value: 10,
          },
          {
            source: 7,
            target: 5,
            value: 5,
          },
        ],
      },
    };

    sankey(energy.data);

    link = link
      .data(energy.data.links)
      .enter()
      .append('path')
      .attr('d', d3Sankey.sankeyLinkHorizontal())
      .attr('stroke-width', function (d: any) {
        return Math.max(1, d.width);
      });

    link.append('title').text(function (d: any) {
      return d.source.name + ' → ' + d.target.name + '\n' + format(d.value);
    });

    node = node.data(energy.data.nodes).enter().append('g');

    node
      .append('rect')
      .attr('x', function (d: any) {
        return d.x0;
      })
      .attr('y', function (d: any) {
        return d.y0;
      })
      .attr('height', function (d: any) {
        return d.y1 - d.y0;
      })
      .attr('width', function (d: any) {
        return d.x1 - d.x0;
      })
      .attr('fill', function (d: any) {
        return color(d.name.replace(/ .*/, ''));
      })
      .attr('stroke', '#000');

    node
      .append('text')
      .attr('x', function (d: any) {
        return d.x0 - 6;
      })
      .attr('y', function (d: any) {
        return (d.y1 + d.y0) / 2;
      })
      .attr('dy', '0.35em')
      // .attr('dx','0.10em')
      .attr('text-anchor', 'end')
      .text(function (d: any) {
        return d.name;
      })
      .filter(function (d: any) {
        return d.x0 < width / 2;
      })
      .attr('x', function (d: any) {
        return d.x1 + 6;
      })
      .attr('text-anchor', 'start');

    node.append('title').text(function (d: any) {
      return d.name + '\n' + format(d.value);
    });
  }
}
