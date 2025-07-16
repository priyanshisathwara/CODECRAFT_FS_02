import bcrypt from "bcrypt";

const passwordsToHash = ["prs@123", "piya321"];
const saltRounds = 10;

passwordsToHash.forEach(password => {
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;
        console.log(`Plain Password: ${password} => Hashed: ${hash}`);
    });
});
