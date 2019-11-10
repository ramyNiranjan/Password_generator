const form = document.querySelector('form')
const checkbox = document.querySelectorAll("[type='checkbox']")
const passText = document.querySelector('#passText')
const clipBoard = document.querySelector('i')





const getRanNum=()=>{
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48)
}
const getRanUpperLetter=()=>{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65)
}
const getRanLowerLetter=()=>{
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97)
}
const getSimbols=()=>{
    const sim=['#','$','@','%','*','?','&','!']
    return sim[Math.floor(Math.random() * sim.length)]
}

const funcObj={
    num: getRanNum,
    lowerLetter: getRanLowerLetter,
    upperLetter: getRanUpperLetter,
    symbol: getSimbols
}


gettingTheRightFunc = (arr) => {
    let newArr = []
    let keys = Object.keys(funcObj)
    for (let i = 0; i < keys.length; i++) {
        for(let j=0; j<arr.length; j++){
              if (keys[i] === arr[j]) {
            newArr.push(funcObj[arr[j]])
           }
        }
       
    }
    return newArr
}

form.addEventListener('submit',e=>{
    e.preventDefault()
    let passLen=form.length.value
    if (passLen){
        const typeCheckedArr = []
        Array.from(checkbox).filter(item => {
            if (item.checked)
                typeCheckedArr.push(item.id)
        })

        let returnVal = gettingTheRightFunc(typeCheckedArr)
        let finalValue = ''
        for (let i = 0; i < passLen; i++) {
            for (let j = 0; j < returnVal.length; j++) {
                let generatedValue = returnVal[j]()
                finalValue += generatedValue

            }
        }
        finalValue.slice(0, passLen)
        passText.style.color='#070000'
        passText.value = finalValue.slice(0, passLen)
    } if (isNaN(parseInt(passLen))){
        passText.style.color = '#E71313'
        passText.value='Invalid number'
    }if(passLen<4){
        passText.style.color ='#E71313'
        passText.value = 'Minimun length is 4'
    }
})


clipBoard.addEventListener('click',e=>{
    const textArea= document.createElement('textarea')
    const pass = passText.value
    if(!pass){
        return 
    }
    textArea.value=pass
    document.body.appendChild(textArea)
    textArea.select()
    document.execCommand('copy')
    textArea.remove()
    alert('Password copied')
})
