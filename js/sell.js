document.addEventListener('DOMContentLoaded', () => {
    const sellForm = document.getElementById('sellForm');
    if (!sellForm) return;

    const steps = Array.from(sellForm.querySelectorAll('.form-step'));
    const nextBtn = sellForm.querySelector('#nextBtn');
    const prevBtn = sellForm.querySelector('#prevBtn');
    const submitBtn = sellForm.querySelector('#submitBtn');
    const progressSteps = Array.from(document.querySelectorAll('.progress-step'));
    
    let currentStep = 1;

    const showStep = (stepNumber) => {
        steps.forEach(step => {
            step.classList.toggle('active', parseInt(step.dataset.step) === stepNumber);
        });

        progressSteps.forEach(progressStep => {
            progressStep.classList.toggle('active', parseInt(progressStep.dataset.step) <= stepNumber);
        });

        prevBtn.style.display = stepNumber > 1 ? 'inline-flex' : 'none';
        nextBtn.style.display = stepNumber < steps.length ? 'inline-flex' : 'none';
        submitBtn.style.display = stepNumber === steps.length ? 'inline-flex' : 'none';
    };

    const validateStep = (stepNumber) => {
        const currentStepFields = steps[stepNumber - 1].querySelectorAll('[required]');
        let isValid = true;
        
        currentStepFields.forEach(field => {
            if (!field.value.trim()) {
                // You can add more sophisticated validation feedback here
                console.error(`${field.name} is required.`);
                field.style.borderColor = 'var(--error-color)';
                isValid = false;
            } else {
                field.style.borderColor = 'var(--border-color)';
            }
        });
        
        return isValid;
    };

    nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep) && currentStep < steps.length) {
            currentStep++;
            showStep(currentStep);
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    // Initial setup
    showStep(currentStep);
}); 