import Swal from 'sweetalert2';

export default function validateUser(user, citiesList) {
    // Username validation
    if (!/^[A-Za-z0-9!@#$%^&*(),.?":{}|<>]{0,60}$/.test(user.userName)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Username",
            text: "Username should contain only letters, numbers, special characters, and be up to 60 characters.",
        });
        return false; // Exit early
    }

    // Password validation
    if (!user.password || user.password.length < 7 || user.password.length > 12) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must be between 7 and 12 characters.",
        });
        return false;
    }
    if (!/[A-Z]/.test(user.password)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must include at least one uppercase letter.",
        });
        return false;
    }
    if (!/\d/.test(user.password)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must include at least one number.",
        });
        return false;
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(user.password)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Password",
            text: "Password must include at least one special character.",
        });
        return false;
    }

    // Confirm password validation
    if (user.password !== user.validatePassword) {
        Swal.fire({
            icon: "error",
            title: "Password Mismatch",
            text: "Passwords do not match.",
        });
        return false;
    }

    // Email validation
    if (!/^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(user.email)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Email",
            text: "Invalid email format.",
        });
        return false;
    }

    // Birth date validation
    if (user.birthDate) {
        const today = new Date();
        const inputDate = new Date(user.birthDate);
        const age = today.getFullYear() - inputDate.getFullYear();
        const monthDifference = today.getMonth() - inputDate.getMonth();
        const dayDifference = today.getDate() - inputDate.getDate();
        const exactAge = age - (monthDifference < 0 || (monthDifference === 0 && dayDifference < 0) ? 1 : 0);

        if (exactAge < 18 || exactAge > 120) {
            Swal.fire({
                icon: "error",
                title: "Invalid Age",
                text: "Age must be between 18 and 120 years.",
            });
            return false;
        }
    }

    // Address validation
    if (user.adress && !/^[\u0590-\u05FF\s]+$/.test(user.adress)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Address",
            text: "Address must contain only Hebrew characters.",
        });
        return false;
    }

    // Image validation
    if (user.image) {
        // Extract file extension from Data URL (if available)
        const validExtensions = ["jpg", "jpeg"];
        const isBase64 = user.image.startsWith("data:image/");
        const fileExtension = isBase64
            ? user.image.split(";")[0].split("/")[1].toLowerCase()
            : user.image.split(".").pop().toLowerCase();
    
        if (!validExtensions.includes(fileExtension)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Image",
                text: "You can only upload jpg or jpeg files.",
            });
            return false;
        }
    }
    // First name validation
    if (user.firstName && !/^[A-Za-z\u0590-\u05FF\s]+$/.test(user.firstName)) {
        Swal.fire({
            icon: "error",
            title: "Invalid First Name",
            text: "First name must contain only letters.",
        });
        return false;
    }

    // Last name validation
    if (user.lastName && !/^[A-Za-z\u0590-\u05FF\s]+$/.test(user.lastName)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Last Name",
            text: "Last name must contain only letters.",
        });
        return false;
    }

    // City validation
    if (user.city && !citiesList.includes(user.city)) {
        Swal.fire({
            icon: "error",
            title: "Invalid City",
            text: "City must be selected from the list.",
        });
        return false;
    }

    // Apartment number validation
    if (user.apartmentNumber && !/^[0-9]+$/.test(user.apartmentNumber)) {
        Swal.fire({
            icon: "error",
            title: "Invalid Apartment Number",
            text: "Apartment number must contain only numbers.",
        });
        return false;
    }

    return true; // Return true if all validations pass
}
