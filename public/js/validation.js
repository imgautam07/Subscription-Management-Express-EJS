(function () {
  'use strict';

  const forms = document.querySelectorAll('.validated-form');

  Array.from(forms).forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }

      form.classList.add('was-validated');
    }, false);
  });

  const startDateInput = document.getElementById('startDate');
  const endDateInput = document.getElementById('endDate');

  if (startDateInput && endDateInput) {
    endDateInput.addEventListener('change', function() {
      const startDate = new Date(startDateInput.value);
      const endDate = new Date(endDateInput.value);

      if (endDate <= startDate) {
        endDateInput.setCustomValidity('End date must be after start date');
      } else {
        endDateInput.setCustomValidity('');
      }
    });

    startDateInput.addEventListener('change', function() {
      if (endDateInput.value) {
        const startDate = new Date(startDateInput.value);
        const endDate = new Date(endDateInput.value);

        if (endDate <= startDate) {
          endDateInput.setCustomValidity('End date must be after start date');
        } else {
          endDateInput.setCustomValidity('');
        }
      }
    });
  }
})();
