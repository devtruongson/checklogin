const userNameElement = document.querySelector('#username');
const passwordElement = document.querySelector('#password');
const cancelButton = document.querySelector('#cancel');
const submitButton = document.querySelector('#submit');

const arrayBuildCheck = [
    {
        element: userNameElement,
        length: 6,
        filed: 'username'
    },
    {
        element: passwordElement,
        length: 8,
        filed: 'password'
    }
]

const dataBaseFake = [
    {
        username: "dotienquangdev@203",
        password: "12345678" // trong db sẽ lưu hash password chứ không trực tiếp lưu số 123456 
    }
]

function validateFiled(array) {
    let isValid = true;
    const values = [];
    for (let i = 0; i < array.length; i++) {
        if (!array[i].element.value || array[i].element.value.length < array[i].length) {
            isValid = false;
            alert(`${!array[i].element.value ? `vui long nhap ${array[i].filed}` : `do dai toi thieu ${array[i].length} ky tu`}`);
            array[i].element.focus();
            break;
        } else {
            values.push(array[i].element.value);
        }
    }

    return {
        isValid,
        values
    };
}

function hiddenSubmitBtn(countLimit) {
    if (countLimit === 3) {
        submitButton.style.display = 'none';
    }
}

let countLimit = JSON.parse(localStorage.getItem('limit_count'));
// typeof null = object nhe
if (typeof countLimit === 'object') {
    countLimit = 0;
    localStorage.setItem('limit_count', JSON.stringify(countLimit));
}

submitButton.addEventListener('click', function () {
    const { isValid, values } = validateFiled(arrayBuildCheck)

    if (!isValid) return;
    if (countLimit === 3) {
        return;
    }

    const checkUserExit = dataBaseFake.find(user => user.username === values[0]);
    if (!checkUserExit) {
        alert("User cua ban khong ton tai trong he thong vui long thu lai");
        return;
    }

    const checkPassword = dataBaseFake.find(user => user.password === values[1]);
    if (!checkPassword) {
        alert("Sai mat khau vui long thu lai luu y sai 3 lan se khong duoc phet dang nhap nua");
        countLimit += 1;
        hiddenSubmitBtn(countLimit);
        localStorage.setItem('limit_count', JSON.stringify(countLimit));
        return;
    } else {
        window.location.href = "/default.html"
    }
})

cancelButton.addEventListener('click', () => {
    userNameElement.value = "";
    passwordElement.value = "";
})