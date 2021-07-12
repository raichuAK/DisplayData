import * as d3 from 'd3';
import convertToTree from '../../lib/convertor.mjs';

async function getTreeData(parentId) {
  const response = await fetch(`http://localhost:3000/api/parent/${parentId}`);
  const jsonResp = await response.json();
  return jsonResp;
}

async function createTree() {
  let path;
  const apiData = await getTreeData('all');
  const hierarchyData = await convertToTree(apiData);

  // Set the dimensions and margins of the diagram
  const margin = {
    top: 200,
    right: 10,
    bottom: 10,
    left: 300,
  };
  const width = window.innerWidth - margin.left - margin.right;
  const height = window.innerHeight - margin.top - margin.bottom;

  // append the svg object to the body of the page
  // appends a 'group' element to 'svg'
  // moves the 'group' element to the top left margin
  const svg = d3
    .select('body')
    .append('svg')
    .attr('width', width + margin.right + margin.left)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', `translate(${margin.left},${margin.top})`);

  let i = 0;
  const duration = 750;

  // declares a tree layout and assigns the size
  const treemap = d3.tree().size([height, width]);

  // Assigns parent, children, height, depth
  const root = d3.hierarchy(hierarchyData[0], d => d.children);
  root.x0 = height / 2;
  root.y0 = 0;

  // Collapse the node and all it's children
  function collapse(d) {
    if (d.children) {
      d._children = d.children;
      d._children.forEach(collapse);
      d.children = null;
    }
  }

  // Collapse after the second level
  root.children.forEach(collapse);

  function update(source) {
    // Assigns the x and y position for the nodes
    const treeData = treemap(root);

    // Compute the new tree layout.
    const nodes = treeData.descendants();
    const links = treeData.descendants().slice(1);

    // Normalize for fixed-depth.
    nodes.forEach(d => {
      d.y = d.depth * 180;
    });

    // ****************** Nodes section ***************************

    // Update the nodes...
    const node = svg.selectAll('g.node').data(nodes, d => {
      i += 1;
      const did = d.id || (d.id = i);
      return did;
    });

    // Toggle children on click.
    function click(d) {
      if (d.children) {
        d._children = d.children;
        d.children = null;
      } else {
        d.children = d._children;
        d._children = null;
      }
      const popUp = document.querySelector('my-pop-up');
      popUp.nameOfNode = d.data.name;
      // popUp.attributes.nameOfNode.value = d.data.name;
      popUp.nodeDescription = d.data.description;
      // popUp.attributes.nodeDescription.value = d.data.description;
      popUp.open = true;
      update(d);
    }

    // Enter any new modes at the parent's previous position.
    const nodeEnter = node
      .enter()
      .append('g')
      .attr('class', 'node')
      .attr('transform', () => `translate(${source.y0},${source.x0})`)
      .on('click', click);

    nodeEnter
      .append('rect')
      .attr('class', 'node')
      .attr('width', 40)
      .attr('height', 40)
      .attr('x', -30)
      .attr('y', -20)
      .style('fill', () => '#fff')
      .style('stroke', () => '#000000');

    // Add labels for the nodes
    nodeEnter
      .append('text')
      .attr('dy', '.35em')
      .attr('x', -15)
      .attr('y', 5)
      .attr('text-anchor', d => (d.children || d._children ? 'end' : 'start'))
      .text(d => d.data.name)
      .style('fill', () => '#000000');

    // UPDATE
    const nodeUpdate = nodeEnter.merge(node);

    // Transition to the proper position for the node
    nodeUpdate
      .transition()
      .duration(duration)
      .attr('transform', d => `translate(${d.y},${d.x})`);

    // Update the node attributes and style
    nodeUpdate.select('rect.node').style('stroke', '#000000').attr('cursor', 'pointer');

    // Remove any exiting nodes
    const nodeExit = node
      .exit()
      .transition()
      .duration(duration)
      .attr('transform', () => `translate(${source.y},${source.x})`)
      .remove();

    // On exit reduce the node circles size to 0
    nodeExit.select('rect').attr('x', -10).attr('y', -7).attr('width', 20).attr('height', 20);

    // ****************** links section ***************************

    // Update the links...
    const link = svg.selectAll('path.link').data(links, d => d.id);

    // Enter any new links at the parent's previous position.
    const linkEnter = link
      .enter()
      .insert('path', 'g')
      .attr('class', 'link')
      .attr('d', () => {
        // eslint-disable-next-line
        const o = { x: source.x0, y: source.y0 };
      });

    // UPDATE
    const linkUpdate = linkEnter.merge(link);

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s, d) {
      path = `M ${s.y} ${s.x}
                ${(s.y + d.y) / 2} ${s.x},
                ${(s.y + d.y) / 2} ${d.x},
                ${d.y} ${d.x}`;

      return path;
    }

    // Transition back to the parent element position
    linkUpdate
      .transition()
      .duration(duration)
      .attr('d', d => diagonal(d, d.parent));

    // Remove any exiting links
    link
      .exit()
      .transition()
      .duration(duration)
      .attr('d', () => {
        const o = { x: source.x, y: source.y };
        return diagonal(o, o);
      })
      .remove();

    // Store the old positions for transition.
    nodes.forEach(d => {
      d.x0 = d.x;
      d.y0 = d.y;
    });
  }

  update(root);
}

createTree();
