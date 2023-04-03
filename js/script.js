let addQuestion = document.querySelector('#add_qustion')
let tableAbjust = document.querySelector("#aqf_tab")
let tBody = document.querySelector('.tbody tbody-box')


let newNumber = 1;
if (addQuestion) {

    addQuestion.addEventListener('click', function (e) {
        e.preventDefault();
        createInput()
    })
}

function createInput() {

    newNumber++

    tableAbjust.insertAdjacentHTML('beforeend', `
        <tr class="blosh newtr">
            <td class="lassst">${newNumber}</td>
            <td><input class="aq-titles" data-check="checkbox${newNumber}" type="text" name="answer${newNumber}" placeholder="عنوان را وارد نمایید "></td>
            <td><input class="checkbox" type="checkbox" name="checkbox${newNumber}" value="checkbox${newNumber}"</td>
            <td>----</td>
        </tr>`)
}

let qForm = document.querySelector('#q_form')


let obj = {
    "id": "_noID",
    "created_time": "time not set",
    "items": [
        {
            "ques_id": null,
            "show": true,
            "title": null,
            "type": "radio",
            "answers": [
                {
                    "ans_id": '',
                    "title": '',
                    "child": [],
                    "default": [],
                    "descrip": null,
                    "desctext": "",
                    "name": '',
                    "rel_questions": []
                }
            ],
            "ques_can_select": [

            ]

        },
    ]
}


idCount = 0
qForm.addEventListener('submit', function (e) {
    e.preventDefault();
    newNumber = 1

    let aqInput = document.querySelector('.aq-input')
    let aqTitles = document.querySelectorAll('.aq-titles')
    let newTr = document.querySelectorAll('.newtr')
    let checkboxs = document.querySelectorAll('.checkbox')



    if (aqInput.value !== '') {
        let counter = 0;
        inputsValid(aqTitles)
        function inputsValid(items) {
            items.forEach(item => {
                if (item.value !== '') {
                    counter++;
                }
            })
        }

        if (counter == aqTitles.length) {


            // let addFormData = new FormData(qForm)
            let blosh = document.querySelectorAll('.blosh')
            let quesId = Math.floor(Math.random() * 999999)
            let aqInput = document.querySelector('#aq-input')
            idCount++

            let nre = null

            if (idCount == 1) {
                nre = {
                    "ques_id": quesId,
                    "title": aqInput.value,
                    "row": idCount,
                    "show": true,
                    "answers": []
                }
            } else {
                nre = {
                    "ques_id": quesId,
                    "title": aqInput.value,
                    "row": idCount,
                    "show": false,
                    "answers": []
                }
            }



            obj.items.push(nre)
            let aqTitles = document.querySelectorAll('.aq-titles')

            let ansId = 0
            blosh.forEach(item => {
                let aqTitle = item.querySelector('.aq-titles')
                let aqRadio = item.querySelector('.checkbox')
                ansId++
                let unique = Math.floor(Math.random() * 3333)


                if (aqRadio.checked == true) {

                    let xxx = {
                        "title": aqTitle.value,
                        "ans_id": ansId,
                        "ans_uni": unique,
                        "status": null,
                        "descrip": true,
                        "rel_questions": []
                    }
                    obj.items[idCount].answers.push(xxx)
                } else {

                    let xxx = {
                        "title": aqTitle.value,
                        "ans_id": ansId,
                        "ans_uni": unique,
                        "status": null,
                        "descrip": false,
                        "rel_questions": []

                    }
                    obj.items[idCount].answers.push(xxx)
                }
            })


            aqInput.value = ''
            aqTitles.forEach(aqtitle => {
                aqtitle.value = ''
            })
            newTr.forEach(tr => {
                tr.outerHTML = ''
            })

            checkboxs.forEach(check => {
                check.checked = false;
            })




            objectRet(obj)
            objectShow(obj)

        } else {
            alert('عنوان پاسخ ها نباید خالی باشند ')
        }

    } else {
        alert('عنوان اصلی نباید خالی باشد')
    }

})





trOutput = '';

function objectRet(obj) {

    let trOutput = ''
    let answersItem = ''
    let option = ''
    let rel = ''

    let formTbody = document.querySelector('.form_tbody')
    formTbody.innerHTML = ""
    obj.items.forEach(item => {
        answersItem = ''
        if (item.title !== null) {

            item.answers.forEach(relItem => {
                rel = '';

                relItem.rel_questions.forEach(relNum => {
                    rel += `
                    
                    <li><a href="" data-relques="${relNum}" data-quesdel="${item.row}" data-ansdel="${relItem.ans_id}">سوال ${relNum} <i class="bx bx-trash"></i></a></li>
                    `
                })

                option = ''
                obj.items.forEach(row => {
                    if (row.title !== null) {
                        if (item.row !== row.row) {

                            option += `
                            <option data-ques="${item.row}" data-answer="${relItem.ans_uni}" value="${row.row}">سوال ${row.row}</option>

                            `
                        }
                    }
                })

                answersItem += `
                <div class="td-item flex">
                    <div class="tdi-first padding-10 ">${relItem.ans_id}</div>
                    <div class="tdi-middle padding-10">${relItem.title}</div>
                    <div class="tdi-last padding-10">
                        <label class="pl-10" for="">سوال مرتبط</label>
                        <select class="all_select" name="" id="" class="select">
                            <option value="">انتخاب کنید</option>
                            ${option}
                        </select>
                    </div>

                    <div class="selList core">
                        <ul>
                            ${rel}
                        </ul>
                    </div>
                </div>
                
                `
            })

            trOutput = `
            <tr>
                <td>${item.row}</td>
                <td>سوال ${item.row}</td>
                <td>%</td>
                <td>${item.title}</td>
                <td class="nopad">

                    ${answersItem}
    
                </td>
            </tr>
    
            `
            formTbody.insertAdjacentHTML('beforeend', trOutput);
        }
    });

    let fomrTable = document.querySelector('.formtable')
    let middle = document.querySelector('.middle')

    if (obj.items.length > 0) {
        fomrTable.classList.remove('none')
        middle.classList.remove('none')
    }


    radioChange()
    delRel(obj)
    objectShow(obj)
    // saveForm()
}




// objectShow(obj)




function objectShow(obj) {
    relcounter = 1
    let middleShow = document.querySelector('.middle-show')
    middleShow.innerHTML = ''
    obj.items.forEach(objItem => {

        let outPut = ''
        let secRadio = ''
        let desc = ''
        let description = ''



        if (objItem.show == true) {
            objItem.answers.forEach(itemm => {
                let status = ''
                if (itemm.status == true) {
                    status = 'checked'
                } else {
                    status = ''
                }

                if (itemm.title !== '') {
                    if (itemm.status == true) {
                        if (itemm.descrip == true) {
                            let desctext = ''

                            if (itemm.desctext == undefined) {
                                desctext = ''
                            } else {
                                desctext = itemm.desctext
                            }
                            description += `
                                <div class="tx-p">
                                    <span class="block">توضیحات</span>
                                    <textarea name="${itemm.ans_uni}" data-text="${objItem.row}" id="">${desctext}</textarea>
                                </div>
                            `
                        } else {
                            description += ''
                        }
                    }

                }
                secRadio += `
                
                <div class="msi-radio">
                    <span>${itemm.title}</span>
                    <input class="rrr" data-desc="${desc}" data-ansid="${itemm.ans_uni}" type="radio" name="${objItem.row}" ${status}>
                </div>
                `
            })

            if (objItem.title) {
                outPut = `
                <div class="ms-item">
                    <div class="msi-title">
                        <span>${objItem.title}</span>
                    </div>
                    <div class="msi-box">
                        <div class="msi-item">
                            <div class="msi-ans">
                                ${secRadio}
                            </div>

                            <div class="msi-textarea">
                                ${description}
                            </div>
                            
                        </div>
                    </div>
                </div>
                `

            }
            middleShow.insertAdjacentHTML('beforeend', outPut)
            quesRels(obj)

        }
    })
}



function quesRels() {
    let radios = document.querySelectorAll('.rrr')
    radios.forEach(radio => {
        radio.addEventListener('change', function (e) {
            let ansUni = radio.getAttribute('data-ansid')
            let quesID = radio.getAttribute('name')

            obj.items[quesID].answers.forEach(item => {
                item.rel_questions.forEach(rel => {
                    obj.items[rel].show = false

                    obj.items[rel].answers.forEach(status => {
                        status.status = false
                    })

                    item.rel_questions.forEach(otherRel => {
                        obj.items[otherRel].answers.forEach(lastRel => {
                            
                            lastRel.rel_questions.forEach(final => {
                                console.log(final)
                            //     final.status = false
                                obj.items[final].show = false
                            })
                        })
                        
                    })
                })
                item.status = false
                if (ansUni == item.ans_uni) {
                    item.rel_questions.forEach(rel => {
                        obj.items[rel].show = true
                    })
                }
                if (item.ans_uni == ansUni) {
                    item.status = true
                }
            })

            //fff
            objectRet(obj)
            objectShow(obj)
        })
    })
}

let relcounter = 1
function radioChange() {
    AllSelect = document.querySelectorAll('.all_select option')
    AllSelect.forEach(item => {
        item.addEventListener('click', function () {
            let radioQuestin = item.getAttribute('data-ques')
            let radioAnswer = item.getAttribute('data-answer')
            let radioValue = item.value


            obj.items[radioQuestin].answers.forEach(answer => {
                if (answer.ans_uni == radioAnswer) {
                    if (answer.rel_questions.length > 0) {

                        answer.rel_questions.forEach(relfor => {
                            if (relfor == radioValue) {

                                relcounter++
                            }
                            if (relcounter == 1) {
                                answer.rel_questions.push(radioValue)
                                objectRet(obj)
                                objectShow(obj)
                            } else {

                            }
                        })
                    } else {
                        answer.rel_questions.push(radioValue)
                        objectRet(obj)
                        objectShow(obj)
                        relcounter = 1
                    }
                }
            })
        })
    })
}

function delRel(obj) {


    let delRelBtns = document.querySelectorAll('[data-ansdel]')

    delRelBtns.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();

            let currentAnsId = item.getAttribute('data-ansdel') - 1
            let currentQuesId = item.getAttribute('data-quesdel')
            let delRelQues = item.getAttribute('data-relques')

            obj.items[currentQuesId].answers[currentAnsId].rel_questions.forEach(rels => {
                let arr = obj.items[currentQuesId].answers[currentAnsId].rel_questions
                arr = arr.filter(item => item !== rels)

                obj.items[currentQuesId].answers[currentAnsId].rel_questions = arr
                obj.items[delRelQues].show = false



            })

            objectRet(obj)
            objectShow(obj)
        })
    })
}


function alert(text) {
    let alert = document.querySelector('.alert')
    alert.style.animation = 'alert alternate forwards 1s ';
    alert.childNodes[1].innerHTML = text
    setTimeout(() => {
        // alert.classList.add('none')
        alert.style.animation = 'alertClear alternate backwards 1s ';
        alert.childNodes[1].innerHTML = ''
    }, 3000);
}


function dateTime() {
    let currentdate = new Date();
    let datetime = currentdate.getDate() + "/"
        + (currentdate.getMonth() + 1) + "/"
        + currentdate.getFullYear() + " @ "
        + currentdate.getHours() + ":"
        + currentdate.getMinutes() + ":"
        + currentdate.getSeconds();

    return datetime
}



let saveForm = document.querySelector("#save_form")

saveForm.addEventListener('click', function (e) {
    e.preventDefault()


    let dataText = document.querySelectorAll('[data-text]')

    dataText.forEach(item => {

        let dataQues = item.getAttribute('name')
        let dataRow = item.getAttribute('data-text')


        obj.items[dataRow].answers.forEach(desc => {

            if (desc.ans_uni == dataQues) {
                desc.desctext = item.value;


            }

        })

    })
    console.log(obj)

})







