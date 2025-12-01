import React, { useRef, useState, useEffect } from 'react';

type Tool = 'pencil' | 'brush' | 'eraser' | 'rect' | 'circle' | 'line';

const COLORS = [
  '#000000', '#808080', '#800000', '#808000', '#008000', '#008080', '#000080', '#800080',
  '#ffffff', '#c0c0c0', '#ff0000', '#ffff00', '#00ff00', '#00ffff', '#0000ff', '#ff00ff'
];

const Paint: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [context, setContext] = useState<CanvasRenderingContext2D | null>(null);
  const [selectedColor, setSelectedColor] = useState('#000000');
  const [secondaryColor, setSecondaryColor] = useState('#ffffff');
  const [selectedTool, setSelectedTool] = useState<Tool>('pencil');
  const [isDrawing, setIsDrawing] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [snapshot, setSnapshot] = useState<ImageData | null>(null);

  // Initialize canvas
  useEffect(() => {
    if (canvasRef.current) {
      const canvas = canvasRef.current;
      // Set canvas size to match visual size (simplification)
      canvas.width = canvas.parentElement?.clientWidth || 600;
      canvas.height = canvas.parentElement?.clientHeight || 400;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        ctx.lineCap = 'round';
        setContext(ctx);
      }
    }
  }, []);

  const getMousePos = (e: React.MouseEvent) => {
    if (!canvasRef.current) return { x: 0, y: 0 };
    const rect = canvasRef.current.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent) => {
    if (!context || !canvasRef.current) return;
    const { x, y } = getMousePos(e);
    setIsDrawing(true);
    setStartPos({ x, y });
    setSnapshot(context.getImageData(0, 0, canvasRef.current.width, canvasRef.current.height));
    
    context.beginPath();
    context.moveTo(x, y);
    context.strokeStyle = selectedColor;
    context.fillStyle = selectedColor;
    context.lineWidth = selectedTool === 'brush' || selectedTool === 'eraser' ? 4 : 1;
    
    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      if (selectedTool === 'eraser') context.strokeStyle = '#ffffff';
      context.lineTo(x, y); // Draw single dot
      context.stroke();
    }
  };

  const draw = (e: React.MouseEvent) => {
    if (!isDrawing || !context || !canvasRef.current || !snapshot) return;
    const { x, y } = getMousePos(e);

    if (selectedTool === 'pencil' || selectedTool === 'brush' || selectedTool === 'eraser') {
      context.lineTo(x, y);
      context.stroke();
    } else {
      // For shapes, restore the snapshot first to avoid trails
      context.putImageData(snapshot, 0, 0);
      context.beginPath();

      if (selectedTool === 'line') {
        context.moveTo(startPos.x, startPos.y);
        context.lineTo(x, y);
        context.stroke();
      } else if (selectedTool === 'rect') {
        context.strokeRect(startPos.x, startPos.y, x - startPos.x, y - startPos.y);
      } else if (selectedTool === 'circle') {
        const radius = Math.sqrt(Math.pow(x - startPos.x, 2) + Math.pow(y - startPos.y, 2));
        context.arc(startPos.x, startPos.y, radius, 0, 2 * Math.PI);
        context.stroke();
      }
    }
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    if (context) context.closePath();
  };

  const ToolButton = ({ tool, label }: { tool: Tool, label: string }) => (
    <button
      onClick={() => setSelectedTool(tool)}
      className={`w-6 h-6 flex items-center justify-center text-xs border ${
        selectedTool === tool ? 'win95-border-inset bg-gray-200' : 'win95-border-outset bg-[#c0c0c0]'
      }`}
      title={label}
    >
      {label === 'pencil' && '✏️'}
      {label === 'brush' && '🖌️'}
      {label === 'eraser' && '🧼'}
      {label === 'line' && '📏'}
      {label === 'rect' && '⬜'}
      {label === 'circle' && '⭕'}
    </button>
  );

  return (
    <div className="flex flex-col h-full w-full bg-[#c0c0c0]">
      {/* Top Menu */}
      <div className="flex gap-4 px-2 py-0.5 bg-[#c0c0c0] border-b border-gray-400 text-sm select-none">
        <span>File</span>
        <span>Edit</span>
        <span>View</span>
        <span>Image</span>
        <span>Options</span>
        <span>Help</span>
      </div>

      <div className="flex flex-1 p-1 overflow-hidden">
        {/* Left Toolbar */}
        <div className="w-10 flex flex-col gap-1 items-center mr-1">
          <div className="grid grid-cols-2 gap-0.5">
             <ToolButton tool="pencil" label="pencil" />
             <ToolButton tool="brush" label="brush" />
             <ToolButton tool="eraser" label="eraser" />
             <ToolButton tool="line" label="line" />
             <ToolButton tool="rect" label="rect" />
             <ToolButton tool="circle" label="circle" />
          </div>
          {/* Active color preview */}
          <div className="mt-2 w-8 h-8 win95-border-inset relative bg-gray-200">
             <div className="absolute top-1 left-1 w-4 h-4 z-10 border border-black" style={{backgroundColor: selectedColor}}></div>
             <div className="absolute bottom-1 right-1 w-4 h-4 z-0 border border-black" style={{backgroundColor: secondaryColor}}></div>
          </div>
        </div>

        {/* Canvas Area */}
        <div className="flex-1 bg-[#808080] win95-border-inset overflow-auto p-1 relative">
          <canvas
            ref={canvasRef}
            onMouseDown={startDrawing}
            onMouseMove={draw}
            onMouseUp={stopDrawing}
            onMouseLeave={stopDrawing}
            className="cursor-crosshair bg-white shadow-lg"
          />
        </div>
      </div>

      {/* Bottom Color Palette */}
      <div className="h-10 bg-[#c0c0c0] flex items-center px-1 win95-border-outset mt-1">
         <div className="flex flex-wrap w-64 gap-0.5">
            {COLORS.map(c => (
              <button
                key={c}
                className="w-4 h-4 border border-gray-600 active:border-white"
                style={{backgroundColor: c}}
                onClick={() => setSelectedColor(c)}
                onContextMenu={(e) => { e.preventDefault(); setSecondaryColor(c); }}
              />
            ))}
         </div>
         <div className="text-xs ml-auto text-gray-600">
            For Help, click Help Topics on the Help Menu.
         </div>
      </div>
    </div>
  );
};

export default Paint;