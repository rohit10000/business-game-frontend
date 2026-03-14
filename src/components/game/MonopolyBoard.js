import React from 'react';

const MonopolyBoard = () => {
  // Property data for each side
  const topProperties = [
    { name: 'START', type: 'corner', price: 'COLLECT\n₹2000\nAS YOU PASS' },
    { name: 'GOA', type: 'property', price: '₹4000', color: '#4CAF50' },
    { name: 'COCHIN', type: 'property', price: '₹3000', color: '#4CAF50' },
    { name: 'MYSORE', type: 'property', price: '₹2500', color: '#4CAF50' },
    { name: 'WEALTH TAX', type: 'tax', price: 'PAY ₹200' },
    { name: 'BENGALURU', type: 'property', price: '₹4000', color: '#FF9800' },
    { name: 'COMMUNITY CHEST', type: 'chest', price: '' },
    { name: 'CHENNAI', type: 'property', price: '₹7000', color: '#FF9800' },
    { name: 'COIMBATORE', type: 'property', price: '₹6000', color: '#FF9800' },
    { name: 'REST HOUSE', type: 'corner', price: 'JUST VISITING' }
  ];

  const rightProperties = [
    { name: 'HYDERABAD', type: 'property', price: '₹3000', color: '#F44336' },
    { name: 'KOLKATA', type: 'property', price: '₹6000', color: '#F44336' },
    { name: 'AIR INDIA', type: 'utility', price: '₹10000', color: '#E0E0E0' },
    { name: 'DELHI', type: 'property', price: '₹8000', color: '#2196F3' },
    { name: 'KANPUR', type: 'property', price: '₹4000', color: '#2196F3' },
    { name: 'AGRA', type: 'property', price: '₹5000', color: '#2196F3' },
    { name: 'CHANCE', type: 'chance', price: '' },
    { name: 'LUCKNOW', type: 'property', price: '₹7000', color: '#2196F3' }
  ];

  const bottomProperties = [
    { name: 'PARTY HOUSE', type: 'corner', price: 'JUST LISTING' },
    { name: 'PULLMAN', type: 'property', price: '₹1300', color: '#E0E0E0' },
    { name: 'JUDGE', type: 'property', price: '₹1500', color: '#2196F3' },
    { name: 'CHANCE', type: 'chance', price: '' },
    { name: 'INCOME TAX', type: 'tax', price: 'PAY ₹200' },
    { name: 'WATER WORKS', type: 'utility', price: '₹3000', color: '#E0E0E0' },
    { name: 'QUILON', type: 'property', price: '₹5000', color: '#E0E0E0' },
    { name: 'MUMBAI', type: 'property', price: '₹8000', color: '#F44336' },
    { name: 'PUNE', type: 'property', price: '₹6000', color: '#F44336' },
    { name: 'JAIL', type: 'corner', price: 'JUST VISITING' }
  ];

  const leftProperties = [
    { name: 'ELECTRIC COMPANY', type: 'utility', price: '₹2500', color: '#FFEB3B' },
    { name: 'BEST BUS', type: 'property', price: '₹3500', color: '#FFEB3B' },
    { name: 'AMRITSAR', type: 'property', price: '₹3300', color: '#FFEB3B' },
    { name: 'SHIMLA', type: 'property', price: '₹2700', color: '#FFEB3B' },
    { name: 'CHANCE', type: 'chance', price: '' },
    { name: 'KANDLA', type: 'property', price: '₹2200', color: '#9C27B0' },
    { name: 'SUNDAGAR', type: 'property', price: '₹2000', color: '#9C27B0' },
    { name: 'SURAT', type: 'property', price: '₹2800', color: '#9C27B0' }
  ];

  const PropertyCard = ({ property, rotation = 0, isCorner = false, side = 'top' }) => {
    const getColorBar = () => {
      if (property.type === 'property' && property.color) {
        return <div className="color-bar" style={{ backgroundColor: property.color }} />;
      }
      return null;
    };

    return (
      <div className={`property-card ${isCorner ? 'corner-card' : ''} ${side}-side`}>
        {getColorBar()}
        <div className={`property-content ${side}-content`}>
          <div className="property-name">
            {property.name}
          </div>
          {property.price && (
            <>
              <div className="property-icon">
                🏛️
              </div>
              <div className="property-price">
                {property.price}
              </div>
            </>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="monopoly-container">
      <div className="monopoly-board">
        {/* Top Row */}
        <div className="board-row top-row">
          {topProperties.map((property, index) => (
            <PropertyCard 
              key={index} 
              property={property} 
              isCorner={property.type === 'corner'}
              side="top"
            />
          ))}
        </div>

        {/* Middle Section */}
        <div className="board-middle">
          {/* Left Column */}
          <div className="board-column left-column">
            {leftProperties.map((property, index) => (
              <PropertyCard 
                key={index} 
                property={property} 
                side="left"
              />
            ))}
          </div>

          {/* Center Area */}
          <div className="center-area">
            <div className="center-title">MONOPOLY</div>
            <div className="center-subtitle">INDIAN EDITION</div>
            <div className="center-logo">🏛️</div>
          </div>

          {/* Right Column */}
          <div className="board-column right-column">
            {rightProperties.map((property, index) => (
              <PropertyCard 
                key={index} 
                property={property} 
                side="right"
              />
            ))}
          </div>
        </div>

        {/* Bottom Row */}
        <div className="board-row bottom-row">
          {bottomProperties.map((property, index) => (
            <PropertyCard 
              key={index} 
              property={property} 
              isCorner={property.type === 'corner'}
              side="bottom"
            />
          ))}
        </div>
      </div>

      <style jsx>{`
        .monopoly-container {
          display: flex;
          justify-content: center;
          align-items: center;
          min-height: 100vh;
          background: radial-gradient(ellipse at center, #1a1a2e 0%, #16213e 30%, #0f3460 100%);
          padding: 20px;
          font-family: 'Arial', sans-serif;
          perspective: 1000px;
        }

        .monopoly-board {
          width: 640px;
          height: 640px;
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border: 6px solid #2e3a59;
          border-radius: 16px;
          box-shadow: 
            0 20px 60px rgba(0, 0, 0, 0.4),
            0 10px 30px rgba(0, 0, 0, 0.3),
            inset 0 2px 8px rgba(255, 255, 255, 0.2);
          display: flex;
          flex-direction: column;
          transform: rotateX(2deg) rotateY(0deg);
          transition: transform 0.6s ease;
          position: relative;
        }

        .monopoly-board:hover {
          transform: rotateX(0deg) rotateY(2deg) scale(1.02);
        }

        .monopoly-board::before {
          content: '';
          position: absolute;
          top: -6px;
          left: -6px;
          right: -6px;
          bottom: -6px;
          background: linear-gradient(45deg, #ffd700, #ff6b6b, #4ecdc4, #45b7d1);
          border-radius: 20px;
          z-index: -1;
          opacity: 0.3;
          filter: blur(8px);
        }

        .board-row {
          display: flex;
          height: 80px;
          gap: 4px;
          padding: 0 4px;
        }

        .board-middle {
          flex: 1;
          display: flex;
          gap: 4px;
          padding: 4px 0;
        }

        .board-column {
          width: 80px;
          display: flex;
          flex-direction: column;
          gap: 4px;
        }

        .left-column {
          flex-direction: column-reverse;
        }

        .center-area {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          margin: 8px;
          border-radius: 20px;
          border: 3px solid #fff;
          box-shadow: 
            0 15px 35px rgba(0, 0, 0, 0.3),
            inset 0 5px 15px rgba(255, 255, 255, 0.2),
            inset 0 -5px 15px rgba(0, 0, 0, 0.1);
          transform: translateZ(10px);
          position: relative;
          overflow: hidden;
        }

        .center-title {
          font-size: 32px;
          font-weight: bold;
          color: #ffffff;
          text-align: center;
          margin-bottom: 8px;
          text-shadow: 
            2px 2px 4px rgba(0, 0, 0, 0.3),
            0 0 20px rgba(255, 255, 255, 0.3);
          position: relative;
          z-index: 1;
        }

        .center-subtitle {
          font-size: 16px;
          color: #e8f0fe;
          text-align: center;
          margin-bottom: 16px;
          font-weight: 500;
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.3);
          position: relative;
          z-index: 1;
        }

        .center-logo {
          font-size: 48px;
          opacity: 0.6;
          filter: drop-shadow(0 4px 8px rgba(0, 0, 0, 0.3));
          position: relative;
          z-index: 1;
        }

        .property-card {
          background: linear-gradient(145deg, #ffffff 0%, #f8f9fa 100%);
          border: 1px solid #000000;
          position: relative;
          box-sizing: border-box;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
          box-shadow: 
            0 8px 20px rgba(0, 0, 0, 0.15),
            0 4px 10px rgba(0, 0, 0, 0.1),
            inset 0 2px 4px rgba(255, 255, 255, 0.4),
            inset 0 -2px 4px rgba(0, 0, 0, 0.1);
          transform: translateZ(0);
          border-radius: 0;
          overflow: hidden;
        }

        .property-card::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.1), transparent);
          opacity: 0;
          transition: opacity 0.3s ease;
        }

        .property-card::after {
          content: '';
          position: absolute;
          top: 2px;
          left: 2px;
          right: 2px;
          bottom: 2px;
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.05));
        }

        .property-card:hover {
          background: linear-gradient(145deg, #fff 0%, #f0f8ff 100%);
          box-shadow: 
            0 15px 40px rgba(0, 0, 0, 0.25),
            0 8px 20px rgba(0, 0, 0, 0.15),
            inset 0 3px 6px rgba(255, 255, 255, 0.5),
            inset 0 -3px 6px rgba(0, 0, 0, 0.1);
          transform: translateZ(12px) scale(1.05);
          z-index: 10;
        }

        .property-card:hover::before {
          opacity: 1;
        }

        .property-card:hover::after {
          border-color: rgba(255, 255, 255, 0.8);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.1));
        }

        .property-card:active {
          transform: translateZ(2px) scale(0.98);
        }

        .corner-card {
          width: 80px;
          height: 80px;
          background: linear-gradient(135deg, #ffffff 0%, #f8f9fa 50%, #e9ecef 100%);
          border: 1px solid #000000;
          font-weight: bold;
          flex-shrink: 0;
          border-radius: 0;
          box-shadow: 
            0 12px 30px rgba(0, 0, 0, 0.2),
            0 6px 15px rgba(0, 0, 0, 0.1),
            inset 0 3px 6px rgba(255, 255, 255, 0.5),
            inset 0 -3px 6px rgba(0, 0, 0, 0.1);
          position: relative;
          overflow: hidden;
        }

        .corner-card::after {
          content: '';
          position: absolute;
          top: 3px;
          left: 3px;
          right: 3px;
          bottom: 3px;
          border: 1px solid rgba(255, 255, 255, 0.7);
          border-radius: 0;
          pointer-events: none;
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.15), rgba(255, 255, 255, 0.05));
        }

        .corner-card:hover {
          box-shadow: 
            0 20px 50px rgba(0, 0, 0, 0.3),
            0 10px 25px rgba(0, 0, 0, 0.2),
            inset 0 4px 8px rgba(255, 255, 255, 0.6),
            inset 0 -4px 8px rgba(0, 0, 0, 0.1);
          transform: translateZ(15px) scale(1.08);
        }

        .corner-card:hover::after {
          border-color: rgba(255, 255, 255, 0.9);
          background: linear-gradient(135deg, rgba(255, 255, 255, 0.25), rgba(255, 255, 255, 0.1));
        }

        /* Top and Bottom row tiles */
        .top-row .property-card:not(.corner-card),
        .bottom-row .property-card:not(.corner-card) {
          flex: 1;
          height: 80px;
          min-width: 0;
        }

        /* Left and Right column tiles */
        .left-column .property-card,
        .right-column .property-card {
          flex: 1;
          width: 80px;
          height: auto;
          min-height: 0;
        }

        .property-content {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 4px;
          width: 100%;
          height: 100%;
          text-align: center;
        }

        /* Content rotation for side tiles */
        .left-content {
          transform: rotate(90deg);
        }

        .right-content {
          transform: rotate(-90deg);
        }

        .bottom-content {
          transform: rotate(180deg);
        }

        .color-bar {
          position: absolute;
          border-radius: 0;
          box-shadow: 
            0 2px 8px rgba(0, 0, 0, 0.2),
            inset 0 1px 2px rgba(255, 255, 255, 0.3);
          z-index: 2;
        }

        .color-bar::before {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.3), transparent);
          border-radius: inherit;
        }

        .color-bar::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          border: 2px solid;
          border-color: inherit;
          border-radius: 0;
          box-sizing: border-box;
          opacity: 0.6;
        }

        /* Color bar positioning for different sides */
        .top-side .color-bar {
          top: 0;
          left: 0;
          right: 0;
          height: 12px;
          border-radius: 0;
        }

        .bottom-side .color-bar {
          bottom: 0;
          left: 0;
          right: 0;
          height: 12px;
          border-radius: 0;
        }

        .left-side .color-bar {
          top: 0;
          bottom: 0;
          left: 0;
          width: 12px;
          border-radius: 0;
        }

        .right-side .color-bar {
          top: 0;
          bottom: 0;
          right: 0;
          width: 12px;
          border-radius: 0;
        }

        .property-name {
          font-size: 10px;
          font-weight: bold;
          line-height: 1.1;
          color: #2e3a59;
          margin-bottom: 2px;
          word-wrap: break-word;
          hyphens: auto;
          text-shadow: 0 1px 2px rgba(255, 255, 255, 0.8);
          position: relative;
          z-index: 3;
        }

        .property-price {
          font-size: 8px;
          color: #6c757d;
          font-weight: 600;
          line-height: 1;
          text-shadow: 0 1px 1px rgba(255, 255, 255, 0.6);
          position: relative;
          z-index: 3;
        }

        .property-icon {
          font-size: 8px;
          margin: 1px 0;
          position: relative;
          z-index: 3;
          opacity: 0.8;
        }

        .corner-card .property-name {
          font-size: 9px;
          line-height: 1.1;
          margin-bottom: 4px;
        }

        .corner-card .property-price {
          font-size: 7px;
          line-height: 1;
        }

        .corner-card .property-icon {
          font-size: 7px;
          margin: 1px 0;
        }

        @media (max-width: 768px) {
          .monopoly-board {
            width: 90vw;
            height: 90vw;
            max-width: 500px;
            max-height: 500px;
          }
          
          .board-row {
            height: 60px;
          }
          
          .board-column {
            width: 60px;
          }
          
          .corner-card {
            width: 60px;
            height: 60px;
            flex-shrink: 0;
          }
          
          .center-title {
            font-size: 24px;
          }
          
          .center-subtitle {
            font-size: 14px;
          }
          
          .property-name {
            font-size: 8px;
          }
          
          .property-price {
            font-size: 7px;
          }
          
          .property-icon {
            font-size: 6px;
          }
        }

        @media (max-width: 480px) {
          .monopoly-board {
            width: 95vw;
            height: 95vw;
            max-width: 400px;
            max-height: 400px;
          }
          
          .board-row {
            height: 50px;
          }
          
          .board-column {
            width: 50px;
          }
          
          .corner-card {
            width: 50px;
            height: 50px;
            flex-shrink: 0;
          }
          
          .center-title {
            font-size: 18px;
          }
          
          .center-subtitle {
            font-size: 12px;
          }
          
          .property-name {
            font-size: 7px;
          }
          
          .property-price {
            font-size: 6px;
          }
          
          .property-icon {
            font-size: 5px;
          }
        }
      `}</style>
    </div>
  );
};

export default MonopolyBoard;