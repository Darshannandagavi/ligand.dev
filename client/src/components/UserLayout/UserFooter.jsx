
import React from 'react';
import { Link } from 'react-router-dom';

const GuestFooter = () => {
  return (
    <footer style={styles.footer}>
      <div style={styles.footerContainer}>
        {/* Footer Top Section */}
        <div style={styles.footerTop}>
          {/* About Section */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>About ligand Software Solutions</h3>
            <p style={styles.sectionText}>
              Ligand Software Solution is a leading technology company offering innovative software solutions and IT services across various industries in Karnataka.
            </p>
            <div style={styles.socialIcons}>
              <a href="#" style={styles.socialIcon} aria-label="Facebook">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M18 2H15C13.6739 2 12.4021 2.52678 11.4645 3.46447C10.5268 4.40215 10 5.67392 10 7V10H7V14H10V22H14V14H17L18 10H14V7C14 6.73478 14.1054 6.48043 14.2929 6.29289C14.4804 6.10536 14.7348 6 15 6H18V2Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" style={styles.socialIcon} aria-label="Twitter">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3C22.0424 3.67548 20.9821 4.19211 19.86 4.53C19.2577 3.83751 18.4573 3.34669 17.567 3.12393C16.6767 2.90116 15.7395 2.9572 14.8821 3.28445C14.0247 3.61171 13.2884 4.1944 12.773 4.95372C12.2575 5.71303 11.9877 6.61234 12 7.53V8.53C10.2426 8.57557 8.50127 8.18581 6.93101 7.39545C5.36074 6.60508 4.01032 5.43864 3 4C3 4 -1 13 8 17C5.94053 18.398 3.48716 19.0989 1 19C10 24 21 19 21 7.5C20.9991 7.22145 20.9723 6.94359 20.92 6.67C21.9406 5.66349 22.6608 4.39271 23 3V3Z" fill="currentColor"/>
                </svg>
              </a>
              <a href="#" style={styles.socialIcon} aria-label="LinkedIn">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M19 3C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V19C21 19.5304 20.7893 20.0391 20.4142 20.4142C20.0391 20.7893 19.5304 21 19 21H5C4.46957 21 3.96086 20.7893 3.58579 20.4142C3.21071 20.0391 3 19.5304 3 19V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19ZM18.5 18.5V13.2C18.5 12.3354 18.1565 11.5062 17.5452 10.8948C16.9338 10.2835 16.1046 9.94 15.24 9.94C14.39 9.94 13.4 10.46 12.92 11.24V10.13H10.13V18.5H12.92V13.57C12.92 12.8 13.54 12.17 14.31 12.17C14.6813 12.17 15.0374 12.3175 15.2999 12.5801C15.5625 12.8426 15.71 13.1987 15.71 13.57V18.5H18.5ZM6.88 8.56C7.32556 8.56 7.75288 8.383 8.06794 8.06794C8.383 7.75288 8.56 7.32556 8.56 6.88C8.56 5.95 7.81 5.19 6.88 5.19C6.43178 5.19 6.00193 5.36805 5.68499 5.68499C5.36805 6.00193 5.19 6.43178 5.19 6.88C5.19 7.81 5.95 8.56 6.88 8.56ZM8.27 18.5V10.13H5.5V18.5H8.27Z" fill="currentColor"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>Quick Links</h3>
            <ul style={styles.linkList}>
              <li style={styles.linkItem}>
                <Link to="/" style={styles.footerLink}>Home</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/register" style={styles.footerLink}>Register</Link>
              </li>
              <li style={styles.linkItem}>
                <Link to="/login" style={styles.footerLink}>Login</Link>
              </li>
              
            </ul>
          </div>

          {/* Contact Info */}
          <div style={styles.footerSection}>
            <h3 style={styles.sectionTitle}>Contact Us</h3>
            <ul style={styles.contactList}>
              <li style={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
                  <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="currentColor"/>
                </svg>
                <span>ligand Software Solutions,Sankeshwar 591313</span>
              </li>
              <li style={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
                  <path d="M20 4H4C2.9 4 2 4.9 2 6V18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="currentColor"/>
                </svg>
                <span>info@ligandsoftwaresolution.in</span>
              </li>
              <li style={styles.contactItem}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={styles.contactIcon}>
                  <path d="M20.01 15.38C18.78 15.38 17.59 15.18 16.48 14.82C16.13 14.7 15.74 14.79 15.47 15.06L13.9 17.03C11.07 15.68 8.42 13.13 7.01 10.2L8.96 8.54C9.23 8.26 9.31 7.87 9.2 7.52C8.83 6.41 8.64 5.22 8.64 3.99C8.64 3.45 8.19 3 7.65 3H4.19C3.65 3 3 3.24 3 3.99C3 13.28 10.73 21 20.01 21C20.72 21 21 20.37 21 19.82V16.37C21 15.83 20.55 15.38 20.01 15.38Z" fill="currentColor"/>
                </svg>
                <span>+91 8722585715</span>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          
        </div>

        {/* Footer Bottom */}
        <div style={styles.footerBottom}>
          <p style={styles.copyrightText}>
            &copy; {new Date().getFullYear()} Ligand Software Solutions. All Rights Reserved.
          </p>
          <div style={styles.legalLinks}>
            <Link to="/" style={styles.legalLink}>Privacy Policy</Link>
            <span style={styles.legalSeparator}>|</span>
            <Link to="/" style={styles.legalLink}>Terms of Service</Link>
            <span style={styles.legalSeparator}>|</span>
            <Link to="/" style={styles.legalLink}>Sitemap</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

// Internal CSS Styles
const styles = {
  footer: {
    background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    color: '#ffffff',
    padding: '3rem 0 1rem',
    position: 'relative',
    overflow: 'hidden',
  },
  footerContainer: {
    maxWidth: '1200px',
    margin: '0 auto',
    padding: '0 2rem',
  },
  footerTop: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '2rem',
  },
  footerSection: {
    marginBottom: '1.5rem',
  },
  sectionTitle: {
    fontSize: '1.25rem',
    fontWeight: '600',
    marginBottom: '1.5rem',
    position: 'relative',
    paddingBottom: '0.5rem',
  },
  sectionTitleAfter: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '50px',
    height: '2px',
    backgroundColor: '#4A90E2',
  },
  sectionText: {
    fontSize: '0.9rem',
    lineHeight: '1.6',
    color: '#ecf0f1',
    marginBottom: '1rem',
  },
  socialIcons: {
    display: 'flex',
    gap: '1rem',
    marginTop: '1rem',
  },
  socialIcon: {
    color: '#ffffff',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    transition: 'all 0.3s ease',
  },
  linkList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  linkItem: {
    marginBottom: '0.75rem',
  },
  footerLink: {
    color: '#ecf0f1',
    textDecoration: 'none',
    fontSize: '0.9rem',
    transition: 'all 0.3s ease',
    position: 'relative',
    paddingBottom: '2px',
  },
  footerLinkAfter: {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '0',
    height: '1px',
    backgroundColor: '#4A90E2',
    transition: 'width 0.3s ease',
  },
  contactList: {
    listStyle: 'none',
    padding: 0,
    margin: 0,
  },
  contactItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '0.75rem',
    marginBottom: '1rem',
    fontSize: '0.9rem',
    lineHeight: '1.4',
  },
  contactIcon: {
    flexShrink: 0,
    color: '#4A90E2',
  },
  newsletterForm: {
    display: 'flex',
    flexDirection: 'column',
    gap: '0.75rem',
  },
  newsletterInput: {
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '0.9rem',
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    transition: 'all 0.3s ease',
  },
  newsletterButton: {
    backgroundColor: '#4A90E2',
    color: '#ffffff',
    padding: '0.75rem',
    borderRadius: '4px',
    border: 'none',
    fontSize: '0.9rem',
    fontWeight: '600',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
    position: 'relative',
    overflow: 'hidden',
  },
  newsletterButtonHover: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '0',
    height: '0',
    borderRadius: '50%',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    transition: 'width 0.3s ease, height 0.3s ease',
  },
  footerBottom: {
    borderTop: '1px solid rgba(255, 255, 255, 0.1)',
    paddingTop: '1.5rem',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '1rem',
    textAlign: 'center',
  },
  copyrightText: {
    fontSize: '0.8rem',
    color: '#bdc3c7',
    margin: 0,
  },
  legalLinks: {
    display: 'flex',
    gap: '1rem',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  legalLink: {
    color: '#bdc3c7',
    textDecoration: 'none',
    fontSize: '0.8rem',
    transition: 'all 0.3s ease',
  },
  legalSeparator: {
    color: '#bdc3c7',
    fontSize: '0.8rem',
  },
};

// Adding hover effects
const addFooterHoverEffects = () => {
  // Social icons hover effect
  const socialIcons = document.querySelectorAll('.socialIcon');
  socialIcons.forEach(icon => {
    icon.addEventListener('mouseenter', () => {
      icon.style.backgroundColor = '#4A90E2';
      icon.style.transform = 'translateY(-3px)';
    });
    icon.addEventListener('mouseleave', () => {
      icon.style.backgroundColor = 'rgba(255, 255, 255, 0.1)';
      icon.style.transform = 'translateY(0)';
    });
  });

  // Footer links hover effect
  const footerLinks = document.querySelectorAll('.footerLink');
  footerLinks.forEach(link => {
    const hoverElement = document.createElement('span');
    hoverElement.style.cssText = styles.footerLinkAfter;
    link.appendChild(hoverElement);

    link.addEventListener('mouseenter', () => {
      link.style.color = '#4A90E2';
      hoverElement.style.width = '100%';
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = '#ecf0f1';
      hoverElement.style.width = '0';
    });
  });

  // Newsletter input hover effect
  const newsletterInput = document.querySelector('.newsletterInput');
  if (newsletterInput) {
    newsletterInput.addEventListener('focus', () => {
      newsletterInput.style.backgroundColor = '#ffffff';
      newsletterInput.style.boxShadow = '0 0 0 2px rgba(74, 144, 226, 0.5)';
    });
    newsletterInput.addEventListener('blur', () => {
      newsletterInput.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
      newsletterInput.style.boxShadow = 'none';
    });
  }

  // Newsletter button hover effect
  const newsletterButton = document.querySelector('.newsletterButton');
  if (newsletterButton) {
    const hoverElement = newsletterButton.querySelector('.newsletterButtonHover');
    newsletterButton.addEventListener('mouseenter', () => {
      newsletterButton.style.backgroundColor = '#3a7bc8';
      hoverElement.style.width = '200%';
      hoverElement.style.height = '200%';
    });
    newsletterButton.addEventListener('mouseleave', () => {
      newsletterButton.style.backgroundColor = '#4A90E2';
      hoverElement.style.width = '0';
      hoverElement.style.height = '0';
    });
  }

  // Legal links hover effect
  const legalLinks = document.querySelectorAll('.legalLink');
  legalLinks.forEach(link => {
    link.addEventListener('mouseenter', () => {
      link.style.color = '#4A90E2';
    });
    link.addEventListener('mouseleave', () => {
      link.style.color = '#bdc3c7';
    });
  });
};

// Call the hover effects after component mounts
document.addEventListener('DOMContentLoaded', addFooterHoverEffects);

export default GuestFooter;