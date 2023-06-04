import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { sankey, sankeyLinkHorizontal } from 'd3-sankey';
import { curveBasis, line } from 'd3';

interface SankeyChartProps {
  graph: { 
    columns: { heading: string; nodes: string[]; }[];
    links: { source: string; target: string; value: number; color: string; }[];
  }
}

const SankeyChart: React.FC<SankeyChartProps> = ({ graph }) => {
  const chartRef = useRef<SVGSVGElement>(null);
  const chartHeight = 600;
  const chartwidth = 600
  function wrapText(text, width, maxLineWidth) {
    text.each(function () {
      var text = d3.select(this),
          words = text.text().split(/\s+/).reverse(),
          word,
          line = [],
          lineNumber = 0,
          lineHeight = 1.1, // Adjust this value to set the line height
          x = text.attr('x'),
          y = text.attr('y'),
          dy = parseFloat(text.attr('dy')),
          tspan = text
            .text(null)
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy', dy + 'em');
  
      while ((word = words.pop())) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength() > width && line.length > 1) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = text
            .append('tspan')
            .attr('x', 0)
            .attr('y', y)
            .attr('dy',  lineHeight + dy + 'em')
            .text(word);
        }
      }
      
      // Adjust the x attribute of the first tspan to remove whitespace on the right
      var firstTspan = text.select('tspan');
      if (firstTspan) {
        var firstTspanWidth = firstTspan.node().getComputedTextLength();
        if (firstTspanWidth > width) {
          var dx = (maxLineWidth - firstTspanWidth) / 2; // Calculate the adjustment for dx
          firstTspan.attr('x', x - dx);
        }
      }
    });
  };
  useEffect(() => {
    if (chartRef.current && graph) {
      const container = d3.select(chartRef.current);
      container.selectAll('*').remove();

      // const sankeyLayout = sankey<{ name: string; id: string }, { source: string; target: string; value: number; color: string }>()
      //   .nodeId((d) => d.id)
      //   .nodeWidth(5)
      //   .nodePadding(10)
      //   .extent([[0,  0], [chartHeight, chartwidth]]);
        
      const nodeMap = new Map<string, string>();
      const sankeyData = {
        nodes: graph.columns.flatMap((group, groupIndex) => {
          const nodesInGroup = group.nodes.map((node, nodeIndex) => {
            const nodeId = `${node}`;
            nodeMap.set(nodeId, nodeId);
            const x = groupIndex * 300 + 10; // Adjust the x position based on the group
            const y = nodeIndex * 30 + 30; // Adjust the y position based on the node
            return { id: nodeId, name: nodeId, x0: x, y0: y, x1: x + 50, y1: y + 30 };
          });
          return nodesInGroup;
        }),
        links: graph.links.map((link, index) => {
                return {
              source: `${link.source}`,
              target: `${link.target}`, // Adjust the target ID
              value: 1,
              color: link.color,
                  };
                })
      }
      const dankeyData = {
        nodes: graph.columns.flatMap((group, groupIndex) => {
          const groupLength = group.nodes.length;
          const columnsLength = graph.columns.length;
          const xOffsetUnit = (chartwidth - 100  )/( 2 * columnsLength  -1) ;
          const yOffsetUnit = (chartHeight)/groupLength;

          const xOffset = 3 * xOffsetUnit;
          const yOffset = yOffsetUnit;
          const nodesInGroup = group.nodes.map((node, nodeIndex) => {
            const nodeId = `${node}`;
            nodeMap.set(nodeId, nodeId);
            const x = (groupIndex *  xOffset) + xOffsetUnit + 30;
            const y = (nodeIndex * yOffset) + yOffsetUnit;
            
            const incomingNodes = sankeyData.links.filter((link) => link.target === nodeId);
            const outgoingNodes = sankeyData.links.filter((link) => link.source === nodeId);
            return {
              id: nodeId,
              name: nodeId,
              x0: x,
              y0: y,
              x1: x + 50,
              y1: y + 30,
              col: groupIndex * 300 + 100,
              row: nodeIndex * 40 + 20,
              incomingCount: incomingNodes.length,
              incomingNodes:incomingNodes,
              outgoingNodes: outgoingNodes,
              outgoingCount: outgoingNodes.length,
              hasIncoming: incomingNodes.length > 0,
              hasOutgoing: outgoingNodes.length > 0,
            };
          });
          return nodesInGroup;
        }),
        links: graph.links.map((link, index) => {
                return {
              source: `${link.source}`,
              target: `${link.target}`, // Adjust the target ID
              value: 1,
              color: link.color,
                  };
                })
      };

      container
      .selectAll('.link')
      .data(dankeyData.links)
      .enter()
      .append('path')
      .attr('class', 'link')
      .attr('d', (d) => {
        // Get the source and target nodes based on the IDs
        const sourceNode = dankeyData.nodes.find((node) => node.id === d.source);
        const targetNode = dankeyData.nodes.find((node) => node.id === d.target);
    
        // Generate the path d attribute using a curved line
        const lineGenerator = line()
          .x((d) => d.x)
          .y((d) => d.y )
          .curve(curveBasis);
    
        const path = lineGenerator([
          { x: sourceNode?.x0, y: sourceNode?.y0 },
          { x: (sourceNode?.x0 + targetNode?.x0 -140) / 2, y: sourceNode?.y0 },
          { x: (sourceNode?.x0 + targetNode?.x0 -140) / 2, y: targetNode?.y0 },
          { x: targetNode?.x0 -140, y: targetNode?.y0 },
        ]);
    
        return path;
      })
      .style('stroke', (d) => d.color)
      .style('stroke-width', '1px')
      .style('fill', 'none')
      .style('opacity',0)
      ;

      console.log('dankeyData',dankeyData)
      const nodeGroup = container
                          .selectAll('.node')
                          .data(dankeyData.nodes)
                          .enter()
                          .append('g')
                          .attr('class', 'node')
                          .attr('transform', (d) => `translate(${d.x0}, ${d.y0})`)
                          .on('mouseover', function (d) {
                            container
                              .selectAll('.node')
                              .style('opacity', (d) => (d.incomingNodes.includes(d.id) ? 1 : 0.4));
                            container
                              .selectAll('.node')
                              .style('opacity', (d) => (d.outgoingNodes.includes(d.id) ? 1 : 0.4));
                            d3.select(this).style('opacity', 1);
                          })
                          .on('mouseout', function () {
                            container.selectAll('.node').style('opacity', 1);
                          })
                          .on('mouseover', function (d) {
                            const nodeData = d3.select(this).datum();
                            container
                              .selectAll('.link')
                              .style('opacity', function (link) {
                                return link.source === nodeData.id || link.target === nodeData.id ? 1 : 0;
                              });
                          })
                          .on('mouseout', function () {
                            container.selectAll('.link').style('opacity', 0);
                          });

                          nodeGroup
                          .filter((d) => d.hasIncoming)
                          .append('rect')
                          .attr('height', (d) => d.incomingCount)
                          .attr('width', 2)
                          .style('fill', '#d71d1d')
                          .style('opacity', 0.8)
                          .attr('x', -140) // Position the rectangle to the left of the node
                          .attr('y', (d) => (0)) // Center the rectangle vertically
                        nodeGroup
                          .append('rect')
                          .filter((d) => d.hasOutgoing)
                          .attr('height', (d) => d.outgoingCount * 2)
                          .attr('width', 2)
                          .style('fill', '#28dba2')
                          .style('opacity', 0.8)
                          .filter((d) => d.hasOutgoing)
                         
                          
        nodeGroup
        .append('text')
        .data(dankeyData.nodes)
        .attr('dy', '0.35em')
        .attr('text-anchor', 'end')
        .style('font-size', '10px')
        .text((d) => d.name)
        .call(wrapText, 120,120)
        .attr('transform', (d) => `translate(${-20}, ${0})`)
        
    }
  }, [graph]);

  return <svg id="sankey" style={{ width: 800, height: 800, margin: 'auto' }} ref={chartRef} />;
};

export default SankeyChart;
