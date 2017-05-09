<template>
  <svg width="600" height="300" ref="svg">
  </svg>
</template>

<script>
import * as d3 from 'd3';
import { RETRIEVE_LAND_VALUES } from '../store/constants';

export default {
  name: 'doughnut-chart',
  props: {
    data: { type: Array },
    accessor: { type: Function }
  },
  mounted() {
    this.initialiseDoughnut();
    this.recalculateGroupings();
    this.render();
  },
  data() {
    return {
      pie: null,
      rootNode: null,
      renderNode: null,
      colourScale: null,
      legendNode: null,
      arc: null,
      groupedData: []
    };
  },
  watch: {
    data() {
      this.recalculateGroupings();
      this.render();
    }
  },
  methods: {
    recalculateGroupings() {
      const reducedCounts = this.data.reduce((reducer, d) => {
        const value = this.accessor(d);
        if (!reducer[value]) {
          reducer[value] = 0;
        }

        reducer[value]++;
        return reducer;
      }, {});

      this.groupedData = Object.keys(reducedCounts).map((d) => [d, reducedCounts[d]]);
    },
    initialiseDoughnut() {
      this.rootNode = d3.select(this.$refs.svg);

      this.pie = d3.pie()
        .sort(null)
        .value((d) => d[1]);

      this.width = Number(this.rootNode.attr('width'));
      this.height = Number(this.rootNode.attr('height'));
      const boundingDimension = Math.min(this.width, this.height);
      
      this.arc = d3.arc()
        .outerRadius(boundingDimension / 2)
        .innerRadius(boundingDimension / 4);

      this.renderNode = this.rootNode.append('g')
        .attr('transform', `translate(${boundingDimension / 2}, ${boundingDimension / 2})`);

      this.legendNode = this.rootNode.append('g')
        .attr('transform', `translate(${boundingDimension + 5}, 0)`);
    },

    render() {
      this.colourScale = d3.scaleOrdinal(d3.schemeCategory20);

      this.renderDoughnut();
      this.renderLegend();
    },

    renderDoughnut() {
      const data = this.groupedData;
      const layout = this.pie(data);

      let arc = this.renderNode.selectAll('g.arc')
        .data(layout);

      const arcUpdate = arc.enter()
        .append('g')
        .classed('arc', true)
        .merge(arc);

      const path = arcUpdate.selectAll('path')
        .data((d) => [d]);

      path.enter()
        .append('path')
        .on('mouseover', (d) => this.renderTooltip([`${d.data[0]} (${d.data[1]})`]))
        .on('mousemove', (d) => this.renderTooltip([`${d.data[0]} (${d.data[1]})`]))
        .on('mouseout', (d) => this.renderTooltip([]))
        .merge(path)
        .attr('fill', (d) => this.colourScale(d.data[0]))
        .transition()
        .duration(2000)
        .attrTween('d', (d) => {
          const interpolateStart = d3.interpolate(0, d.startAngle);
          const interpolateEnd = d3.interpolate(0, d.endAngle);

          return (t) => {
            d.startAngle = interpolateStart(t);
            d.endAngle = interpolateEnd(t);

            return this.arc(d);
          }
        });

      arc.exit()
        .remove();
    },

    renderLegend() {
      const data = this.groupedData.slice(0, 15);
      const g = this.legendNode.selectAll('g')
        .data(data);

      const rectMargin = 2;
      const rectSize = Math.max(0, Math.min(20, this.height / data.length - rectMargin));

      const gEnter = g.enter()
        .append('g');

      gEnter.append('rect')
        .attr('x', 0)
        .attr('y', 0);

      gEnter.append('text')
        .attr('dy', '0.35em');

      const gUpdate = gEnter.merge(g)
        .transition()
        .duration(2000)
        .attrTween('transform', (d, i) => {
          const interpolate = d3.interpolate(-rectMargin - rectSize, (rectSize + rectMargin) * i)

          return (t) => `translate(0, ${interpolate(t)})`;
        });

      gUpdate.select('rect')
        .attr('width', rectSize)
        .attr('height', rectSize)
        .attr('fill', (d) => this.colourScale(d[0]));

      gUpdate.select('text')
        .attr('y', rectSize / 2)
        .attr('x', rectSize + rectMargin)
        .text((d) => `${d[0]} (${d[1]})`);

      g.exit()
        .transition()
        .remove();
    },

    renderTooltip(data) {
      const [x, y] = d3.mouse(this.rootNode.node());

      const tooltip = this.rootNode.selectAll('g.tooltip')
        .data(data);

      const tooltipEnter = tooltip.enter()
        .append('g')
        .classed('tooltip', true);

      tooltipEnter.append('rect')
        .classed('doughnut-tooltip', true)
        .attr('x', 0)
        .attr('y', 0);

      tooltipEnter.append('text')
        .attr('x', 10)
        .attr('y', 10)
        .attr('dy', '0.71em');

      const tooltipUpdate = tooltipEnter.merge(tooltip)
        .attr('transform', `translate(${x + 30}, ${y + 30})`)

      tooltipUpdate.selectAll('text')
        .data((d) => [d])
        .text((d) => d);

      tooltipUpdate.each(function() {
        const selection = d3.select(this);

        const rect = selection.select('text').node().getBoundingClientRect();

        selection.select('rect')
          .attr('width', rect.width + 20)
          .attr('height', rect.height + 20);
      });

      tooltip.exit()
        .remove();
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
.doughnut-tooltip {
  fill: #ffffff;
  opacity: 0.8;
}
</style>
