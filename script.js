/**
 * J.A. SOVEREIGN GOD LIMITED - Official Interactive Scripts
 * Heavy Construction Equipment & Construction Solutions • Tema, Ghana
 * Preserves all original interactive behaviors, animations, and modals.
 * Handles Dual-Action Forms (Send to Email & Send to WhatsApp),
 * Training Registration Form, Equipment Enquiry Modals, FAQ Accordions, and Mobile Nav.
 */

document.addEventListener('DOMContentLoaded', () => {
  // -------------------------------------------------------------------------
  // Company Configuration Constants (Email kept private, only used for mailto)
  // -------------------------------------------------------------------------
  const COMPANY_NAME = 'J.A. Sovereign God Limited';
  const INTERNAL_EMAIL_RECIPIENT = 'jasovereigngod@gmaill.com';
  const WHATSAPP_PHONE_NUMBER = '233244406085'; // 0244 406 085 (Ghana +233)
  const WEBSITE_URL = 'www.jasovereigngod.com';

  // -------------------------------------------------------------------------
  // 1. Mobile Navigation Drawer
  // -------------------------------------------------------------------------
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavClose = document.getElementById('mobileNavClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link:not(.has-sub)');

  function openMobileNav() {
    mobileNavDrawer?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileNav() {
    mobileNavDrawer?.classList.remove('active');
    document.body.style.overflow = '';
  }

  mobileToggleBtn?.addEventListener('click', openMobileNav);
  mobileNavClose?.addEventListener('click', closeMobileNav);

  mobileNavDrawer?.addEventListener('click', (e) => {
    if (e.target === mobileNavDrawer) {
      closeMobileNav();
    }
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', closeMobileNav);
  });

  // Mobile Accordions
  const mobileAccordionTriggers = document.querySelectorAll('.mobile-nav-link.has-sub');
  mobileAccordionTriggers.forEach((trigger) => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const subnav = trigger.nextElementSibling;
      const chevron = trigger.querySelector('.chevron-icon');
      if (subnav) {
        subnav.classList.toggle('open');
        if (chevron) {
          chevron.style.transform = subnav.classList.contains('open') ? 'rotate(180deg)' : 'rotate(0deg)';
        }
      }
    });
  });

  // -------------------------------------------------------------------------
  // 2. Animated Counter for "100% Quality & Reliable Execution"
  // -------------------------------------------------------------------------
  const counterElement = document.getElementById('projectCounter');
  let hasAnimatedCounter = false;

  function animateCounter(el, target, duration = 1800) {
    let startTimestamp = null;
    const startValue = 0;
    
    function step(timestamp) {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.floor(easeProgress * (target - startValue) + startValue);
      el.textContent = currentValue.toLocaleString('en-US');
      
      if (progress < 1) {
        window.requestAnimationFrame(step);
      } else {
        el.textContent = target.toLocaleString('en-US');
      }
    }
    
    window.requestAnimationFrame(step);
  }

  if (counterElement) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimatedCounter) {
          hasAnimatedCounter = true;
          animateCounter(counterElement, 100, 1600);
        }
      });
    }, { threshold: 0.3 });

    observer.observe(counterElement);
  }

  // -------------------------------------------------------------------------
  // 3. Consultation / Equipment Enquiry Modal
  // -------------------------------------------------------------------------
  const appointmentModal = document.getElementById('appointmentModal');
  const appointmentClose = document.getElementById('appointmentClose');
  const appointmentBtns = document.querySelectorAll('[data-action="appointment"]');
  const modalServiceSelect = document.querySelector('#appointmentForm select[name="serviceRequired"]');

  function openAppointmentModal(defaultService = null) {
    closeMobileNav();
    if (defaultService && modalServiceSelect) {
      // Find matching option or set value
      let found = false;
      for (const opt of modalServiceSelect.options) {
        if (opt.value.toLowerCase().includes(defaultService.toLowerCase()) || 
            defaultService.toLowerCase().includes(opt.value.toLowerCase())) {
          modalServiceSelect.value = opt.value;
          found = true;
          break;
        }
      }
      if (!found) {
        modalServiceSelect.value = defaultService;
      }
    }
    appointmentModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeAppointmentModal() {
    appointmentModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  appointmentBtns.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const serviceParam = btn.getAttribute('data-service');
      openAppointmentModal(serviceParam);
    });
  });

  appointmentClose?.addEventListener('click', closeAppointmentModal);
  appointmentModal?.addEventListener('click', (e) => {
    if (e.target === appointmentModal) closeAppointmentModal();
  });

  // -------------------------------------------------------------------------
  // 4. Toast Notification
  // -------------------------------------------------------------------------
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');

  function showToast(msg) {
    if (toastNotice && toastMessage) {
      toastMessage.textContent = msg;
      toastNotice.classList.add('show');
      setTimeout(() => {
        toastNotice.classList.remove('show');
      }, 4500);
    }
  }

  // -------------------------------------------------------------------------
  // 5. Training Registration Form Handling (Dual Buttons)
  // -------------------------------------------------------------------------
  const trainingForms = document.querySelectorAll('.training-form');

  function getTrainingFormData(form) {
    return {
      fullName: form.querySelector('[name="fullName"]')?.value?.trim(),
      phone: form.querySelector('[name="phoneNumber"]')?.value?.trim(),
      whatsapp: form.querySelector('[name="whatsappNumber"]')?.value?.trim() || form.querySelector('[name="phoneNumber"]')?.value?.trim(),
      email: form.querySelector('[name="emailAddress"]')?.value?.trim() || 'Not provided',
      location: form.querySelector('[name="residentialLocation"]')?.value?.trim(),
      equipment: form.querySelector('[name="trainingEquipment"]')?.value?.trim(),
      experience: form.querySelector('[name="previousExperience"]')?.value?.trim(),
      startDate: form.querySelector('[name="preferredStartDate"]')?.value?.trim(),
      additionalInfo: form.querySelector('[name="additionalInfo"]')?.value?.trim() || 'None'
    };
  }

  function validateTrainingForm(data) {
    if (!data.fullName) {
      showToast('Please enter your full name.');
      return false;
    }
    if (!data.phone) {
      showToast('Please enter your phone number.');
      return false;
    }
    if (!data.whatsapp) {
      showToast('Please enter your WhatsApp number.');
      return false;
    }
    if (!data.location) {
      showToast('Please enter your residential location.');
      return false;
    }
    if (!data.equipment) {
      showToast('Please select the equipment/programme you are interested in.');
      return false;
    }
    if (!data.experience) {
      showToast('Please select your experience level.');
      return false;
    }
    if (!data.startDate) {
      showToast('Please select your preferred training start date.');
      return false;
    }
    return true;
  }

  function handleTrainingSendToWhatsApp(form) {
    const data = getTrainingFormData(form);
    if (!validateTrainingForm(data)) return;

    const message = 
      `NEW TRAINING REGISTRATION\n` +
      `Company: ${COMPANY_NAME}\n\n` +
      `APPLICANT DETAILS\n` +
      `Full Name: ${data.fullName}\n` +
      `Phone Number: ${data.phone}\n` +
      `WhatsApp Number: ${data.whatsapp}\n` +
      `Email Address: ${data.email}\n` +
      `Residential Location: ${data.location}\n\n` +
      `TRAINING DETAILS\n` +
      `Equipment/Programme: ${data.equipment}\n` +
      `Experience Level: ${data.experience}\n` +
      `Preferred Start Date: ${data.startDate}\n` +
      `Additional Information: ${data.additionalInfo}\n\n` +
      `Submission Source: Website Training Registration Form\n` +
      `Please contact the applicant regarding this training registration.`;

    const encodedText = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;

    showToast('Redirecting to WhatsApp to send your training registration...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
  }

  function handleTrainingSendToEmail(form) {
    const data = getTrainingFormData(form);
    if (!validateTrainingForm(data)) return;

    const emailSubject = encodeURIComponent(`New Training Registration – ${data.equipment} (${data.fullName})`);
    
    const emailBody = encodeURIComponent(
      `NEW TRAINING REGISTRATION\n` +
      `Company: ${COMPANY_NAME}\n` +
      `====================================\n\n` +
      `APPLICANT DETAILS\n` +
      `Full Name: ${data.fullName}\n` +
      `Phone Number: ${data.phone}\n` +
      `WhatsApp Number: ${data.whatsapp}\n` +
      `Email Address: ${data.email}\n` +
      `Residential Location: ${data.location}\n\n` +
      `TRAINING DETAILS\n` +
      `Equipment/Programme: ${data.equipment}\n` +
      `Experience Level: ${data.experience}\n` +
      `Preferred Start Date: ${data.startDate}\n` +
      `Additional Information: ${data.additionalInfo}\n\n` +
      `Submission Source: Website Training Registration Form\n` +
      `Company: ${COMPANY_NAME} • ${WEBSITE_URL}`
    );

    const mailtoUrl = `mailto:${INTERNAL_EMAIL_RECIPIENT}?subject=${emailSubject}&body=${emailBody}`;
    
    showToast('Opening your email client with your training registration details...');
    window.location.href = mailtoUrl;
  }

  trainingForms.forEach((form) => {
    const emailBtn = form.querySelector('.btn-send-email');
    const whatsappBtn = form.querySelector('.btn-send-whatsapp');

    emailBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleTrainingSendToEmail(form);
    });

    whatsappBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleTrainingSendToWhatsApp(form);
    });
  });

  // -------------------------------------------------------------------------
  // 6. Contact & Equipment Enquiry Forms Handling (Dual Buttons)
  // -------------------------------------------------------------------------
  function getContactFormData(form) {
    const name = form.querySelector('[name="fullName"]')?.value?.trim();
    const phone = form.querySelector('[name="phoneNumber"]')?.value?.trim();
    const whatsapp = form.querySelector('[name="whatsappNumber"]')?.value?.trim() || phone;
    const email = form.querySelector('[name="emailAddress"]')?.value?.trim() || 'Not provided';
    const service = form.querySelector('[name="serviceRequired"]')?.value?.trim() || 'General Enquiry';
    const location = form.querySelector('[name="projectLocation"]')?.value?.trim();
    const message = form.querySelector('[name="projectMessage"]')?.value?.trim();

    return { name, phone, whatsapp, email, service, location, message };
  }

  function validateContactForm(data) {
    if (!data.name) {
      showToast('Please enter your full name.');
      return false;
    }
    if (!data.phone) {
      showToast('Please enter your phone number.');
      return false;
    }
    if (!data.service) {
      showToast('Please select the required service or equipment.');
      return false;
    }
    if (!data.location) {
      showToast('Please enter your project location.');
      return false;
    }
    if (!data.message) {
      showToast('Please enter a brief project or enquiry description.');
      return false;
    }
    return true;
  }

  function handleContactSendToEmail(form) {
    const data = getContactFormData(form);
    if (!validateContactForm(data)) return;

    const emailSubject = encodeURIComponent(`New Equipment & Project Enquiry – ${data.service} (${data.name})`);
    
    const emailBody = encodeURIComponent(
      `NEW WEBSITE ENQUIRY - ${COMPANY_NAME.toUpperCase()}\n` +
      `====================================\n\n` +
      `CUSTOMER DETAILS\n` +
      `----------------\n` +
      `Full Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `WhatsApp Number: ${data.whatsapp}\n` +
      `Email Address: ${data.email}\n` +
      `Location: ${data.location}\n\n` +
      `SERVICE & EQUIPMENT DETAILS\n` +
      `---------------------------\n` +
      `Service/Equipment Required: ${data.service}\n\n` +
      `ENQUIRY DETAILS\n` +
      `---------------\n` +
      `${data.message}\n\n` +
      `---\n` +
      `Sent through the ${COMPANY_NAME} website\n` +
      `${WEBSITE_URL}`
    );

    const mailtoUrl = `mailto:${INTERNAL_EMAIL_RECIPIENT}?subject=${emailSubject}&body=${emailBody}`;
    
    showToast('Opening your email client with your enquiry details...');
    window.location.href = mailtoUrl;
    
    closeAppointmentModal();
  }

  function handleContactSendToWhatsApp(form) {
    const data = getContactFormData(form);
    if (!validateContactForm(data)) return;

    const formattedMessage = 
      `NEW EQUIPMENT & SERVICES ENQUIRY\n` +
      `Company: ${COMPANY_NAME}\n\n` +
      `CUSTOMER DETAILS\n` +
      `Full Name: ${data.name}\n` +
      `Phone Number: ${data.phone}\n` +
      `WhatsApp Number: ${data.whatsapp}\n` +
      `Email Address: ${data.email}\n` +
      `Project Location: ${data.location}\n\n` +
      `SERVICE / EQUIPMENT INFORMATION\n` +
      `Service/Equipment: ${data.service}\n\n` +
      `ENQUIRY DETAILS\n` +
      `${data.message}\n\n` +
      `Submission Source: Website Enquiry Form\n` +
      `Please contact the customer regarding this enquiry.`;

    const encodedText = encodeURIComponent(formattedMessage);
    const whatsappUrl = `https://wa.me/${WHATSAPP_PHONE_NUMBER}?text=${encodedText}`;

    showToast('Redirecting to WhatsApp to send your enquiry...');
    window.open(whatsappUrl, '_blank', 'noopener,noreferrer');
    
    closeAppointmentModal();
  }

  // Wire buttons in forms (contact page, equipment enquiry, appointment modal)
  document.querySelectorAll('.contact-form, #appointmentForm').forEach((form) => {
    // Avoid double-binding if it's already a training form
    if (form.classList.contains('training-form')) return;

    const emailBtn = form.querySelector('.btn-send-email');
    const whatsappBtn = form.querySelector('.btn-send-whatsapp');

    emailBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleContactSendToEmail(form);
    });

    whatsappBtn?.addEventListener('click', (e) => {
      e.preventDefault();
      handleContactSendToWhatsApp(form);
    });
  });

  // -------------------------------------------------------------------------
  // 7. Equipment Cards "Enquire / Request Equipment" Actions
  // -------------------------------------------------------------------------
  document.querySelectorAll('.btn-equipment-enquire').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const equipmentName = btn.getAttribute('data-equipment') || 'Equipment';
      openAppointmentModal(equipmentName);
    });
  });

  // -------------------------------------------------------------------------
  // 8. FAQ Accordion Functionality
  // -------------------------------------------------------------------------
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach((item) => {
    const button = item.querySelector('.faq-question-btn');
    button?.addEventListener('click', () => {
      const isActive = item.classList.contains('active');
      // Close other items
      faqItems.forEach((other) => other.classList.remove('active'));
      if (!isActive) {
        item.classList.add('active');
      }
    });
  });

  // -------------------------------------------------------------------------
  // 9. Video Tour / Corporate Presentation Modal
  // -------------------------------------------------------------------------
  const videoModal = document.getElementById('videoModal');
  const videoClose = document.getElementById('videoClose');
  const watchVideoBtn = document.getElementById('watchVideoBtn');

  function openVideoModal() {
    videoModal?.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeVideoModal() {
    videoModal?.classList.remove('active');
    document.body.style.overflow = '';
  }

  watchVideoBtn?.addEventListener('click', openVideoModal);
  videoClose?.addEventListener('click', closeVideoModal);
  videoModal?.addEventListener('click', (e) => {
    if (e.target === videoModal) closeVideoModal();
  });

  // -------------------------------------------------------------------------
  // 10. Global Escape Key Handler
  // -------------------------------------------------------------------------
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeAppointmentModal();
      closeVideoModal();
      closeMobileNav();
    }
  });

  console.log("J.A. Sovereign God Limited website scripts initialized successfully.");
});
