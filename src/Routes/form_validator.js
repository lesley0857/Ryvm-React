import React from "react";

export const Validator = (email, password, phone_number = ('0000000')) => {
    let errors = 0
    let number_of_errors_to_check = 3
    for (errors; errors <= number_of_errors_to_check; errors++) {
        if (email.match(/^([a-z A-Z 0-9 \. _]+)@([a-z A-Z]+).([a-z A-Z ]{2,6})$/) === null) {
            console.log('no at')
            errors = errors + 1
            return "@ missing"
        }
        if (password.match(/^([a-z A-Z 0-9 \.]+)/) === null) {
            console.log('no spec')
            errors = errors + 1
            return "spec missing"
        }

        if (phone_number.match(/^[0-9]\d{10}$/) === null) {
            console.log('wrong phone pattern')
            errors = errors + 1
            return 'wrong phone pattern'
        }

    }
}

