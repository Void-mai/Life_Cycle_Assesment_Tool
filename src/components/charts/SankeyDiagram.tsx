import React from 'react';
import { FlowData } from '../../types';

interface SankeyDiagramProps {
  flowData: FlowData[];
  material: string;
}

const SankeyDiagram: React.FC<SankeyDiagramProps> = ({ flowData, material }) => {
  // Calculate positions and dimensions
  const width = 600;
  const height = 400;
  const nodeWidth = 120;
  const nodeHeight = 40;

  // Define node positions
  const nodes = [
    { id: 'Recycled Material', x: 50, y: 100, color: '#10B981' },
    { id: 'Virgin Material', x: 50, y: 200, color: '#6B7280' },
    { id: 'Product', x: 300, y: 150, color: '#3B82F6' },
    { id: 'Recycling Loop', x: 550, y: 100, color: '#10B981' },
    { id: 'Waste', x: 550, y: 200, color: '#EF4444' }
  ];

  const getNodeById = (id: string) => nodes.find(node => node.id === id);

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-6">Material Flow Diagram</h3>
      
      <div className="flex justify-center">
        <svg width={width} height={height} className="border border-gray-200 rounded-lg">
          {/* Draw flows */}
          {flowData.map((flow, index) => {
            const sourceNode = getNodeById(flow.source);
            const targetNode = getNodeById(flow.target);
            
            if (!sourceNode || !targetNode) return null;
            
            const sourceX = sourceNode.x + nodeWidth;
            const sourceY = sourceNode.y + nodeHeight / 2;
            const targetX = targetNode.x;
            const targetY = targetNode.y + nodeHeight / 2;
            
            const controlX1 = sourceX + (targetX - sourceX) / 3;
            const controlX2 = sourceX + (2 * (targetX - sourceX)) / 3;
            
            const strokeWidth = Math.max(2, flow.value / 5);
            
            return (
              <g key={index}>
                <path
                  d={`M ${sourceX} ${sourceY} C ${controlX1} ${sourceY} ${controlX2} ${targetY} ${targetX} ${targetY}`}
                  stroke={sourceNode.color}
                  strokeWidth={strokeWidth}
                  fill="none"
                  opacity="0.6"
                  className="transition-all duration-300 hover:opacity-100"
                />
                {/* Flow label */}
                <text
                  x={(sourceX + targetX) / 2}
                  y={(sourceY + targetY) / 2 - 10}
                  textAnchor="middle"
                  className="text-xs fill-gray-600 font-medium"
                >
                  {flow.value}%
                </text>
              </g>
            );
          })}
          
          {/* Draw nodes */}
          {nodes.map((node) => (
            <g key={node.id}>
              <rect
                x={node.x}
                y={node.y}
                width={nodeWidth}
                height={nodeHeight}
                rx="8"
                fill={node.color}
                className="transition-all duration-300 hover:opacity-80"
              />
              <text
                x={node.x + nodeWidth / 2}
                y={node.y + nodeHeight / 2}
                textAnchor="middle"
                dominantBaseline="middle"
                className="text-xs fill-white font-medium"
              >
                {node.id}
              </text>
            </g>
          ))}
        </svg>
      </div>
      
      <div className="mt-6 grid grid-cols-2 gap-4 text-sm">
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">Material Sources</h4>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Recycled Content</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-gray-500 rounded-full"></div>
            <span className="text-gray-600">Virgin Material</span>
          </div>
        </div>
        <div className="space-y-2">
          <h4 className="font-semibold text-gray-700">End-of-Life</h4>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-600">Recycling Loop</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-600">Waste Stream</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SankeyDiagram;