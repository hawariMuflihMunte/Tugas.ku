/**
 * Generate a loader element.
 * @param {Boolean} isInString
 * - Whether ot return the loader as a string or a DOM element.
 * @return {string|HTMLElement}
 * - The loader HTML string or,
 * - the loader DOM element.
 */
const loader = (isInString = false) => {
  if (isInString) {
    return `
      <style>
        .loader {
          position: relative;
          display: flex;
          place-content: center;
          place-items: center;
          width: 50px;
        
          height: 50px;
          background-color: #555555;
          border-radius: 6px;
          z-index: 1000;
          overflow: hidden;
        }
        
        .loader::before {
          content: "";
          position: absolute;
          width: 30px;
          height: 30px;
        
          border-radius: 50%;
          border-left: 2px solid #555555;
          border-top: 2px solid white;
          border-right: 2px solid #555555;
          border-bottom: 2px solid white;
        
          transition: 100ms linear;
          animation: spin-loader 1s linear 0s infinite alternate;
          z-index: 1100;
        }
        
        @keyframes spin-loader {
          0% {
            border-left: 2px solid #555555;
            border-top: 2px solid white;
            border-right: 2px solid #555555;
            border-bottom: 2px solid white;
          }
          100% {
            border-left: 2px solid white;
            border-top: 2px solid #555555;
            border-right: 2px solid white;
            border-bottom: 2px solid #555555;
          }
        }  
      </style>
      <div class="loader"></div>
    `.trim();
  }

  const loader = document.createElement('div');
  loader.classList.add('loader');

  const style = document.createElement('style');
  style.textContent = `
    .loader {
      position: relative;
      display: flex;
      place-content: center;
      place-items: center;
      width: 50px;
    
      height: 50px;
      background-color: #555555;
      border-radius: 6px;
      z-index: 1000;
      overflow: hidden;
    }
    
    .loader::before {
      content: "";
      position: absolute;
      width: 30px;
      height: 30px;
    
      border-radius: 50%;
      border-left: 2px solid #555555;
      border-top: 2px solid white;
      border-right: 2px solid #555555;
      border-bottom: 2px solid white;
    
      transition: 100ms linear;
      animation: spin-loader 1s linear 0s infinite alternate;
      z-index: 1100;
    }
    
    @keyframes spin-loader {
      0% {
        border-left: 2px solid #555555;
        border-top: 2px solid white;
        border-right: 2px solid #555555;
        border-bottom: 2px solid white;
      }
      100% {
        border-left: 2px solid white;
        border-top: 2px solid #555555;
        border-right: 2px solid white;
        border-bottom: 2px solid #555555;
      }
    }
  `.trim();

  loader.appendChild(style);

  return loader;
};

export default loader;
