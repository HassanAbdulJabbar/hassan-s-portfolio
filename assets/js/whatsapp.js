/**
 * Floating WhatsApp Contact Button
 * Provides a floating WhatsApp icon for direct contact
 */

(function() {
  "use strict";

  // WhatsApp configuration
  const whatsappConfig = {
    phoneNumber: '+923096373918', // Your WhatsApp number
    message: 'Hi Hassan! I saw your portfolio and would like to discuss a project.', // Default message
    iconColor: '#25D366', // WhatsApp brand color
    backgroundColor: '#ffffff', // Background color matching theme
    borderColor: '#34b7a7', // Accent color from theme
    position: 'bottom-right', // Position on screen
    showOnScroll: true, // Show/hide based on scroll
    animation: 'bounce' // Animation type
  };

  // Create WhatsApp button
  function createWhatsAppButton() {
    const whatsappBtn = document.createElement('div');
    whatsappBtn.id = 'whatsapp-float';
    whatsappBtn.className = 'whatsapp-float';
    whatsappBtn.innerHTML = `
      <div class="whatsapp-icon">
        <i class="bi bi-whatsapp"></i>
      </div>
      <div class="whatsapp-tooltip">
        Chat on WhatsApp
      </div>
    `;

    // Add styles
    const styles = `
      .whatsapp-float {
        position: fixed;
        bottom: 80px;
        right: 20px;
        z-index: 1001;
        cursor: pointer;
        transition: all 0.3s ease;
        animation: whatsapp-bounce 2s infinite;
      }

      .whatsapp-float:hover {
        transform: scale(1.1);
        box-shadow: 0 8px 25px rgba(37, 211, 102, 0.3);
      }

      .whatsapp-icon {
        width: 60px;
        height: 60px;
        background: ${whatsappConfig.iconColor};
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.15);
        border: 3px solid ${whatsappConfig.backgroundColor};
        transition: all 0.3s ease;
      }

      .whatsapp-icon i {
        font-size: 28px;
        color: ${whatsappConfig.backgroundColor};
      }

      .whatsapp-tooltip {
        position: absolute;
        right: 70px;
        top: 50%;
        transform: translateY(-50%);
        background: ${whatsappConfig.backgroundColor};
        color: #333;
        padding: 8px 12px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 500;
        white-space: nowrap;
        opacity: 0;
        visibility: hidden;
        transition: all 0.3s ease;
        box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
        border: 1px solid ${whatsappConfig.borderColor};
      }

      .whatsapp-tooltip::after {
        content: '';
        position: absolute;
        right: -6px;
        top: 50%;
        transform: translateY(-50%);
        border-left: 6px solid ${whatsappConfig.backgroundColor};
        border-top: 6px solid transparent;
        border-bottom: 6px solid transparent;
      }

      .whatsapp-float:hover .whatsapp-tooltip {
        opacity: 1;
        visibility: visible;
        right: 75px;
      }

      @keyframes whatsapp-bounce {
        0%, 20%, 50%, 80%, 100% {
          transform: translateY(0);
        }
        40% {
          transform: translateY(-10px);
        }
        60% {
          transform: translateY(-5px);
        }
      }

      /* Mobile responsive */
      @media (max-width: 768px) {
        .whatsapp-float {
          bottom: 70px;
          right: 15px;
        }
        
        .whatsapp-icon {
          width: 50px;
          height: 50px;
        }
        
        .whatsapp-icon i {
          font-size: 24px;
        }
        
        .whatsapp-tooltip {
          display: none;
        }
      }

      /* Hide on very small screens */
      @media (max-width: 480px) {
        .whatsapp-float {
          bottom: 65px;
          right: 10px;
        }
        
        .whatsapp-icon {
          width: 45px;
          height: 45px;
        }
        
        .whatsapp-icon i {
          font-size: 20px;
        }
      }
    `;

    // Add styles to head
    const styleSheet = document.createElement('style');
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);

    // Add click event
    whatsappBtn.addEventListener('click', openWhatsApp);

    // Add to body
    document.body.appendChild(whatsappBtn);

    // Keep WhatsApp button always visible (removed scroll-based hiding)
    // The button will now stay visible at all times, just like the scroll-to-top arrow
  }

  // Open WhatsApp with pre-filled message
  function openWhatsApp() {
    const encodedMessage = encodeURIComponent(whatsappConfig.message);
    const whatsappUrl = `https://wa.me/${whatsappConfig.phoneNumber}?text=${encodedMessage}`;
    
    // Open in new tab
    window.open(whatsappUrl, '_blank');
    
    // Add click animation
    const icon = document.querySelector('.whatsapp-icon');
    icon.style.transform = 'scale(0.9)';
    setTimeout(() => {
      icon.style.transform = 'scale(1)';
    }, 150);
  }

  // Initialize when DOM is loaded
  document.addEventListener('DOMContentLoaded', function() {
    // Small delay to ensure all other scripts are loaded
    setTimeout(createWhatsAppButton, 1000);
  });

  // Alternative initialization for immediate loading
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', createWhatsAppButton);
  } else {
    createWhatsAppButton();
  }

})(); 