const text = " ававав: 'fdfd fdf.'...'fdfd arn't fdf?'...'dfdfdf!' fddfdf"
const regexpr1 = /'/gm

console.log("1 " + text.replace(regexpr1,'"'))

const regexpr2 = /(\:')|(\s')|('\s)|(\.')|(\?')|(\!')/gm

console.log("1 " + text.replace(regexpr2,'"'))