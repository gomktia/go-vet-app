const bcrypt = require('bcryptjs');

const hash = "$2a$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi";
const password = "123456";

bcrypt.compare(password, hash).then(res => {
    console.log("Comparison with '123456':", res);
});

bcrypt.compare("password", hash).then(res => {
    console.log("Comparison with 'password':", res);
});
