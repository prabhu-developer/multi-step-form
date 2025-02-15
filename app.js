const steps = document.querySelectorAll('fieldset')
let currentStep = 0

const showOrHideSteps = () => {
    steps.forEach((fieldset, index) => {
        fieldset.style.display = (index === currentStep ? 'block' : 'none')
    })
}

showOrHideSteps()


const showError = (input) => {
    let err = 'Invalid input.'
    if (input.validity.valueMissing) {
        err = 'This field is required.'
    }
    if (input.validity.typeMismatch) {
        err = `Please enter the valid - ${input.type}.`
    }
    if (input.validity.rangeOverflow || input.validity.rangeUnderflow) {
        err = 'Value must be within the allows range'
    }
    const errorMessageElementId = `${input.name}Error`

    document.getElementById(errorMessageElementId).innerText = err
}

const removeError = (input) => {
    const errorMessageElementId = `${input.name}Error`
    document.getElementById(errorMessageElementId).innerText = ''
}
const handlePrevStep = () => {
    if (currentStep) {
        currentStep--;
        if (currentStep >= 0) {
            showOrHideSteps(currentStep)
        }
    }
}
const handleNextStep = () => {
    const currentStepInputs = steps[currentStep]
    const inputs = currentStepInputs.querySelectorAll('input')

    let isValid = true;

    inputs.forEach((input) => {
        if (input.checkValidity()) {
            removeError(input)
        } else {
            isValid = false
            showError(input)
        }
    })

    // If valid, move to next step
    if (isValid) {
        currentStep++;
        if (currentStep < steps.length) {
            showOrHideSteps(currentStep)
        } else {
            handleSubmit()
        }
    }
}

const handleSubmit = () => {
    const multiStepForm = document.getElementById('multiStepForm')
    const data = new FormData(multiStepForm)

    for ([key, value] of data) {
        console.log('Key', key)
        console.log('value', value)
    }


    // data -> we can sent it to api 

}